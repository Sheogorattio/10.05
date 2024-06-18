import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ExchangeState {
    from: string;
    to: string;
    rate: number;
    amount: number;
    result: number;
}

const initialState: ExchangeState = {
    from: 'UAH',
    to: 'USD',
    rate: 0,
    amount: 0,
    result: 0
};

export const getResultAsync = createAsyncThunk(
    'exchange/getResultAsync',
    async ({ amount, currency }: { amount: number; currency: string }) => {
        const response = await fetch(`http://127.0.0.1:3000/rates`);
        const data = await response.json();
        const rateObj = data.find((r: { cc: string; rate: number }) => r.cc === currency);
        const rate = rateObj ? rateObj.rate : 1;
        return rate * amount;
    }
);

const currencySlice = createSlice({
    name: "exchange",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getResultAsync.fulfilled, (state, action) => {
            state.result = action.payload;
        });
    }
});

export default currencySlice.reducer;
