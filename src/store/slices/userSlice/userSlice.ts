import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface UserState {
  email: string;
  roles: string[];
}

const initialState: UserState = {
    email: '',
    roles: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeUserEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        changeUserRoles: (state, action: PayloadAction<string[]>) => {
            state.roles = action.payload;
        },
    },
});

export const { changeUserEmail, changeUserRoles, } = userSlice.actions;

export const getUserEmail = (state: RootState) => state.user.email;
export const getUserRoles = (state: RootState) => state.user.roles;

export const userReducer = userSlice.reducer;
