import { Grid, Typography, Chip, Stepper, Step, StepButton, StepIndicator, Box, Card, CardContent } from "@mui/joy";
import React, { FC, useState } from "react";
import BigNumber from "bignumber.js";

import Logo from '../resources/logo-mark.svg'
import ACFILogo from '../resources/acfi.svg'
import { Link } from "react-router-dom";
import BridgeForm from "../components/bridge/BridgeForm";
import {useStore} from "../StoreProvider";
import ActionButton from "../components/button/ActionButton";
import {observer} from "mobx-react";
import {AEVM_CHAIN_ID} from "../constants";
import IndexFunds from "../components/IndexFunds";

const Home: FC = observer(() => {
  const [activeStep, setActiveStep] = useState(0);
  const {appStore} = useStore();
  const {chainId} = appStore;

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <>
      <Grid container className="App-header">
        <Grid xs={12} sm={10} md={10} lg={10} padding={4}>
          <Typography component={'span'} level="h1" sx={{ mb: 2, lineHeight: 1.2 }}>
            <img src={Logo} alt="AEVM" height={72} style={{ marginBottom: "0.5rem" }} /><br />
            AEVM (Accumulated EVM)
          </Typography>
          <Typography component={'span'} level="h4" sx={{ mb: 2, fontWeight: "normal" }}>
            Crypto Index Funds with Built-in Native Yield from underlying LST/LRT
          </Typography>
          <Typography component={'span'} sx={{ mb: 3 }}>
            <Link to={"https://accumulated.finance/presale"} target="_blank">
              <Chip className="powered-by" size="lg" variant="plain" sx={{ p: 0.5, px: 1 }}>
                <img src={ACFILogo} alt="ACFI" />Powered by <strong>$ACFI</strong>
                <Chip variant="solid" color="success" size="sm" sx={{ mt: -0.25, ml: 1 }}>Presale Live</Chip>
              </Chip>
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="App-body" sx={{ padding: 4, minHeight: "400px" }}>
        <Grid xs={12}>
          <Stepper sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
            <Step completed={activeStep === 0}>
              <StepIndicator variant={activeStep === 0 ? "solid" : "soft"} color={"primary"}>
                1
              </StepIndicator>
              <StepButton onClick={() => handleStepChange(0)}>Bridge</StepButton>
            </Step>
            <Step completed={activeStep === 1}>
              <StepIndicator variant={activeStep === 1 ? "solid" : "soft"} color={"primary"}>
                2
              </StepIndicator>
              <StepButton onClick={() => handleStepChange(1)}>Index Funds</StepButton>
            </Step>
          </Stepper>

          <Box sx={{ mb: 6, textAlign: "center" }}>
            {activeStep === 0 && (
              <Typography level="body-lg">
                <BridgeForm/>
              </Typography>
            )}
            {activeStep === 1 && (
              <>
              {
                (chainId?.eq(AEVM_CHAIN_ID)) ?
                  <IndexFunds/> :
                  <ActionButton chainId={new BigNumber(AEVM_CHAIN_ID)} />
              }
              </>

            )}
          </Box>

          <Box sx={{ mt: 10 }}>
            <Typography level="h3" sx={{ mb: 4, textAlign: "center" }}>
              How AEVM Index Funds Work
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <Grid xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography level="title-lg" sx={{ mb: 1 }}>
                      Diversified Exposure
                    </Typography>
                    <Typography level="body-md">
                      Invest in a curated basket of crypto assets to spread risk and capture market growth.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography level="title-lg" sx={{ mb: 1 }}>
                      Native Yield
                    </Typography>
                    <Typography level="body-md">
                      Earn passive income through built-in yield from Liquid Staking Tokens (LST) and Liquid Restaking Tokens (LRT).
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={12} sm={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography level="title-lg" sx={{ mb: 1 }}>
                      Seamless Management
                    </Typography>
                    <Typography level="body-md">
                      Automated rebalancing and management to optimize returns with minimal effort.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
});

export default Home;