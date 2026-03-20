import { body, validationResult } from 'express-validator';

/**
 * Validation rules for user creation
 * - email: must be valid email format
 * - name: must be 1-100 characters
 * - password: must be 8+ characters with at least 1 number
 */
export const validateUserCreation = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email'),
  
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Must be 1-100 characters'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Must be at least 8 characters')
    .custom((value) => {
      if (!/\d/.test(value)) {
        throw new Error('Must contain at least 1 number');
      }
      return true;
    })
];

/**
 * Error handler middleware for validation failures
 * Returns 400 with field-level error messages
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const fieldErrors = {};
    errors.array({ onlyFirstError: true }).forEach(error => {
      fieldErrors[error.path] = error.msg;
    });
    
    return res.status(400).json({
      errors: fieldErrors
    });
  }
  
  next();
};
