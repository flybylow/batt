// IOTA Network Configuration
export const IOTA_CONFIG = {
  // Testnet configuration
  testnet: {
    nodeUrl: 'https://api.testnet.iota.cafe:443',
    evmEndpoint: 'https://json-rpc.evm.testnet.iotaledger.net',
    networkId: 'testnet',
    explorerUrl: 'https://explorer.testnet.iota.cafe'
  },
  
  // Mainnet configuration
  mainnet: {
    nodeUrl: 'https://api.mainnet.iota.cafe:443',
    evmEndpoint: 'https://json-rpc.evm.iotaledger.net',
    networkId: 'mainnet',
    explorerUrl: 'https://explorer.iota.org'
  }
};

// Environment configuration
export const getIotaConfig = () => {
  const network = process.env.NODE_ENV === 'production' ? 'mainnet' : 'testnet';
  return IOTA_CONFIG[network];
};

// Battery passport smart contract addresses
export const CONTRACT_ADDRESSES = {
  testnet: {
    batteryPassport: '0x1234567890123456789012345678901234567890', // Replace with actual contract address
    supplyChain: '0x0987654321098765432109876543210987654321'   // Replace with actual contract address
  },
  mainnet: {
    batteryPassport: '0xABCDEF1234567890ABCDEF1234567890ABCDEF12', // Replace with actual contract address
    supplyChain: '0x1234567890ABCDEF1234567890ABCDEF1234567890'   // Replace with actual contract address
  }
};
