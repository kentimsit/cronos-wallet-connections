// wallet-defiwallet.ts
import { ethers } from "ethers"; // npm install ethers

// This is the SDK provided by Crypto.com DeFi Wallet
import { DeFiConnectProvider } from "@deficonnect/provider"; // npm install "@deficonnect/provider"

import * as config from "../config/config";
import * as utils from "./utils";
import { IWallet, defaultWallet } from "../store/interfaces";

// Main login flow for Crypto.com DeFi Wallet with Wallet Extension
// The connector must be activated, then it exposes a provider
// that is used by the ethers Web3Provider constructor.
export const connect = async (): Promise<IWallet> => {
  try {
    const provider = new DeFiConnectProvider({
      appName: "My Dapp",
      chainType: "eth",
      chainId: [config.configVars.rpcNetwork.chainId].toString(),
      rpcUrls: {
        [config.configVars.rpcNetwork.chainId]:
          config.configVars.rpcNetwork.rpcUrl,
      },
    });
    console.log("Provider", JSON.stringify(provider));
    const web3Provider = new ethers.providers.Web3Provider(provider);
    if (
      !(
        parseInt(provider.networkConfig.chainId) ===
        config.configVars.rpcNetwork.chainId
      )
    ) {
      window.alert(
        "Switch your Wallet to blockchain network " +
          config.configVars.rpcNetwork.chainName +
          ". Chain ID is " +
          parseInt(provider.chainId) +
          " instead of " +
          config.configVars.rpcNetwork.chainId
      );
      return defaultWallet;
    }
    // Subscribe to events that reload the app
    provider.on("accountsChanged", utils.reloadApp);
    provider.on("chainChanged", utils.reloadApp);
    provider.on("disconnect", utils.reloadApp);
    const accounts: string[] = (await provider.request({
      method: "eth_requestAccounts",
    })) as string[];
    console.log("Accounts", JSON.stringify(accounts));
    return {
      ...defaultWallet,
      walletProviderName: "defiwallet",
      address: accounts[0],
      browserWeb3Provider: web3Provider,
      serverWeb3Provider: new ethers.providers.JsonRpcProvider(
        config.configVars.rpcNetwork.rpcUrl
      ),
      connected: true,
      chainId: parseInt(provider.chainId),
    };
  } catch (e) {
    window.alert(e);
    return defaultWallet;
  }
};
