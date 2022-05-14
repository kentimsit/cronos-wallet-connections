import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Refreshing from "./Refreshing";
import Debug from "./Debug";

import { Box } from "@mui/material";

function App() {
  return (
    <div>
      <Box sx={{ bgcolor: "#0B1521" }}>
        <Header />
        <Refreshing />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home /> <Debug />
              </>
            }
          />
        </Routes>
        <Footer />
      </Box>
    </div>
  );
}

export default App;
