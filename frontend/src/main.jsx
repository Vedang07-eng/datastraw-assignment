import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Error handler for React rendering
const handleRenderingError = (error) => {
  console.error("Rendering error:", error);
};

// Create root with error handling
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render app in strict mode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional: Add global error listener
window.addEventListener("error", handleRenderingError);