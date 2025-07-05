export const bridgeConfig = {
  545: {
    name: 'Flow EVM Testnet',
    bridgeContract: '0x',
    tokens: [
      {
        symbol: 'FLOW',
        address: '0x',
        decimals: 18
      },
      {
        symbol: 'STFLOW',
        address: '0x',
        decimals: 18
      }
    ]
  },
  296: {
    name: 'Hedera AEVM',
    bridgeContract: '0x',
    tokens: [
      {
        symbol: 'HBAR',
        address: '0x',
        decimals: 18
      },
      {
        symbol: 'STHBAR',
        address: '0x',
        decimals: 8
      }
    ]
  }
} as const;


export type ChainId = keyof typeof bridgeConfig;
export type BridgeConfig = (typeof bridgeConfig)[ChainId];

export default bridgeConfig;

