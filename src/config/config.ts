import * as dotenv from "dotenv";
dotenv.config();

export let apiUrl: string;
export let webUrl: string;

if (process.env.NODE_ENV === "development") {
  webUrl = "http://localhost:3000";
  apiUrl = "http://localhost:3000";
  // apiUrl = 'https://61d3807dfbe8.ngrok.io';
} else {
  webUrl = "https://my.frontend.domain";
  apiUrl = "https://my.api.domain";
}

export const configVars = {
  mode: "normal",
  activateAutoLoginDefiWallet: true,
  rpcNetwork: {
    rpcUrl: "https://evm.cronos.org/",
    chainId: 25,
    chainIdHex: "0x19",
    chainName: "Cronos Mainnet Beta",
    chainType: "mainnet",
    nativeCurrency: {
      name: "CRO",
      symbol: "CRO",
      decimals: 18,
    },
    blockExplorerUrl: "https://cronoscan.com/",
  },
};
