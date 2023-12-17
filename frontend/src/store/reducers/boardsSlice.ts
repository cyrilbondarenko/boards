import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchBoards} from "./actionCreators";

let initialState = {
    boards: []
};

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        setBoards (state, action) {
            state.boards = action.payload;
        }
    },
    extraReducers: {
        [fetchBoards.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.boards = action.payload;
        }
    }
});

export const {setBoards} = boardsSlice.actions

export default boardsSlice.reducer