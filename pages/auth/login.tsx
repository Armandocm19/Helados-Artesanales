import { useState, useContext } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link'
import { useRouter } from 'next/router';

import { Box, Button, Chip, Grid, Link, TextField, Typography, Divider } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layout/AuthLayout';
import { AuthContext } from '../../context/auth';

type FormData = {
    name: string,
    password: string,
  };

const LoginPage: NextPage = () => {

    const router = useRouter();
    const { loginUser } = useContext( AuthContext );
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const onLoginUser = async( { name, password }: FormData ) => {

        setShowError(false);

        const isValidLogin = await loginUser( name, password )

        if( !isValidLogin ){
            setShowError(true);
            setTimeout( () => { setShowError(false) }, 3000 )
            return;
        }

        router.replace('/')

    }

    return (
        <AuthLayout title='Ingresar'>
        <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
            <Box sx={{ width: 350, padding: '10px 20px' }}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12}>
                        <Typography variant='h1' component='h1'display='flex' justifyContent='center' > Iniciar sección </Typography>

                        <Chip 
                            label='No conocemos ese correo / contraseña'
                            color='error'
                            icon={ <ErrorOutline /> }
                            className='fadeIn'
                            sx={{ mt: 1, display: showError ? 'flex' : 'none' }}
                        />

                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            type='email' 
                            label='Correo' 
                            variant='filled' 
                            fullWidth
                            //Este codigo es la propagacion de ciertas propiedades que el register nos va a dar
                            { 
                                ...register('name', {
                                    required: 'Este campo es requerido',

                                }) 
                            }
                            //La doble negacion es para convertir el campo en un valor booleano
                            error={ !!errors.name }
                            helperText={ errors.name?.message }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField  
                            label='Contraseña' 
                            type='password' 
                            variant='filled' 
                            fullWidth
                            { 
                                ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 5, message: 'Mínimo 6 caracteres' }
                                }) 
                            }
                            error={ !!errors.password }
                            helperText={ errors.password?.message }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button 
                            color='secondary' 
                            className='circular-btn' 
                            size='large' 
                            type='submit'
                            fullWidth>
                            Ingresar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    </AuthLayout>
    )

}

export default LoginPage;