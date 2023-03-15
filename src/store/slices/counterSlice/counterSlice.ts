import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface CounterState {
  value: number,
  name: string;
}

const initialState: CounterState = {
    value: 0,
    name: '',
};

// slice for example
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            const { payload, } = action;

            state.value += payload;
        },
        changeName: (state, action: PayloadAction<string>) => {
            const { payload, } = action;

            state.name = payload;
        },
    },
});

export const { increment, decrement, incrementByAmount, } = counterSlice.actions;

export const getCounterValue = (state: RootState) => state.counter.value;
export const getCounterName = (state: RootState) => state.counter.name;

export const counterReducer = counterSlice.reducer;
