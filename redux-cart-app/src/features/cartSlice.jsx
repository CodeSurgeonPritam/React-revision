import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((i) => i.id === action.payload);
      if (itemIndex !== -1) {
        state.totalQuantity -= state.cartItems[itemIndex].quantity;
        state.cartItems.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
