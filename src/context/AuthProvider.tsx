import { ApiAuth } from '@/api/Auth';
import { isApiResponse } from '@/api/guards';
import UseUserStore, { removeUser } from '@/store/user.store';
import { AuthContextType, UserType } from '@/types';
import React, { ReactNode, useState, createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const AuthContext = createContext<AuthContextType>({
  auth: null,
  setAuth: () => { },
  logIn: () => { },
  logOut: () => { },
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }): React.ReactElement => {
  const userState = UseUserStore();
  const persistedUser = userState ? userState.user : null;
  const [auth, setAuth] = useState<UserType | null>(persistedUser);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const logOut = async () => {
    const response = await ApiAuth.logout();
    if (isApiResponse<unknown>(response)) {
      if (response.data.statusCode === 201) {
        removeUser();
        setAuth(null);
        navigate('/login');
      }
    }
  }

  const logIn = (data: UserType) => {
    userState.saveUser(data)
    setAuth(data);
    navigate(from, { replace: true });
  }

  return (
    <AuthContext.Provider value={{ logIn, logOut, auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;