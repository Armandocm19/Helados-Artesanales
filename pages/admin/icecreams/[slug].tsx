import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from 'next';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import Swal from "sweetalert2";

import heladosApi from "../../../api/heladosApi";
import { IIcecream } from "../../../interfaces";
import { ShopLayout } from "../../../components/layout";
import { Icecream } from "../../../models";
import { dbIcecream } from "../../../database";

interface formData {
    _id: string,
    name: string,
    price: number,
    inStock: number,
    slug: string,
    tags: string[],
    images: string,
}

interface Props {
    slug: string,
    icecream: IIcecream
}

const IcecreamAdminPage: FC<Props> = ({ icecream, slug }) => {
    
    const router = useRouter();
    const [newTagValue, setNewTagValue] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSaving, setIsSaving] = useState(false)
    
    const { register, handleSubmit, formState:{ errors }, getValues, setValue, control, watch } = useForm<formData>({
        //getValues nos devuelve lo que generó el form
        //watch nos permite oberservar los cambios ya sea en un input o un formulario como tal
        defaultValues: icecream
    })

    useEffect(() => {
        const subscription = watch(( value, { name, type } )  => {
            if( name === 'name' ) {
                let newSlug = 'helado_sabor_';
                
                newSlug = newSlug.concat(
                 value.name?.trim()
                .replaceAll(' ', '_')
                .replaceAll("'", '')
                .toLocaleLowerCase() || ''
                );

                setValue('slug', newSlug)
            }
        } )
    
      return () => subscription.unsubscribe(); //Utilizaremos este return para destruir el watch, ya que el siempre está escuchando aunque nos salgamos de la pantalla
        
    }, [watch, setValue]) //El watch hay ponerlo como dependencia aunque no cambie

    const onNewTag = () => {
        const newTag = newTagValue.trim().toLocaleLowerCase();
        setNewTagValue('');
        const tagsValue = getValues('tags');

        if( newTag === '' || tagsValue.includes(newTag) ){
            return;
        }

        setValue('tags', [ ...tagsValue, newTag ])

    }

    const onDeleteTag = ( tag: string ) => {
        const updatedTags = getValues('tags').filter( (val) => val !== tag );
        setValue('tags', updatedTags, { shouldValidate: true });
    }

    const onFileSelected = async ({ target }: ChangeEvent<HTMLInputElement> ) => {
        console.log(getValues('images'))
        if( !target.files || target.files.length === 0 ){
            return;
        }


        try {

            for( const file of target.files ) {
                 const formData = new FormData();
                 formData.append('file', file);
                 const { data } = await heladosApi.post<{ message: string }>('/admin/upload', formData);
                 setValue( 'images', data.message, { shouldValidate: true } )
            }

        } catch (error) {
            console.log(error)
        }

    }

    const onDeleteImage = ( image: string ) => {
         setValue( 
            'images', getValues('images') !== image ? getValues('images') : undefined ,
            { shouldValidate: true }
          );
    }

    const onDeleteProduct = async ( id: string, imagenes: string ) => {

        const dataProduct = {
            id,
            images: imagenes
        }

        try {
            
            const { data } = await heladosApi({
                url: '/admin/products',
                method: 'DELETE',
                data: dataProduct,
            })
    
            router.replace('/admin/products');
    
        } catch (error) {
            console.log(error)
        }

    }


    const onSubmit = async ( form: formData ) => {
        
        if( !form.images ) return alert('Debe subir una imagen del producto');
        setIsSaving(true);

        try {
            const { data } = await heladosApi({
                url: '/admin/products',
                method: form._id ? 'PUT' : 'POST', // si tenemos un _id entonces actualizar, si no crear
                data: form
            })

            // console.log(form._id);

            if( form._id === undefined ) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto almacenado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                  })
                router.replace(`/admin/icecreams/${ form.slug }`);
                setIsSaving(false);
            }else{
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto actualizado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                  })
                setIsSaving(false);
            }

        } catch (error) {
            console.log(error)
            setIsSaving(false);
        }

    }

    const windowsDeleteConfirmation = ( id: string, images: string ) => {
        Swal.fire({
            title: '¿Estás seguro/a de eliminar este producto?',
            text: "¡Después de confirmar no habrá vuelta atrás!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, bórralo!',
            cancelButtonText: ' Cencelar'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                '¡Eliminado!',
                'Este producto ha sido eliminado.',
                'success'
              )
              onDeleteProduct( id, images );
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto eliminado correctamente',
                showConfirmButton: false,
                timer: 1500
              })
            }
          })
    }


    return (
        <ShopLayout 
            title={'Producto'} 
            // icon={ <DriveFileRenameOutline /> }
            pageDescription={'Página de mantenimiento de productos'}
        >
            <form onSubmit={ handleSubmit( onSubmit ) } >
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px', mr: 2 }}
                        type="submit"
                        disabled={ isSaving }
                    >
                        Guardar
                    </Button>

                    {
                        slug !== 'new' && (
                            <Button 
                                color="error"
                                startIcon={ <SaveOutlined /> }
                                sx={{ width: '150px', mr: 2 }}
                                type="button"
                                onClick={ () => windowsDeleteConfirmation( icecream._id, icecream.images ) }
                                disabled={ isSaving }
                             >
                                 Eliminar
                            </Button>
                        )
                    }

                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Título"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('name', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.name }
                            helperText={ errors.name?.message }
                        />

                        <TextField
                            label="Inventario"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor 0' }
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />
                        
                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('price', {
                                required: 'Este campo es requerido',
                                min: { value: 0, message: 'Mínimo de valor 0' }
                            })}
                            error={ !!errors.price }
                            helperText={ errors.price?.message }
                        />

                        <Divider sx={{ my: 1 }} />

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                                required: 'Este campo es requerido',
                                validate: (val) => val.trim().includes(' ') ? 'No puede tener espacio en blanco' : undefined
                            })}
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />

                        <TextField
                            label="Etiquetas"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            helperText="Presiona [spacebar] para agregar"
                            value={ newTagValue }
                            onChange={ ({ target }) => setNewTagValue(target.value) }
                            onKeyUp={ ({ code }) => code === 'Space' ? onNewTag() : undefined }
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tags').map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                disabled= { getValues('images') ? true : false }
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                                onClick={ () => fileInputRef.current?.click() }
                            >
                                Cargar imagen
                            </Button>

                            <input
                            ref={ fileInputRef }
                                type='file'
                                multiple
                                accept='image/png, image/gif, image/jpg'
                                style={{ display: 'none' }}
                                onChange={ onFileSelected }
                             />

                            <Chip 
                                label="Es necesario 1 imagen"
                                color='error'
                                variant='outlined'
                                sx={{ display: !getValues('images') ? 'flex' : 'none' }}
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('images') && (
                                        <Grid item xs={4} sm={3} key={getValues('images')}>
                                            <Card
                                                sx={{ background: 'transparent' }}
                                            >
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ getValues('images') }
                                                    alt={ getValues('images') }
                                                />
                                                <CardActions>
                                                    <Button 
                                                        fullWidth 
                                                        color="error"
                                                        onClick={ () => onDeleteImage(getValues('images')) }
                                                    >
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    )
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    const { slug = '' } = query;

    let icecream: IIcecream | null;

    if( slug === 'new' ) {
        const tempIcecream = JSON.parse( JSON.stringify( new Icecream() ) );
        delete tempIcecream._id; //Elimino el id por defecto que se crea en el nuevo producto
        icecream = tempIcecream;
    }else{
        icecream = await dbIcecream.getByIcecreamBySlug( slug.toString() );
    }

    if ( !icecream ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }

    return {
        props: {
            icecream,
            slug
        }
    }

}

export default IcecreamAdminPage;