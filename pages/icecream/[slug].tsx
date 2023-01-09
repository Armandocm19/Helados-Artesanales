import { useState, useContext } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { Grid, Typography, Button } from "@mui/material";

import { ICartIcecream, IIcecream } from "../../interfaces";
import { ShopLayout } from '../../components/layout/Layout';
import Image from "next/image";
import { db, dbIcecream } from "../../database";
import { ItemCounter, FullScreenLoading } from "../../components/ui";
import { CartContext } from '../../context';

interface Props {
    icecreams: IIcecream
}

const IcecreamPage: NextPage<Props> = ({ icecreams }) => {

    const { addProductToCart, updatedCartQuantity, isLoaded } = useContext(CartContext);
    const [tempCartIcecream, settempCartIcecream] = useState<ICartIcecream>({
        _id: icecreams._id,
        name: icecreams.name,
        price: icecreams.price,
        slug: icecreams.slug,
        image: icecreams.images,
        stock: icecreams.inStock,
        quantity: 1
    })

    const [ItemCounteValue, setItemCounteValue] = useState(0)

    const updatedQuantity = ( value: number ) => {
        setItemCounteValue(value)
    }

    const addProuctCart = ( value: number, stock: string ) => {
        tempCartIcecream.quantity = value;
        updatedCartQuantity(tempCartIcecream);
        addProductToCart(tempCartIcecream)
    }

    return (
        <ShopLayout title={ icecreams.name } pageDescription={ `Helado cremoso sabor ${icecreams.name}` }>

             <Grid container spacing={3} sx={{ mt: 15 }} height='auto' className='containers'>
            
                 <Grid item xs={12} sm={6} className='container-grid-img'>
                    {
                        isLoaded ? (
                            <Image src={icecreams.images} width={600} height={650} alt={icecreams.name} />
                        )
                        : (
                            <FullScreenLoading />
                        )

                    }
                 </Grid>
            
                 <Grid item xs={12} sm={6} className='container-form-icecream' display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
                     <Typography variant="h1">Helado sabor: {icecreams.name}</Typography>
            
                     <Typography variant="h5" fontWeight={700} sx={{ display: 'flex', justifyContent: 'center', mt: 5, fontSize: 35, color: 'rgb(34, 75, 130)' }}>Indique cuántos desea:</Typography>
                     <ItemCounter currentValue={ItemCounteValue} maxValue={icecreams.inStock} updatedQuantity={ (value : number) => updatedQuantity(value) } />
                     <Typography color='error'>
                            { ItemCounteValue === icecreams.inStock && `Solo tenemos ${icecreams.inStock} disponible en este momento`}
                     </Typography>
                     <Button onClick={ () => addProuctCart(ItemCounteValue, icecreams.slug) } variant="outlined" sx={{ width: '50%', mt: 3 }}>Agregar al carrito</Button>
                 </Grid>
            
             </Grid>

        </ShopLayout>
    )

}

export const getStaticPaths: GetStaticPaths = async (ctx) => {


    const icecreamsSlug = await dbIcecream.getAllIcecreamsSlug();

    return {
        paths: icecreamsSlug.map( ({slug}) => ({
            params: {slug}
        }) ),
        fallback: 'blocking'
    }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { slug = '' } = params as { slug: string }
    await db.connect();
    const icecreams = await dbIcecream.getByIcecreamBySlug(slug);
    await db.disconnect();

    if( !icecreams ){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            icecreams
        },
        revalidate: 10, //86400
    }

}

export default IcecreamPage;