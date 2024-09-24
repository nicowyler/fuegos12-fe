import * as React from 'react'
import { AuthContextType } from './types/user.type'
import { createContext, useState } from 'react'
import { removeRegistrationStore } from '@/store/registration.store';
import { supabase } from '@/supabase/supabase.config';
import { User } from '@supabase/supabase-js';

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    signUp: async () => null,
    logIn: () => { },
    logOut: () => { },
    signInWithGoogle: () => { }
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    async function signUp(email: string, password: string) {
        setIsLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
            });
            if (error) {
                throw new Error("Error al iniciar sesión");
            }
            setIsLoading(false);
            return data.user;
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    async function signInWithGoogle() {
        try {
            setIsLoading(true);
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            })
            if (error) {
                throw new Error("Error al iniciar sesión con google");
            }
            setIsLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    async function logOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw new Error("Error al cerrar sesión");
        }
    }

    const logIn = (data: User) => {
        setUser(data);
        setIsAuthenticated(true);
        setIsLoading(false);
    }

    React.useEffect(() => {
        setIsLoading(true);
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN') {
                const user = session?.user;
                console.log(user);
                if (user) {
                    setUser(user);
                    setIsAuthenticated(true);
                    setIsLoading(false);
                }
            }
            if (event === 'SIGNED_OUT') {
                setUser(null);
                removeRegistrationStore();
                setIsAuthenticated(false);
                setIsLoading(true);
            }
        })

        return () => {
            authListener.subscription;
        }

    }, [])

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, signUp, logIn, logOut, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}