import { createContext } from 'react';
import { ICartIcecream } from '../../interfaces';
import { IOrder } from '../../interfaces/order';

interface ContextProps {
    isLoaded: boolean;
    cart: ICartIcecream[]
    numberOfItems: number;
    subTotal: number;
    total: number;

    //Methods
    addProductToCart: (icecream: ICartIcecream) => void;
    updatedCartQuantity: (icecream: ICartIcecream) => void;
    removeCartIcecream: (icecream: ICartIcecream) => void;
    createOrder: () => Promise<{ hasError: boolean; message: string }>;
    cancelOrder: (id: string) => Promise<{
        hasError: boolean;
        message: string;
    }>
}

export const CartContext = createContext({} as ContextProps)