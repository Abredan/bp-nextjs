import { Role } from '@prisma/client';
import { api } from './base.api';
import { User } from '@prisma/client';

export const usersApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({ url: `/users`, method: `GET` })
    }),
    getUser: builder.query<User, string>({
      query: (id: string) => ({ url: `/users/${id}`, method: `GET` })
    }),
    createUser: builder.mutation<Role, Partial<User>>({
      query: (user: User) => ({ url: `/users`, method: `POST`, data: user })
    }),
    updateUserRole: builder.mutation<Role, Partial<User>>({
      query: (user: User) => ({ url: `/users`, method: `POST`, data: user })
    }),
    updateUser: builder.mutation<User, Partial<User> & Pick<User, 'id'>>({
      query: ({ id, ...patch }) => ({ url: `/users/${id}`, method: `PATCH` })
    }),
    deleteUser: builder.mutation<User, string>({
      query: (id: string) => ({ url: `/users/${id}`, method: `DELETE` })
    })
  })
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserRoleMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation
} = usersApi;
