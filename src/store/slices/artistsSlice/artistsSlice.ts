import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Artist } from './types';
import { artistsGetService } from 'services/artists/artistsGetService';

export interface ArtistsState {
    artists: Artist[];
    error: string;
    isError: boolean;
    isLoading: boolean;
}

const initialState: ArtistsState = {
    artists: [],
    error: '',
    isError: false,
    isLoading: false,
};

export const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {
        changeArtists: (state, action: PayloadAction<Artist[]>) => {
            const { payload, } = action;

            state.artists = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(artistsGetService.pending, (state) => {
                state.error = '',
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(artistsGetService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.artists = action.payload;
            })
            .addCase(artistsGetService.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = (action?.payload || '') as string;
            });
    },
});

export const { changeArtists, } = artistsSlice.actions;

export const getArtistsInfo = (state: RootState) => state.artists.artists;
export const getArtistsIsError = (state: RootState) => state.artists.isError;
export const getArtistsIsLoading = (state: RootState) => state.artists.isLoading;
export const getArtistsError = (state: RootState) => state.artists.error;

export const artistsReducer = artistsSlice.reducer;