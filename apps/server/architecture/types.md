# Typing Principles

## Overview

All shared types live in [`packages/types`](../../packages/types/) and are the single source of truth for data contracts across the project. This ensures consistency between the frontend, backend, and any other consumers.

## Types Structure

The `@social-service-application/types` package is organized by domain and direction:

```
packages/types/
├── user/
│   ├── request/
│   │   ├── user.validator.ts   # Zod schemas
│   │   ├── user.types.ts       # Types inferred from schemas
│   │   └── index.ts
│   └── response/
│       ├── user.validator.ts
│       ├── user.types.ts
│       └── index.ts
```

Each domain exposes separate `request` and `response` entry points via package exports:

```json
"@social-service-application/types/example/request"
"@social-service-application/types/example/response"
```

## Rules

### What goes in `packages/types`

- All HTTP request and response types
- Zod validators for those types
- Any type shared between two or more packages or apps

### What stays local to an app

- React component `Props` interfaces (web/native)
- Internal application interfaces not used across package boundaries
- Server-internal types (e.g. service/repository function signatures)

## Conventions

### Validators before types

Types are always inferred from Zod validators — never written manually for request/response shapes.

```ts
// packages/types/exercise/request/exercise.validator.ts
const getAll = z.object({
  languageCode: z.string(),
})

export const userValidator = { getAll }
```

```ts
// packages/types/exercise/request/exercise.types.ts
export type UserGetAllRequest = z.infer<typeof userValidator.getAll>
```

### Naming convention

| Pattern | Example |
|---|---|
| Request type | `{Domain}{Action}Request` |
| Response type | `{Domain}{Action}Response` |
| Validator object | `{domain}Validator` |
| Single schema | `{functionality}` |

### Importing types

Always import from the package, never by relative path across package boundaries:

```ts
// server controller
import type { ExerciseGetAllRequest } from "@social-service-application/types/example/request"
import type { ExerciseGetAllResponse } from "@social-service-application/types/example/response"
```

