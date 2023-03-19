import { createSlice } from '@reduxjs/toolkit';
import { rolesGetService } from 'services/roles/rolesGetService';
import { RootState } from 'store';

export interface RolesState {
  roles: {
    id: number;
    value: string;
    description: string;
  }[];
  isError: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: RolesState = {
    roles: [],
    isError: false,
    isLoading: false,
    error: '',
};

export const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(rolesGetService.pending, (state) => {
                state.error = '',
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(rolesGetService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.roles = action.payload;
            })
            .addCase(rolesGetService.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = (action?.payload || '') as string;
            });
    },
});

export const getRoles = (state: RootState) => state.roles.roles;
export const getRolesIsError = (state: RootState) => state.roles.isError;
export const getRolesIsLoading = (state: RootState) => state.roles.isLoading;
export const getRolesError = (state: RootState) => state.roles.error;

export const rolesReducer = rolesSlice.reducer;
