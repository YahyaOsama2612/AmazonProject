import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cartSlice from "../app/applications/cart/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    //to make dynamic api calls, reducerPath=> name of the slice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
