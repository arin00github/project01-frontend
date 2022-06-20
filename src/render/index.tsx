import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import baseTheme from "./theme";
import App from "./App";

const rootElement = document.getElementById("root");

const fragment = new DocumentFragment();

const root = ReactDOM.createRoot(rootElement || fragment);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={baseTheme}>
      <DarkMode>
        <App />
      </DarkMode>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
