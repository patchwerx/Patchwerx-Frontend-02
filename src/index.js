import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { AuthProvider } from "react-oidc-context";
import { cognitoOidcConfig } from "./config/cognito";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./auth/msalConfig";

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider {...cognitoOidcConfig}>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </AuthProvider>
  </React.StrictMode>
);