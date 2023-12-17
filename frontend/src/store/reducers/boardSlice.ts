import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchBoard} from "./actionCreators";

let initialState: any = {
    board: {

    }
};

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setBoard(state, action) {
            state.board = action.payload;
        },
        addBlock(state, action) {
            state.board.blocks.push(action.payload);
        },
    },
    extraReducers: {
        [fetchBoard.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.board = action.payload.board;
        }
    }
});

export const { setBoard, addBlock } = boardSlice.actions
export default boardSlice.reducer