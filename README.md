# cronos-wallet-connections

This ReactJS repository demonstrates various types of crypto wallet connections when integrating with Cronos chain.

## Overview

This app is a lightweight demo of crypto wallet integration with Cronos. It works with Crypto.com Defi Wallet, MetaMask, and Trust Wallet.

The app is designed to connect automatically with Crypto.com DeFi Wallet from within the Dapp browser. However, this only works if the domain has been allow-listed by the Crypto.com DeFi Wallet team.

The app works on Cronos mainnet (network id: 25) and used the public JSON-RPC endpoint.

So first, you will need to make the app compatible with :

- Crypto.com DeFi Wallet browser extension
- Wallet Connect (v1)
- Injected Web3 provider (MetaMask, Trust Wallet)

These wallet connections are implemented in the helpers directory, which is used by the Home.tsx component. The wallet and Web3 connection are stored in the redux store (see store directory).

Run the app locally to test it in your desktop browser.

If you'd like to test it on mobile, use ngrok which will explose a public URL for your localhost:3000.

Then, you will need to register for allow-listing by the Crypto.com DeFi Wallet team.

### How to get allow-listed by the Crypto.com DeFi Wallet team

The first step is to implement login via the Crypto .com Defi Wallet browser extension (for desktop browser), using the deficonnect npm package, which is included in this repo.

See [this doc](https://cronos.org/docs/resources/web-extension-integration.html#introduction) for the official technical information.

Then, once the Dapp front-end is deployed, you need to register it with [crypto.com](http://crypto.com/) using this form [https://crypto-com.typeform.com/to/bRvudlYV](https://crypto-com.typeform.com/to/bRvudlYV). The form will help to bring the Dapp to the Cronos Dapps tab of the Dapp browser on mobile. (They don't do it instantly, please wait couple of weeks). You can request to allow-list a staging domain and the production domain. Each subdomain needs to be allow-listed.

When this is done, the wallet connection via browser extension should also work directly within the Defi Wallet’s in-app browser, via the same Web3 connector.

Meanwhile, of course you can also implement Dapp login via Wallet Connect which works as usual with the Crypto.com Defi Wallet and does not require any allow-listing.

## Implementation details

### Packages used by this repository

```shell
npx create-react-app my-app --template typescript
npm install react-router-dom @types/react-router-dom http-proxy-middleware
npm install ethers web3 @walletconnect/web3-provider deficonnect
npm install @mui/material @emotion/react @emotion/styled
```

Webpack 5 creates some "BREAKING CHANGE: webpack<5 used to include polyfills" errors when using with web3.js. This blog post explains how to resolve the issue: [blog post](https://www.alchemy.com/blog/how-to-polyfill-node-core-modules-in-webpack-5).

### Run locally

```shell
npm start
```

### To deploy to Heroku

Must have a Proctile and the buildpack:

https://buildpack-registry.s3.amazonaws.com/buildpacks/mars/create-react-app.tgz

```shell
heroku login
heroku git:remote -a cronos-wallet-connections

# Commit code to master

git push heroku main

```
