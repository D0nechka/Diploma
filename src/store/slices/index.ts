import { combineReducers } from '@reduxjs/toolkit';
import { counterReducer } from './counterSlice/counterSlice';
import { loginReducer } from './loginSlice/loginSlice';
import { regReducer } from './regSlice/regSlice';
import { userReducer } from './userSlice/userSlice';

export const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    login: loginReducer,
    reg: regReducer,
});

export * from './counterSlice/counterSlice';
