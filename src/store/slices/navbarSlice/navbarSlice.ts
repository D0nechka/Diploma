import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface NavbarState {
  isHide: boolean;
}

const initialState: NavbarState = {
    isHide: true,
};

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        changeNavbarHide: (state) => {
            state.isHide = !state.isHide;
        },
    },
});

export const { changeNavbarHide, } = navbarSlice.actions;

export const getNavbarHide = (state: RootState) => state.navbar.isHide;

export const navbarReducer = navbarSlice.reducer;
