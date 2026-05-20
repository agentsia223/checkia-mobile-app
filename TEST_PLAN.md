# Test Plan

This document summarizes the quality process for Check-IA Mobile, including test strategy, current coverage areas, local commands, and pull request expectations.

## 1. Testing Strategy

### Tools and Frameworks

| Layer | Framework | Config |
| --- | --- | --- |
| **Mobile UI** | React Native Testing Library | Component tests colocated in `__tests__` directories |
| **Unit Tests** | Jest + jest-expo | `package.json` Jest config |
| **Type Safety** | TypeScript | `tsconfig.json` |
| **Coverage** | Jest coverage, Codecov-ready config | `package.json`, `codecov.yml`, `.github/workflows/ci.yml` |
| **CI** | GitHub Actions | `.github/workflows/ci.yml` |

### Test Categories

- **Component tests** - Verify UI rendering, interaction states, and props for reusable components.
- **Hook tests** - Validate shared state and behavior such as current user and verification flows.
- **Helper tests** - Cover pure mapping, formatting, preview, and home screen helpers.
- **API service tests** - Validate request construction, URL normalization, response mapping, and auth retry behavior with mocked network dependencies.
- **Route smoke tests** - Ensure Expo Router screens render without crashing under mocked dependencies.

### CI Pipeline

Tests run automatically on every pull request and on pushes to `main` and `develop`:

- Install dependencies with `npm ci`.
- Run `npm run typecheck`.
- Run `npm test -- --runInBand --coverage`.
- Upload `coverage/lcov.info` to Codecov when `CODECOV_TOKEN` is configured.
- Enforce Codecov status checks from the current mobile baseline: 60% project coverage and 50% patch coverage, with room to raise targets as coverage improves.

## 2. Current Test Inventory

| Area | Files |
| --- | --- |
| Auth routes | `app/__tests__/Auth.test.tsx` |
| Tabs and route screens | `app/__tests__/Tabs.test.tsx`, `app/__tests__/History.test.tsx`, `app/__tests__/Result.test.tsx` |
| Home components and helpers | `components/home/__tests__/HomeComponents.test.tsx`, `utils/__tests__/homeHelpers.test.ts` |
| Learn components | `components/learn/__tests__/LearnComponents.test.tsx` |
| Verify components and hook | `components/verify/__tests__/VerifyComponents.test.tsx`, `hooks/__tests__/useVerify.test.ts` |
| Profile components | `components/profile/__tests__/MenuRow.test.tsx` |
| UI primitives | `components/ui/__tests__/Button.test.tsx`, `components/ui/__tests__/Input.test.tsx`, `components/ui/__tests__/Badge.test.tsx` |
| API and auth services | `services/__tests__/api.test.ts`, `hooks/__tests__/useCurrentUser.test.ts` |
| Constants and mappers | `constants/__tests__/constants.test.ts`, `utils/apiMappers.ts` coverage through consumers |

## 3. Running Tests

```bash
npm run typecheck
npm test
npm run coverage
```

Run watch mode during local development:

```bash
npm run test:watch
```

For UI changes, run at least one app target before requesting review:

```bash
npm run android
# or
npm run ios
# or
npm run web
```

## 4. Pull Request Requirements

Before opening a PR:

1. Run `npm run typecheck`.
2. Run `npm test`.
3. Add or update tests for behavior changes.
4. Update documentation when setup, API contracts, or user-facing behavior changes.
5. Include screenshots or recordings for visible UI changes.
6. Document backend assumptions in the PR notes.

## 5. Test Data and External Services

Tests must not call real Supabase projects, Check-IA backend services, AI providers, or image endpoints. Mock these dependencies and keep test data local.

Do not commit generated coverage reports, Expo caches, `.env` files, private tunnel URLs, signing material, or production credentials.
