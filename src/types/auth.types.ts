import { Dispatch, SetStateAction } from "react";

export interface Auth {
    user: User,
    tokens: Tokens
}

export type User = {
    id: string,
    name: string,
    email: string,
    roles: string[],
}

export type UserList = Omit<User, 'roles' | 'name'>;

export type Token = string;

export type Tokens = {
    access_token:Token,
    refresh_token:Token,
    expiresIn: Date,
}

export interface AuthContextType {
    auth: Auth | null
    setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
    logIn: (data:Auth) => void;
    logOut: () => void;
}