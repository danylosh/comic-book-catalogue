# This Document covers detailed information about the architecture

Social Service app project uses a monorepo structure for all parts of the project. This includes, web, Application aka native, and server aka backend.

The folder structure looks as follows:

```
Social-service-app/
├── apps/
│   ├── web/         # Frontend application (React + TanStack Router)
│   ├── native/      # Mobile application (React Native, Expo)
│   └── server/      # Backend API (Hono)
├── packages/
│   ├── config/      # ???
│   ├── db/          # Database
│   ├── env/         # ???
```

All of the separated parts are divided in to own folders under apps folder. More information regarding the different parts of the can be found in the list below.

- **[Web](./web.md)**
- **[Application](./app.md)**
- **[Backend](./backend.md)**
- **[OpenAPI](./openapi.md)**
- **[Packages]()**

## Backend

Backend technologies and style guide can be found **[Here](./backend.md)**

OpenAPI usage for backend endpoints can be found **[here](./openapi.md)**

### Layered architecture pattern

Backend application is structured into distinct layers where each layer has specific responsibilities and dependencies flow only downward.

The backend is separated into modules based of their actions. For example, all endpoints regarding user are located in the user module. The same logic will be used in all of the modules.

Each module follows the same 5.layer structure:

```
Routes (HTTP layer)
   ↓
Controller (HTTP concerns + session)
   ↓
Service (Business logic)
   ↓
Repository (Data access)
   ↓
Database
```
