// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import {
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail
} from 'firebase/auth';
import { auth, getFirebaseErrorMessage, googleProvider } from './lib/firebase';
import { useMutation } from '@tanstack/react-query';
import { createUser } from '@/lib/api/user';
import { toast } from '@/components/ui/use-toast';

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signUp: (email: string, password: string) => Promise<User | null>;
    logIn: (email: string, password: string) => Promise<void>;
    logOut: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    recoverPassword: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const mutation = useMutation({
        mutationFn: createUser,
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: getFirebaseErrorMessage(error.message), // Handle error message in Spanish
            });
        }
    });

    // Sign up with email and password
    const signUp = async (email: string, password: string): Promise<User | null> => {
        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setIsAuthenticated(false);
            setUser(null);
            return userCredential.user;
        } catch (error) {
            console.error("Error during sign up", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Log in with email and password
    const logIn = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("VERIFIED :::: ", userCredential.user.emailVerified);
            if (userCredential.user.emailVerified) {
                setUser(userCredential.user);
                setIsAuthenticated(true);
            } else {
                console.log("Email no verificado");
                setUser(null);
                setIsAuthenticated(false);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Email no verificado",
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    // Recover password
    const recoverPassword = async (email: string): Promise<void> => {
        try {
            const actionCodeSettings = {
                // URL you want to redirect to after the reset, e.g., a login page
                url: 'https://fuegos12dejulio.com/login',
                handleCodeInApp: true,
            };
            await sendPasswordResetEmail(auth, email, actionCodeSettings);
            console.log('Password reset email sent');
        } catch (error) {
            console.error('Error sending password reset email', error);
            throw error;
        }
    };

    // Log in with Google
    const signInWithGoogle = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const signedUser = result.user;

            if (signedUser.emailVerified) {
                console.log('User email is verified:', signedUser.email);
            }

            if (signedUser) {
                const token = await signedUser.getIdToken();
                const response = await mutation.mutateAsync({
                    uid: signedUser?.uid,
                    email: signedUser?.email,
                    displayName: signedUser?.displayName,
                    token: token,
                });

                if (response) {
                    setUser(signedUser);
                    setIsAuthenticated(true);
                }
            }
        } catch (error) {
            console.error("Error during Google sign-in", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Log out
    const logOut = async (): Promise<void> => {
        setIsLoading(true);
        try {
            await signOut(auth);
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Error during log out", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, signUp, logIn, logOut, signInWithGoogle, recoverPassword }}>
            {children}
        </AuthContext.Provider>
    );
};
