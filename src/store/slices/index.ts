import { combineReducers } from '@reduxjs/toolkit';
import { counterReducer } from './counterSlice/counterSlice';

export const rootReducer = combineReducers({
    counter: counterReducer,
});

export * from './counterSlice/counterSlice';
