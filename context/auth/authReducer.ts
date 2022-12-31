import { IUser } from '../../interfaces/user';
import { AuthState } from './';

type AuthActionType = 
| { type: '[Auth] - Login', payload: IUser }

export const AuthReducer = ( state: AuthState, action: AuthActionType ): AuthState => {

    switch (action.type) {
       case '[Auth] - Login':
          return {
               ...state,
               isLoggedIn: true,
               user: action.payload
              }

       default:
         return state;
    }
}