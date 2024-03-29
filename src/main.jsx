import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/db";

import ItineraryContextProvider from "./store/itinerary-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ItineraryContextProvider>
        <App />
      </ItineraryContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
