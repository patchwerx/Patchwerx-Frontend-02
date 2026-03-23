# Client Profile API (Dashboard / `Profile.jsx`)

The client dashboard (`/client`) loads therapist name and appointments via:

| Method | Path | Query | Purpose |
|--------|------|-------|---------|
| **GET** | `/client/profile` | `email` — signed-in client’s email (Cognito) | Return therapist `first_name` / `last_name` and a list of appointments |

Use the same base URL as the rest of the app: `REACT_APP_API_BASE_URL` (no trailing slash).

## Auth

- Resolve the **client** from `email` (must match the authenticated user’s email in production).
- Return **401** if the client is unknown or email is invalid.

## Response shape

```json
{
  "therapist": {
    "first_name": "Jane",
    "last_name": "Smith"
  },
  "appointments": [
    {
      "id": "uuid",
      "status": "CONFIRMED",
      "starts_at": "2025-03-20T15:00:00.000Z",
      "ends_at": "2025-03-20T16:00:00.000Z",
      "title": "Session"
    },
    {
      "id": "uuid",
      "status": "OPEN_REBOOKING",
      "starts_at": "2025-03-18T14:00:00.000Z",
      "ends_at": null,
      "title": "Session"
    }
  ]
}
```

### Status values (frontend)

- **`CONFIRMED`** — shown under **Upcoming appointments** only if `starts_at` is in the **future** (client browser clock).
- **`OPEN_REBOOKING`** — shown under **Open for rebooking** (all such rows; sorted by `starts_at`).

Optional: camelCase (`firstName`, `startsAt`) is accepted; the frontend normalizes.

## CORS

The browser still enforces CORS for `http://localhost:3000` → API Gateway unless the API returns `Access-Control-Allow-Origin`.

**Option A — Fix in AWS (required for production):** Configure API Gateway CORS for your frontend origins (e.g. `http://localhost:3000`, your Amplify URL). See `docs/AWS-CORS-Fix.md`.

**Option B — Local dev proxy (this repo):** In `.env.local` set `REACT_APP_DEV_PROXY=1` (and keep `REACT_APP_API_BASE_URL` pointing at your API). The React dev server proxies `/__pw-api/*` to the API so requests are same-origin and CORS does not apply. See `src/utils/apiBase.js` and `src/setupProxy.js`.

Prefer a **simple** GET (query param only) when calling cross-origin without a proxy—same pattern as `GET /clients?email=...` for therapists.
