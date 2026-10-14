# Architecture

## Current shape

```text
HTTP client
    |
    v
NestJS controllers
    |-- UsersController -> AuthService -> UsersService -> TypeORM -> SQLite
    |-- ReportsController -> ReportsService -> TypeORM -> SQLite (scaffold)
    |
    +-- cookie-session state and response serialization
```

## Authentication flow

Signup validates the requested account, derives and stores a salted password representation, then places the created user identifier in the session. Signin verifies the supplied password against the stored representation and sets the session identifier. `GET /auth/whoami` is guarded by the session-based authentication guard.

## Data

The application configures TypeORM with a local SQLite file and schema synchronization enabled. This is convenient for learning and local iteration; it is not a production database-change strategy.

## Scope boundary

Several user lookup and mutation routes are currently exposed without the guard applied at the controller method. Documentation does not change that behavior. Any authorization redesign must be separately reviewed, implemented, and tested.
