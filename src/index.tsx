import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

const root = createRoot(document.getElementById("root")!);
require("dotenv").config();

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
