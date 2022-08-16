# cronos-wallet-connections

This ReactJS repository demonstrates various types of crypto wallet connections when integrating with Cronos chain.

## Overview

### How to use this repository

This app is a lightweight demo of crypto wallet integration with Cronos. It works with Crypto.com DeFi Wallet, MetaMask, and Trust Wallet.

The app works on Cronos mainnet (network id: 25) and uses the public JSON-RPC endpoint.

So first, you will need to make the app compatible with :

- Crypto.com DeFi Wallet browser extension
- Injected Web3 provider (MetaMask, Trust Wallet)
- Wallet Connect (v1)

These wallet connections are implemented in the helpers directory, which is used by the Home.tsx component. The wallet and Web3 connection are stored in the redux store (see store directory).

Run the app locally to test it in your desktop browser.

If you'd like to test it on mobile, you can use the ngrok software which will explose a public URL for your localhost:3000.

Once the above is done, you will want to enable users to connect automatically with your Dapp from within the Crypto.com DeFi Wallet's Dapp browser. This actually does not require any additional development aside from the implementation of the Crypto.com DeFi Wallet browser extension. However, this does require manual review and allow-listing by the Crypto.com team. See below for the process.

Finally, you may want to liaise with the Trust Wallet team in order to have your Dapp and/or token featured in the Trust Wallet browser. See below for the process.

### How to get allow-listed by the Crypto.com DeFi Wallet team

First, let's note that the Crypto.comn DeFi Wallet supports Wallet Connect, so if you have followed the above steps, mobile DeFi Wallet users should already be able to connect to your Dapp via Wallet Connect.

Second, let's examine the steps required to enable users to connect directly with your Dapp from within the DeFi Wallet's mobile Dapp browser.

The first step is to implement login via the Crypto.com Defi Wallet browser extension, using the deficonnect npm package, which is included in this repo, as described above.

See [this doc](https://cronos.org/docs/resources/web-extension-integration.html#introduction) for the official technical information.

Once the above is done and your Dapp is live, you will want to enable users to connect automatically with your Dapp from within the Crypto.com DeFi Wallet's Dapp browser. This actually does not require any additional development but require manual review and allow-listing by the Crypto.com team.

Once the Dapp is live, you need to register it with [crypto.com](http://crypto.com/) using this form [https://crypto-com.typeform.com/to/bRvudlYV](https://crypto-com.typeform.com/to/bRvudlYV). You can request to allow-list a staging domain and the production domain. Each subdomain needs to be allow-listed.

Once this is done, the wallet connection via deficonnect should also work automatically when the user connects to your Dapp from within the DeFi Wallet’s in-app browser.

### How to have your Dapp and/or token featured in the Trust Wallet browser

[Trust Wallet](https://trustwallet.com/) supports the Cronos mainnet. In order to have your Dapp and/or token featured in the Trust Wallet's mobile Dapp browser, refer to [this documentation](https://developer.trustwallet.com/listing-guide).

## Implementation details

### Packages used by this repository

```shell
npx create-react-app my-app --template typescript
npm install react-router-dom @types/react-router-dom http-proxy-middleware
npm install ethers web3 @walletconnect/web3-provider
npm install "@deficonnect/web3-connector" "@deficonnect/provider"
npm install "@web3-react/core" "@web3-react/injected-connector" "@web3-react/walletconnect-connector"
npm install @mui/material @emotion/react @emotion/styled
```

Webpack 5 creates some "BREAKING CHANGE: webpack<5 used to include polyfills" errors when using with web3.js. This blog post explains how to resolve the issue: [blog post](https://www.alchemy.com/blog/how-to-polyfill-node-core-modules-in-webpack-5).

### How to run locally

```shell
npm install
npm start
```

### How to deploy to Heroku (for example)

Yo must have a Proctile (already included in this repository) and the following buildpack installed in the Settings of your Heroku app:

https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz

Then, to deploy to Heroku:

```shell
heroku login
heroku git:remote -a cronos-wallet-connections

# Commit code to master

git push heroku main

# Build another branch;

git push heroku new_branch:master

```
