/**
 * Auth Validation Schemas
 * Zod schemas for form validation
 */

import { z } from 'zod'

/**
 * Register Form Schema
 * Validates user registration input
 */
export const registerSchema = z.object({
  full_name: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .trim(),

  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === '') return true
        return /^\+?[\d\s\-()]+$/.test(val)
      },
      { message: 'Please enter a valid phone number' }
    ),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
})

/**
 * Login Form Schema
 * Validates user login input
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),

  password: z.string().min(1, 'Password is required'),
})

/**
 * Password Reset Request Schema
 */
export const passwordResetRequestSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
})

/**
 * Password Reset Confirm Schema
 */
export const passwordResetConfirmSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  new_password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
})

/**
 * Change Password Schema
 */
export const changePasswordSchema = z.object({
  current_password: z.string().min(1, 'Current password is required'),
  new_password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one number'),
})

// Type inference from schemas
export type RegisterFormData = z.infer<typeof registerSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type PasswordResetRequestData = z.infer<typeof passwordResetRequestSchema>
export type PasswordResetConfirmData = z.infer<typeof passwordResetConfirmSchema>
export type ChangePasswordData = z.infer<typeof changePasswordSchema>
