import { createSlice } from "@reduxjs/toolkit";

const audioSlice = createSlice({
    name: 'audio',
    initialState: {
        ref: null
    },
    reducers: {
        setRef(state, action) {
            state.ref = action.payload;
        }
    }
});

export const audioActions = audioSlice.actions;
export default audioSlice;