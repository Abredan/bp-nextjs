import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { z } from 'zod';
import { api } from './base.api';

export const LoginFormInputs = z.object({
  username: z.string().min(5, { message: 'Username length not correct' }),
  password: z.string().min(4, { message: 'Password length not correct' }),
});
export type TLoginInputs = z.infer<typeof LoginFormInputs>;

export const RegisterFormInputs = z.object({
  name: z.string().min(5, { message: 'Username length not correct' }),
  email: z.string().email().min(5, { message: 'Email length not correct' }),
  password: z.string().min(4, { message: 'Password length not correct' }),
});
export type TRegisterInputs = z.infer<typeof RegisterFormInputs>;

export const authApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    register: builder.mutation<any, TRegisterInputs>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        data: body,
      })
    }),
  }),
});

export const { useRegisterMutation } = authApi;
