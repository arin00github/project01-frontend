import { ChakraProvider, DarkMode } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import baseTheme from "./theme";
import App from "./App";
import proj4 from "proj4";
import { MapProjection } from "Component/gis/map-projection";
import { register } from "ol/proj/proj4";
import { Provider } from "react-redux";
import store from "Store/index";

proj4.defs("EPSG:5179", MapProjection.baroHdProj);
proj4.defs("EPSG:5181", MapProjection.kakaoProj);
register(proj4);

const rootElement = document.getElementById("root");

const fragment = new DocumentFragment();

const root = ReactDOM.createRoot(rootElement || fragment);
root.render(
  <Provider store={store}>
    <ChakraProvider theme={baseTheme}>
      <DarkMode>
        <App />
      </DarkMode>
    </ChakraProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
