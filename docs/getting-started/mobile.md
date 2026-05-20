# Mobile Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/agentsia223/checkia-mobile-app.git
cd checkia-mobile-app
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Start Expo:

```bash
npm start
```

Choose a target from the Expo prompt:

- Press `a` for Android.
- Press `i` for iOS on macOS.
- Press `w` for web.
- Scan the QR code with Expo Go for a physical device.

## Useful Commands

```bash
npm start
npm run android
npm run ios
npm run web
npm run typecheck
npm test
npm run coverage
```

## Troubleshooting

Clear Expo and Metro state:

```bash
npx expo start -c
```

Reinstall dependencies:

```bash
rm -rf node_modules
npm install
```

If native builds become inconsistent, regenerate native projects through Expo instead of committing local generated `ios/` or `android/` folders unless the project intentionally moves to a prebuild workflow.
