export const bridgeConfig = {
  545: {
    name: 'Flow EVM Testnet',
    bridgeContract: '0xCcaCCa0Fe74D617319A7b3915140E6ad7F96Ec77',
    tokens: [
      {
        symbol: 'FLOW',
        address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        decimals: 18,
        hidden: false
      },
      {
        symbol: 'STFLOW',
        address: '0x814bb8ded16e2975c157419174f2b894215d84fb',
        decimals: 18,
        hidden: true
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
        decimals: 18,
        hidden: false
      },
      {
        symbol: 'STHBAR',
        address: '0x6e62359693a937c81a918a3bf797a9bbc65f940f',
        decimals: 8,
        hidden: true
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
        decimals: 18,
        hidden: false
      },
      {
        symbol: 'STFLR',
        address: '0x2d430569707951c054f7723fe31f613bf820f338',
        decimals: 18,
        hidden: true
      }
    ]
  }
} as const;


export type ChainId = keyof typeof bridgeConfig;
export type BridgeConfig = (typeof bridgeConfig)[ChainId];

export default bridgeConfig;

