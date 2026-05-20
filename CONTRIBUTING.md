# Contributing to Check-IA Mobile

Thank you for your interest in contributing to Check-IA Mobile. This document explains how to set up the Expo app, make focused changes, and submit contributions that fit the Check-IA project standards.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Branching Strategy](#branching-strategy)
- [Ways to Contribute](#ways-to-contribute)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Testing](#testing)
- [Code Review Process](#code-review-process)

## Code of Conduct

This project follows the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold its standards.

## Getting Started

1. Fork the repository on GitHub.
2. Clone your fork locally:

   ```bash
   git clone https://github.com/<your-username>/checkia-mobile-app.git
   cd checkia-mobile-app
   ```

3. Install dependencies and create your local environment file:

   ```bash
   npm install
   cp .env.example .env
   ```

4. Set `EXPO_PUBLIC_BACKEND_URL`, `EXPO_PUBLIC_SUPABASE_URL`, and `EXPO_PUBLIC_SUPABASE_ANON_KEY` in `.env` to services you control.
5. Start the app:

   ```bash
   npm start
   ```

Use Node.js 20.19.4 or newer. Node 22 LTS is recommended and is used by CI.

## Branching Strategy

Create focused branches from `main`:

| Prefix | Purpose | Example |
| --- | --- | --- |
| `feature/` | New features | `feature/add-audio-verification` |
| `fix/` | Bug fixes | `fix/login-redirect-error` |
| `docs/` | Documentation | `docs/update-mobile-setup` |
| `test/` | Test-only changes | `test/cover-url-preview` |

```bash
git checkout -b feature/your-feature main
```

## Ways to Contribute

- Fix reproducible bugs in the mobile app.
- Improve accessibility, performance, or test coverage.
- Improve French-language copy and learning content.
- Add documentation for setup, architecture, or backend integration.
- Report issues with clear device, environment, and reproduction details.

## Making Changes

1. Keep commits small and focused.
2. Add or update tests for behavior changes.
3. Update documentation when setup, scripts, API expectations, or user-facing behavior changes.
4. Avoid committing generated files, local native build folders, coverage reports, credentials, or private tunnel URLs.
5. Keep backend assumptions explicit in code comments, tests, or documentation.

## Pull Request Process

1. Push your branch to your fork:

   ```bash
   git push origin feature/your-feature
   ```

2. Open a pull request against the `main` branch of `agentsia223/checkia-mobile-app`.
3. Fill in the PR template completely.
4. Ensure CI checks pass.
5. Request review from a maintainer.
6. Address review feedback with additional commits.

## Code Style

- Use TypeScript for application code.
- Follow the existing Expo Router, component, hook, service, and utility organization.
- Prefer small reusable components over large screen files.
- Keep API mapping logic in `services/` and `utils/` rather than spreading backend response handling through screens.
- Keep French user-facing copy clear, direct, and consistent with the existing tone.
- Do not hard-code private URLs, credentials, tokens, signing material, or production service details.

## Testing

Run the required checks before opening a pull request:

```bash
npm run typecheck
npm test
```

For visible UI changes, also run the app on at least one supported target:

```bash
npm run android
# or
npm run ios
# or
npm run web
```

Use `npm run coverage` when changing shared components, hooks, API services, or helper functions.

## Code Review Process

- Maintainers review for correctness, readability, test coverage, accessibility, and alignment with the Check-IA mission.
- Reviews should be constructive and respectful.
- Pull requests should stay focused on one behavior or documentation improvement.
- Screenshots or recordings are expected for visible UI changes.

## Questions

Use GitHub issues for scoped questions, reproducible bugs, and documentation gaps. For security issues, follow [SECURITY.md](SECURITY.md) instead of opening a public issue.
