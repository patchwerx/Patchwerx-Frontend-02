import { LogLevel } from "@azure/msal-browser";

const clientId = process.env.REACT_APP_AAD_CLIENT_ID;
const authority =
  process.env.REACT_APP_AAD_AUTHORITY || "https://login.microsoftonline.com/common";

// MSAL redirect URI (for any MSAL-based flows only). Not used for Outlook calendar connect.
// Calendar connect uses calendarConnectAuthorize.js and redirect_uri = origin + "/auth/microsoft/callback".
const redirectUri =
  typeof window !== "undefined" ? window.location.origin : "";

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

// Delegated Graph scopes (calendar automation). offline_access required for refresh_token.
// export const loginRequest = {
//   scopes: [
//     "openid",
//     "profile",
//     "offline_access",
//     "User.Read",
//     "Calendars.Read",
//     "Calendars.ReadWrite",
//   ],
// };

export const loginRequest = {
  scopes: [
    "openid",
  ],
};

export const graphConfig = {
  graphMe: "https://graph.microsoft.com/v1.0/me",
  events: "https://graph.microsoft.com/v1.0/me/events",
};