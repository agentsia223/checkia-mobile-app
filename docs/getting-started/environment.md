# Environment Variables

The mobile app reads public Expo runtime configuration from `.env`.

```bash
EXPO_PUBLIC_BACKEND_URL=http://localhost:8000
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Backend URL

`EXPO_PUBLIC_BACKEND_URL` should point to the Check-IA backend root, not the `/api` path.

`EXPO_PUBLIC_API_URL` is still accepted for older local environments and is normalized back to the backend root if it ends in `/api`.

For physical device testing, `localhost` points to the device, not your development machine. Use a LAN IP address or a tunnel URL that you control:

```bash
EXPO_PUBLIC_BACKEND_URL=http://192.168.1.20:8000
```

Do not commit private tunnel URLs.

## Supabase

The app signs users in directly with Supabase Auth and stores sessions through `expo-secure-store`.

Do not point the app at backend `/api/auth/*` proxy endpoints. The backend validates Supabase JWTs sent by the app:

```text
Authorization: Bearer <supabase_jwt>
```

## Sensitive Data

Do not commit:

- `.env` files.
- API keys or service tokens.
- Native signing keys, certificates, or provisioning profiles.
- Production analytics or crash reporting credentials.
- Private tunnel URLs.
