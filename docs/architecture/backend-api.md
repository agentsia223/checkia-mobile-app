# Backend API Contract

Check-IA Mobile connects to the main Check-IA backend through authenticated REST endpoints.

## Authentication

The app signs in, signs up, refreshes, and signs out through the official Supabase SDK. It sends the active Supabase access token to the backend:

```text
Authorization: Bearer <supabase_jwt>
```

The app must not call backend `/api/auth/*` proxy endpoints.

## Routes

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/submissions/` | Submit text or URL verification |
| `GET` | `/api/task-status/{taskId}/` | Poll asynchronous task status |
| `GET` | `/api/user-submissions/` | Get authenticated text and URL history |
| `POST` | `/api/detect-ai-image/` | Detect AI-generated images |
| `POST` | `/api/verify-image-content/` | Verify an image against a claim |
| `GET` | `/api/image-verifications/` | Get authenticated image history |
| `GET` | `/api/facts/` | Read public verified facts |
| `GET` | `/api/keywords/` | Read public keywords |

Text and URL submissions poll `/api/task-status/{taskId}/` until the backend status leaves `en cours`. Image submissions use the same task endpoint until the asynchronous image verification returns a final result.

API code preserves backend French status strings such as `en cours`, `vérifié`, and `rejeté`, then maps them to UI copy through shared utilities.
