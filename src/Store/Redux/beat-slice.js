import { createSlice } from "@reduxjs/toolkit";

const beatSlice = createSlice({
    name: 'beat',
    initialState: {
        tempBeat: {},
        loadedBeats: [],
        hasPlayedTag: false
    },
    reducers: {
        setBeat(state, action) {
            state.tempBeat = action.payload;
        },
        setBeats(state, action) {
            state.loadedBeats = action.payload;
        },
        setHasPlayedTag(state, action) {
            state.hasPlayedTag = action.payload;
        }
    }
});

export const beatActions = beatSlice.actions;
export default beatSlice;