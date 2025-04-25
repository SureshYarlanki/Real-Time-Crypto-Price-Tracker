import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "../features/crypto/cryptoSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
