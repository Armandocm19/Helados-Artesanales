import { useEffect, useContext, useState } from 'react';
import { Box, Button, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import Swal from 'sweetalert2';

import { ShopLayout } from '../../components/layout'
import { IOrder } from '../../interfaces';
import { FullScreenLoading } from "../../components/ui";
import { CartContext } from '../../context/cart/CartContext';



const OrdersPage = () => {

    const { data } = useSWR<IOrder[]>('/api/admin/orders');

    const [dataOrders, setDataOrders] = useState<IOrder[]>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { cancelOrder } = useContext( CartContext )
    
    useEffect(() => {
        
        setDataOrders(data);
        
    }, [data, dataOrders])
    
    if( !dataOrders ) return (<></>);

    const onCancelOrder = async ( id: string ) => {

        Swal.fire({
            title: '¿Estás seguro/a?',
            text: "Estás apunto de cancelar el pedido.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, estoy seguro/a',
            cancelButtonText: 'Cancelar'
          }).then( async (result) => {
            if (result.isConfirmed) {

                
                setIsLoading(true);
                const { hasError, message } = await cancelOrder(id);

                if(!hasError){
                    Swal.fire(
                      '¡Listo!',
                      `${message}`,
                      'success'
                    )
                    
                    setTimeout(() => {
                        setDataOrders(data); //Hago de nuevo la consulta ya que se eliminó una orden y necesito refrescar la información
                        setIsLoading(false);
                        window.location.reload();
                        return;
                    }, 2000)    

                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${message}`,
                    })
                    setIsLoading(false);
                }


            }
          })
    
    }
    
    const columns:GridColDef[] = [
        { field: 'id', headerName: 'Orden ID', width: 250 },
        { field: 'name', headerName: 'Nombre completo', width: 200 },
        { field: 'total', headerName: 'Monto total', width: 150 },
        { field: 'inStock', headerName: 'No.Productos', width: 120 },
        { field: 'createdAt', headerName: 'Creada en', width: 300 },
        {
            field: 'check',
            headerName: 'Ver orden',
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    <a href={ `/admin/orders/${ row.id }`} target="_blank" rel="noreferrer" >
                        Ver orden
                    </a>
                )
            }
        },
    
        {
            field: 'delete',
            headerName: 'Cancelar orden',
            width: 150,
            renderCell: ({ row }: GridValueGetterParams) => {
                return (
                    !isLoading ? (
                        <Button onClick={() => onCancelOrder( row.id )} color='error'>
                            Cancelar orden
                        </Button>
                    )
                    : (
                        <Box margin='0 auto'>
                            <FullScreenLoading />
                        </Box>
                    )
                )
            }
        },
    
    ]

    const rows = dataOrders!.map( order => {

        const fechaPedido = new Date( order.createdAt )
        const fechaFinal = ( 
                fechaPedido.getDate() +' de ' + 
                fechaPedido.toLocaleDateString('es-CR', { month: 'long' }) + ' del ' + 
                fechaPedido.getFullYear() + ' - Hora: ' + 
                fechaPedido.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            ).toString()

        return  {
            id: order._id,
            name: order.nameCustomer.concat(` ${order.lastnameCustomer}`),
            total: order.total,
            cart: order.orderIcecreams,
            inStock: order.numberOfItems,
            createdAt: fechaFinal
        }

    });

  return (
    <ShopLayout
        title={'Ordenes'}
        pageDescription={'Lista de ordenes generadas'}
    >

            <Grid container className='fadeIn container-table'>
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

export default OrdersPage