import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import React from "react";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No element with id 'root' found");
}

createRoot(rootElement).render(<App />);
