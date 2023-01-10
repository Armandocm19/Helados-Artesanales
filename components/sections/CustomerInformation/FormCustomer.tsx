import { FC, useContext, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import Cookie from 'js-cookie'
import { TextField, Button } from '@mui/material';
import { CartContext } from '../../../context';
import { useRouter } from 'next/router';


type FormData = {
    name: string,
    lastname: string;

}

export const FormCustomer: FC = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const { push } = useRouter()
    const { cart } = useContext(CartContext)
    const infoCustomer = {
        name: Cookie.get('Name'),
        lastname: Cookie.get('LastName')
    }

    useEffect(() => {
      
        if( cart.length === 0 ){
            push('/cart')
        }

    })
    

    const onSaveForm = async({ name, lastname }: FormData) => {

        Cookie.set('Name', name);
        Cookie.set('LastName', lastname);

        push('/checkout/summary');

    }
    console.log(cart)

    return (
        <>
        
            <form
                onSubmit={ handleSubmit(onSaveForm) } 
                noValidate
                className='cardForm'>
                    
                <TextField 
                    id="standard-basic" 
                    label="Nombre" 
                    variant="standard" 
                    color='info'
                    value={infoCustomer.name}
                    sx={{ width: '80%', margin: '0 auto' }}
                    { 
                        ...register('name', {
                            required: 'Este campo es requerido',
                            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                        }) 
                    }
                    error={ !!errors.name }
                    helperText={ errors.name?.message }
                />

                <TextField 
                    id="standard-basic" 
                    label="Apellido" 
                    variant="standard" 
                    color='info' 
                    value={infoCustomer.lastname}
                    sx={{ width: '80%', margin: '0 auto', mt: 5 }}
                    { 
                        ...register('lastname', {
                            required: 'Este campo es requerido',
                            minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                        }) 
                    }
                    error={ !!errors.lastname }
                    helperText={ errors.lastname?.message }
                />

                <Button 
                    type='submit'
                    variant="contained" 
                    disableElevation
                    sx={{ width: '80%', margin: '0 auto', mt: 5 }}
                >
                    Guardar información
                </Button>

            </form>
        
        </>
    );

}