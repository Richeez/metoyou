import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Routes.jsx";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";
import "../theme/theme.css";

import { store } from "./app/store";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { Toaster as ToastContainer } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Provider store={store}>
          {/* <AuthContextProvider> */}
          <App />
          {/* </AuthContextProvider> */}
        </Provider>
        <ToastContainer />
      </QueryClientProvider>
    </BrowserRouter>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </React.StrictMode>
);
