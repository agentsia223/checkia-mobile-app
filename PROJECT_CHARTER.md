# Check-IA Mobile Project Charter

## Vision

Check-IA Mobile extends the Check-IA open-source fact-checking platform to mobile devices, helping French-speaking communities verify information through accessible, trustworthy, and culturally aware tools.

## Mission

Check-IA Mobile achieves this vision by:

- Providing a clear mobile interface for Check-IA text, URL, and image verification workflows.
- Keeping authentication aligned with the main Check-IA backend through Supabase Auth and JWT-based API access.
- Designing for mobile-first use in French-speaking African communities.
- Maintaining transparent open-source development practices so contributors can inspect, improve, and deploy the client.
- Prioritizing reliability, accessibility, and plain-language verification results.

## Community Statement

The Check-IA Mobile community shares the values of the main Check-IA project:

- **Inclusivity** - We welcome contributors from all backgrounds and especially value participation from the communities served by Check-IA.
- **Transparency** - Our code, documentation, and contribution processes are open for public review.
- **Respect** - We treat contributors and users with dignity across languages, cultures, and experience levels.
- **Collaboration** - We build better verification tools by combining product, design, engineering, research, and local context.
- **Accuracy** - We build tools that help people evaluate information carefully, and we hold our own work to the same standard.

All participants are expected to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Relationship to the Main Project

This repository is the Expo mobile client for [agentsia223/check_ia](https://github.com/agentsia223/check_ia). Backend API changes should be documented in both repositories when they affect mobile behavior.

Mobile contributors should keep these contracts aligned with the main project:

- Supabase authentication and JWT validation.
- Text and URL submission routes.
- Image verification and AI image detection routes.
- Task polling status fields.
- Public facts and keywords endpoints.

## Licensing Strategy

Check-IA Mobile is licensed under the **MIT License** ([full text](LICENSE)).

This license was chosen because:

- It is simple and widely understood by open-source contributors.
- It permits broad reuse, modification, and redistribution.
- It keeps the mobile client easy to adopt alongside the main Check-IA platform.

Contributors agree that contributions submitted to this repository are made under the terms of the MIT License, unless explicitly stated otherwise.

## Key Trademarks

The following are associated with the Check-IA project:

- **"Check-IA"** - The project name.
- **Check-IA logo and mobile app icons** - Visual identity assets in `assets/`.
- **check-ia.app** - The project domain name.

These marks should not be used in derivative works, forks, or third-party products in a way that implies official endorsement without maintainer permission.
