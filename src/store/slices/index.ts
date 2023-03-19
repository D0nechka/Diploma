import { combineReducers } from '@reduxjs/toolkit';
import { artistsReducer } from './artistsSlice/artistsSlice';
import { counterReducer } from './counterSlice/counterSlice';
import { loginReducer } from './loginSlice/loginSlice';
import { navbarReducer } from './navbarSlice/navbarSlice';
import { regReducer } from './regSlice/regSlice';
import { rolesReducer } from './rolesSlice/rolesSlice';
import { userReducer } from './userSlice/userSlice';
import { usersReducer } from './usersSlice/usersSlice';

export const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    login: loginReducer,
    reg: regReducer,
    navbar: navbarReducer,
    users: usersReducer,
    roles: rolesReducer,
    artists: artistsReducer,
});

export * from './counterSlice/counterSlice';
