import '../styles/globals.css'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { SWRConfig } from 'swr'

import { lightTheme } from '../themes'
import { UIProvider, CartProvider, AuthProvider } from '../context'

function MyApp({ Component, pageProps }) {
  return (
  <SWRConfig 
    value={{//Permite darle una config a los hooks por defecto, la cual es sobrescribible
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}
  >
    <AuthProvider>
      <CartProvider>
        <UIProvider>
          <ThemeProvider theme={ lightTheme }>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </UIProvider>
      </CartProvider>
    </AuthProvider>
  </SWRConfig
  >
  )
}

export default MyApp
