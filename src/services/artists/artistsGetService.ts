import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from 'config/api/api';
import { Artist } from 'store/slices/artistsSlice/types';

export const artistsGetService = createAsyncThunk<Artist[]>(
    'artist/get',
    async (_, thunkAPI) => {
        const { rejectWithValue, } = thunkAPI;

        try {
            const response = await $api.get<Artist[]>('/artist/get');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch(e: any) {
            return rejectWithValue(e.response.data.message || e.response.data[0]);
        }
    }
);
