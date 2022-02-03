import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
})

const theme = extendTheme({
  colors: {
    brand: {
      0: "#ffffff",
      25: "#eeeeee",
      50: "#e7e6e6",
      100: "#C6C6C6",
      200: "#919191",
      300: "#6A6A6A",
      400: "#5E5E5E",
      500: "#303030",
      600: "#000000",
    },
    core: {
      0: "#F3D6FF",
      25: "#E5C8F1",
      50: "#C1A5CC",
      100: "#A085AB",
      200: "#987DA3",
      300: "#91779C",
      400: "#634B6E",
      500: "#584163",
      600: "#392343",
    },
  },
  breakpoints,
  fonts: {
    heading:  'Be Vietnam Pro',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
