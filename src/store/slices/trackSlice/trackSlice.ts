import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Track } from '../musicSlice/types';
import { __API__ } from 'config/const/api';

export interface TrackState {
  track: HTMLAudioElement;
  trackInfo: Track | null;
  play: boolean;
  volume: number;
  duration: number;
}

const initialState: TrackState = {
    track: new Audio(),
    trackInfo: null,
    play: false,
    volume: 0.3,
    duration: 0,
};

export const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {
        changeTrackInfo: (state, action: PayloadAction<Track>) => {
            state.trackInfo = action.payload;
            const newPath = `${__API__}/${action.payload.audioPath}`;

            if ( state.track.src !== newPath) {
                state.track.src = newPath;
                state.track.volume = state.volume;
            }

        },
        onPlayTrack: (state) => {
            state.play = true;
            state.track.play();
        },
        onPauseTrack: (state) => {
            state.play = false;
            state.track.pause();
        },
        changeTrackDuration: (state, action: PayloadAction<number>) => {
            if ( state.track.src) {
                state.track.currentTime = action.payload;
            }

            if(action.payload === Math.floor(state.track.duration)){
                state.track.currentTime = 0;
            }
        },
        changeTrackVolume: (state, action: PayloadAction<number>) => {
            if ( state.track.src) {
                state.track.volume = action.payload;
                state.volume = action.payload;
            }
        },
        changeDuration: (state, action: PayloadAction<number>) => {
            if ( state.track.src) {
                state.duration = action.payload;
            }
        },
        handleTrackNext: (state, action: PayloadAction<Track[]>) => {
            const currentIndex = action.payload.findIndex((track) => track.id === state?.trackInfo?.id);
            let currentTrack: null | Track = null;
            let newPath = '';

            if(currentIndex !== action.payload.length - 1){
                currentTrack = action.payload[currentIndex + 1];
                state.duration = 0;
                newPath = `${__API__}/${currentTrack.audioPath}`;

            } else {
                currentTrack = action.payload[0];
                state.duration = 0;
                newPath = `${__API__}/${currentTrack.audioPath}`;
            }

            state.trackInfo = currentTrack;
            state.track.src = newPath;
            if(state.play){
                state.track.play();
            }
        },
        handleTrackPrev: (state, action: PayloadAction<Track[]>) => {
            const currentIndex = action.payload.findIndex((track) => track.id === state?.trackInfo?.id);
            let currentTrack: null | Track = null;
            let newPath = '';

            if(currentIndex === 0){
                currentTrack = action.payload[action.payload.length - 1];
                state.duration = 0;
                newPath = `${__API__}/${currentTrack.audioPath}`;

            } else {
                currentTrack = action.payload[currentIndex - 1];
                state.duration = 0;
                newPath = `${__API__}/${currentTrack.audioPath}`;
            }

            state.trackInfo = currentTrack;
            state.track.src = newPath;
            if(state.play){
                state.track.play();
            }
        },
    },
});

export const {
    changeTrackInfo,
    onPlayTrack,
    onPauseTrack,
    changeTrackDuration,
    changeTrackVolume,
    changeDuration,
    handleTrackNext,
    handleTrackPrev,
} = trackSlice.actions;

export const getTrackInfo = (state: RootState) => state.track.trackInfo;
export const getTrack = (state: RootState) => state.track.track;
export const getPlayTrack = (state: RootState) => state.track.play;
export const getTrackVolume = (state: RootState) => state.track.volume;
export const getDuration = (state: RootState) => state.track.duration;

export const trackReducer = trackSlice.reducer;
