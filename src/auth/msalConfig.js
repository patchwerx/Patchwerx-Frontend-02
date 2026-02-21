import { LogLevel } from "@azure/msal-browser";

const clientId = process.env.REACT_APP_AAD_CLIENT_ID;
const authority =
  process.env.REACT_APP_AAD_AUTHORITY || "https://login.microsoftonline.com/common";

const redirectUri = `${window.location.origin}/auth/microsoft/callback`;

console.log("MSAL clientId:", clientId);
console.log("MSAL authority:", authority);
console.log("MSAL redirectUri:", redirectUri);

if (!clientId) {
  // eslint-disable-next-line no-console
  console.warn("Missing REACT_APP_AAD_CLIENT_ID");
}

export const msalConfig = {
  auth: {
    clientId,
    authority,
    redirectUri,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        if (level === LogLevel.Error) console.error(message);
        else if (level === LogLevel.Warning) console.warn(message);
        else if (level === LogLevel.Info) console.info(message);
        else console.debug(message);
      },
      logLevel: LogLevel.Info,
    },
  },
};

// Delegated Graph scopes (calendar automation)
export const loginRequest = {
  scopes: ["User.Read", "Calendars.ReadWrite", "offline_access"],
};

export const graphConfig = {
  graphMe: "https://graph.microsoft.com/v1.0/me",
  events: "https://graph.microsoft.com/v1.0/me/events",
};