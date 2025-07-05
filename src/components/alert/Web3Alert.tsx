import { Button, Typography } from "@mui/joy";
import { FC, ReactNode, useEffect } from "react";

import { IconContext } from "react-icons";
import { RiExternalLinkLine } from "react-icons/ri";

import BaseSnackbar from "../common/BaseSnackbar";

import Web3AlertContainer from "./Web3AlertContainer";
import { observer } from "mobx-react";
import {BIG_NUMBER_ZERO} from "@accumulatedfinance/frontend-toolkit";
import {tokenUtils} from "../../initLib";
import {useStore} from "../../StoreProvider";

interface IProps {
  children: ReactNode
}

const Web3Alert: FC<IProps> = observer(({ children }) => {
  const store = useStore();
  const { appStore, alertStore } = store;
  const chainId = appStore.chainId;

  useEffect(() => {
    const timer = setTimeout(() => {
      alertStore.dequeueAlert();
    }, 600000); // Change the duration as needed (in milliseconds)

    return () => clearTimeout(timer); // Clear the timer when the component unmounts or when the queue changes
  }, [alertStore]);

  useEffect(() => {
    // Clear the queue when chainId changes
    alertStore.clearAlerts();
  }, [chainId, alertStore]);

  return (
    <>
      <Web3AlertContainer>
        {alertStore.queue.map((alert) => (
          <BaseSnackbar key={alert.id} isOpen={true} color={alert.type === "ERROR" ? "danger" : "success"}>
            <Typography component={'span'} level="h4" sx={{ color: alert.type === "ERROR" ? "danger.700" : "success.700" }}>
              {alert.type === "ERROR" ? "Transaction Error" : "Transaction Sent"}
            </Typography>
            <Typography component={'span'} level="body-sm">{alert.data?.toString()}</Typography>
            {alert.type.includes("TX_SUCCESS") && (
              <Typography component={'span'} mt={1}>
                <Button
                  variant="outlined"
                  color="success"
                  component="a"
                  href={tokenUtils.getExplorerTxPage(chainId ? chainId : BIG_NUMBER_ZERO, alert.data as string)}
                  target="_blank"
                >
                  Explorer
                  <IconContext.Provider value={{ className: "react-icons react-icons-end" }}>
                    <RiExternalLinkLine />
                  </IconContext.Provider>
                </Button>
              </Typography>
            )}
          </BaseSnackbar>
        ))}
      </Web3AlertContainer>
      {children}
    </>
  )
});
export default Web3Alert;