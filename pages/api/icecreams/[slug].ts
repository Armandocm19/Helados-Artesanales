
import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../database';
import { IIcecream } from '../../../interfaces'
import { Icecream } from '../../../models';

type Data =
| { message: string }
| IIcecream

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ){
        case 'GET': getIcecreamBySlug( req, res );

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }

}

const getIcecreamBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { slug = '' } = req.body;

    try {
        
        db.connect();
        const icecreamBySlug = await Icecream.findOne({ slug }).lean();
        db.disconnect();

        if( !icecreamBySlug ) return res.status(400).json({ message: "No se ha encontrado un producto con el Slug: " + slug });

        return res.status(200).json( icecreamBySlug );

    } catch (error) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({
            message: error.message || 'Revise log del servidor'
        })
    }

}
