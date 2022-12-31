import type { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'process';

type Data = 
| { message: string }
| { user: {
    name: string,
    password: string,
    role: string

} }

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method ) {
        case 'POST':
            return loginUser( req, res );
            
        default:
            res.status(400).json({
                message: 'Bad request'
            })
    }

}

const loginUser = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { name = '', password = '' } = req.body;
    const role = 'admin'
    const userValidated = false;

    if( name !== process.env.NAME_ADMIN && password !== process.env.PASSWORD_ADMIN ){
        return res.status(400).json({ message: 'Correo o contraseña no válidos - EMAIL' })
    }

    return res.status(200).json({
        user: {
            name, password, role
        }
    })

}
