import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from 'config/api/api';

interface GetData {
    name: string;
    id: number;
}

type Data = Pick<GetData, 'name'>

export const artistsAddService = createAsyncThunk<GetData, Data>(
    'artists/add',
    async (data, thunkAPI) => {
        const { rejectWithValue, } = thunkAPI;

        try {
            const response = await $api.post<GetData>('/artist/add', data);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch(e: any) {
            return rejectWithValue(e.response.data.message || e.response.data[0]);
        }
    }
);
