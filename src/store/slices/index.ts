import { combineReducers } from '@reduxjs/toolkit';
import { counterReducer } from './counterSlice/counterSlice';
import { loginReducer } from './loginSlice/loginSlice';
import { musicReducer } from './musicSlice/musicSlice';
import { navbarReducer } from './navbarSlice/navbarSlice';
import { regReducer } from './regSlice/regSlice';
import { userReducer } from './userSlice/userSlice';
import { artistsReducer } from './artistsSlice/artistsSlice';

export const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    login: loginReducer,
    reg: regReducer,
    navbar: navbarReducer,
    music: musicReducer,
    artists: artistsReducer,
});

export * from './counterSlice/counterSlice';
