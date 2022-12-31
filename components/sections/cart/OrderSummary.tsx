import { Grid, Typography } from "@mui/material"
import { FC, useContext } from 'react';
import { CartContext } from '../../../context/cart/CartContext';

interface Props {
    orderValues?: {
        numberOfItems: number, 
        total: number, 
    }
}


export const OrderSummary: FC<Props> = ({ orderValues }) => {

    const { numberOfItems, subTotal, total } = useContext(CartContext);

    const summaryValues = orderValues ? orderValues : { numberOfItems, subTotal, total };

    return (
        <Grid container>

        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ summaryValues.numberOfItems } { summaryValues.numberOfItems > 1 ? 'helados' : 'helado' }</Typography>
        </Grid>

        <Grid item xs={6} sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Total:</Typography>
        </Grid>

        <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt: 2 }}>
            <Typography>{ '₡ ' + summaryValues.total } </Typography>
        </Grid>

    </Grid>
    );

}