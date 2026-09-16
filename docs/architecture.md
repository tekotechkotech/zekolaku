# Architecture

## Application

- Framework: SvelteKit
- Language: TypeScript
- Rendering: SvelteKit default routing and rendering capabilities
- Styling: Keep styling lightweight and component-oriented

## Principles

- Prefer platform and framework features before adding libraries.
- Keep the application structure understandable to a solo developer and AI agent.
- Separate reusable UI from page-specific content only when it improves clarity.
- Avoid premature backend and CMS abstractions.

## Initial Structure

```text
src/
├── lib/
│   └── components/
└── routes/
    └── +page.svelte
```

The structure may evolve when actual requirements justify it.

## Data

Initial public content may be static and local to the application. A CMS, database, or API should only be introduced when the project has a concrete content-management requirement.

## Deployment

Deployment target is intentionally left open until hosting requirements are defined.

## Decision Rule

When multiple technical solutions can satisfy a requirement, prefer the one with fewer moving parts, fewer dependencies, and lower maintenance cost.
