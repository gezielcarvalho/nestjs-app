<p align="center">
<a href="http://sabresoftware.com.br/" target="blank"><img src="https://user-images.githubusercontent.com/16593463/209469380-8124ba8d-79bf-419a-a157-79d2f6678621.png" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">Full featured backend API with Nest, TypeORM, and Typescript. Includes testing and deployment</p>
    <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Endpoints Testing

The application provides a REST API with authentication features. The server runs on `http://localhost:3000` by default.

### Prerequisites for Testing

1. Start the application in development mode:

   ```bash
   npm run start:dev
   ```

2. Use any HTTP client like:
   - **cURL** (command line)
   - **Postman** (GUI application)
   - **Thunder Client** or **REST Client** (VS Code extensions)
   - **Insomnia** (GUI application)

### Available Endpoints

#### Authentication Endpoints

**Sign Up - Create a new user**

```bash
POST http://localhost:3000/auth/signup
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "yourpassword123"
}
```

**Sign In - Login with existing user**

```bash
POST http://localhost:3000/auth/signin
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "yourpassword123"
}
```

**Sign Out - Logout current user**

```bash
POST http://localhost:3000/auth/signout
```

**Who Am I - Get current user info** (requires authentication)

```bash
GET http://localhost:3000/auth/whoami
```

#### User Management Endpoints

**Get user by ID**

```bash
GET http://localhost:3000/auth/{id}
# Example: GET http://localhost:3000/auth/1
```

**Find users by email**

```bash
GET http://localhost:3000/auth?email={email}
# Example: GET http://localhost:3000/auth?email=user@example.com
```

**Update user**

```bash
PATCH http://localhost:3000/auth/{id}
Content-Type: application/json

{
    "email": "newemail@example.com",
    "password": "newpassword123"
}
```

**Delete user**

```bash
DELETE http://localhost:3000/auth/{id}
# Example: DELETE http://localhost:3000/auth/1
```

#### Session Management (Demo endpoints)

**Set color in session**

```bash
GET http://localhost:3000/auth/colors/{color}
# Example: GET http://localhost:3000/auth/colors/red
```

**Get color from session**

```bash
GET http://localhost:3000/auth/colors
```

#### Application Health Check

**Basic health check**

```bash
GET http://localhost:3000/
```

### Testing with cURL Examples

Here are some complete cURL examples you can run in your terminal:

1. **Create a new user:**

   ```bash
   curl -X POST http://localhost:3000/auth/signup \
   -H "Content-Type: application/json" \
   -d '{"email":"test@example.com","password":"password123"}' \
   -c cookies.txt
   ```

2. **Sign in (save session cookies):**

   ```bash
   curl -X POST http://localhost:3000/auth/signin \
   -H "Content-Type: application/json" \
   -d '{"email":"test@example.com","password":"password123"}' \
   -c cookies.txt
   ```

3. **Get current user (using saved cookies):**

   ```bash
   curl -X GET http://localhost:3000/auth/whoami \
   -b cookies.txt
   ```

4. **Get all users:**
   ```bash
   curl -X GET http://localhost:3000/auth \
   -b cookies.txt
   ```

### Notes

- The application uses **cookie-based sessions** for authentication
- When testing with tools like Postman or cURL, make sure to **save and reuse cookies** for authenticated endpoints
- The `POST /auth/signup` and `POST /auth/signin` endpoints will set session cookies automatically
- The `GET /auth/whoami` endpoint requires authentication (valid session)
- All request and response bodies use **JSON format**
- Email validation is enforced on user creation and updates

### HTTP Status Codes

- `200` - Success
- `201` - Created (for signup)
- `400` - Bad Request (validation errors)
- `404` - Not Found (user not found)
- `401` - Unauthorized (authentication required)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Geziel Carvalho](http://gezielcarvalho.info/)
