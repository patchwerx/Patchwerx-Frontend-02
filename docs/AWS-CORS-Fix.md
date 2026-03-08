# Fix CORS for localhost (Waitlist API)

When the frontend at `http://localhost:3000` calls your API, the browser sends a **preflight** `OPTIONS` request (especially because we send the custom header `X-Therapist-Email`). The API must respond with CORS headers or the browser blocks the request with:

> No 'Access-Control-Allow-Origin' header is present on the requested resource.

Fix this **in AWS** (API Gateway and/or Lambda), not in the React app.

**Important:** The frontend sends the header **`X-Therapist-Email`** on both GET and PATCH. You must include `X-Therapist-Email` in **Access-Control-Allow-Headers** or the preflight will fail.

---

## If you're using **API Gateway HTTP API** (v2)

1. Open **API Gateway** → your API → **CORS** in the left sidebar.
2. Under **Configure CORS**, add:
   - **Access-Control-Allow-Origin**: `http://localhost:3000`  
     (For production, add your Amplify/production origin or use `*` only for dev.)
   - **Access-Control-Allow-Methods**: `GET, PATCH, OPTIONS`
   - **Access-Control-Allow-Headers**: `Content-Type, Authorization, X-Therapist-Email`
3. Save. Redeploy the API if it asks (or ensure the default stage is updated).

HTTP API often handles **OPTIONS** automatically once CORS is configured. If you still see the error, ensure there is an explicit **OPTIONS** route or that “CORS” is enabled for the routes that need it.

---

## If you're using **API Gateway REST API** (v1)

REST API does **not** send CORS headers by itself. You have two options.

### Option A: Enable CORS via API Gateway console (simplest)

1. Select your API → **Resources**.
2. Select the `/clients` resource (and if separate, `/clients/{id}`).
3. Click **Actions** → **Enable CORS**.
4. In the dialog:
   - **Access-Control-Allow-Origin**: `http://localhost:3000`
   - **Access-Control-Allow-Headers**: `Content-Type, Authorization, X-Therapist-Email`
   - Leave the method list as suggested (includes OPTIONS).
5. Confirm. This adds an **OPTIONS** method and gateway responses that return the CORS headers.
6. **Redeploy** the API to your stage (e.g. **Deploy API** → choose stage → Deploy).

### Option B: Lambda returns CORS headers (required if Option A isn’t enough)

Your Lambda must return CORS headers on **every** response, including for **OPTIONS** (preflight).

**1. Handle OPTIONS in Lambda**

If the request method is `OPTIONS`, return immediately with status 200 and CORS headers (no body needed):

```js
// Node.js example
const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Methods': 'GET, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Therapist-Email',
};

exports.handler = async (event) => {
  if (event.requestContext?.http?.method === 'OPTIONS' || event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }
  // ... your GET / PATCH logic ...
};
```

**2. Add the same headers to GET and PATCH responses**

Example for a GET response:

```js
return {
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Therapist-Email',
  },
  body: JSON.stringify(clients),
};
```

Do the same for PATCH (and any error responses like 400, 403, 404, 500) so every response includes `Access-Control-Allow-Origin`.

**3. OPTIONS method in API Gateway (REST API)**

- Add a method **OPTIONS** on `/clients` and on `/clients/{id}` (if you use that path).
- Integrate OPTIONS with the **same Lambda** that returns the 200 + CORS headers above, **or** use a mock integration that returns 200 with the same CORS headers.

---

## Checklist

- [ ] Origin `http://localhost:3000` is allowed in CORS config (API Gateway or Lambda).
- [ ] Methods `GET`, `PATCH`, and `OPTIONS` are allowed.
- [ ] Headers `Content-Type`, `Authorization`, and **`X-Therapist-Email`** are allowed (required for Waitlist).
- [ ] For REST API: OPTIONS is configured and API is **redeployed**.
- [ ] Lambda (if used) returns the same CORS headers on **every** response (2xx and 4xx/5xx).

After changing API Gateway or Lambda, wait a few seconds and try the Waitlist page again from `http://localhost:3000`.
