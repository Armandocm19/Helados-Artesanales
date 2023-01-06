import { useContext, useState, useEffect } from 'react';
import NextLink from 'next/link';
import { NextPage } from "next";
import { useRouter } from 'next/router';

import { Typography, Grid, CardContent, Divider, Box, Link, Button, Chip, Card } from '@mui/material';
import Cookie from 'js-cookie'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2';

import { ShopLayout } from "../../components/layout";
import { CartList, OrderSummary } from '../../components/sections/cart';
import { CartContext } from '../../context/cart/CartContext';
import { FullScreenLoading } from '../../components/ui';


type DataInfoCustomer = {
    name : string,
    lastname : string
}

const SummaryPage: NextPage = () => {

    const router = useRouter();
    const { numberOfItems, createOrder, isLoaded, cart, total } = useContext( CartContext );

    const [ infoCustomer, setInfoCustomer ] = useState<DataInfoCustomer>({
        name: '',
        lastname: ''
    });
    
    const [ isPosting, setIsPosting ] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
      
        const getInfoCustomer = {
            name: Cookie.get('Name'),
            lastname: Cookie.get('LastName')
        }
        setInfoCustomer(getInfoCustomer)
    }, [])

    const onCreateOrder = () => {

        Swal.fire({
            title: '¿Estás seguro/a?',
            text: "Estás apunto de confirmar el pedido. Por favor asegurarte de que el pedido sea el correcto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro/a',
            cancelButtonText: 'Cancelar'
          }).then( async (result) => {
            if (result.isConfirmed) {
                setIsPosting(true);

                let listIcecreams : string;

                listIcecreams += cart.map( (icecream) => { //Hago una concatenacion de string's para la informacion del email
                    let listOrder = `${icecream.quantity} de ${icecream.name}\n`.toString();
                    return listOrder;
                } );

                emailjs.send('service_z95naj4', 'template_6hhcly8', {
                    name: infoCustomer.name,
                    lastname: infoCustomer.lastname,
                    message: 'Nuevo pedido de: ' + numberOfItems.toString() + ' helados',
                    helados: listIcecreams.slice(9, listIcecreams.length) ,
                    total
                }, '1PbewP3nsEHNkgYL5');

                const { hasError, message } = await createOrder(); 
                
                if ( hasError ) {
                    setIsPosting(false);
                    setErrorMessage( message );
                    return;
                }
              Swal.fire(
                '¡Enviado!',
                'Su pedido ha sido registrado con éxito. <br> <strong>Retire su pedido indicando el nombre con el que registró el mismo 😉</strong>',
                'success'
              )

              router.replace('/')
            }
          })

    }

    if ( infoCustomer.name === '' || infoCustomer.lastname === '' ) {
        return (
            <ShopLayout title='Carrito - Helados' pageDescription='Carrito de compras de la tienda'>
                <Box sx={{ mt: 15 }} height='calc(100vh - 200px)' className='containers'>
                    <FullScreenLoading />
                </Box>
            </ShopLayout>
        );
    }

    return (
        <ShopLayout title='Resumen de orden' pageDescription={'Resumen de la orden'}>

            <Box sx={{ mt: 15 }} height='auto' className='containers'>

                <Typography variant='h1' component='h1' color='rgb(34, 75, 130)'>Resumen de la orden</Typography>

                <Grid container>
                    <Grid item xs={ 12 } sm={ 7 }>
                        {
                            isLoaded ? 
                            (
                                <CartList />
                            )
                            :
                            (
                                <FullScreenLoading />
                            )
                        }
                    </Grid>
                    <Grid item xs={ 12 } sm={ 5 }>
                        <Card className='summary-card'>
                            <CardContent>
                                <Typography variant='h2'>Resumen ({ numberOfItems } { numberOfItems === 1 ? 'Helado' : 'Helados' } )</Typography>
                                <Divider sx={{ my: 1 }} />

                                <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1'>Su información</Typography>
                                    <NextLink href='/checkout/customer' passHref>
                                        <Link underline='always'>
                                            Editar
                                        </Link>
                                    </NextLink>
                                </Box>

                                    <Typography>Nombre: <strong>{ infoCustomer.name }</strong></Typography>
                                    <Typography>Apellido: <strong>{ infoCustomer.lastname }</strong></Typography>

                                <Divider sx={{ my: 1 }} />    

                                <Box display='flex' justifyContent='end'>
                                    <NextLink href='/cart' passHref>
                                        <Link underline='always'>
                                            Editar
                                        </Link>
                                    </NextLink>
                                </Box>                  

                                <OrderSummary />

                                <Box sx={{ mt: 3 }} display='flex' flexDirection='column'>
                                    <Button 
                                        color='secondary' 
                                        className='circular-btn' 
                                        fullWidth
                                        onClick={ onCreateOrder }
                                        disabled={ isPosting }
                                        >
                                        Confirmar orden
                                    </Button>

                                    <Chip
                                    color='error'
                                    label={ errorMessage }
                                    sx={{ display: errorMessage ? 'flex' : 'none', mt: 2 }}
                                    />

                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

        </ShopLayout>
    )

}

export default SummaryPage