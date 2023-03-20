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

export const registrationService = createAsyncThunk<ReturnAuthData, AuthData>(
    'reg/registration',
    async (authData, thunkAPI) => {
        const { rejectWithValue, } = thunkAPI;

        try {
            const response = await $api.post<ReturnAuthData>('/auth/registration', authData);

            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, response.data.token.token);
            localStorage.setItem(EMAIL_LOCALSTORAGE_KEY, authData.email);
            localStorage.setItem(ROLES_LOCALSTORAGE_KEY, JSON.stringify(response.data.roles));

            return response.data;
        } catch(e: any) {
            return rejectWithValue(e.response.data.message || e.response.data[0]);
        }
    }
);
