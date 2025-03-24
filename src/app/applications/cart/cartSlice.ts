import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CounterState, IProduct } from "../../../interfaces";
import {
  addItemToShoppingCart,
  removeItemFromShoppingCart,
} from "../../../shared/utilits/functions";
import { RootState } from "../../store";
const loadCartFromLocalStorage = (): IProduct[] => {
  const savedCart = localStorage.getItem("cartItems");
  if (savedCart) {
    try {
      return JSON.parse(savedCart);
    } catch (e) {
      console.error("Error parsing cart from localStorage", e);
      return [];
    }
  }
  return [];
};
const saveCartToLocalStorage = (cartItems: IProduct[]) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (e) {
    console.error("Error saving cart to localStorage", e);
  }
};

const initialState: CounterState = {
  cartItems: loadCartFromLocalStorage()
};

const cartSlice = createSlice({
  name: "cart", // ** Attached with Store
  initialState,
  reducers: {
    addItemToCart: (state, actionPayload: PayloadAction<IProduct>) => {
      state.cartItems = addItemToShoppingCart(
        state.cartItems,
        actionPayload.payload
      );
      saveCartToLocalStorage(state.cartItems)
    },
    removeItemToCart: (state, actionPayload: PayloadAction<IProduct>) => {
      state.cartItems = removeItemFromShoppingCart(
        state.cartItems,
        actionPayload.payload
      );
      saveCartToLocalStorage(state.cartItems)
    },
  },
});

export const { addItemToCart, removeItemToCart } = cartSlice.actions;
export const selectCartItems = (state: RootState) => state.cart;

export default cartSlice.reducer;
