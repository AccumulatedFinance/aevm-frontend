import React from 'react';

import {Box, Stack} from '@mui/joy';


export default function Header() {

  return (
    <Box className="App-menu"
         sx={{
           display: 'flex',
           flexGrow: 1,
           justifyContent: {
             'xs': 'right',
             'sm': 'center'
           },
           minHeight: '50px'
         }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{display: {xs: 'none', sm: 'flex'}}}
        className="navbar-menu"
      >
      </Stack>
    </Box>
  );
}