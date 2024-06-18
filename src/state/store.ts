import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./CurrencySlice";

export const store = configureStore({
    reducer: {
        exchange : currencyReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;