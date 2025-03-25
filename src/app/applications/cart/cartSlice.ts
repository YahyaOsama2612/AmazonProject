import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CounterState, IProduct } from "../../../interfaces";
import {
  addItemToShoppingCart,
  removeItemFromShoppingCart,
} from "../../../shared/utilits/functions";
import { RootState } from "../../store";

const saveCartToLocalStorage = (cartItems: IProduct[]) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (e) {
    console.error("Error saving cart to localStorage", e);
  }
};

const initialState: CounterState = {
  cartItems: localStorage.getItem("cartItems") 
    ? JSON.parse(localStorage.getItem("cartItems") || '[]') 
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, actionPayload: PayloadAction<IProduct>) => {
      state.cartItems = addItemToShoppingCart(
        state.cartItems,
        actionPayload.payload
      );
      saveCartToLocalStorage(state.cartItems);
    },
    removeItemToCart: (state, actionPayload: PayloadAction<IProduct>) => {
      state.cartItems = removeItemFromShoppingCart(
        state.cartItems,
        actionPayload.payload
      );
      saveCartToLocalStorage(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    }
  },
});

export const { 
  addItemToCart, 
  removeItemToCart, 
  clearCart 
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart;

export default cartSlice.reducer;