export const bridgeConfig = {
  545: {
    name: 'Flow EVM Testnet',
    bridgeContract: '0xCcaCCa0Fe74D617319A7b3915140E6ad7F96Ec77',
    tokens: [
      {
        symbol: 'FLOW',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        decimals: 18
      }
    ]
  },
  296: {
    name: 'Hedera AEVM',
    bridgeContract: '0x45FC6390984565481C081125c3E71bE7df050845',
    tokens: [
      {
        symbol: 'HBAR',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        decimals: 18
      }
    ]
  },
  114: {
    name: 'Flare Coston2',
    bridgeContract: '0x45FC6390984565481C081125c3E71bE7df050845',
    tokens: [
      {
        symbol: 'C2FLR',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        decimals: 18
      }
    ]
  }
} as const;


export type ChainId = keyof typeof bridgeConfig;
export type BridgeConfig = (typeof bridgeConfig)[ChainId];

export default bridgeConfig;

