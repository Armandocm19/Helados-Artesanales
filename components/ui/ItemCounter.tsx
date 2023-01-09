import { FC } from "react";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"

interface Props{
    currentValue: number,
    maxValue: number,
    updatedQuantity: (value: number) => void,
}

export const ItemCounter: FC<Props> = ({ currentValue, maxValue, updatedQuantity }) => {

    const addOrRemove = ( value: number ) => {

        if( value === +1 ){
            if( currentValue === maxValue ){
                return;
            }
            return updatedQuantity( currentValue + 1 )
        }

        if( value === -1 ){

            if( currentValue === 0 ){
                return;
            }
            return updatedQuantity( currentValue - 1 )
        }

    }

    return(
        <>
            <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
            
                <IconButton
                    onClick={ () => addOrRemove( -1 ) }
                >
                    <RemoveCircleOutline sx={{ color: 'white', fontSize: 30 }} />
                </IconButton>
            
                <Typography sx={{ color: 'white', fontSize: 30 }}>{currentValue}</Typography>
            
                <IconButton
                    onClick={ () => addOrRemove( +1 ) }
                >
                    <AddCircleOutline sx={{ color: 'white', fontSize: 30 }} />
                </IconButton>
            
            </Box>

            <Box
                display='flex'
                justifyContent='center'
                textAlign='center'
                width='100%'
            >
            {
                currentValue === maxValue && (
                    <Typography variant='h6' color='error' id='text-error-counter'>Solo tenemos {maxValue} disponibles</Typography>
                )
            }
            </Box>
        </>
    );

}