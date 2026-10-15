# Project charter

## Purpose

Provide a compact NestJS and TypeORM practice project that demonstrates user-oriented API patterns, session-based authentication, validation, serialization, and automated-test setup.

## Portfolio value

The repository is retained as a Node.js/NestJS breadth example. It is useful for discussing backend modularity, DTOs, persistence, request validation, and session flow—not as a deployable product claim.

## Current scope

- User signup, signin, signout, and session lookup endpoints.
- Password derivation using a per-user salt and `scrypt`.
- SQLite persistence through TypeORM.
- User DTO serialization that excludes password values from responses.
- A report entity/module scaffold and unit/e2e test configuration.

## Not in scope

- A reviewed production authentication or authorization model.
- Complete report management endpoints.
- Deployment, observability, data migration, or support commitments.
- Dependency modernization or application behavior changes.
