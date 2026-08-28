# Contributing

This repository is a curated public mirror. Changes should preserve both the portfolio experience and its publication boundary.

## Branch workflow

1. Branch from `main` using a short descriptive name such as `docs/update-stack` or `fix/mobile-navigation`.
2. Keep the change focused and do not copy the hosted project's Git history.
3. Run the publication checklist in `docs/PUBLICATION-AUDIT.md`.
4. Run `pnpm lint` and `pnpm build`.
5. Open a pull request describing the visible change and any asset or privacy decision.

## Content rules

- Do not commit secrets, `.env` files, contact databases, customer/user data or deployment credentials.
- Do not add résumés, full books, temporary archives, generated output or local tool state.
- Do not add proprietary engine code from Céu Canto, Myriad, Livro Pronto or a third party.
- Add images only when their ownership and public purpose are clear.
- Keep contact details routed through the official portfolio site.

The live site has an independent publishing flow. A change in this mirror must never be treated as authorization to deploy or alter the live site.
