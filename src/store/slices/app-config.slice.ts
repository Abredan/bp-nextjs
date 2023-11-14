import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AppConfigState {
  sidebar: {
    expanded: boolean;
    active: string;
  };
}

const initialState: AppConfigState = {
  sidebar: {
    expanded: false,
    active: 'dashboard',
  },
};

export const appConfigSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar.expanded = !state.sidebar.expanded;
    },
    selectSidebarItem: (state, action: PayloadAction<string>) => {
      state.sidebar.active = action.payload;
    },
  },
});

export const selectAppConfig = (state: RootState) => state.config;
export const selectSidebarConfig = (state: RootState) => state.config.sidebar;

export const { toggleSidebar, selectSidebarItem } = appConfigSlice.actions;

export default appConfigSlice.reducer;
