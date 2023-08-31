import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <CookiesProvider allCookies={true}>
        <Navbar />

        <App />
      </CookiesProvider>
    </BrowserRouter>
  </Provider>
);
