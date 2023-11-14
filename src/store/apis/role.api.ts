import { Role } from '@prisma/client';
import { api } from './base.api';

export const rolesApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getRoles: builder.query<Role[], void>({
      query: () => ({ url: `/roles`, method: `GET` }),
    }),
    getRole: builder.query<Role, string>({
      query: (roleId: string) => ({ url: `/roles/${roleId}`, method: `GET` }),
    }),
    createRole: builder.mutation<Role, Partial<Role>>({
      query: (role: Role) => ({ url: `/roles`, method: `POST`, data: role }),
    }),
    updateRole: builder.mutation<Role, Partial<Role> & Pick<Role, 'id'>>({
      query: ({id, ...patch}) => ({ url: `/roles/${id}`, method: `PATCH` }),
    }),
    deleteRole: builder.mutation<Role, string>({
      query: (id: string) => ({ url: `/roles/${id}`, method: `DELETE` }),
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
