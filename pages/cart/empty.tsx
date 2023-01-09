import NextLink from 'next/link'

import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { Box, Link, Typography } from "@mui/material"
import { ShopLayout } from '../../components/layout'


const EmptyPage = () => {
  return (
    <ShopLayout title="Carrito vacío" pageDescription="No hay articulos en el carrito">
        <Box
            display='flex'
            justifyContent='center' 
            alignItems='center' 
            height='100vh'
            sx={{ flexDirection: { xs: 'column', sm: 'row' }}}
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100, color: 'rgb(34, 75, 130)' }} />
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography color='rgb(34, 75, 130)'>Su carrito está vacío</Typography>
                <NextLink href='/' passHref>
                    <Link typography="h4" color='secondary'>
                        Regresar
                    </Link>
                </NextLink>
            </Box>
        </Box>
    </ShopLayout>
  )
}

export default EmptyPage