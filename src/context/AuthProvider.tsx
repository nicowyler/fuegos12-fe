import { Auth, AuthContextType } from '@/types';
import Cookies from 'js-cookie';
import React, { ReactNode, useState } from 'react';
import { createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const AuthContext = createContext<AuthContextType>({
    auth: null,
    setAuth: () => {},
    logIn: () => {},
    logOut: () => {},
  });

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }): React.ReactElement => {
  const cookies = Cookies.get('auth');
  const authCookie = cookies ? JSON.parse(cookies) : null;
  const [auth, setAuth] = useState<Auth | null>(authCookie);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const logOut = () => {
      Cookies.remove('auth');
      setAuth(null);
      navigate('/login');
    }

    const logIn = (data:Auth) => {
      const authCookie = JSON.stringify(data);
      Cookies.set('auth', authCookie);
      setAuth(data);
      console.log(from)
      navigate(from, { replace: true });
    }

    return (
      <AuthContext.Provider value={{ logIn, logOut, auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    )
};

export default AuthProvider;