import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { AuthProvider } from "react-oidc-context";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./auth/msalConfig";

const msalInstance = new PublicClientApplication(msalConfig);

const cognitoAuthConfig = {
  authority: "https://us-east-1kkhtcwhmw.auth.us-east-1.amazoncognito.com",
  client_id: "2od6tvtbrc3ua7ddhe5l6ia3bb",
  redirect_uri: "https://www.patchwerx.com/auth/cognito/callback",
  response_type: "code",
  scope: "openid email phone",
  onSigninCallback: () => {
    // remove ?code=...&state=... from the URL after sign-in
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </AuthProvider>
  </React.StrictMode>
);