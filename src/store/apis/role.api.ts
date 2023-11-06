import { api } from './api';
import { Role } from '@prisma/client';

export const rolesApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getRoles: builder.query<Role[], string>({
      query: () => ({ url: `/roles`, method: `GET` }),
    }),
    getRole: builder.query<Role, string>({
      query: (roleId: string) => ({ url: `/roles/${roleId}`, method: `GET` }),
    }),
    createRole: builder.mutation<Role, string>({
      query: (role: Role) => ({ url: `/roles`, method: `POST`, data: role }),
    }),
    updateRole: builder.mutation<Role[], string>({
      query: (roleId: Role | Partial<Role>) => ({ url: `/roles/${roleId}`, method: `PATCH` }),
    }),
    deleteRole: builder.mutation<Role, string>({
      query: (roleId: string) => ({ url: `/roles/${roleId}`, method: `DELETE` }),
    }),
  }),
});

export const {
  useGetRolesQuery,
  useCreateRoleMutation,
  useGetRoleQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesApi;
