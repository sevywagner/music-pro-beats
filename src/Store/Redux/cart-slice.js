import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        beats: [],
        totalPrice: 0,
        totalAmount: 0,
        checkPricing: false,
        showDisplay: false,
        hasPurchased: false
    },
    reducers: {
        addBeatToCart(state, action) {
            const addedBeat = action.payload;
            const item = state.beats.find((beat) => beat.id === addedBeat.id);
            if (item) {
                return;
            }

            state.totalAmount++;
            state.totalPrice = state.totalPrice + parseInt(addedBeat.price);
            state.beats.push(addedBeat);
        },
        removeBeat(state, action) {
            const id = action.payload;
            const beat = state.beats.find((beat) => beat.id === id);
            state.beats = state.beats.filter((beat) => beat.id !== id);

            state.totalPrice -= beat.price;
            state.totalAmount--;

        },
        setCheckPricing(state, action) {
            state.checkPricing = action.payload;
        },
        setShowDisplay(state, action) {
            state.showDisplay = action.payload;
        },
        setHasPurchased(state, action) {
            state.hasPurchased = action.payload;
        },
        resetCart(state) {
            state.beats = [];
            state.totalAmount = 0;
            state.totalPrice = 0;
            state.hasPurchased = false;
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;