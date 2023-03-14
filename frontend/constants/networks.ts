enum ChainName {
  LOCAL = "Local",
  ETHEREUM = "Ethereum",
  RINKEBY = "Rinkeby",
  GOERLI = "Goerli",
  POLYGON = "Polygon",
  MUMBAI = "Mumbai",
}

export enum ChainId {
  LOCAL = 1337,
  ETHEREUM = 1, 
  RINKEBY = 4,
  GOERLI = 5,
  POLYGON = 137,
  MUMBAI = 80001
}

export interface Chain {
  id: ChainId;
  name: ChainName;
  rpc: string;
}

export const chains: Chain[] = [
  {
    id: ChainId.ETHEREUM,
    name: ChainName.ETHEREUM,
    rpc: "https://rpc.ankr.com/eth",
  },
  {
    id: ChainId.LOCAL,
    name: ChainName.LOCAL,
    rpc: "http://localhost:8545",
  },
  {
    id: ChainId.GOERLI,
    name: ChainName.GOERLI,
    rpc: "https://rpc.ankr.com/eth_goerli",
  },
  {
    id: ChainId.MUMBAI,
    name: ChainName.MUMBAI,
    rpc: "https://rpc.ankr.com/eth_goerli",
  },
  {
    id: ChainId.POLYGON,
    name: ChainName.POLYGON,
    rpc: "https://rpc.ankr.com/polygon",
  },
  {
    id: ChainId.RINKEBY,
    name: ChainName.RINKEBY,
    rpc: "https://rpc.ankr.com/eth_rinkeby",
  },
];

interface ChainDictionary {
  [key: number]: Chain;
}

function getChainDictionary(): any {
  return {};
}

export const chainDict: ChainDictionary = chains.reduce((value, chain) => {
  value[chain.id] = chain;
  return value;
}, getChainDictionary());
