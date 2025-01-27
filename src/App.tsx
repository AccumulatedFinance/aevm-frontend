import React from 'react';
import './App.css';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import {BrowserRouter as Router, Routes, Link, Route} from "react-router-dom"

import logoMark from './resources/logo-mark.svg';
import Layout from "./components/Layout";
import Header from "./components/Header";
import NotFound from "./routes/errors/NotFound";
import Home from "./routes/Home";
import Footer from "./components/Footer";

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
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
              <Layout.Footer>
                <Footer />
              </Layout.Footer>
          </Layout>
        </CssVarsProvider>
    </Router>
  );
}

export default App;
