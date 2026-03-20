import express from 'express';
import { validateUserCreation, handleValidationErrors } from './validation.js';

const app = express();

// Middleware
app.use(express.json());

/**
 * POST /api/users
 * Creates a new user
 * 
 * Request body:
 *   - email (string): valid email format
 *   - name (string): 1-100 characters
 *   - password (string): 8+ characters with at least 1 number
 * 
 * Responses:
 *   - 201: User created successfully
 *   - 400: Validation error with field-level errors
 */
app.post(
  '/api/users',
  validateUserCreation,
  handleValidationErrors,
  (req, res) => {
    const { email, name, password } = req.body;
    
    // In a real app, you would:
    // 1. Hash the password
    // 2. Save to database
    // 3. Return appropriate response
    
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json(user);
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

export default app;
