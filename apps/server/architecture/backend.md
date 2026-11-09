# Backend

## Technologies

- **[Bun](https://bun.sh/)** - Runtime environment
- **[TypeScript](https://www.typescriptlang.org/)** - is the language used for this project
- **[Biome](https://biomejs.dev/)** - Linting and formatting
- **[Hono](https://hono.dev)** - API interface
- **[PostgreSQL](https://www.postgresql.org)** - Database engine
- **[Prisma](https://www.prisma.io)** - Schema first ORM
- **[Zod](https://zod.dev)** - Validation and type tool
- **[Docker](https://www.docker.com)**

## Table of content

- **[General](#General)**
- **[Architectural responsibilities](#architectural-responsibilities)**
  - **[Routes](#routes)**
  - **[Controller](#controller)**
  - **[Service](#service)**
  - **[Repository](#repository)**
  - **[Utils](#utils)**
- **[Style guide](#style-guide)**
  - **[Naming conventions](#naming-conventions)**
  - **[Commenting](#Commenting)**
  - **[Import Organization](#import-organization)**
  - **[Testing dependencies](#testing-dependencies)**
  - **[Validation!]()**
  - **[Route testing!]()**
  - **[Error handling!]()**
  - **[Functions](#Functions)**
  - **[If statements](#if-statements)**
  - **[Version control and collaboration](#version-control-and-collaboration)**
    - **[Merge requests](#merge-request)**
    - **[Commit messages](#commit-messages)**
  - **[Schema guide](#schema-guide)**

* Items with "!" at the end of them are still missing from the documentation

## General

- Fix issues promptly and contact other team members if you are unable to do so yourself.
- Be accountable for mistakes you have made.

## Architectural responsibilities

Since our system is created using layered architecture pattern each module in the backend consists of 4 parts.

This part provides additional information on each of those parts and how they should be created.

### Routes

Routes file has 2 main responsibilities. It is responsible for HTTP wiring aka where does the address lead and through what.

This basically means that by accessing a certain endpoint, the request will go through all the mentioned middlewares and end up in the said controller.

The second responsibility for Routes is to validate the content of the request, this includes parameters, query parameters and body part of the request.

By validating our requests, we make sure that no malicious data can enter our database.

Example of a Routes function:

```ts
import { Hono } from "hono"
import { describeRoute, resolver, validator } from "hono-openapi"
import { z } from "zod"
import type {UserGetAllQuery} from "@social-service-app/packages/types/user/response"
import { userController } from "./user.controller"

// Get all Users
exerciseRouter.get(
	"/",
	describeRoute({
		tags: ["User"],
		summary: "Get all Users",
		description: "Returns all list of all users",
		responses: {
			200: {
				description: "List of users",
				content: {
					"application/json": {
						schema: resolver(userResponseValidator.getAll),
					},
				},
			},
		},
	}),
	validator("query", userRequestValidator.getAll()),
	authMiddleware(),
	async (c) => {
		return userController.getAll(c, c.req.valid("query"))
	},
)

```

### Controller

Controller only Extracts session and delegates to proper services. After services have provided the correct response, controller returns the request to Routes with correct data and status code.

Controller can call one or more services, based of what the endpoint requires

Use `satisfies` on the response to let TypeScript verify the returned shape matches the declared response type without widening it:


```ts
import type {UserGetAllQuery} from "@social-service-app/packages/types/user/response"
import type { Context } from "hono"
import { StatusCodes } from "http-status-codes"
import { userService } from "./user.service"

// Fetch all Users (Example endpoint. Cannot be used in application)
const getAll = async (
	c: Context,
	query: UserGetAllQuery,
): Promise<Response> => {
	const userList = await userService.getAll({
		code: query.languageCode,
	})
	return c.json(userList satisfies UserGetAllResponse, StatusCodes.OK)
}

export const userController = {getAll}

```

### Service

Service handles all the necessary business logic. This can be functionalities such permission verification, validation, calculation and response mapping.

```ts
import type {UserGetAllQuery} from "@social-service-app/packages/types/user/response"
import { userRepository } from "./user.repository"
import { userFormatter } from "./utils/user.utils.formatter"


	 const  getAll = async (input: UserGetAllQuery) => {
		const users = await userRepository.getAll({ code: input.code })
		return userFormatter.getAllFormatter(users)
	},

	export const userController = {getAll}


```

### Repository

Repository, also know as database layer handles all the database queries and nothing else!

```ts
import type { Prisma } from "@social-service-app/db"
import prisma from "@social-service-app/db"
import { userSelector } from "./utils/user.utils.selector"


// Fetch all exercises
const getAll = async (input: Prisma.UserWhereInput) => {
	const users = await prisma.user.findMany({
		where: { age:input.age },
		select: userSelector.getAllSelector(input),
	})
	return users
}

export const userRepository = {getAll}

```

### Utils

Utils folder contains the following: 
 1. formatter
 2. selector
 3. other utility functions

#### Formatter

Formatter is responsible for mapping raw Prisma query results into the response shape expected by the API. It receives the database output and returns a clean, flat object that matches the declared response type.

Formatters should handle things like:
- Flattening nested relations (e.g. picking the first translation from a translations array)
- Providing fallback values for optional fields
- Excluding internal fields that should not be exposed in the response

Parameter type for formatter functions should always be the same as what the repository layer returns to service.

```ts
const getAllFormatter = (users:{
	id:string,
	name:string,
	age:number, 
	gamification:{
		level:number,
		xp:number
		}
	lastLogin:date,
	createdAt:date,
	updatedAt:date
	})=>{
	return 	users.map((user)=>({
			id:user.id,
			name:user.name,
			age:user.age,
			level:user.gamification.level,
			xp:user.gamification.xp,
			lastLogin:user.lastLogin,
			createdAt:user.createdAt,
			updatedAt: user.updatedAt
		}))
}

export const userFormatter = { getAllFormatter}

```

#### Selector

Selector constructs the Prisma `select` object used in repository queries. It defines exactly which fields and relations to fetch from the database, and can filter nested relations based on input (e.g. filtering translations by language code).

Using `satisfies Prisma.<Model>Select` ensures the selector is type-checked against the Prisma schema without losing the inferred literal type.

```ts
const getAllSelector = () =>
	({
		id: true,
		name:true,
		age:true,
		gamification:{
			select:{
				level:true,
				xp:true
			},
		},
		createdAt: true,
		updatedAt: true,
	}) satisfies Prisma.UserSelect

	export const userSelector = {getAllSelector}

```


#### Other utility functions
Utils files contain assisting functions that are not part of any previously mentioned operations.

These functions can be items like, response mapping, repeatable functionalities et.

## Style guide

While working on `Social service application`, you are **required** to follow this style guide and follow general coding principles. Everything mentioned below has been agreed upon with the team that started the project. This guide is here to make sure the code quality in every file is up to the standards we are looking for in `Social service app`.

### Naming conventions

- Files: Use "kebab-case"
- Variables and Functions: Use "camelCase".
- Database tables: Use "snake_case"
- Prisma model: use "PascalCase"
- Always use `const`, if necessary use `let`. **Avoid** the use of `var`

```ts
const patientId = z.string()
let hello = 'Hi'
```

- Validators are named based on their purpose.
  - Example:

  ```tsx
  const createExercise = z.object({
    body: z.object({
      name: z.string(),
      type: z.string(),
    }),
  })
  ```

  - Functions have to contain specifics in their names, eq. `getUser`, `createUser`, `getScheduleById`. Names cannot be only `get`, `create`, etc.

### Commenting

- Single-line Comments: Use for brief explanations.

```ts
// This function retrieves user data by ID
```

- Multi-line Comments: Use for more detailed explanations or complex logic.

```tsx
/*

*/
```

- JSDoc Comments: Use for more detailed explanations or complex logic.

```tsx
/**
 *
 */
export const createQuestion = () => {}
```

### Import organization

- Imports: Organize imports in the following sequence:
  1. Built in modules
  2. Third-party modules
  3. Internal modules

**Need Better examples**

```ts
import fs from 'fs' // Node.js built-in
import express from 'express' // Third-party
import { getUserById } from './services/userService' // Internal
```

### Testing dependencies

- Use dependency injection for our own code in unit tests.
  - Prefer factory exports such as `createHealthService(repository)` and pass fakes in tests.
- Mock external boundaries only.
  - Examples: Prisma client, third-party SDKs, external HTTP clients.
- Avoid module-level mocking of internal modules in test files.
- Why: module-level internal mocks are process-global in Bun and can leak state between files,
  causing tests that pass alone to fail when the full suite runs.

See the [Testing guide](../tests/testing.md) for detailed examples and layer-specific patterns.

### Functions

We are using only arrow functions for code consistency.

```tsx
const foo = () => {}
```

### If statements

- For code consistency use brackets with if statements

```ts
if (condition) {
  // if-statement
}
```

### Version control and collaboration

- `GitLab` is used for version control.
  - Make sure you have created a feature branch for yourself when working on the code.
    - More information about feature branches can be found [here](../git/feature-branches.md)

- Code reviews will be conducted on each branch before merging them in to dev branch.
  - Code reviews are done by assigning 3 other developers to go through your changes.
  - When all 3 of the developers have marked the merge request as checked and there is no more fixes to be made, git will automatically merge the branch in to dev branch.
  - After branch is merged, the feature branch will be deleted

#### Merge request

- Merge request title needs to be the feature branch name
- Description needs to have a list of all the things done.

```
  In this merge requests, there has been the following changes:
  - Refactored naming
  - Changed primitive data types to Prisma types
  - Added response mapping
```

- Always mark yourself as assignee, unless you are leaving the project
- Select 3 reviewers from the list.
  Note! Only frontend developers should be assigned to review frontend code, and backend for backend code. Fullstack developers can be assigned to both.
- Always select the following Merge options
  - "Delete source branch when merge request is accepted"
  - "Squash commits when merge request is accepted."

#### Commit messages

- Follow our `conventional commits` guide for proper commit styling.
  - A detailed guide for expected [commits](../git/conventional-git-commits.md)

    ```text
    feat: add user authentication
    fix: correct validation logic for user input
    ```

### Schema guide

Below you will find instructions for how `Prisma` schemas are expected to be made.

### Prisma schema

---

```prisma
model Exercises {

  id                String @id @default(uuid())
  name              String
  value             Int
  difference        Float
  relations         String

  // Relations
  exerciseRelation  User   @relation(fields: [Relations], references: [id])

  // Timestamps
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  @@unique([id,name])
  @@map("exercises")
}
```

- Always keep the formatting of the model same as shown above.
- Use PascalCase for model names and camelCase for field names.
- Define relations clearly and use meaningful names for relation fields.
- Always map the model in plural like `"users"` instead of `"user"`. As this will be the name that will be showing up as the table name in the database. The model name also needs to be written using "snake_case"

#### Prisma migrations

---

- When making a migration, you will be prompted to name the migration

- The first migration is **always** named 01_init and there should be no second migration file before the product is in production
  - If the first migration already exists, you should delete the migration before applying a new one
  - From second migration onwards there cannot be any breaking changes to the database
