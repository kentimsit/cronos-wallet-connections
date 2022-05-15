import React, { useCallback } from "react";
import { Store } from "../store/store-reducer";

import * as config from "../config/config";
import * as utils from "../helpers/utils";
import * as walletConnect from "../helpers/wallet-connect";
import * as walletMetamask from "../helpers/wallet-metamask";
import * as walletDefiwallet from "../helpers/wallet-defiwallet";
import {
  updateChainDataAction,
  updateRefreshingAction,
  updateWalletAction,
} from "../store/actions";

import { styled } from "@mui/material/styles";
import { Box, Button, Paper, Typography } from "@mui/material";
import { defaultChainData } from "../store/interfaces";

const ActionButton = styled(Button)({
  marginTop: "20px",
  marginBottom: "20px",
  marginLeft: "10px",
  marginRight: "10px",
  padding: "6px 12px",
});

interface IProps {}

const Home: React.FC<IProps> = () => {
  const { state, dispatch } = React.useContext(Store);

  const connectWallet = useCallback(async (option: string) => {
    // updateWalletAction(dispatch, { ...defaultWallet });
    // updateQueryResultsAction(dispatch, { ...defaultQueryResults });
    let newWallet: any;
    switch (option) {
      // Wallet injected within browser (MetaMask)
      case "injected":
        newWallet = await walletMetamask.connect();
        break;
      // Crypto.com DeFi Wallet Extension (browser)
      case "defi-wallet":
        newWallet = await walletDefiwallet.connect();
        break;
      // Crypto.com DeFi Wallet mobile app (via Wallet Connect)
      case "wallet-connect":
        newWallet = await walletConnect.connect();
        break;
      default:
    }

    updateRefreshingAction(dispatch, {
      status: true,
      message: "Connecting wallet...",
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // If wallet is connected, query the wallet and update stored values
    if (newWallet.connected) {
      const croBalance = await utils.getCroBalance(
        newWallet.serverWeb3Provider,
        newWallet.address
      );
      updateWalletAction(dispatch, newWallet);
      updateChainDataAction(dispatch, {
        ...defaultChainData,
        croBalance: croBalance,
      });
      updateRefreshingAction(dispatch, {
        status: false,
        message: "Complete",
      });
    } else {
      updateRefreshingAction(dispatch, {
        status: false,
        message: "Complete",
      });
    }
  }, []);

  React.useEffect(() => {
    async function initialLoad() {
      await connectWallet("defi-wallet");
      console.log("Initial load");
    }

    initialLoad();
  }, [connectWallet]);

  const transferCRO = async (recipientAddress: string, valueCro: number) => {
    window.alert("Transfer feature not yet implemented");
  };

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          m: 5,
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 2,
            bgcolor: "#182339",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{ color: "white", marginBottom: 4 }}
          >
            Cronos Wallet Connections - demo
          </Typography>
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            sx={{ color: "white", marginBottom: 2 }}
          >
            This app is a lightweight demo of crypto wallet integration with
            Cronos. It works with Crypto.com Defi Wallet, MetaMask, and Trust
            Wallet. Please refer to the README.md file for explanations and
            instructions.
          </Typography>
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            sx={{ color: "white", marginBottom: 2 }}
          >
            The app is designed to connect automatically with Crypto.com DeFi
            Wallet from within the Dapp browser. However, this only works if the
            domain has been allow-listed by the Crypto.com DeFi Wallet team.
            (See README.md)
          </Typography>
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            sx={{ color: "white", marginBottom: 2 }}
          >
            Wallet connection status:{" "}
            {state.wallet.connected ? "connected" : "not connected"}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            sx={{ color: "white", marginBottom: 2 }}
          >
            Wallet address:{" "}
            {state.wallet.address ? state.wallet.address : "no wallet address"}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            sx={{ color: "white", marginBottom: 2 }}
          >
            CRO balance:{" "}
            {state.wallet.address ? state.chainData.croBalance : "unknown"}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{ color: "white", marginBottom: 2, marginTop: 4 }}
          >
            Wallet connection
          </Typography>
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            sx={{ color: "white", marginBottom: 2 }}
          >
            Use these buttons to connect your crypto wallet.
          </Typography>
          <ActionButton
            variant="contained"
            onClick={() => {
              connectWallet("defi-wallet");
            }}
            sx={{ fontWeight: "bold" }}
          >
            DeFi Wallet
          </ActionButton>
          <ActionButton
            variant="contained"
            onClick={() => {
              connectWallet("wallet-connect");
            }}
            sx={{ fontWeight: "bold" }}
          >
            Wallet Connect
          </ActionButton>
          <ActionButton
            variant="contained"
            onClick={() => {
              connectWallet("injected");
            }}
            sx={{ fontWeight: "bold" }}
          >
            Injected (MetaMask)
          </ActionButton>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{ color: "white", marginBottom: 2, marginTop: 4 }}
          >
            Wallet connection
          </Typography>
          <ActionButton
            variant="contained"
            onClick={() => {
              transferCRO(state.wallet.address, 1);
            }}
            sx={{ fontWeight: "bold" }}
          >
            Transfer 1 CRO to myself
          </ActionButton>
        </Paper>
      </Box>
    </div>
  );
};

export default Home;
