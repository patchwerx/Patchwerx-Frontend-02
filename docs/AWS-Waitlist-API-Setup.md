# AWS Setup for Waitlist API

This document describes what to configure in AWS so the Waitlist page can list and update clients (Postgres `clients` table) via API Gateway + Lambda.

## Target API Contract

| Method | Path | Headers / Body | Purpose |
|--------|------|----------------|---------|
| **GET** | `/clients` | Query: `email` (signed-in therapist's email). Optional header: `X-Therapist-Email`. | List clients for that therapist, sorted by `contact_group` (A, B, C). Backend resolves `therapist_id` from email (see below). Frontend uses query param so GET can avoid CORS preflight when the API doesn’t yet return CORS headers. |
| **PATCH** | `/clients/{id}` | Header: `X-Therapist-Email`; Body: `{ display_name?, phone_e164?, contact_group? }` | Update one client; `contact_group` must be `A`, `B`, or `C`. Backend must ensure the client belongs to the therapist identified by email. |

The frontend uses `REACT_APP_API_BASE_URL`. For **GET** it sends the therapist email as query param `email` (so the request stays “simple” and may not trigger CORS preflight). For **PATCH** it sends `X-Therapist-Email` and the JSON body.

### Resolving therapist_id from email

The frontend does **not** send `therapist_id`. The backend must:

1. For **GET /clients**: read therapist email from query param **`email`** (or from header `X-Therapist-Email` if present). For **PATCH /clients/:id**: read from header **`X-Therapist-Email`**. Normalize to lowercase if your `therapists` table uses case-insensitive email.
2. Query: `SELECT id FROM therapists WHERE email = $1` (or equivalent; use citext/lower as in your schema).
3. If no row: return **401 Unauthorized** (unknown therapist).
4. Use the returned `id` as `therapist_id` for:
   - **GET /clients**: `SELECT * FROM clients WHERE therapist_id = $1 ORDER BY contact_group`
   - **PATCH /clients/:id**: `UPDATE clients SET ... WHERE id = $1 AND therapist_id = $2 RETURNING *` (so only that therapist's clients can be updated).

---

## 1. API Gateway (HTTP API or REST API)

**Option A: HTTP API (recommended – simpler, cheaper)**  
- Create an HTTP API in API Gateway.
- Add routes:
  - `GET /clients` → integrate with Lambda (list clients).
  - `PATCH /clients/{id}` → integrate with Lambda (update client); path parameter `id`.
- Enable CORS for your frontend origin (e.g. Amplify URL or custom domain).
- Optional: attach a custom domain and/or API key / JWT authorizer (see Auth below).

**Option B: REST API**  
- Create a REST API, add the same two resources and methods.
- Enable CORS on the resources.
- Use Lambda proxy integration so the Lambda receives the full request (path, query, body, headers).

**Result:** You get an invoke URL like  
`https://<api-id>.execute-api.<region>.amazonaws.com` (HTTP API) or with a stage like `/prod`. Set `REACT_APP_API_BASE_URL` to that base URL (no trailing slash).

---

## 2. Lambda Functions

You need logic that talks to Postgres and returns/updates rows in the `clients` table.

### Option 1: Two Lambdas (simplest to reason about)

- **ListClients**
  - Trigger: `GET /clients` (API Gateway).
  - Input: query string `therapist_id` (required).
  - Logic: query Postgres `SELECT * FROM clients WHERE therapist_id = $1 ORDER BY contact_group` (A then B then C).
  - Response: `200` with JSON array of client objects (or `{ clients: [...] }`). Return `401` if therapist_id is missing or invalid; `500` on DB error.

- **UpdateClient**
  - Trigger: `PATCH /clients/{id}` (API Gateway).
  - Input: path parameter `id` (client UUID), body `{ display_name?, phone_e164?, contact_group? }`.
  - Logic: validate `contact_group` in `('A','B','C')` if present; then `UPDATE clients SET display_name = COALESCE($2, display_name), phone_e164 = COALESCE($3, phone_e164), contact_group = COALESCE($4, contact_group), updated_at = now() WHERE id = $1 AND therapist_id = $5 RETURNING *`.
  - Response: `200` with updated client JSON; `403` if client doesn’t belong to therapist; `404` if no row; `400` if validation fails; `500` on DB error.

### Option 2: One Lambda (single handler)

- One Lambda with API Gateway proxy integration.
- Handler inspects `requestContext.http.method` and path (e.g. `GET /clients` vs `PATCH /clients/:id`), then:
  - **GET /clients** → read `therapist_id` from query string, run the same SELECT, return array.
  - **PATCH /clients/:id** → read `id` from path, body from JSON, enforce `therapist_id` (from token or body – see Auth), run the same UPDATE and return updated row.

Either way, the **database connection** must be handled in a way that works with Lambda (short-lived connections or connection pooling – see next section).

---

## 3. Database Access (Postgres / RDS)

- **RDS (Postgres)** or **Aurora Postgres**: the `clients` table already exists; Lambda must be able to reach it.

**Option A: Lambda in VPC + RDS in same VPC (or peered)**  
- Put the Lambda in the same VPC as the RDS instance (same subnets as the DB, or private subnets with a route to RDS).
- Use RDS security group to allow inbound from the Lambda security group (e.g. port 5432).
- Provide DB host, port, user, password (or IAM auth) via Lambda environment variables or Secrets Manager.
- **Caveat:** Lambda in a VPC needs NAT (or VPC endpoints) to reach the internet if you need it elsewhere; for only RDS access, no NAT required.

**Option B: RDS Proxy (recommended for serverless)**  
- Create an RDS Proxy in front of your Postgres instance.
- Lambda connects to the **proxy** endpoint (not the RDS endpoint); the proxy handles connection pooling and works well with many concurrent Lambda invocations.
- Lambda still in VPC, with access to the proxy (proxy is in the same VPC). Use Secrets Manager for DB credentials; RDS Proxy can use the same secret.

**Security:** Store DB credentials in **AWS Secrets Manager** (or SSM Parameter Store). Lambda gets them at runtime; never put raw passwords in environment variables in the console.

---

## 4. IAM

- **Lambda execution role**
  - `lambda.amazon.com` basic execution (logs to CloudWatch).
  - If in VPC: `ec2:CreateNetworkInterface`, `ec2:DescribeNetworkInterfaces`, `ec2:DeleteNetworkInterface` on the relevant VPC/subnet/sg (or use a managed policy like `AWSLambdaVPCAccessExecutionRole`).
  - If using Secrets Manager: `secretsmanager:GetSecretValue` on the DB secret.
- **API Gateway**
  - Needs permission to invoke the Lambda(s). With HTTP API or REST API Lambda integration, this is usually configured in the API Gateway console when you add the integration (API Gateway gets an implicit resource policy to call the Lambda).

---

## 5. Auth (who is the therapist?)

Right now the frontend sends `therapist_id` in the query for GET and the backend can send it implicitly for PATCH (e.g. from the updated row’s `therapist_id`). For production you want to **identify the therapist from the request**, not trust the client.

- **Cognito (recommended if you use Cognito for login)**  
  - Frontend gets an ID or access token after login; send it in `Authorization: Bearer <token>`.
  - API Gateway: use a **Cognito JWT authorizer** (HTTP API or REST API) so only authenticated requests reach Lambda.
  - Lambda: decode the token (or use API Gateway passing claims) to get a stable therapist identifier (e.g. `sub` or a custom claim that maps to `therapists.id`). Use that as `therapist_id` for GET and for PATCH (so you only allow updates to that therapist’s clients).

- **API Key / custom header**  
  - Simpler but less secure: e.g. require a shared API key or a header like `X-Therapist-Id`. Use only for internal or low-risk use.

- **No auth (dev only)**  
  - You can temporarily allow unauthenticated access and rely on `therapist_id` in the query and path; lock it down with Cognito (or similar) before production.

---

## 6. CORS

- For **HTTP API**: In the API Gateway console, configure CORS for your frontend origin (e.g. `https://your-app.amplifyapp.com` or `http://localhost:3000`). Allow `GET`, `PATCH`, and the headers you use (e.g. `Content-Type`, `Authorization`).
- For **REST API**: Enable CORS on the `/clients` resource (and `/clients/{id}` if you use that) and return `Access-Control-Allow-Origin` (and other CORS headers) from the Lambda if you’re not using the console CORS wizard.

---

## 7. Checklist Summary

| Step | Action |
|------|--------|
| 1 | Create API Gateway (HTTP or REST) with `GET /clients` and `PATCH /clients/{id}`. |
| 2 | Create Lambda (one or two) that query/update Postgres `clients`; implement GET (by `therapist_id`) and PATCH (by `id`, validate `contact_group` A/B/C). |
| 3 | Put Lambda in VPC if RDS is in VPC; use RDS Proxy for connection pooling if you have many concurrent requests. |
| 4 | Store DB credentials in Secrets Manager; grant Lambda access to the secret. |
| 5 | Grant Lambda execution role VPC (if used) and Secrets Manager permissions; ensure API Gateway can invoke Lambda. |
| 6 | Add Cognito (or other) authorizer and have Lambda derive `therapist_id` from the token. |
| 7 | Configure CORS for your frontend origin. |
| 8 | Set `REACT_APP_API_BASE_URL` in the frontend to the API Gateway invoke URL. |

Once this is in place, the Waitlist page’s GET and PATCH calls will be served by API Gateway and Lambda, with data read from and written to the `clients` table in Postgres.
