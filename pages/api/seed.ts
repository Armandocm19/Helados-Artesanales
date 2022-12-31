import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { db, seedData } from '../../database'
import Icecream from "../../models/Icecream";

type Data = {
    message: string
};

export default async function handler( req: NextRequest, res: NextApiResponse<Data> ) {
    
    if ( process.env.NODE_ENV === 'production' ) { //Averiguamos si estamos en produccion
        return res.status(401).json({ message: 'No tiene acceso a este servicio' })
    }

    await db.connect();

    await Icecream.deleteMany();
    await Icecream.insertMany( seedData.InitialData.Icecreams );

    await db.disconnect();

    return res.status(200).json({ message: 'Proceso realizado correctamente' });

}