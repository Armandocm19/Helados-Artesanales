import { CartState } from './';
import { ICartIcecream } from '../../interfaces';

type CartActionType = 
| { type: '[Cart] - LoadCart from cookies | storage', payload: ICartIcecream[] }
| { type: '[Cart] - Update or add products in cart', payload: ICartIcecream[] }
| { type: '[Cart] - Change cart quantity', payload: ICartIcecream }
| { type: '[Cart] - Remove product in cart', payload: ICartIcecream }
| { type: '[Cart] - Order complete' }
| { type: '[Cart] - Update order smmary', 
    payload: {
      numberOfItems: number;
      subTotal: number;
      total: number;
    } 
  }

export const cartReducer = ( state: CartState, action: CartActionType ): CartState => {

    switch (action.type) {
       case '[Cart] - LoadCart from cookies | storage':
          return {
               ...state,
               isLoaded: true,
               cart: [...action.payload]
              }
       case '[Cart] - Update or add products in cart':
          return {
               ...state,
               cart: [ ...action.payload ]
              }
       case '[Cart] - Change cart quantity':
          return {
               ...state,
               cart: state.cart.map( product => {
                  if( product._id !== action.payload._id ) return product;

                  return action.payload;
               })
              }
       case '[Cart] - Remove product in cart':
          return {
               ...state,
               cart: state.cart.filter( product => {
                if( product._id !== action.payload._id ) return product;
               })
              }
       case '[Cart] - Order complete':
          return {
               ...state,
               cart: [],
               numberOfItems: 0,
               subTotal: 0,
               total: 0
              }

      case '[Cart] - Update order smmary':
         return {
            ...state,
            ...action.payload
         }

       default:
         return state;
    }
}