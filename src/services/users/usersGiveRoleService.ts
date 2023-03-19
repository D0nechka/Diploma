import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from 'config/api/api';
import { User } from 'store/slices/usersSlice/types';

interface GetData {
    email: string;
    roles: string[];
}

type ReturnData = Pick<User, 'email' | 'roles'>;

export const usersGiveRoleService = createAsyncThunk<ReturnData, GetData>(
    'users/give-role',
    async (data, thunkAPI) => {
        const { rejectWithValue, } = thunkAPI;

        try {
            const response = await $api.post<ReturnData>('/users/give-role', data);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch(e: any) {
            return rejectWithValue(e.response.data.message || e.response.data[0]);
        }
    }
);
