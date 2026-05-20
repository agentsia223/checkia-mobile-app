# Mobile Tests

Tests are colocated in `__tests__` directories near the source they cover.

## Areas Covered

- App route smoke tests.
- Auth screens and tab screens.
- Home, learn, verify, profile, and UI components.
- Verification and current user hooks.
- API services and helpers.
- Constants and mapper behavior through consumers.

## Commands

```bash
npm test
npm run test:watch
npm run coverage
```

For changes that affect screens, run at least one Expo target before requesting review:

```bash
npm run android
# or
npm run ios
# or
npm run web
```
