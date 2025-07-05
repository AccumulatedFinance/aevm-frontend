import {FC, ReactNode} from "react";

import {
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

import {WagmiProvider} from "wagmi";
import CustomAvatar from "./CustomAvatar";
import {wagmiConfig} from "../../initLib";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface IProps {
  children: ReactNode
}

const queryClient = new QueryClient();

const RainbowKitInitializer: FC<IProps> = ({children}) => {
  return (
    <WagmiProvider config={wagmiConfig} initialState={undefined}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          locale={"en"}
          modalSize="compact"
          avatar={CustomAvatar}
          theme={lightTheme({
            accentColor: '#683ab7',
            accentColorForeground: 'white',
            borderRadius: 'medium',
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
export default RainbowKitInitializer;