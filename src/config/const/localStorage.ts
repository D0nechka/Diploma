export const USER_LOCALSTORAGE_KEY = 'token';
export const EMAIL_LOCALSTORAGE_KEY = 'email';
export const ROLES_LOCALSTORAGE_KEY = 'roles';

export const getLocalStorageRoles = JSON.parse(localStorage.getItem(ROLES_LOCALSTORAGE_KEY) || '[]') || [];
