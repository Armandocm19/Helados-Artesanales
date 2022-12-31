
import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary' // repositorio donde se subiran la imagenes

import { db } from '../../../database';
import { IIcecream } from '../../../interfaces'
import { Icecream } from '../../../models';

type Data = 
| { message: string }
| IIcecream[]
| IIcecream

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return getIcecreams(req, res)

        case 'PUT':
            return updatedIcecreams(res, req);

        case 'POST':
            return createIcecream(req, res);

        case 'DELETE':
            return deleteIcecream(req, res);
    
        default:
            res.status(400).json({ message: 'Bad request' })
    } 
}

const getIcecreams = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect();

    const Icecreams = await Icecream.find().sort({ title: 'asc' }).lean();
    await db.disconnect();

    res.status(200).json( Icecreams );

}

const updatedIcecreams = async (res: NextApiResponse<Data>, req: NextApiRequest) => {
    
    const { _id = '', images = '' } = req.body as IIcecream;

    if( !isValidObjectId( _id ) ) return res.status(400).json({ message: 'El ID del producto no es válido' });
    if( !images ) return res.status(400).json({ message: 'Es necesario una imagen' });

    try {
        
    await db.connect();
    const icecream = await Icecream.findById( _id );
    if( !icecream ) return res.status(400).json({ message: 'No existe un helado con ese ID' });

    if( images !== icecream.images ){
        const [ fileId ] = icecream.images.substring(  images.lastIndexOf('/') + 1 ).split('.'); //Buscamos la posición índice del último "/", sumamos 1 porque quiero eliminar también el "/";
        await cloudinary.uploader.destroy( fileId ); //Eliminamos la imagen del repositorio
    }

    await Icecream.findByIdAndUpdate( req.body._id, req.body );
    await db.disconnect();

    return res.status(200).json( icecream );

    } catch (error) {
        console.log(error)
        await db.disconnect();
        res.status(400).json({ message: 'Revisar la consola del servidor' });
    }

}

const createIcecream = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { images = '' } = req.body as IIcecream;

    if( !images ) return res.status(400).json({ message: 'Es necesario una imagen' });

    try {
        
        await db.connect();
        const icecreamInDB = await Icecream.findOne({ slug: req.body.slug });
        if( icecreamInDB ){
            await db.disconnect();
            return res.status(400).json({ message: 'El producto ya existe' });
        }

        const newIcecream = new Icecream( req.body )
        await newIcecream.save();
        await db.disconnect();

        res.status(201).json( newIcecream );

    } catch (error) {
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
        console.log(error);
    }

}

const deleteIcecream = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { id, images } = req.body;

    if( !isValidObjectId( id ) )  return res.status(400).json({ message: 'El ID del producto no es válido' });

    try {
        
        await db.connect();
        const icecream = await Icecream.findById( id );

        if( !icecream ) return res.status(400).json({ message: 'No existe un producto con ese ID' });

        if( images === icecream.images ) {
            const [ fileId ] = icecream.images.substring(  icecream.images.lastIndexOf('/') + 1 ).split('.'); //Buscamos la posición índice del último "/", sumamos 1 porque quiero eliminar también el "/"
            await cloudinary.uploader.destroy( fileId ); //Eliminamos la imagen del repositorio
        }

        await Icecream.findByIdAndDelete( id );
        await db.disconnect();

        return res.status(200).json({ message: 'El producto con el ID: '+ id + 'ha sido elimnado correctamente' });

    } catch (error) {
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
        console.log(error);
    }

}

