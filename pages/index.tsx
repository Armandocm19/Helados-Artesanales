import type { NextPage } from "next";

import { ShopLayout } from "../components/layout"
import { PageHome } from "../components/sections/Home";

const HomePage: NextPage = () => {

  return (
      <ShopLayout title={'Helados Artesanales(SM) - Home'} pageDescription={'Encuentra los mejores sabores de helados artesanales aqui'}>

        <PageHome />

      </ShopLayout>
  )
}

export default HomePage
