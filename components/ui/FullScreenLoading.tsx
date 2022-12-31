
import { Box, CircularProgress } from '@mui/material'

export const FullScreenLoading = () => {
  return (
    <Box 
        display='flex' 
        flexDirection='column'
        justifyContent='center' 
        alignItems='center' 
        height='calc(100vh - 160px)'
        >
            <CircularProgress thickness={4} sx={{ color: 'white' }} /> 
            {/* "thickness" Grosor de la linea */}
    </Box>
  )
}