import { Grid, Typography, Chip, Tooltip } from "@mui/joy";
import React, { FC } from "react";

import { Link } from "react-router-dom";


import CurveLogo from '../resources/supporters/curve.png';
import StakeDAOLogo from '../resources/supporters/stakedao.png';
import Logo from '../resources/logo-mark.svg'

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
            <Link to={"/"}>
              <Chip className="powered-by" size="lg"  variant="plain">
                <img src={Logo} alt="ACFI" /><strong>$ACFI</strong> launch soon
              </Chip>
            </Link>
          </Typography>
          <Typography component={'span'} level="title-lg" mb={1.5} sx={{ color: "#6c518d" }}>
            Backed by angels from
          </Typography>

          <Typography component={'span'} sx={{ mb: 0 }} className="supporters">
            <Tooltip title="Curve Finance" color="primary" size="sm">
              <Link to="https://curve.fi" target="_blank">
                <img src={CurveLogo} height={36} style={{ minWidth: 36 }} alt="Curve Finance" />
              </Link>
            </Tooltip>
            <Tooltip title="Stake DAO" color="primary" size="sm">
              <Link to="https://stakedao.org" target="_blank">
                <img src={StakeDAOLogo} height={36} style={{ minWidth: 36 }} alt="Stake DAO" />
              </Link>
            </Tooltip>
          </Typography>
        </Grid>
        </Grid>
      <Grid container className="App-body" sx={{height: "100px"}}>
      </Grid>
    </>
  )
}

export default Home;