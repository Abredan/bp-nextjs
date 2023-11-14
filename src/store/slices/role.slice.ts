import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Role } from '@prisma/client';
import { rolesApi } from '../apis/role.api';
import { RootState } from '../store';

const rolesAdapter = createEntityAdapter<Role>({
  selectId: (role) => role.id,
  sortComparer: (a, b) => a.displayName.localeCompare(b.displayName),
});

export const roleSlice = createSlice({
  name: 'roles',
  initialState: rolesAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(rolesApi.endpoints.getRoles.matchFulfilled, (state, { payload }) => {
      console.log('payload', payload);
      // rolesAdapter.addMany(payload);
    });
  },
});

export const roleSelect = (state: RootState) => state.roles;

export default roleSlice.reducer;
