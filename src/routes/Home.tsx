import { Grid, Typography, Chip } from "@mui/joy";
import React, { FC } from "react";

import Logo from '../resources/logo-mark.svg'
import {Link} from "react-router-dom";

const Home: FC = () => {

  // useEffect(() => {
  //   document.title = getHomeTitle();
  // }, []);

  return (
    <>
      <Grid container className="App-header">
        <Grid xs={12} sm={10} md={10} lg={10} padding={4} paddingBottom={6}>
          <Typography component={'span'} level="h1" sx={{ mb: 2, lineHeight: 1.2 }}>AEVM</Typography>
          <Typography component={'span'} level="h4" sx={{ mb: 2, fontWeight: "normal" }}>
            App-Chain Powered by Native Yield
          </Typography>
          <Typography component={'span'} sx={{ mb: 3 }}>
            <Link to={"https://accumulated.finance"}>
              <Chip className="powered-by" size="lg"  variant="plain">
                <img src={Logo} alt="ACFI" />Powered by <strong>$ACFI</strong>
              </Chip>
            </Link>
          </Typography>
        </Grid>
        </Grid>
      <Grid container className="App-body" sx={{height: "100px"}}>
      </Grid>
    </>
  )
}

export default Home;