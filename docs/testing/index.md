# Testing Overview

Check-IA Mobile uses Jest, jest-expo, React Native Testing Library, and TypeScript checks.

## Required Local Checks

```bash
npm run typecheck
npm test
```

## Coverage

```bash
npm run coverage
```

Coverage output is generated locally and ignored by Git. CI uploads coverage to Codecov when the repository has `CODECOV_TOKEN` configured.

For the full QA process, see the repository [Test Plan](https://github.com/agentsia223/checkia-mobile-app/blob/main/TEST_PLAN.md).
