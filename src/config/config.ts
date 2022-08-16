import * as dotenv from "dotenv";
dotenv.config();

export let apiUrl: string;
export let webUrl: string;

if (process.env.NODE_ENV === "development") {
  webUrl = "http://localhost:3000";
  apiUrl = "http://localhost:3000";
} else {
  webUrl = "https://my.frontend.domain";
  apiUrl = "https://my.api.domain";
}

// Mainnet config
export const configVars = {
  mode: "normal",
  activateAutoLoginDefiWallet: false,
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
  rpcURLs: {
    25: "https://evm.cronos.org/",
  },
};

// Testnet config
// export const configVars = {
//   mode: "normal",
//   activateAutoLoginDefiWallet: false,
//   rpcNetwork: {
//     rpcUrl: "https://evm-t3.cronos.org/",
//     chainId: 338,
//     chainIdHex: "0x152",
//     chainName: "Cronos Tesnet",
//     chainType: "testnet",
//     nativeCurrency: {
//       name: "CRO",
//       symbol: "CRO",
//       decimals: 18,
//     },
//     blockExplorerUrl: "https://testnet.cronoscan.com/",
//   },
// rpcURLs: {
//   338: "https://evm-t3.cronos.org/",
// },
// };
