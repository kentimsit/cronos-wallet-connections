import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface IProps {}

const Header: React.FC<IProps> = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#0B1521" }} enableColorOnDark>
          <Toolbar>
            <img alt="Logo" height="48px" src="/images/header-logo.png" />
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Header;
