import { ShopLayout } from '../components/layout/Layout';
import { Box, Typography } from '@mui/material';



export const Custom404 = () => {

    return (
        <ShopLayout title='Page not found' pageDescription='No hay nada que mostrar aqui' >
            <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 160px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
                <Typography variant='h1' component='h1' fontSize={75} fontWeight={200} color='white'>404 |</Typography>
                <Typography marginLeft={2} color='white'>Página no encontrada</Typography>
            </Box>
    </ShopLayout>
    )

}

export default Custom404;