import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from 'config/api/api';
import { Track } from 'store/slices/musicSlice/types';

export const musicGetService = createAsyncThunk<Track[]>(
    'music/get',
    async (_, thunkAPI) => {
        const { rejectWithValue, } = thunkAPI;

        try {
            const response = await $api.get<Track[]>('/tracks/get');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch(e: any) {
            return rejectWithValue(e.response.data.message || e.response.data[0]);
        }
    }
);
