# Public mirror publication audit

Audit date: 2026-08-28

Scope: the initial public GitHub snapshot of Victor Herbst's portfolio presentation layer.

## Publication standard

The mirror uses a clean repository history rather than importing the hosted project's Git history. Only files required to understand, run and review the public-facing portfolio are eligible. When ownership, privacy or operational relevance is uncertain, the file is excluded.

## Checks performed

- Enumerated the tracked source and manually classified code, assets and generated files.
- Searched tracked text for private keys, common provider tokens, credential assignments, JWTs, authorization headers and credential-bearing connection URLs.
- Reviewed public contact identifiers and removed those unnecessary for a technical mirror.
- Inspected the selected screenshots and editorial images for private user records or hidden production data.
- Checked image metadata exposed by the available system tooling.
- Started from a new root commit so deleted files, deployment history and earlier artifacts cannot remain reachable through Git history.
- Required lint, production build and browser checks before publication.

## Decisions

| Category | Decision | Rationale |
| --- | --- | --- |
| Portfolio routes, styles and UI components | Included | These are the public presentation layer requested for the mirror |
| Small motion/color proof datasets | Included | Bounded visual samples used by the portfolio UI; they contain no generation engine, user data or service credentials |
| Selected Céu Canto screenshots | Included | Public product views with no account identity or user record visible |
| Selected editorial page images | Included | Authored portfolio samples; full publications and source documents remain excluded |
| Author name, portrait, public domain and LinkedIn | Included | Necessary professional identity already intentionally presented by the portfolio |
| Direct phone number and email address | Removed from mirror source | Contact remains available through the official site without duplicating personal identifiers in Git history |
| Specific home city | Removed from mirror source | Not required to understand or run the technical portfolio |
| Résumé/CV PDF | Excluded | Contains unnecessary personal and employment details for this repository |
| Complete editorial PDFs and preflight certificate | Excluded | Full-length authored works are not needed to demonstrate the site and should not be redistributed from the mirror |
| Unused screenshots and duplicate image files | Excluded | Reduce surface area and avoid publishing artifacts without a runtime or documentation purpose |
| `node_modules`, `.next` and Vercel state | Excluded | Generated content may contain local paths, stale output or deployment state and is reproducible from the lockfile |
| Temporary archives and work directories | Excluded | Not source; may carry stale or sensitive material |
| Hosting project identifiers | Excluded | Hosting linkage is managed by the provider and never committed as public source |
| Hosted repository history and remote configuration | Excluded | Prevents accidental disclosure and keeps the GitHub project independent from the live hosting flow |
| Céu Canto, Myriad and editorial engine implementations | Excluded | The mirror contains only portfolio-facing descriptions and bounded demonstrations, never the product engines themselves |

## Maintenance checklist

Before every public update:

1. Copy only the intended presentation-layer changes.
2. Reject `.env*`, credentials, exports, archives, PDFs, résumés and generated deployment state.
3. Confirm new images show no real user account, private document or third-party confidential material.
4. Confirm product demonstrations remain bounded samples rather than implementation source.
5. Search the full candidate tree for secret and PII patterns.
6. Run `pnpm lint` and `pnpm build`.
7. Verify `/` and `/sobre` in a browser at desktop and mobile widths.
8. Review the complete staged diff before pushing.

## Hosting model

The reviewed GitHub source is the canonical source for Vercel previews and production. DNS and provider-side project linkage remain outside the repository.
