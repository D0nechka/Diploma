import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from 'config/api/api';

interface GetData {
    name: string;
    id: number;
}

export const artistsGetService = createAsyncThunk<GetData[]>(
    'artists/get',
    async (_, thunkAPI) => {
        const { rejectWithValue, } = thunkAPI;

        try {
            const response = await $api.get<GetData[]>('/artist/get');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch(e: any) {
            return rejectWithValue(e.response.data.message || e.response.data[0]);
        }
    }
);
