import {createAsyncThunk} from "@reduxjs/toolkit";
import {API} from "../../api/API";

export const fetchBoards = createAsyncThunk(
    'boards/fetch',
    async (_, thunkApi) => {
        return await API.getBoards();
    }
)

export const fetchBoard = createAsyncThunk(
    'board/fetch',
    async (boardId: string | undefined, thunkApi) => {
        return await API.getBoard(boardId);
    }
)

export const fetchTask = createAsyncThunk(
    'task/fetch',
    async (taskId: string | undefined, thunkApi) => {
        return await API.getTask(taskId);
    }
)