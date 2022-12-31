
import type { NextApiRequest, NextApiResponse } from 'next'

import { IOrder } from '../../../interfaces'
import { Icecream, Order } from '../../../models';
import { db, dbIcecream, dbOrders } from '../../../database';

type Data = 
  |  { message: string }
  | IOrder


export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {

        case 'POST' :
            return createOrder( req, res );

        case 'DELETE' :
            return deleteOrder( req, res );

        default: return res.status(400).json({ message : 'BAD REQUEST' })

    }

}

const createOrder = async ( req: NextApiRequest, res: NextApiResponse ) => {
    
    const { orderIcecreams, total } = req.body as IOrder;

    const icecreamsId = await orderIcecreams.map( p => p._id );

    await db.connect();

    const dbIcecreams = await Icecream.find({ _id: { $in: icecreamsId } }); //Esto me va a generar un arreglo con todos los productos que tengo
    //en mi base de datos que coinciden con los productos que la persona lleva
    if(!dbIcecreams){
        throw new Error('No hay productos en la base de datos que coincidan con los productos del cliente');
    }

    try {
   
    const backendTotal = orderIcecreams.reduce(( prev, current ) => {
        const currentPrice = dbIcecreams.find( prod => prod.id === current._id )!.price;
        if( !currentPrice ) {
            throw new Error('Verifique el carrito de nuevo, producto no existe'); 
        }
        return (currentPrice * current.quantity!) + prev
    }, 0)

    if( total !== backendTotal ) {
        throw new Error('El total del backend no cuadra con el monto del cliente');
    }

    const newOrder = new Order({ ...req.body });
    newOrder.total = Math.round( newOrder.total * 100 ) / 100; //Dejo a solo 2 decimales el total de la orden

    await dbIcecream.changeQuantityProduct(orderIcecreams, false);

    await newOrder.save();

    return res.status(201).json( newOrder );
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message || 'Revise log del servidor'
        })
        throw error;
    }finally{
        await db.disconnect(); 
        return res.status(201).json( req.body );
    }

}

const deleteOrder = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const { id } = req.body;
    
    const order = await dbOrders.getOrderById(id)
    if(!order){
        throw new Error('Esta orden no se encuentra en la base de datos');
    }
    const { orderIcecreams } = order;

    await db.connect();
    try {
        await dbIcecream.changeQuantityProduct(orderIcecreams, true);
        await Order.deleteOne( { _id: id } );

        return res.status(200).json( `LA ORDEN CON EL ID ${ id } HA SIDO ELIMINADO CON ÉXITO` )

    } catch (error) {

        console.log(error);
        res.status(400).json({
            message: error.message || 'Revise log del servidor'
        });

        throw error;

    }

}

