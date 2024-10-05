import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice"
import { useDispatch } from "react-redux";

export const store= configureStore({
    reducer:{
      user:userReducer, 
    }
})


//infering the rootstate and appdispatch types from the store itself
export type RootState =  ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch ;

export const useAppDispatch = () => useDispatch<AppDispatch>();

