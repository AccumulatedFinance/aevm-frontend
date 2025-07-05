import { ConnectButton } from "@rainbow-me/rainbowkit";
import BigNumber from "bignumber.js";
import { FC, useEffect } from "react";
import { useAccount } from "wagmi";

import { Box, Button } from "@mui/joy";

import CustomAvatar from "./CustomAvatar";
import {observer} from "mobx-react";
import {useStore} from "../../StoreProvider";
interface IProps {
}

const RainbowButton: FC<IProps> = observer(() => {
  const { chain, address, connector } = useAccount();

  const { appStore } = useStore();

  useEffect(() => {
    if (chain) {
      appStore.setChainId(new BigNumber(chain.id))
    } else {
      appStore.clearChainId();
    }
  }, [appStore, chain, connector]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        return (
          <div
            {...(!mounted && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!mounted || !account || !chain) {
                return (
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <Button
                      sx={{
                        borderRadius: '8px',
                        height: 40,
                        padding: '12px',
                        fontFamily: 'var(--rk-fonts-body)',
                        fontSize: '16px',
                        fontWeight: '700',
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px 0px',
                        background: '#683ab7',
                      }}
                      onClick={openConnectModal}>
                      Connect Wallet
                    </Button>
                  </Box>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal}
                    color="danger"
                    sx={{
                      height: 40,
                      padding: '12px',
                      fontFamily: 'var(--rk-fonts-body)',
                      fontSize: '16px',
                      fontWeight: '700',
                      borderRadius: '8px',
                      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px 0px'
                    }}>
                      <Box sx={{ display: { xs: 'block', sm: 'none' }, marginRight: 1 }}>
                        Network
                      </Box>
                      <Box sx={{ display: { xs: 'none', sm: 'block' }, marginRight: 1 }}>
                        Wrong network
                      </Box>
                      <svg fill="none" height="7" width="14" xmlns="http://www.w3.org/2000/svg"><title>Dropdown</title><path d="M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" xmlns="http://www.w3.org/2000/svg"></path></svg>
                  </Button>
                );
              }

              return (
                <Box sx={{
                  overflow: 'auto',
                  '&::-webkit-scrollbar': { display: 'none' },
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <Button
                    onClick={openChainModal}
                    color={"neutral"}
                    variant={"plain"}
                    sx={{
                      borderRadius: '8px',
                      height: 40,
                      marginRight: '4px',
                      padding: '12px',
                      fontFamily: 'var(--rk-fonts-body)',
                      fontSize: '16px',
                      fontWeight: '700',
                      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px 0px',
                      background: '#ffffff',
                    }}
                  >
                    {chain.hasIcon && (
                      <Box
                        sx={{
                          background: chain.iconBackground,
                          width: 24,
                          height: 24,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 1,
                        }}
                      >
                        {chain.iconUrl && (
                          <Box
                            component={"img"}
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            width={24}
                            height={24}
                          />
                        )}
                      </Box>
                    )}
                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' }, marginRight: 1 }}>
                      {chain.name}
                    </Box>
                    <svg fill="none" height="7" width="14" xmlns="http://www.w3.org/2000/svg"><title>Dropdown</title><path d="M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" xmlns="http://www.w3.org/2000/svg"></path></svg>
                  </Button>

                  <Button
                    color={"neutral"}
                    variant={"plain"}
                    sx={{
                      borderRadius: '8px',
                      height: 40,
                      padding: '12px',
                      fontFamily: 'var(--rk-fonts-body)',
                      fontSize: '16px',
                      fontWeight: '700',
                      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px 0px',
                      background: '#ffffff',
                    }}
                    onClick={openAccountModal}
                  >
                    {address &&
                      <Box sx={{
                        marginRight: 1,
                        width: 24,
                        height: 24,
                      }} marginRight={{}}>
                        <CustomAvatar address={address} size={24} ensImage={account.ensAvatar} />
                      </Box>
                    }
                    <svg fill="none" height="7" width="14" xmlns="http://www.w3.org/2000/svg"><title>Dropdown</title><path d="M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" xmlns="http://www.w3.org/2000/svg"></path></svg>
                  </Button>
                </Box>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  )
});

export default RainbowButton;