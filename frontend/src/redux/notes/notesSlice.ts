import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NotesState} from "../../ts/interfaces";


const initialState: NotesState = {
    content: ""
}

export const notesSlice = createSlice({
    name: "notes",
    initialState: initialState,
    reducers: {
        setContent: (
            state,
            {payload: {newContentValue}}: PayloadAction<{ newContentValue: string }>
        ) => {
            state.content = newContentValue;
        }
    }
})

export const {setContent} = notesSlice.actions;

export const notesReducer = notesSlice.reducer;



