import { z } from 'zod';
export const emailSchema = z.object({
  email: z.string().email('Invalid email').nonempty('Email is required'),
});

export const usernameSchema = z.object({
  userName: z.string().nonempty('Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
export const passwordSchema = z
  .string()
  .min(1, { message: 'Password is required.' })
  .min(8, { message: 'Password must be at least 8 characters.' })
  .max(32, { message: 'Password must be less than 32 characters.' })
  .regex(/\d/, { message: 'Password must contain at least one number' })
  .regex(/[@$!%*#?&]/, {
    message: 'Password must contain at least one special character',
  })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  });
export const signUpSchema = z
  .object({
    firstname: z.string().min(1, { message: 'First Name is required.' }),
    lastname: z.string().min(1, { message: 'Last Name is required.' }),
    email: z
      .string({ required_error: 'Email is required.' })
      .email({ message: 'Email must be a valid email.' }),
    password: passwordSchema,
    confirmPassword: z.string({
      required_error: 'Confirm Password is required.',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const signInSchema = z.object({
  password: passwordSchema,
  username: z.string().min(1, { message: 'First Name is required.' }),
  email: z.string().email().min(1, { message: 'Email is required.' }),
});

export const verfiyEmailSchema = z.object({
  mobile: z
    .string({
      required_error: 'mobile is required.',
    })
    .min(10, { message: 'Must be a valid mobile number' })
    .max(14, { message: 'Must be a valid mobile number' }),
});

export const setPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string({
      required_error: 'Confirm Password is required.',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const VerifyOtpSchema = z.object({
  otp: z.string().min(4, {
    message: 'Your one-time password must be 4 characters.',
  }),
});
