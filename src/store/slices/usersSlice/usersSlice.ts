import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { User } from './types';
import { usersGetService } from 'services/users/userGetService';
import { usersBanService } from 'services/users/usersBanService';
import { usersUnBanService } from 'services/users/usersUnBanService';
import { usersGiveRoleService } from 'services/users/usersGiveRoleService';

export interface UsersState {
  users: User[];
  isError: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: UsersState = {
    users: [],
    isError: false,
    isLoading: false,
    error: '',
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(usersGetService.pending, (state) => {
                state.error = '',
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(usersGetService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(usersGetService.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = (action?.payload || '') as string;
            })
            .addCase(usersBanService.pending, (state) => {
                state.error = '',
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(usersBanService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = state.users.map((user) => {
                    if(user.email === action.payload.email) {
                        user.banned = true;
                        user.banReason = action.payload.reason;
                    }

                    return user;
                });
            })
            .addCase(usersBanService.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = (action?.payload || '') as string;
            })
            .addCase(usersUnBanService.pending, (state) => {
                state.error = '',
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(usersUnBanService.fulfilled, (state, action) => {
                state.isLoading = false;

                state.users = state.users.map((user) => {
                    if(user.email === action.payload.email) {
                        user.banned = false;
                        user.banReason = '';
                    }

                    return user;
                });
            })
            .addCase(usersUnBanService.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = (action?.payload || '') as string;
            })
            .addCase(usersGiveRoleService.pending, (state) => {
                state.error = '',
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(usersGiveRoleService.fulfilled, (state, action) => {

                console.log(action, 'action');
                state.isLoading = false;
                state.users = state.users.map((user) => {
                    if(user.email === action.payload.email) {
                        user.roles = action.payload.roles;
                    }

                    return user;
                });
            })
            .addCase(usersGiveRoleService.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = (action?.payload || '') as string;
            });
    },
});

export const getUsersIsError = (state: RootState) => state.users.isError;
export const getUsersIsLoading = (state: RootState) => state.users.isLoading;
export const getUsersError = (state: RootState) => state.users.error;
export const getUsers = (state: RootState) => state.users.users;

export const usersReducer = usersSlice.reducer;
