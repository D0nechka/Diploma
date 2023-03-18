import { combineReducers } from '@reduxjs/toolkit';
import { counterReducer } from './counterSlice/counterSlice';
import { loginReducer } from './loginSlice/loginSlice';
import { navbarReducer } from './navbarSlice/navbarSlice';
import { regReducer } from './regSlice/regSlice';
import { userReducer } from './userSlice/userSlice';

export const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    login: loginReducer,
    reg: regReducer,
    navbar: navbarReducer,
});

export * from './counterSlice/counterSlice';
