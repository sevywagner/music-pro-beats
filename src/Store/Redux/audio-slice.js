import { createSlice } from "@reduxjs/toolkit";

const audioSlice = createSlice({
    name: 'audio',
    initialState: {
        isPlaying: false,
        audioUrl: 'MurdaSong'
    },
    reducers: {
        setIsPlaying(state, action) {
            state.isPlaying = action.payload;
        },
        setAudioUrl(state, action) {
            state.audioUrl = action.payload;
        }
    }
});

export const audioActions = audioSlice.actions;
export default audioSlice;