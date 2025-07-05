import { Grid, Typography, Chip } from "@mui/joy";
import React, { FC } from "react";

import Logo from '../resources/logo-mark.svg'
import ACFILogo from '../resources/acfi.svg'
import {Link} from "react-router-dom";

const Home: FC = () => {

  // useEffect(() => {
  //   document.title = getHomeTitle();
  // }, []);

  return (
    <>
      <Grid container className="App-header">
        <Grid xs={12} sm={10} md={10} lg={10} padding={4} paddingBottom={6}>
          <Typography component={'span'} level="h1" sx={{ mb: 2, lineHeight: 1.2 }}>
            <img src={Logo} alt="AEVM" height={72} style={{ marginBottom: "0.5rem" }} /><br />
            AEVM (Accumulated EVM)
          </Typography>
          <Typography component={'span'} level="h4" sx={{ mb: 2, fontWeight: "normal" }}>
            Crypto Index Funds with Built-in Native Yield from underlying LST/LRT
          </Typography>
          <Typography component={'span'} sx={{ mb: 3 }}>
            <Link to={"https://accumulated.finance/presale"} target="_blank">
              <Chip className="powered-by" size="lg"  variant="plain">
                <img src={ACFILogo} alt="ACFI" />{" "}Powered by <strong>$ACFI</strong>
                <Typography sx={{ ml: 1 }} textColor={"primary.500"}>(Presale)</Typography>
              </Chip>
            </Link>
          </Typography>
        </Grid>
        </Grid>
      <Grid container className="App-body" sx={{height: "100px"}}>
        Launch Soon
      </Grid>
    </>
  )
}

export default Home;