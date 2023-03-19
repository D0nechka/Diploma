import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from 'config/api/api';

interface GetData {
    email: string;
}

export const usersUnBanService = createAsyncThunk<GetData, GetData>(
    'users/unban',
    async (data, thunkAPI) => {
        const { rejectWithValue, } = thunkAPI;

        try {
            const response = await $api.post('/users/unban', data);

            if (!response.data) {
                throw new Error();
            }

            return data;
        } catch(e: any) {
            return rejectWithValue(e.response.data.message || e.response.data[0]);
        }
    }
);
