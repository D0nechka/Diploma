import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from 'config/api/api';
import { RolesState } from 'store/slices/rolesSlice/rolesSlice';

export const rolesGetService = createAsyncThunk<RolesState['roles']>(
    'roles/get-all',
    async (_, thunkAPI) => {
        const { rejectWithValue, } = thunkAPI;

        try {
            const response = await $api.get<RolesState['roles']>('/roles/get-all');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch(e: any) {
            return rejectWithValue(e.response.data.message || e.response.data[0]);
        }
    }
);
