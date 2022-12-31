import { createContext } from 'react';
import { IUser } from '../../interfaces/user';

interface ContextProps {
    isLoggedIn: boolean
     user?: IUser;

     //Methods
     loginUser: (name: string, password: string) => Promise<boolean>
     logout: () => void
}

export const AuthContext = createContext({} as ContextProps)