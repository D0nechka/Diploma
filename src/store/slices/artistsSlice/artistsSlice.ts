import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { artistsGetService } from 'services/artists/artistsGetService';
import { artistsAddService } from 'services/artists/artistAddService';

export interface ArtistsState {
  artists: {name: string; id: number;}[];
  isError: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: ArtistsState = {
    artists: [],
    isError: false,
    isLoading: false,
    error: '',
};

export const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {
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
            })
            .addCase(artistsAddService.pending, (state) => {
                state.error = '',
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(artistsAddService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.artists.push(action.payload);
            })
            .addCase(artistsAddService.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = (action?.payload || '') as string;
            });
    },
});

export const getArtistsIsError = (state: RootState) => state.artists.isError;
export const getArtistsIsLoading = (state: RootState) => state.artists.isLoading;
export const getArtistsError = (state: RootState) => state.artists.error;
export const getArtists = (state: RootState) => state.artists.artists;

export const artistsReducer = artistsSlice.reducer;
