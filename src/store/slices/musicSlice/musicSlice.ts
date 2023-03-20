import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Track } from './types';
import { musicGetService } from 'services/music/musicGetService';
import { musicAddService } from 'services/music/musicAddService';

export interface MusicState {
  tracks: Track[];
  error: string;
  isError: boolean;
  isLoading: boolean;
}

const initialState: MusicState = {
    tracks: [],
    error: '',
    isError: false,
    isLoading: false,
};

export const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        changeTracks: (state, action: PayloadAction<Track[]>) => {
            const { payload, } = action;

            state.tracks = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(musicGetService.pending, (state) => {
                state.error = '',
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(musicGetService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tracks = action.payload;
            })
            .addCase(musicGetService.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = (action?.payload || '') as string;
            })
            .addCase(musicAddService.pending, (state) => {
                state.error = '',
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(musicAddService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tracks.push(action.payload);
            })
            .addCase(musicAddService.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = (action?.payload || '') as string;
            });
    },
});

export const { changeTracks, } = musicSlice.actions;

export const getMusicTracks = (state: RootState) => state.music.tracks;
export const getMusicIsError = (state: RootState) => state.music.isError;
export const getMusicIsLoading = (state: RootState) => state.music.isLoading;
export const getMusicError = (state: RootState) => state.music.error;

export const musicReducer = musicSlice.reducer;
