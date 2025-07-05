import React from 'react';
import './App.css';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import {BrowserRouter as Router, Routes, Link, Route} from "react-router-dom"
import RainbowKitInitializer from './components/rainbowkit/RainbowKitInitializer';

import logoMark from './resources/logo-mark.svg';
import Layout from "./components/Layout";
import Header from "./components/Header";
import NotFound from "./routes/errors/NotFound";
import Home from "./routes/Home";
import Footer from "./components/Footer";
import Web3Alert from "./components/alert/Web3Alert";

const theme = extendTheme({
  "colorSchemes": {
    "light": {
      "palette": {
      }
    },
    "dark": {
      "palette": {}
    }
  },
  fontFamily: {
    display: "'Inter', var(--joy-fontFamily-fallback)",
    body: "'Inter', var(--joy-fontFamily-fallback)",
  },
})

function App() {
  return (
    <Router>
      <RainbowKitInitializer>
        <CssVarsProvider theme={theme}>
          <CssBaseline />
          <Layout>
            <div className="bg">
              <Layout.Header>
                <Link to='/' className="logo">
                  <img src={logoMark} alt="AEVM" />
                </Link>
                <Header />
              </Layout.Header>
              <Web3Alert>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Web3Alert>
            </div>
              <Layout.Footer>
                <Footer />
              </Layout.Footer>
          </Layout>
        </CssVarsProvider>
      </RainbowKitInitializer>
    </Router>
  );
}

export default App;
