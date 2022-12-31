import { IUser } from "./user";


export interface IOrder {
    _id? : string,
    user?: IUser,
    nameCustomer: string,
    lastnameCustomer: string,
    orderIcecreams: IOrderIcecream[],

    numberOfItems: number,
    total: number,

    createdAt?: string;
    updatedAt?: string;
}

export interface IOrderIcecream {
    _id: string,
    name: string,
    price: number,
    slug: string,
    images: string,
    quantity: number
}