import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from 'config/api/api';
import { Track } from 'store/slices/musicSlice/types';

interface GetData {
    name: string;
    artistsId: string;
    picture: FileList[0];
    audio: FileList[0];
}

export const musicAddService = createAsyncThunk<Track, GetData>(
    'music/add',
    async (data, thunkAPI) => {
        const { rejectWithValue, } = thunkAPI;

        const form = new FormData();

        form.append('name', data.name);
        form.append('artistId', data.artistsId);
        form.append('picture', data.picture);
        form.append('audio', data.audio);

        try {
            const response = await $api.post<Track>('/tracks/add', form);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch(e: any) {
            return rejectWithValue(e.response.data.message || e.response.data[0]);
        }
    }
);
