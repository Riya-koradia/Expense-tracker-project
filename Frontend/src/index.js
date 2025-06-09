import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import theme from "./assets/css/theme";
import "./App.css";
import rootReducer from "./store/reducers";
import {thunk} from "redux-thunk";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { SnackbarProvider } from "notistack";


  const store = configureStore({ reducer: rootReducer });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={4} autoHideDuration={2000}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <App />
        </LocalizationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>
);

