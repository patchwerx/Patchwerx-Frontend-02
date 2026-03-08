# API returns 400 Bad Request (Waitlist PATCH)

The frontend now shows the **exact error message** returned by the API when you get a 400. Check the red error text on the Waitlist page after a failed update.

Common causes of 400 from your Lambda/API:

---

## 1. Request body not parsed (Lambda receives string)

With **REST API proxy integration**, the body is often sent as a **string** in `event.body`. Your Lambda must parse it before use.

**Node.js example:**

```js
let payload = {}
if (event.body) {
  try {
    payload = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) }
  }
}
```

Use `payload.display_name`, `payload.phone_e164`, `payload.contact_group` after that.

---

## 2. Path parameter not read correctly

The client ID is in the URL: `PATCH /clients/87fd9a6e-9e2a-4a52-84da-e52d3de10911`.

- **REST API (proxy):** `event.pathParameters.id` or `event.pathParameters?.id`
- **HTTP API (v2):** `event.pathParameters?.id` (same)

If your code uses a different key (e.g. `event.path.id`), you may get a missing/invalid ID and return 400. Use the correct path parameter for your integration.

---

## 3. Validation failing

- **contact_group** must be exactly one of `'A'`, `'B'`, `'C'` (database check constraint). If you send anything else (e.g. lowercase `"a"`, or a number), return 400 with a clear message like: `"contact_group must be A, B, or C"`.
- **phone_e164**: if you validate format (e.g. E.164), invalid values should return 400 with a clear message.
- **display_name**: if you have max length or other rules, return 400 when violated.

Return a JSON body so the frontend can show it, e.g.:

```js
{ statusCode: 400, body: JSON.stringify({ error: 'contact_group must be A, B, or C' }) }
```

---

## 4. Empty or missing body

Some setups return 400 when the body is missing or empty. The frontend sends:

- For **group change:** `{ "contact_group": "A" }` (or "B" or "C")
- For **name/phone save:** `{ "display_name": "..." }` and/or `{ "phone_e164": "..." }`

So the body is never empty. If your Lambda requires a non-empty body, ensure it only runs after parsing `event.body` (see §1).

---

## Next step

After the frontend change, **trigger the failing action again** (e.g. change group or save edit). The Waitlist page will display the API’s error message. Use that message to fix the Lambda (parsing, path param, or validation) and redeploy.
