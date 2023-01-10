import { Typography, Box } from '@mui/material';
import { GetServerSideProps, NextPage } from "next";
import { ShopLayout } from "../../components/layout";
import { db, dbIcecream } from '../../database';
import { IIcecream } from "../../interfaces"
import { IcecreamList } from '../../components/sections/Icecreams';


interface Props {
    icecreams: IIcecream[];
    foundIcecreams: boolean;
    query: string;
}

const SearchPage: NextPage<Props> = ({ icecreams, foundIcecreams, query }) => {

    return (
        <ShopLayout title={'Helados Artesanales - Tienda'} pageDescription={'Encuentra los mejores helados artesanales aqui'}>
            <Box sx={{ mt: 15 }} height='auto' className='containers'>
                <Typography variant='h1' component='h1' color='rgb(34, 75, 130)' >Buscar producto</Typography> 
                
                {
                    foundIcecreams
                    ? <Typography variant='h2' sx={{ mb: 1, mt: 1}} color='white' textTransform='capitalize'>Resultado de búsqueda de: <strong style={{ color: 'rgb(34, 75, 130)' }}>{ query }</strong></Typography>
                    : (
                        <>
                            <Box display='flex' sx={{ mt: 2 }}>
                                <Typography variant='h2' sx={{ mb: 1 }} color='white'>
                                    No encontramos ningún producto relacionado con: <strong style={{ color: 'rgb(34, 75, 130)' }}>{ query }</strong> 
                                </Typography>
                            </Box>
                            <Typography variant='h1' component='h1' sx={{ mt: 5, color: 'rgb(34, 75, 130)' }} >Helados que te pueden interesar: </Typography>
                        </>
                    )
                }
                
                <IcecreamList icecreams={icecreams} />
            </Box>

        </ShopLayout>
    )

}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const {query = ''} = params as { query : string };

    if( query.length === 0 ){
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
            }
    }
    await db.connect();

    let icecreams = await dbIcecream.getIcecreamByTerm(query);
    let foundIcecreams = icecreams.length > 0

    if( !foundIcecreams ){
        icecreams = await dbIcecream.getIcecreamByTerm('crema');
    }

    await db.disconnect();

    return {

        props: {
            icecreams,
            foundIcecreams,
            query
        }

    }

}

export default SearchPage