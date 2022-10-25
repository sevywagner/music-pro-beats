import { configureStore } from "@reduxjs/toolkit";
import beatSlice from "./beat-slice";
import cartSlice from "./cart-slice";
import audioSlice from "./audio-slice";

const store = configureStore({
    reducer: { beat: beatSlice.reducer, cart: cartSlice.reducer, audio: audioSlice.reducer }
});

export default store;