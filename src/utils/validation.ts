// src/utils/validation.ts

// Email
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password:
// - min 12 chars
// - 1 uppercase
// - 1 lowercase
// - 1 number
// - 1 special character
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Helper functions (recommended)
export const isValidEmail = (email: string): boolean =>
  emailRegex.test(email.trim());

export const isValidPassword = (password: string): boolean =>
  passwordRegex.test(password);
