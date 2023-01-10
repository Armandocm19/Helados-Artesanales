import type { NextPage } from "next";

import { Box } from '@mui/material';

import { ShopLayout } from "../../components/layout"
import { PageHome } from "../../components/sections/Home";

const Price800Page: NextPage = () => {

    return (
      <ShopLayout title={'Helados Artesanales(SM) - Home'} pageDescription={'Encuentra los mejores sabores de helados artesanales aqui'} >

        <Box sx={{ mt: 15 }} height='auto' className='containers'>
          <PageHome />
        </Box>

      </ShopLayout>
    )

}

export default Price800Page;