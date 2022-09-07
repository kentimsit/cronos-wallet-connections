// wallet-defiwallet.ts
import { ethers } from "ethers"; // npm install ethers

// This is the SDK provided by Crypto.com DeFi Wallet
import { DeFiWeb3Connector } from "@deficonnect/web3-connector"; // npm install "@deficonnect/web3-connector"
// If you are not using React, you may need to access the provider directly (included in the connector)
// import { DeFiConnectProvider } from "@deficonnect/provider"; // npm install "@deficonnect/provider"

import * as config from "../config/config";
import * as utils from "./utils";
import { IWallet, defaultWallet } from "../store/interfaces";

// Main login flow for Crypto.com DeFi Wallet with Wallet Extension
// The connector must be activated, then it exposes a provider
// that is used by the ethers Web3Provider constructor.
export const connect = async (): Promise<IWallet> => {
  try {
    const connector = new DeFiWeb3Connector({
      supportedChainIds: [config.configVars.rpcNetwork.chainId],
      appName: "My Dapp",
      chainType: "eth", // Same value for any EVM chains
      chainId: [config.configVars.rpcNetwork.chainId].toString(),
      rpcUrls: {
        [config.configVars.rpcNetwork.chainId]:
          config.configVars.rpcNetwork.rpcUrl,
      },
    });
    connector.activate();
    const provider = await connector.getProvider();

    // // If you are not using React, you may need to remove the conector and access the provider directly
    // const provider = new DeFiConnectProvider({
    //   appName: "My Dapp",
    //   chainType: "eth", // Same value for any EVM chains
    //   chainId: [config.configVars.rpcNetwork.chainId].toString(),
    //   rpcUrls: {
    //     [config.configVars.rpcNetwork.chainId]:
    //       config.configVars.rpcNetwork.rpcUrl,
    //   },
    // });
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
    const accounts: string[] = (await provider.request({
      method: "eth_requestAccounts",
    })) as string[];
    console.log("Accounts", JSON.stringify(accounts)); // For debugging purposes
    const newWallet = {
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
    // Subscribe to events that reload the app
    provider.on("accountsChanged", (x: any) => {
      utils.actionWhenWalletChange("accountsChanged", x, newWallet);
    });
    provider.on("chainChanged", (x: any) => {
      utils.actionWhenWalletChange("chainChanged", x, newWallet);
    });
    provider.on("disconnect", (x: any) => {
      utils.actionWhenWalletChange("disconnect", x, newWallet);
    });
    return newWallet;
  } catch (e) {
    window.alert(e);
    return defaultWallet;
  }
};
