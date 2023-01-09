import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Card, CardContent, Grid, Typography, Divider, Box, Button } from '@mui/material';

import { ShopLayout } from '../../components/layout';
import { CartContext } from '../../context/cart/CartContext';
import { CartList, OrderSummary } from '../../components/sections/cart';
import { FullScreenLoading } from '../../components/ui';



const CartPage = () => {

    const { isLoaded, cart } = useContext(CartContext)
    const router = useRouter();

    useEffect(() => {
        if( isLoaded && cart.length === 0 ) {
            router.replace('/cart/empty')
        }
    }, [isLoaded, cart, router]);

    const onPushInformationPage = () => {
        router.push('/checkout/customer')
    }

    if ( !isLoaded  || cart.length === 0 ) { //Si no sabemos si se ha cargado entonces devolvemos un fragmento
        //Esto para evitar la milesimas de segundos donde se muestra la pagina del carrito y no la del carrito vacío
        //Evita que se renderize cualquier otra cosa en la pagina del cliente, se verá en blanco hasta que se cargue
        return (
            <ShopLayout title='Carrito - Helados' pageDescription='Carrito de compras de la tienda'>
                <Box sx={{ mt: 15 }} height='calc(100vh - 200px)' className='containers'>
                    <FullScreenLoading />
                </Box>
            </ShopLayout>
        );
    }

    return(
        <ShopLayout title='Carrito - Helados' pageDescription='Carrito de compras de la tienda'>

            <Box sx={{ mt: 15 }} height={ cart.length === 1 ? '50vh' : 'auto' } className='containers'>
                <Typography variant='h1' component='h1' color='rgb(34, 75, 130)'>Carrito</Typography>

                <Grid container>
                <Grid item xs={ 12 } sm={ 7 }>
                    <CartList editable />
                </Grid>
                <Grid item xs={ 12 } sm={ 5 }>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Orden</Typography>
                            <Divider sx={{ my: 1 }} />

                            <OrderSummary />

                            <Box sx={{ mt: 3 }}>
                                <Button 
                                    color='secondary' 
                                    className='circular-btn'
                                    onClick={ onPushInformationPage }
                                    fullWidth
                                >
                                    Verificar
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>    

        </ShopLayout>
    )

}

export default CartPage