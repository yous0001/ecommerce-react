import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CounterContextProvider from "./contex/Countercontext";
import { UserToken, UsertokenProvider } from "./contex/UserToken";
import { QueryClient, QueryClientProvider } from "react-query";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from "./contex/Cartcontext";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <UsertokenProvider>
    <CartContextProvider>
      <CounterContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </CounterContextProvider>
    </CartContextProvider>
  </UsertokenProvider>
);

reportWebVitals();
