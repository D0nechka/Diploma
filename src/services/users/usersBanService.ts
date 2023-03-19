import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from 'config/api/api';

interface GetData {
    email: string;
    reason: string;
}

export const usersBanService = createAsyncThunk<GetData, GetData>(
    'users/ban',
    async (data, thunkAPI) => {
        const { rejectWithValue, } = thunkAPI;

        try {
            const response = await $api.post('/users/ban', data);

            if (!response.data) {
                throw new Error();
            }

            return data;
        } catch(e: any) {
            return rejectWithValue(e.response.data.message || e.response.data[0]);
        }
    }
);
