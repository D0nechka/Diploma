import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from 'config/api/api';
import { User } from 'store/slices/usersSlice/types';

export const usersGetService = createAsyncThunk<User[]>(
    'users/get-all',
    async (_, thunkAPI) => {
        const { rejectWithValue, } = thunkAPI;

        try {
            const response = await $api.get<User[]>('/users/get-all');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch(e: any) {
            return rejectWithValue(e.response.data.message || e.response.data[0]);
        }
    }
);
