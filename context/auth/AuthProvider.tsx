import { FC, useReducer, useEffect } from 'react'
import { useRouter } from 'next/router';

import Cookies from 'js-cookie';

import heladosApi from '../../api/heladosApi'
import { IUser } from '../../interfaces/user'
import {  AuthContext,  AuthReducer } from './'

export interface AuthState {
    isLoggedIn: boolean
    user?: IUser
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

const Auth_INITIAL_STATE:  AuthState = {
    isLoggedIn: false,
    user: undefined
}

export const AuthProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( AuthReducer, Auth_INITIAL_STATE);
    const router = useRouter();

    useEffect(() => {
      if( Cookies.get('auth') !== undefined ){
        const getUserAuthCookie = JSON.parse(Cookies.get('auth'));
        dispatch({ type: '[Auth] - Login', payload: getUserAuthCookie });
      }
    }, [])
    

    const loginUser = async( name: string, password: string ): Promise<boolean> => {
        try {
            
            const { data } = await heladosApi.post('/user/login', {name, password})
            const { user } = data;
            dispatch({ type: '[Auth] - Login', payload: user });
            Cookies.set('auth', JSON.stringify(user));
            return true;

        } catch (error) {
            return false;
        }
    }

    const logout = () => {
        Cookies.remove('auth');

        router.reload();
    }

    return (
       < AuthContext.Provider value={{
           ...state,
            //Methods
           loginUser,
           logout
      }}>
          { children }
        </ AuthContext.Provider>
    )
}