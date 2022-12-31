import NextLink from 'next/link'
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';

import { ShopLayout } from "../../components/layout"
import { IIcecream } from '../../interfaces'

const columns:GridColDef[] = [
    { 
        field: 'img', headerName: 'Imagen',
        renderCell: ( { row }: GridValueGetterParams ) =>{
            return (
                <a href={`/icecream/${ row.slug }`} target="_blank" rel="noreferrer" >
                    <CardMedia 
                        component='img'
                        alt={` ${row.title} `}
                        className='fadeIn'
                        image={ row.img }
                    />
                </a>
            )
        }
    }, //Quitamos el witdh para que eso lo determine la imagen
    { 
        field: 'name', headerName: 'Título', width: 300,
         renderCell:( { row }: GridValueGetterParams ) => {
            return (
                <NextLink href={`/admin/icecreams/${ row.slug }`} passHref>
                    <Link underline='always' sx={{ fontWeight: '500 !important' }}>
                        { row.name }
                    </Link>
                </NextLink>
            )
         }
    },
    { field: 'inStock', headerName: 'Inventario' },
    { field: 'price', headerName: 'Precio' },

]

const ProductsPage = () => {
    const { data } = useSWR<IIcecream[]>('/api/admin/products');

    if( !data ) return (<></>);

    const rows = data.map( icecream => ({
        id: icecream._id,
        slug: icecream.slug,
        img: icecream.images,
        name: icecream.name,
        inStock: icecream.inStock,
        price: icecream.price,
    }) )

    return (
        <ShopLayout title={`Productos ${data!.length}`} pageDescription='Manteniminetos de Productos'>
            <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
            <Button
                startIcon={ <AddOutlined /> }
                color='secondary'
                href="/admin/icecreams/new"
            >
                Crear producto
            </Button>
        </Box>

        <Grid container className='fadeIn container-table' sx={{ mt: 2}}>
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid 
                        sx={{ color: 'white', textTransform: 'capitalize' }}
                        rows={ rows }
                        columns={ columns }
                        pageSize={ 10 }
                        rowsPerPageOptions={ [10] }
                    />
            </Grid>
        </Grid>
        </ShopLayout>
    )

}

export default ProductsPage;