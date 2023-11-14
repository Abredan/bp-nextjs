import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { User } from '@prisma/client';
import { RootState } from '../store';
import { usersApi } from '@/store/apis/users.api';

const userAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
});

export const userSlice = createSlice({
  name: 'users',
  initialState: userAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(usersApi.endpoints.getUsers.matchFulfilled, (state, { payload }) => {
      console.log('payload', payload);
      // userAdapter.addMany(payload);
    });
  }
});

export const getUsersSelector = (state: RootState) => state.users;

export default userSlice.reducer;
