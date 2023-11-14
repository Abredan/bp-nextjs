import { z } from 'zod';
import { PASSWORD_REGEX } from '@/lib/constants';

const passwordPolicy = z
  .string({
    required_error: 'Password is required.',
    invalid_type_error: 'Password must be a string.'
  })
  .min(6, { message: 'Password is too short. Min: 6 Characters' })
  .regex(PASSWORD_REGEX, { message: 'Password not match policy.' });

export const userIDSchema = z.object({ id: z.string().min(10, { message: 'UserId is required' }) });
export const userFieldsSchema = z.object({
  emailVerified: z.string(),
  image: z.string(),
  city: z.string().optional(),
  country: z.string().optional(),
  accountActive: z.boolean().optional(),
  updateAndPromotions: z.boolean().optional(),
  roleId: z.string()
});
const userSchema = z.object({
  name: z.string(),
  email: z.string()
});

export const createUserSchema = userSchema
  .merge(userFieldsSchema.pick({ roleId: true }))
  .extend({
    password: passwordPolicy
  });

export const updateUserSchema = userSchema
  .merge(userIDSchema)
  .merge(userFieldsSchema)
  .partial()
  .required({ id: true });


export const updateUserPasswordSchema = userIDSchema
  .extend({
    password: passwordPolicy,
    confirmPassword: passwordPolicy
  });
