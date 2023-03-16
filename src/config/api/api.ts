import axios from 'axios';
import { __API__ } from 'config/const/api';
import { USER_LOCALSTORAGE_KEY } from 'config/const/localStorage';

export const $api = axios.create({
    baseURL: __API__,
    headers: {
        authorization: `Bearer ${localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''}`,
    },
});
