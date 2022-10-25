import { createSlice } from "@reduxjs/toolkit";

const beatSlice = createSlice({
    name: 'beat',
    initialState: {
        tempBeat: {},
        loadedBeats: []
    },
    reducers: {
        setBeat(state, action) {
            state.tempBeat = action.payload;
        },
        setBeats(state, action) {
            state.loadedBeats = action.payload;
        }
    }
});

export const beatActions = beatSlice.actions;
export default beatSlice;