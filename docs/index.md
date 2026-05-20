<section class="checkia-hero">
  <div class="checkia-hero__copy">
    <img src="assets/icon.png" alt="Check-IA Mobile app icon" class="checkia-hero__icon" />
    <h1>Check-IA Mobile</h1>
    <p class="checkia-hero__lead">
      Expo and React Native client for the Check-IA fact-checking platform, built for fast mobile verification workflows and public open-source contribution.
    </p>
    <div class="checkia-hero__actions">
      <a class="checkia-button checkia-button--primary" href="getting-started/mobile/">Set up the app</a>
      <a class="checkia-button checkia-button--secondary" href="architecture/">Explore architecture</a>
    </div>
  </div>
  <div class="checkia-hero__aside" aria-label="Repository highlights">
    <strong>Client boundaries</strong>
    <ul>
      <li>Expo Router screens</li>
      <li>Supabase Auth sessions</li>
      <li>Check-IA API requests</li>
      <li>Jest and React Native tests</li>
    </ul>
  </div>
</section>

## Mobile Workflows

<div class="checkia-card-grid">
  <a class="checkia-card" href="getting-started/mobile/">
    <span class="checkia-card__label">Local setup</span>
    <strong>Run with Expo</strong>
    <p>Install dependencies, configure environment variables, and launch Android, iOS, web, or Expo Go targets.</p>
  </a>
  <a class="checkia-card" href="architecture/backend-api/">
    <span class="checkia-card__label">API contract</span>
    <strong>Connect to Check-IA</strong>
    <p>Understand backend routes for text, URL, image, history, facts, and keyword workflows.</p>
  </a>
  <a class="checkia-card" href="testing/mobile/">
    <span class="checkia-card__label">Quality</span>
    <strong>Test the client</strong>
    <p>Run TypeScript, Jest, React Native Testing Library, and focused service-layer checks before opening a PR.</p>
  </a>
</div>

## Key Features

- **Text and URL Verification** - Submit claims or URLs to the Check-IA backend and poll asynchronous analysis results.
- **Image Verification** - Detect AI-generated images and verify image content through backend image workflows.
- **Verification History** - Review synchronized text, URL, and image verification history for the signed-in user.
- **Learning Area** - Browse media literacy content written for French-speaking communities.
- **Secure Session Storage** - Store Supabase sessions with `expo-secure-store`.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | Expo SDK 54, React Native 0.81, React 19 |
| Navigation | Expo Router |
| Language | TypeScript |
| Auth | Supabase Auth, Expo SecureStore |
| API Client | Axios |
| Testing | Jest, jest-expo, React Native Testing Library |
| CI | GitHub Actions, Codecov-ready coverage |

## Quick Links

- [Getting Started](getting-started/index.md) - Set up the mobile app locally.
- [Architecture](architecture/index.md) - Understand the Expo Router, component, hook, and service-layer structure.
- [Backend API Contract](architecture/backend-api.md) - Review the endpoints used by the mobile app.
- [Contributing](contributing/index.md) - Prepare issues, pull requests, and documentation updates.
- [Testing](testing/index.md) - Run and extend the mobile test suite.
- [README](https://github.com/agentsia223/checkia-mobile-app#readme) - Return to the GitHub repository overview.
