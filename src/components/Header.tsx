import React from 'react';

import {Box, Button, Stack} from '@mui/joy';


export default function Header() {

  return (
    <Box className="App-menu"
         sx={{
           display: 'flex',
           flexGrow: 1,
           justifyContent: 'space-between',
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
    <Box sx={{
      overflow: 'auto',
      '&::-webkit-scrollbar': {display: 'none'},
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 1
    }}>
      <Button>Connect Wallet</Button>
    </Box>
    </Box>
  );
}