import { User } from '@supabase/supabase-js';

export interface AuthType {
  data: {
    user: User;
  };
}

export interface RegisterCompanyResult {
  data: {
    companyId: string;
  };
}

export interface OtpType {
  code: string;
}

export type EmailRecoverType = string;

export type UserList = Omit<User, 'accountType' | 'name'>;

export type Token = string;

export type TokensType = {
  access_token: string;
  refresh_token: string;
  expiresIn: Date;
};

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<User | null>;
  logIn: (data: User) => void;
  logOut: () => void;
  signInWithGoogle: () => void;
}
