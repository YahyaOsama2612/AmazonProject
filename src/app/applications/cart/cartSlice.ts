import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CounterState, IProduct } from "../../../interfaces";
import {
  addItemToShoppingCart,
  removeItemFromShoppingCart,
} from "../../../shared/utilits/functions";
import { RootState } from "../../store";

// Retrieve cart items from localStorage
const loadCartItemsFromLocalStorage = (): IProduct[] => {
  const savedCartItems = localStorage.getItem("cartItems");
  if (savedCartItems) {
    return JSON.parse(savedCartItems);
  }
  return [];
};

// Set cart items to localStorage
const saveCartItemsToLocalStorage = (cartItems: IProduct[]): void => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const initialState: CounterState = {
  cartItems: loadCartItemsFromLocalStorage(),
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
      saveCartItemsToLocalStorage(state.cartItems); // Save to localStorage after adding an item
    },
    removeItemToCart: (state, actionPayload: PayloadAction<IProduct>) => {
      state.cartItems = removeItemFromShoppingCart(
        state.cartItems,
        actionPayload.payload
      );
      saveCartItemsToLocalStorage(state.cartItems); // Save to localStorage after removing an item
    },
  },
});

export const { addItemToCart, removeItemToCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart;

export default cartSlice.reducer;
