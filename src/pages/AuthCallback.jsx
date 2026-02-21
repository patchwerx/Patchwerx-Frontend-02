import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/msalConfig";

export default function AuthCallback() {
  const { instance, accounts } = useMsal();
  const [msg, setMsg] = useState("Completing sign-in…");

  useEffect(() => {
    // MSAL processes the redirect response here.
    instance
      .handleRedirectPromise()
      .then(async (result) => {
        if (result?.account) {
          instance.setActiveAccount(result.account);
        } else if (accounts?.[0]) {
          instance.setActiveAccount(accounts[0]);
        }

        // Optional: warm token cache so next step is fast
        await instance.acquireTokenSilent({
          ...loginRequest,
          account: instance.getActiveAccount() || accounts?.[0],
        });

        // Redirect somewhere useful
        window.location.replace("/"); // or navigate()
      })
      .catch((e) => {
        console.error(e);
        setMsg(`Auth error: ${e?.message || "unknown error"}`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div style={{ padding: 18 }}>{msg}</div>;
}