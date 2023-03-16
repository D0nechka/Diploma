import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authService } from 'services/auth/authService';
import { RootState } from 'store';

export interface LoginState {
  isError: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: LoginState = {
    isError: false,
    isLoading: false,
    error: '',
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeLoginError: (state, action: PayloadAction<string>) => {
            const { payload, } = action;

            state.error = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authService.pending, (state) => {
                state.error = '',
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(authService.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(authService.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = (action?.payload || '') as string;
            });
    },
});

export const { changeLoginError, } = loginSlice.actions;

export const getLoginIsError = (state: RootState) => state.login.isError;
export const getLoginIsLoading = (state: RootState) => state.login.isLoading;
export const getLoginError = (state: RootState) => state.login.error;

export const loginReducer = loginSlice.reducer;
