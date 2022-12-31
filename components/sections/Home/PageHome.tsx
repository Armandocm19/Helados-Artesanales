import { useState, useEffect, FC } from 'react';
import { useRouter } from 'next/router';

import { Typography, Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { IcecreamList } from "../Icecreams";
import { useIcecreams } from '../../../hooks';
import { FullScreenLoading } from "../../ui";

export const PageHome: FC = () => {

  let path = 'All';
  const { push, asPath } = useRouter();
  if( asPath.length > 1 ) {
    path = asPath.substring(10, 14);
  }
  const { icecreamsData, isLoading } = useIcecreams(`/icecreams?price=${path}`)
  const [filterPrice, setFilterPrice] = useState(path);

  useEffect(() => {
      if( filterPrice === 'All' || filterPrice === '' ){
        push(`/`);
      } else{
        push(`/category/${filterPrice}`);
      }
  
    }, [filterPrice])
  

  const handleChange = (event: SelectChangeEvent) => {
    setFilterPrice(event.target.value as string);
  };
    
    return (
        <Box>
          <Typography variant="h1" component='h1' sx={{ color: 'white', pt: 3 }}>Helados Artesanales</Typography>

          <Box display='flex' justifyContent='space-between' className='page-home-container'>
            <Typography variant="h2">Nuestros sabores:</Typography>
            
            <div style={{ width: '20%' }} className='form-control-pagehome'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Filtro por precio(₡)</InputLabel>
                  <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={filterPrice}
                      label="Filtro por precio(₡)"
                      onChange={handleChange}
                    >
                      <MenuItem value={'All'}>All</MenuItem>
                      <MenuItem value={'700'}>700</MenuItem>
                      <MenuItem value={'800'}>800</MenuItem>
                  </Select>
                </FormControl>
            </div>
          </Box>
          
          {
            isLoading
              ? <FullScreenLoading />
              : <IcecreamList icecreams={icecreamsData} />
          }
        </Box>
    )

}