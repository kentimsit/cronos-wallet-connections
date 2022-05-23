import React from "react";

import Typography from "@mui/material/Typography";
import { AppBar, Box } from "@mui/material";

interface IProps {}

const Footer: React.FC<IProps> = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1, marginTop: "100px" }}>
        <AppBar position="static" sx={{ bgcolor: "#0B1521" }} enableColorOnDark>
          <Box sx={{ textAlign: "center", m: 2 }}>
            <Typography>App provided as is</Typography>
          </Box>
        </AppBar>
      </Box>
    </div>
  );
};

export default Footer;
