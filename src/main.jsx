import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <Provider store={store}>
        {/* <AuthContextProvider> */}
        <App />
        {/* </AuthContextProvider> */}
      </Provider>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);
