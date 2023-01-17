import { NextPage } from "next";

import { Typography, Box } from '@mui/material';

import { FormCustomerLayout } from "../../components/layout";
import { FormCustomer } from '../../components/sections/CustomerInformation/FormCustomer';



const CustomerInformationPage: NextPage = () => {

    return (
        <FormCustomerLayout title="Información del cliente" pageDescription="Aqui el cliente colocará su información para el pedido">

            <Box sx={{ mt: 15 }} height='100vh' className='containers cardForm-container'>
                <FormCustomer />   
            </Box>

        </FormCustomerLayout>
    )

}

export default CustomerInformationPage