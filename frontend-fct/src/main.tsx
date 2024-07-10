import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./input.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="p-5 mx-auto max-w-7xl max-h-lvh">
      <App />
      </div>
  </React.StrictMode>
);
