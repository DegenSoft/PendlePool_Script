export const maxGwei = 18;

// sleep between wallets in seconds
export const sleepFrom = 90;
export const sleepTo = 120;

export const sleepOnHighGas = 100;

export const ETH = {
  name: 'ETH',
  chainId: 1,
  rpc: 'https://ethereum.publicnode.com',
  explorer: 'https://etherscan.io/tx',
  token: 'ETH',
};

export const POL = {
  name: 'POL',
  chainId: 137,
  rpc: 'https://polygon.llamarpc.com',
  explorer: 'https://polygonscan.com/tx',
  token: 'MATIC',
};

// in days
export const domainDuration = 365;

export const moduleName = 'ENS';

// in seconds, recommended not less than 1 minute
export const sleepBeforeRegistering = 100;

export const decryptAccounts = true;

export const decryptPass = '12345';
