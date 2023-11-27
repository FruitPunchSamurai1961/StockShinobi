import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {HomeState} from "../../ts/interfaces";


const initialState: HomeState = {
    name: "Apple Inc",
    symbol: "AAPL"
}

export const homeSlice = createSlice({
    name: "home",
    initialState: initialState,
    reducers: {
        setNameState: (
            state,
            {payload: {newNameValue}}: PayloadAction<{ newNameValue: string }>
        ) => {
            state.name = newNameValue;
        },
        setSymbolState: (
            state,
            {payload: {newSymbolValue}}: PayloadAction<{ newSymbolValue: string }>
        ) => {
            state.symbol = newSymbolValue;
        },
    }
})

export const {setNameState, setSymbolState} = homeSlice.actions;

export const homeReducer = homeSlice.reducer;



