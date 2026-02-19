import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";

createRoot(document.getElementById('root')).render(<App />)

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_kKhtCwHmW",
  client_id: "2od6tvtbrc3ua7ddhe5l6ia3bb",
  redirect_uri: "https://www.patchwerx.com",
  response_type: "code",
  scope: "phone openid email",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);