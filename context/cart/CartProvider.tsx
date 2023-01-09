import { FC, useReducer, useEffect, useState } from 'react';

import Cookie from 'js-cookie'
import axios from 'axios';

import { ICartIcecream, IOrder } from '../../interfaces';
import {  CartContext,  cartReducer } from './'
import heladosApi from '../../api/heladosApi';
import { dbIcecream } from '../../database';

export interface CartState {
    isLoaded: boolean;
    cart: ICartIcecream[];
    numberOfItems: number;
    subTotal: number;
    total: number;
    stockInDB: number[];
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

var initialized = false;

const  Cart_INITIAL_STATE:  CartState = {
    isLoaded: false,
    cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
    numberOfItems: 0,
    subTotal: 0,
    total: 0,
    stockInDB: [],
}

type DataInfoCustomer = {
    name : string,
    lastname : string
}

export const CartProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( cartReducer,  Cart_INITIAL_STATE);
    const [ infoCustomer, setInfoCustomer ] = useState<DataInfoCustomer>();

    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
            initialized = true;
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }
          
      }, [])

      useEffect(() => {
        if ( initialized === true ) { //Necesario para evitar que se le setee un array vacío a la cookie
          Cookie.set('cart', JSON.stringify( state.cart ))
        }
  }, [state.cart]);

    useEffect(() => {

        const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev, 0);
        const subTotal = state.cart.reduce( ( prev, current ) => (current.price * current.quantity) + prev, 0);
        
        const orderSummary = {
            numberOfItems,
            subTotal,
            total: subTotal
        }
        
        dispatch({ type: '[Cart] - Update order smmary', payload: orderSummary })
    }, [state.cart]);

    useEffect(() => {
      
        if( Cookie.get('Name') ){

            const getInfoCustomer = {
                name     : Cookie.get('Name'),
                lastname : Cookie.get('LastName')
            }

            setInfoCustomer(getInfoCustomer);

        }

    }, [Cookie.get('Name')])
    

    const addProductToCart = async ( product: ICartIcecream ) => {

        const productInCart = state.cart.some( p => p._id === product._id ); //Devuelve si el producto existe en el carrito
        if ( !productInCart ) return dispatch({ type: '[Cart] - Update or add products in cart', payload: [ ...state.cart, product ] });

        //Acumular items en el contador del carrito

        const updatedProducts = state.cart.map( (p) => {

            if( p._id !== product._id ) return p;

            p.quantity += product.quantity;

            return p

        });

        dispatch({ type: '[Cart] - Update or add products in cart', payload: updatedProducts });

    }
    
    const updatedCartQuantity = ( product: ICartIcecream ) => {
    
        dispatch({ type: '[Cart] - Change cart quantity', payload: product });

    }
    
    const removeCartIcecream = ( product: ICartIcecream ) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product });
    }
    
    const createOrder =  async ():Promise<{ hasError: boolean; message: string; }> => {

        if( !infoCustomer.name ) {
            throw new Error('No hay dirección información del cliente');
        }

        const body: IOrder = {
            nameCustomer: infoCustomer.name,
            lastnameCustomer: infoCustomer.lastname,
            orderIcecreams: state.cart.map( p => ({
                ...p,
                images: p.image!,
                quantity: p.quantity!
            })),
            numberOfItems: state.numberOfItems,
            total: state.total
        };
        
        try {

            const { data } = await heladosApi.post<IOrder>('/orders', body);

            dispatch({ type: '[Cart] - Order complete' });
            Cookie.remove('Name');
            Cookie.remove('LastName');
            return {
                hasError: false,
                message: data._id!
            }
            
        } catch (error) {
            if( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: 'Error del servidor'
                }
            }
            return {
                hasError: true,
                message: 'Error no controlado, hable con el administrador'
            }
        }

    }

    const cancelOrder =  async ( id: string ):Promise<{ hasError: boolean; message: string; }> => {
        
        const config = {
            data: {
                id
            }
        }
        
        try {

            await heladosApi.delete<IOrder>('/orders', config);

            return {
                hasError: false,
                message: 'La orden ha sido cancelada correctamente',
            }
            
        } catch (error) {
            if( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: 'Error del servidor'
                }
            }
            return {
                hasError: true,
                message: 'Error no controlado, hable con el administrador'
            }
        }
    }

    return (
       < CartContext.Provider value={{
           ...state,

           addProductToCart,
           updatedCartQuantity,
           removeCartIcecream,
           createOrder,
           cancelOrder,
           //getArrayStockDB
      }}>
          { children }
        </ CartContext.Provider>
    )
}