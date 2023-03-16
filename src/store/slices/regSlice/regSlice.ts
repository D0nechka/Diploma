import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registrationService } from 'services/registration/registrationService';
import { RootState } from 'store';

export interface RegState {
  isError: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: RegState = {
    isError: false,
    isLoading: false,
    error: '',
};

export const regSlice = createSlice({
    name: 'reg',
    initialState,
    reducers: {
        changeRegError: (state, action: PayloadAction<string>) => {
            const { payload, } = action;

            state.error = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registrationService.pending, (state) => {
                state.error = '',
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(registrationService.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registrationService.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = (action?.payload || '') as string;
            });
    },
});

export const { changeRegError, } = regSlice.actions;

export const getRegIsError = (state: RootState) => state.reg.isError;
export const getRegIsLoading = (state: RootState) => state.reg.isLoading;
export const getRegError = (state: RootState) => state.reg.error;

export const regReducer = regSlice.reducer;
