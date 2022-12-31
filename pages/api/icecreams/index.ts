import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IIcecream } from '../../../interfaces'
import Icecream from '../../../models/Icecream';

type Data = 
| { message: string}
| IIcecream[]


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return getIcecreams( req, res )

        default:
            return res.status(400).json({ message: 'Bad request' })
    }

}

const getIcecreams = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { price = 'All' } = req.query;

    let condition = {};

    if ( price !== 'All' ){
        condition = { price };
    }
    
    await db.connect();

    const icecreams = await Icecream.find(condition)
                                    .select('name images price inStock slug -_id') //indico qué datos de la informacion quiero, y resto el "_id"
                                    .lean();

    await db.disconnect();

    return res.status(200).json( icecreams );

}
