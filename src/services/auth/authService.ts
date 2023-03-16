import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from 'config/api/api';
import { EMAIL_LOCALSTORAGE_KEY, ROLES_LOCALSTORAGE_KEY, USER_LOCALSTORAGE_KEY } from 'config/const/localStorage';

interface AuthData {
    email: string;
    password: string;
}

interface ReturnAuthData {
    token: {
        token: string;
    };
    roles: string[];
}

export const authService = createAsyncThunk<ReturnAuthData, AuthData>(
    'login/auth',
    async (authData, thunkAPI) => {
        const { rejectWithValue, } = thunkAPI;

        try {
            const response = await $api.post<ReturnAuthData>('/auth/login', authData);

            if (!response.data) {
                throw new Error();
            }

            console.log(response.data, 'response');

            localStorage.setItem(USER_LOCALSTORAGE_KEY, response.data.token.token);
            localStorage.setItem(EMAIL_LOCALSTORAGE_KEY, authData.email);
            localStorage.setItem(ROLES_LOCALSTORAGE_KEY, JSON.stringify(response.data.roles));

            return response.data;
        } catch(e: any) {
            return rejectWithValue(e.response.data.message || e.response.data[0]);
        }
    }
);
