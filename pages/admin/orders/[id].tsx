import { GetServerSideProps, NextPage } from 'next';

import { Card, CardContent, Grid, Typography, Divider, Box, Chip } from '@mui/material';

import { CartList, OrderSummary } from '../../../components/sections/cart';
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';
import { ShopLayout } from '../../../components/layout';


interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  return (
    <ShopLayout title='Resumen de la orden' pageDescription={`Orden ID: ${ order._id }`}>
    
        <Grid container className='fadeIn'>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList products={ order.orderIcecreams } />
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({ order.numberOfItems } { order.numberOfItems >1 ? 'productos' : 'producto' } )</Typography>
                        <Divider sx={{ my: 1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Datos del pedido</Typography>
                        </Box>

                        <Typography>Nombre: <strong>{ order.nameCustomer }</strong></Typography>
                        <Typography>Apellido: <strong>{ order.lastnameCustomer }</strong></Typography>
                        <Typography>Total: <strong>{'₡ '+order.total}</strong> </Typography>

                        <Divider sx={{ my: 1 }} />              

                        <OrderSummary 
                            orderValues={{ 
                                numberOfItems: order.numberOfItems,
                                total: order.total,
                             }}
                         />

                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { id= '' } = query;
    const order = await dbOrders.getOrderById( id.toString() );

    if( !order ){ // Verificamos que la orden sea de esa persona
        return{
            redirect: {
                destination: `/admin/orders`,
                permanent: false,
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage