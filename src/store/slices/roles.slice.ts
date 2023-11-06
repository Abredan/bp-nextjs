import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Role } from '@prisma/client';
import { rolesApi } from '../apis/role.api';

const rolesAdapter = createEntityAdapter<Role>({
  selectId: (role) => role.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const rolesSlice = createSlice({
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

export default rolesSlice.reducer;
