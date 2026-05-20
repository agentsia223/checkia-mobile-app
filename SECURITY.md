# Security Policy

## Supported Versions

Security fixes are applied to the current `develop` branch and the latest public release when releases are available.

## Reporting a Vulnerability

Do not open a public GitHub issue for security vulnerabilities.

Please report suspected vulnerabilities privately to **hello@check-ia.app**. If GitHub private vulnerability reporting is enabled for this repository, you may use that channel instead.

Include:

- Affected files, screens, or endpoints.
- Steps to reproduce the issue.
- Expected and actual behavior.
- Impact and severity if known.
- Any proof-of-concept code, screenshots, or logs that help explain the issue.

We aim to acknowledge vulnerability reports within 48 hours and provide an initial assessment within 7 days. Please do not disclose the issue publicly until maintainers have had a reasonable opportunity to investigate and release a fix.

## Sensitive Data

Do not commit:

- `.env` files.
- API keys or service tokens.
- ngrok or other private tunnel URLs.
- Native signing keys, certificates, or provisioning profiles.
- Production analytics or crash reporting credentials.

If a secret is committed, rotate it immediately and remove it from the repository history before publishing the repository publicly.
