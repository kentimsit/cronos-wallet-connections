import { ethers } from "ethers";
import React from "react";

export type Dispatch = React.Dispatch<IAction>;

export interface IState {
  context: string;
  refreshing: IRefreshing;
  wallet: IWallet;
  chainData: IChainData;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IRefreshing {
  status: boolean;
  message: string;
}

export const defaultRefreshing = {
  status: false,
  message: "Please wait a few seconds...",
};

export interface IWallet {
  walletProviderName: string; // for example, "metamask" or "defiwallet"
  address: string; // 0x address of the user
  browserWeb3Provider: any; // Web3 provider connected to the wallet's browser extension, used to sign transactions
  serverWeb3Provider: ethers.providers.JsonRpcProvider | null; // cloud based Web3 provider, used for read-only
  connected: boolean; // is the wallet connected to the Dapp, or not?
  chainId: number; // for example, 25 for Cronos mainnet, and 338 for Cronos testnet
}

export const defaultWallet: IWallet = {
  walletProviderName: "",
  address: "",
  browserWeb3Provider: null,
  serverWeb3Provider: null,
  connected: false,
  chainId: 0,
};

export interface IChainData {
  croBalance: number;
}

export const defaultChainData: IChainData = {
  croBalance: 0,
};
