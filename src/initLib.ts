import {AppConfig, initFrontendToolkit} from "@accumulatedfinance/frontend-toolkit";

const appConfig: AppConfig = {
  appName: "Accumulated Finance",
  walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  resourcesBaseUrl: import.meta.env.VITE_RESOURCES,
  includeMainnetChains: import.meta.env.VITE_INCLUDE_MAINNET_CHAINS === 'true',
  includeTestnetChains: import.meta.env.VITE_INCLUDE_TESTNET_CHAINS === 'true'
}

export const {
  wagmiConfig,
  chainProvider,
  logoUtils
} = initFrontendToolkit(appConfig);
