import { FC, useContext } from 'react';
import NextLink from 'next/link'
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';

import { ItemCounter } from '../../ui';
import { CartContext } from '../../../context/cart/CartContext';
import { ICartIcecream, IOrderIcecream } from '../../../interfaces';
import Cookie from 'js-cookie';

interface Props {
    editable?: boolean;
    products?: IOrderIcecream[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {

    const { cart, updatedCartQuantity, removeCartIcecream } = useContext(CartContext);

    const onNewCartQuantityValue = ( product: ICartIcecream, newQuantityValue: number ) => {
        product.quantity = newQuantityValue;
        updatedCartQuantity( product );
    }

    const productsToShow = products ? products : cart;

    // console.log(products.forEach(item => {
    //     console.log(item.quantity)
    // }))

    return (
        <>
        
        {
            productsToShow.map( product => (
                //Agrego en la key "+ size" ya que react se queja de cuando agregamos al carritos un producto con el mismo slug pero diferente talla
                <Grid container spacing={2} key={ product.slug + product.name } sx={{ mb: 1, mt: 1 }} > 
                    <Grid item xs={ 3 }>
                        <NextLink href={`/product/${ product.slug }`} passHref>
                            <Link>
                                <CardActionArea>
                                    <CardMedia 
                                        image={ products ? product.images : product.image } 
                                        component='img'
                                        sx={{ borderRadius: '5px' }}
                                    />
                                </CardActionArea>
                            </Link>
                        </NextLink>
                    </Grid> 

                    <Grid item xs={ 5 }>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1' sx={{ color: 'white' }}>Helado sabor { product.name }</Typography>

                            {
                                editable
                                ?  (
                                    <ItemCounter currentValue={ product.quantity } 
                                    maxValue={10} 
                                    updatedQuantity={( newValue ) => { onNewCartQuantityValue( product as ICartIcecream, newValue ) }} />
                                )
                                : (
                                    <Typography variant='h6' sx={{ color: 'white' }}>{ product.quantity } { product.quantity > 1 ? 'helados' : 'helado' }</Typography>
                                )
                            }
                           
                        </Box>
                    </Grid>

                    <Grid item xs={ 4 } display='flex' alignItems='center' flexDirection='column'>
                        <Typography variant='subtitle1' sx={{ color: 'white' }}>{ `$${ product.price }` }</Typography>
                        {
                             editable && (
                                <Button 
                                variant='text' 
                                color='secondary'
                                onClick={ () => removeCartIcecream(product as ICartIcecream) }
                                className='btn-remover-card'
                                >
                                Remover
                                </Button>
                             )

                        }

                    </Grid>
                </Grid>
             ))
        }
        
        </>
    )

}
