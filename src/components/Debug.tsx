import React from "react";
import { Store } from "../store/store-reducer";

import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

import * as config from "../config/config";

interface IProps {}

const Debug: React.FC<IProps> = () => {
  const { state } = React.useContext(Store);

  // This is used to display more details about the Redux state on the web page, for debugging purposes
  // You can activate by changing the mode to "debug" in config/config.ts
  const renderDebugInfo = () => {
    return (
      <Typography variant="body1" component="div" gutterBottom>
        Debug info:{" "}
        {JSON.stringify({
          context: state.context,
          walletProviderName: state.wallet.walletProviderName,
          address: state.wallet.address,
          chainId: state.wallet.chaindId,
          connected: state.wallet.connected,
          ...state.queryResults,
        })}
      </Typography>
    );
  };

  if (config.configVars.mode === "debug") {
    return (
      <div>
        <Box
          sx={{
            flexGrow: 1,
            m: 5,
            minHeight: "500px",
          }}
        >
          <Paper elevation={0}>
            <Typography variant="h5" component="div" gutterBottom>
              Debug
            </Typography>

            {renderDebugInfo()}
          </Paper>
        </Box>
      </div>
    );
  } else {
    if (state.wallet.address && false) {
      return (
        <div>
          <Box
            sx={{
              flexGrow: 1,
              m: 5,
              minHeight: "500px",
            }}
          >
            <Paper elevation={0}>
              <Typography variant="body1" component="div" gutterBottom>
                Wallet {state.wallet.address}
              </Typography>
            </Paper>
          </Box>
        </div>
      );
    } else {
      return null;
    }
  }
};

export default Debug;
