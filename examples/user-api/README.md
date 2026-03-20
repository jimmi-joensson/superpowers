# POST /api/users with Input Validation

This example demonstrates how to add comprehensive input validation to a Node.js/Express API endpoint for user registration.

## Overview

The POST `/api/users` endpoint validates user input according to the following specification:

### Validation Rules

| Field | Rules |
|-------|-------|
| `email` | Must be a valid email format |
| `name` | Must be 1-100 characters |
| `password` | Must be 8+ characters with at least 1 number |

### Response Format

**Success (201 Created):**
```json
{
  "id": "abc123def",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2025-01-20T10:30:00.000Z"
}
```

**Validation Error (400 Bad Request):**
```json
{
  "errors": {
    "email": "Must be a valid email",
    "password": "Must be at least 8 characters"
  }
}
```

## Architecture

### File Structure

```
src/
  ├── server.js         - Express app and route handler
  ├── validation.js     - Validation rules and error middleware
tests/
  └── users.test.js     - Comprehensive test suite
```

### Key Components

#### 1. Validation Middleware (`src/validation.js`)

Uses `express-validator` for declarative, composable validation:

- **`validateUserCreation`**: Array of validation rules using `body()` chains
- **`handleValidationErrors`**: Middleware that catches validation errors and returns 400 with field-level error messages

```javascript
export const validateUserCreation = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email'),
  // ... more rules
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const fieldErrors = {};
    errors.array({ onlyFirstError: true }).forEach(error => {
      fieldErrors[error.path] = error.msg;
    });
    return res.status(400).json({ errors: fieldErrors });
  }
  next();
};
```

#### 2. Route Handler (`src/server.js`)

The POST endpoint uses the validation middleware in the route chain:

```javascript
app.post(
  '/api/users',
  validateUserCreation,           // Validation rules
  handleValidationErrors,          // Error handling
  (req, res) => {                  // Handler
    // ... create user
    res.status(201).json(user);
  }
);
```

#### 3. Test Suite (`tests/users.test.js`)

Comprehensive tests covering:
- ✅ Valid user creation
- ❌ Invalid email format
- ❌ Empty name
- ❌ Name too long (>100 chars)
- ❌ Password too short (<8 chars)
- ❌ Password without number
- ❌ Multiple validation errors
- ✅ Edge cases (max length, minimal requirements)

## How to Use

### Installation

```bash
npm install
```

### Running the Server

```bash
npm start
```

The server will listen on port 3000 (or the `PORT` environment variable).

### Running Tests

```bash
npm test
```

All 9 tests validate the validation logic and error handling.

## Key Design Decisions

1. **express-validator**: Chosen for:
   - Declarative, chainable API
   - Built-in validators (isEmail, isLength, etc.)
   - Custom validators for complex rules (number regex)
   - Consistent error format
   - Sanitization (trim, normalizeEmail)

2. **Field-Level Errors**: Response includes errors keyed by field name for easy client-side handling

3. **Middleware Chain**: Validates first, then handles errors, then processes valid data

4. **Sanitization**: Email is normalized, names/emails are trimmed to prevent edge cases

## Testing Examples

### Valid Request
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "name": "John Doe",
    "password": "password123"
  }'
```

Response: `201 Created`

### Invalid Email
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "not-an-email",
    "name": "John Doe",
    "password": "password123"
  }'
```

Response: `400 Bad Request`
```json
{
  "errors": {
    "email": "Must be a valid email"
  }
}
```

### Multiple Validation Errors
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid",
    "name": "",
    "password": "short"
  }'
```

Response: `400 Bad Request`
```json
{
  "errors": {
    "email": "Must be a valid email",
    "name": "Must be 1-100 characters",
    "password": "Must be at least 8 characters"
  }
}
```

## Error Messages

| Validation | Error Message |
|-----------|---------------|
| Invalid email | "Must be a valid email" |
| Name too short/long | "Must be 1-100 characters" |
| Password too short | "Must be at least 8 characters" |
| Password without number | "Must contain at least 1 number" |

## Extending the Validation

To add more validation rules:

1. Add new `body()` chain to `validateUserCreation` array:
   ```javascript
   body('field')
     .validator(condition)
     .withMessage('Error message')
   ```

2. Add corresponding test case to `tests/users.test.js`

3. Run tests to verify

## Production Considerations

For production, also consider:

- **Password hashing**: Use bcrypt or similar before storing
- **Duplicate email checks**: Validate email uniqueness in database
- **Rate limiting**: Add rate limiting middleware to prevent abuse
- **CORS**: Configure CORS if needed
- **Logging**: Add request/error logging
- **Database integration**: Replace in-memory user creation with database save
- **Authentication**: Add JWT or session-based auth for subsequent requests
