import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from "./layouts/QueryProvider.tsx";
import RouteGuard from "./layouts/RouteGuard.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteGuard>
        <QueryProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </QueryProvider>
      </RouteGuard>
    </BrowserRouter>
  </React.StrictMode>
);
