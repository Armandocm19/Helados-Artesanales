import { Typography, Box } from '@mui/material';
import { GetServerSideProps, NextPage } from "next";
import { ShopLayout } from "../../components/layout";
import { dbIcecream } from '../../database';
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
            <Box sx={{ mt: 15 }} height='calc(100vh - 200px)' className='containers'>
                <Typography variant='h1' component='h1' color='rgb(34, 75, 130)' >Buscar producto</Typography> 
                
                {
                    foundIcecreams
                    ? <Typography variant='h2' sx={{ mb: 1, mt: 1}} color='white' textTransform='capitalize'>Resultado de búsqueda de: <strong style={{ color: 'rgb(34, 75, 130)' }}>{ query }</strong></Typography>
                    : (
                        <Box display='flex'>
                            <Typography variant='h2' sx={{ mb: 1 }} color='white'>No encontramos ningún producto relacionado con:</Typography>
                            <Typography variant='h2' sx={{ ml: 1 }} color="primary" textTransform='capitalize'><strong>{ query }</strong></Typography>
                        </Box>
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

    let icecreams = await dbIcecream.getIcecreamByTerm(query);
    let foundIcecreams = icecreams.length > 0

    if( !foundIcecreams ){
        icecreams = await dbIcecream.getIcecreamByTerm('crema');
    }

    return {

        props: {
            icecreams,
            foundIcecreams,
            query
        }

    }

}

export default SearchPage