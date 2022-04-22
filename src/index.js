import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import generateMediaFile from "./swDev";

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
});

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
    heading: "Be Vietnam Pro",
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// generateMediaFile();
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
