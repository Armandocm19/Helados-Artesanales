import { FC, useState } from "react";
import NextLink from "next/link";

import { Grid, Card, CardActionArea, Chip, CardMedia, Box, Typography, Link } from "@mui/material";

import { IIcecream } from "../../../interfaces";

interface Props {
    icecream: IIcecream
}

export const IcecreamCard: FC<Props> = ({ icecream }) => {

    const [isImageLoaded, setisImageLoaded] = useState(false)
    console.log(icecream)
    
    return (
        <Grid 
        item
        xl={3} 
        md={4}
        sm={6} 
        xs={12} 
        sx={{ zIndex: 0 }}
        >
            <Card>
                <NextLink href={ icecream.inStock !== 0 ? `/icecream/${ icecream.slug }` : '/' } passHref prefetch={ false }>
                    <Link>
                        <CardActionArea>
                        {
                            (icecream.inStock === 0) && (
                            <Chip 
                            color="primary"
                            label="No hay disponibles"
                            sx={{ position: 'absolute', zIndex: 99, top: '10px', left: '10px' }}
                            />
                            )
                        }
                        <CardMedia 
                            component='img'
                            className="fadeIn"
                            image={ icecream.images }
                            alt={ icecream.name }
                            width={300}
                            height={400}
                            onLoad={ () => setisImageLoaded(true) }
                        />
                        </CardActionArea>
                    </Link>
                </NextLink>
            </Card>

            <Box sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }} className='fadeIn'>
                <Typography fontWeight={700} color='white'>{ icecream.name }</Typography>
                <Typography fontWeight={400}>${ icecream.price }</Typography>
            </Box>

        </Grid>
    );

}