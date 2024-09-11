import * as React from 'react'
import { AuthContextType, UserType } from './types/user.type'
import UseUserStore, { removeUser } from './store/user.store'
import { createContext, useState } from 'react'
import { removeRegistrationStore } from '@/store/registration.store';

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    logIn: () => { },
    logOut: () => Promise.resolve(),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const userState = UseUserStore();
    const persistedUser = userState ? userState.user : null;
    const [user, setUser] = useState<UserType | null>(persistedUser);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!persistedUser);

    const logOut = async () => {
        removeUser();
        removeRegistrationStore();
        setIsAuthenticated(false);
    }

    const logIn = (data: UserType) => {
        userState.saveUser(data)
        setUser(data);
        setIsAuthenticated(true);
    }

    React.useEffect(() => {
        const persistedUser = userState ? userState.user : null;
        setUser(persistedUser);
        setIsAuthenticated(!!persistedUser);
    }, [userState])

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}