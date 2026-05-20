<div align="center">

<img src="assets/icon.png" alt="Check-IA Mobile Logo" width="120" />

# Check-IA Mobile

**Expo mobile client for the Check-IA fact-checking platform**

[![CI](https://github.com/agentsia223/checkia-mobile-app/actions/workflows/ci.yml/badge.svg)](https://github.com/agentsia223/checkia-mobile-app/actions/workflows/ci.yml)
[![Codecov](https://codecov.io/gh/agentsia223/checkia-mobile-app/branch/main/graph/badge.svg)](https://codecov.io/gh/agentsia223/checkia-mobile-app)
[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=black)](https://reactnative.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[Main Project](https://github.com/agentsia223/check_ia) &bull; [Documentation](https://agentsia223.github.io/checkia-mobile-app/) &bull; [Report Bug](https://github.com/agentsia223/checkia-mobile-app/issues) &bull; [Request Feature](https://github.com/agentsia223/checkia-mobile-app/issues)

</div>

---

## About

Check-IA Mobile is the React Native front end for [Check-IA](https://github.com/agentsia223/check_ia), an open-source fact-checking platform designed for the cultural and linguistic realities of French-speaking Africa. The app brings Check-IA verification workflows to phones through a Supabase-authenticated Expo client.

### Key Features

- **Text and URL Verification** - Submit claims or URLs to the Check-IA backend and poll asynchronous analysis results.
- **Image Verification** - Detect AI-generated images and verify image content through the backend image workflows.
- **Verification History** - Review synchronized text, URL, and image verification history for the signed-in user.
- **Learning Area** - Browse media literacy content written for French-speaking communities.
- **Secure Session Storage** - Store Supabase sessions with `expo-secure-store`.
- **Tested UI and Service Layer** - Cover components, hooks, helpers, and API modules with Jest and React Native Testing Library.

## Project Status

This repository is the public mobile client for Check-IA. Text, URL, authentication, and image verification flows call the backend API. Audio verification remains a UI placeholder until a compatible backend contract is available. Contributions should keep user-facing copy clear for French-speaking audiences and avoid adding hard-coded private service URLs or credentials.

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Runtime** | Expo SDK 54, React Native 0.81, React 19 |
| **Navigation** | Expo Router |
| **Language** | TypeScript |
| **Auth** | Supabase Auth, Expo SecureStore |
| **API Client** | Axios |
| **Testing** | Jest, jest-expo, React Native Testing Library |
| **CI** | GitHub Actions, Codecov-ready coverage |

## Getting Started

### Prerequisites

- Node.js 20.19.4 or newer. Node 22 LTS is recommended.
- npm 10 or newer.
- Git.
- Expo CLI through `npx expo`.
- Android Studio, Xcode, Expo Go, or another Expo-compatible test target.
- Watchman is recommended on macOS and Linux.

### Environment Variables

Create your local environment file:

```bash
cp .env.example .env
```

Set the backend and Supabase project values:

```bash
EXPO_PUBLIC_BACKEND_URL=http://localhost:8000
EXPO_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Do not commit `.env`, tunnel URLs, production API keys, signing keys, certificates, provisioning profiles, or other private deployment material.

### Run Locally

```bash
git clone https://github.com/agentsia223/checkia-mobile-app.git
cd checkia-mobile-app
npm install
npm start
```

Then choose a target from the Expo prompt:

- Press `a` for Android.
- Press `i` for iOS on macOS.
- Press `w` for web.
- Scan the QR code with Expo Go for a physical device.

For physical device testing, `localhost` points to the device, not your development machine. Use a LAN IP address or a tunnel URL that you control.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start Expo |
| `npm run android` | Build and run on Android |
| `npm run ios` | Build and run on iOS |
| `npm run web` | Start Expo for web |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Run Jest in watch mode |
| `npm run coverage` | Generate test coverage |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |

## API Integration

The app reads its backend URL from `EXPO_PUBLIC_BACKEND_URL`. `EXPO_PUBLIC_API_URL` is still accepted for older local `.env` files and is normalized back to the backend root if it ends in `/api`.

Do not point the mobile app at the backend `/api/auth/*` endpoints. The backend validates Supabase JWTs; the app signs in, signs up, refreshes, and signs out through the official Supabase SDK, then sends `Authorization: Bearer <supabase_jwt>` to the Check-IA API.

Current backend routes used by the app:

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

## Repository Structure

```text
checkia-mobile-app/
├── app/             # Expo Router routes and screens
├── assets/          # App icons and splash assets
├── components/      # Reusable UI and feature components
├── constants/       # Shared constants and theme values
├── data/            # Static learning and fallback dashboard data
├── docs/            # Maintainer and public documentation source
├── hooks/           # Reusable React hooks
├── services/        # Supabase and Check-IA API clients
├── styles/          # Shared screen styles
├── utils/           # Testable helper functions
└── .github/         # CI workflows and issue/PR templates
```

## Testing

Run the full test suite:

```bash
npm test
```

Run coverage locally:

```bash
npm run coverage
```

Generated coverage output is intentionally ignored by Git. Share coverage summaries in pull requests when they are relevant, but do not commit generated reports.

## Documentation

- [Development Guide](docs/DEVELOPMENT.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Test Plan](TEST_PLAN.md)
- [Project Charter](PROJECT_CHARTER.md)
- [Contributing Guide](CONTRIBUTING.md)

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening an issue or pull request.

All contributors are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md). Security issues should be reported through the process in [SECURITY.md](SECURITY.md), not public GitHub issues.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
