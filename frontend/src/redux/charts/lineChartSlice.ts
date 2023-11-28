import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LineChartState} from "../../ts/interfaces";
import {selectionOptions} from "../../ts/enums";
import {LineChartDataPoint} from "../../ts/types";


const initialState: LineChartState = {
    selection: selectionOptions.ONE_YEAR,
    data: []
}

export const lineChartSlice = createSlice({
    name: "linechart",
    initialState: initialState,
    reducers: {
        setSelection: (
            state,
            {payload: {newSelectionValue}}: PayloadAction<{ newSelectionValue: selectionOptions }>
        ) => {
            state.selection = newSelectionValue;
        },
        setData: (
            state,
            {payload: {newDataValue}}: PayloadAction<{ newDataValue: LineChartDataPoint[] }>
        ) => {
            state.data = newDataValue;
        },
    }
})

export const { setSelection, setData} = lineChartSlice.actions;

export const lineChartReducer = lineChartSlice.reducer;



