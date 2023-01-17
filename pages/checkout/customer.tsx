import { NextPage } from "next";

import { Typography, Box } from '@mui/material';

import { FormCustomerLayout } from "../../components/layout";
import { FormCustomer } from '../../components/sections/CustomerInformation/FormCustomer';



const CustomerInformationPage: NextPage = () => {

    return (
        <FormCustomerLayout title="Información del cliente" pageDescription="Aqui el cliente colocará su información para el pedido">

            <Box sx={{ mt: 15 }} height='100%' className='containers cardForm-container'>
                <Typography width='100%' variant="h1" component='h1' sx={{ display: 'flex', justifyContent: 'center', color: 'white', pt: 10, fontSize: 45 }}>Información para el pedido</Typography>  

                <FormCustomer />   
            </Box>

        </FormCustomerLayout>
    )

}

export default CustomerInformationPage