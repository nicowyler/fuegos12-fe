
export interface AuthType {
    user: UserType,
}

export interface OtpType {
    code: string,
}

export type UserType = {
    id: string,
    name: string,
    email: string,
    roles: string[],
}

export type UserList = Omit<UserType, 'roles' | 'name'>;

export type Token = string;

export type TokensType = {
    access_token:string,
    refresh_token:string,
    expiresIn: Date,
}

export interface AuthContextType {
    auth: UserType | null
    setAuth: React.Dispatch<React.SetStateAction<UserType | null>>;
    logIn: (data:UserType) => void;
    logOut: () => void;
}