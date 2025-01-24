import { Button, Grid, Typography } from "@mui/joy";
import React, { FC } from "react";

import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <>
      <Grid container className="App-body">
        <Grid xs={12} sm={10} md={5} padding={4}>
          <Typography component={'span'} level="h1" sx={{ mb: 2 }}>404 Not Found</Typography>
          <Button variant="solid" size="lg" color="primary" component={Link} to={`/`} >
            Jump to reality
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default NotFound;