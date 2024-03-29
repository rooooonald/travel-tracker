import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import ItineraryContextProvider from "./store/itinerary-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ItineraryContextProvider>
      <App />
    </ItineraryContextProvider>
  </React.StrictMode>
);
