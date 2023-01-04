import { useContext, useState } from "react";
import { UIContext, CartContext, AuthContext } from "../../context"
import NextLink from 'next/link'

import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material'
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined, Logout } from '@mui/icons-material'
import { useRouter } from 'next/router'


import Logo from '../../public/logo/Logo.png'
import Image from "next/image";

export const Navbar = () => {

  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UIContext);
  const { numberOfItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const onSearchTerm = () => {
    console.log(searchTerm)
    if ( searchTerm.trim().length === 0 ) return;

    push(`/search/${ searchTerm }`);
  }

  return (
            <AppBar sx={{ backgroundColor: 'transparent', position: 'fixed' }}>
            <Toolbar>
                <NextLink href='/' passHref>
                    <Link display='flex' alignItems='center'>
                        <Image src={Logo} width={40} height={40} style={{ margin: '0 auto', width: '100%' }} alt="logo_helados"/>
                    </Link>
                </NextLink>

            <Box flex={ 1 } />

            {
                user?.role === 'admin' && (
                    <>
                        <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' }, ml: 9 }}
                        className='fadeIn'
                        >
                        {/* En pantallas muy pequeñas (xs) no se va a mostrar */}
                        
                            <NextLink href='/admin/products' passHref>
                                <Link>
                                    <Button 
                                        color = { asPath === '/admin/products' ? 'info' : 'primary' }
                                        sx={{ background: 'transparent', fontSize: '15px' }}
                                    >
                                        Productos
                                    </Button>
                                </Link>
                            </NextLink>

                            <NextLink href='/admin/orders' passHref>
                                <Link>
                                    <Button 
                                        color = { asPath === '/admin/orders' ? 'info' : 'primary' }
                                        sx={{ background: 'transparent', fontSize: '15px' }}
                                    >
                                        Ordenes
                                    </Button>
                                </Link>
                            </NextLink>

                            <NextLink href='/' passHref>
                                <Link>
                                <Button 
                                        color = 'primary'
                                        sx={{ background: 'transparent', fontSize: '15px' }}
                                        onClick={logout}
                                    >
                                     Cerrar sección 
                                    </Button>
                                </Link>
                            </NextLink>

                        </Box>

                        <Box flex={ 1 } />
                    </>
                )
            }

             {/* Pantallas grandes */}

             {
                isSearchVisible
                    ? (
                        <Input
                            sx={{ display: { xs: 'none', sm: 'flex' }}}
                            className="fadeIn"
                            value={ searchTerm }
                            autoFocus
                            onChange={ (e) => setSearchTerm( e.target.value ) }
                            onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                            type='text'
                            placeholder="Buscar..."
                            style={{ color: 'rgb(29, 29, 29)'}}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={ () => setIsSearchVisible(false) }
                                        sx={{ color: 'white' }}
                                    >
                                        <ClearOutlined/>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    )
                    : (
                        <IconButton 
                            onClick={ () => setIsSearchVisible(true) }
                            className='fadeIn'
                            sx={{ display: { xs: 'none', sm: 'flex' }, color: 'white' }}
                        >
                            <SearchOutlined />
                        </IconButton> 
                    )
            }
    
                {/* Pantallas pequeñas */}
                <IconButton
                    sx={{ display: { xs: 'flex', sm: 'none' }, color: 'white' }}
                    onClick={ toggleSideMenu }
                >
                    <SearchOutlined />
                </IconButton>
    
                <NextLink href='/cart' passHref>
                    <Link>
                        <IconButton sx={{ color: 'white' }}>
                            <Badge badgeContent={ numberOfItems > 9 ? '+9' : numberOfItems } color="secondary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>
    
                <Button onClick={ toggleSideMenu } className='open-menu-nav'>
                    Menú
                </Button>
    
            </Toolbar>
        </AppBar>
  )
}
