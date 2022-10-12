# Cronos Wallet Connections: Crypto.Com DeFi Wallet, MetaMask, Trust Wallet, Wallet Connect V1

This ReactJS repository demonstrates various types of crypto wallet connections when integrating with Cronos chain.

You may refer to this blog post for context: [Medium post](https://medium.com/cronos-chain/cronos-developer-series-connect-your-dapp-with-defi-wallet-metamask-and-trust-wallet-77419fe696a5)

## Overview

This app is a lightweight demo of crypto wallet integration with Cronos. It works with Crypto.com DeFi Wallet, MetaMask, and Trust Wallet.

The app works on Cronos mainnet (network id: 25) and uses the public JSON-RPC endpoint.

So first, you will need to make the app compatible with :

- Crypto.com DeFi Wallet browser extension
- Injected Web3 provider (MetaMask, Trust Wallet)
- Wallet Connect (v1)

These wallet connections are implemented in the helpers directory, which is used by the Home.tsx component. The wallet and Web3 connection are stored in the redux store (see store directory).

Once the above is done, you may want to get in touch with the Crypto.com DeFi Wallet and Trust Wallet teams to increase the visibility of your Dapp. Please visit the Cronos developer FAQ at [crofam.me/devtips](https://crofam.me/devtips) for more details about this.

## Packages used by this repository

```shell
npx create-react-app my-app --template typescript
npm install react-router-dom @types/react-router-dom http-proxy-middleware
npm install ethers web3 @walletconnect/web3-provider
npm install "@deficonnect/web3-connector"
npm install "@web3-react/core" "@web3-react/injected-connector" "@web3-react/walletconnect-connector"
npm install @mui/material @emotion/react @emotion/styled
```

Webpack 5 can create some "BREAKING CHANGE: webpack<5 used to include polyfills" errors when using with web3.js. This blog post explains how to resolve the issue: [blog post](https://www.alchemy.com/blog/how-to-polyfill-node-core-modules-in-webpack-5).

## How to run locally

Run the app locally to test it in your desktop browser.

If you'd like to test it on mobile, you can use the ngrok software which will explose a public URL for your localhost:3000.

```shell
npm install
npm start
```

## Additional details about Crypto.com DeFi Wallet

The older [deficonnect](https://www.npmjs.com/package/deficonnect) npm package has been deprecated.

The latest package for Crypto.com DeFi Wallet integration is [https://www.npmjs.com/package/@deficonnect/web3-connector](https://www.npmjs.com/package/@deficonnect/web3-connector).

The DefiWeb3Connector object uses the underlying DefiConnectProvider object which is provided by [https://www.npmjs.com/package/@deficonnect/provider](https://www.npmjs.com/package/@deficonnect/provider). DefiConnectProvider, in turn, uses window.deficonnectprovider or window.ethereum as the Web3 interface that lives in the browser (window.ethereum only works with the DeFi Wallet only if MetaMask is not installed; window.deficonnectprovider always works). Most developers can simply use DefiWeb3Connector as shown in this example. A few developers may need to access DefiConnectProvider or window.deficonnectprovider directly, for example if they are not using React or if they need more customization.
