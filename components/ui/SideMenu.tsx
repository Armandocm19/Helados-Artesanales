import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Drawer, ListItem, ListItemIcon, ListItemText, List, Divider, Typography, Input, InputAdornment, IconButton, ListSubheader } from '@mui/material';
import { SearchOutlined, CategoryOutlined, ConfirmationNumberOutlined, Logout } from '@mui/icons-material';

import { AuthContext, UIContext } from "../../context"

export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu } = useContext(UIContext);
    const { user, logout } = useContext(AuthContext);

    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if ( searchTerm.trim().length === 0 ) return;

        navigateTo(`/search/${ searchTerm }`)
    }

    const navigateTo = ( url: string ) => {
        toggleSideMenu();
        router.push(url);
    }

    return (
        <Drawer
        open={isMenuOpen}
        anchor='right'
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 1s ease-out' }}
        onClose={toggleSideMenu}
        >

            <Box sx={{ width: 250, paddingTop: 1}}>

                <List sx={{ padding: '0 10px' }}>

                    <ListItem>
                        <Typography variant='h1' color='white'>Menú</Typography>

                    </ListItem>

                    <Divider sx={{ background: 'white' }} />

                    <ListItem>
                        <Input
                                sx={{ display: { xs: 'flex', sm: 'none' }}}
                                className="fadeIn"
                                value={ searchTerm }
                                autoFocus
                                onChange={ (e) => setSearchTerm( e.target.value ) }
                                onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                                type='text'
                                placeholder="Buscar..."
                                style={{ color: 'white' }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={ () => setSearchTerm('') }
                                            sx={{ color: 'white' }}
                                        >
                                            <SearchOutlined />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                    </ListItem>

                    {/* Admin */}

                    {
                        user?.role === 'admin' && (
                            <>
                                <ListItem>
                                    <ListItemIcon>
                                        <Typography variant='h2' sx={{ color: 'white' }}>Admin Panel</Typography>
                                    </ListItemIcon>
                                </ListItem>

                                <ListItem 
                                    button
                                    onClick={ () => navigateTo('/admin/products')}
                                >
                                    <ListItemIcon>
                                        <CategoryOutlined sx={{ color: 'white' }}/>
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: 'white' }} primary={'Productos'} />
                                </ListItem>

                                <ListItem 
                                    button 
                                    onClick={ () => navigateTo('/admin/orders') }
                                >
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined sx={{ color: 'white' }}/>
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: 'white' }} primary={'Ordenes'} />
                                </ListItem>

                                <Divider sx={{ background: 'white' }} />
                                <ListItem 
                                button
                                onClick={ () => navigateTo('/admin/users') }
                                >
                                    <ListItemIcon>
                                        <Logout sx={{ color: 'white' }}/>
                                    </ListItemIcon>
                                    <ListItemText onClick={logout} sx={{ color: 'white' }} primary={'Cerrar sección'} />
                                </ListItem>
                            </>
                        )
                    }

                </List>

            </Box>

        </Drawer>
    )

}