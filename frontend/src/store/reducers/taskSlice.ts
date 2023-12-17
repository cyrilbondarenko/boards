import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchTask} from "./actionCreators";

let initialState = {
    task: {
        id: 1,
        title: 'Task Title 1',
        description: 'Task Description 1',
        image: "https://placehold.co/300x200",
        block_id: 1,
        attachments: [
            {
                "id": 1,
                "title": "Attachment Title",
                "date": 1000,
                "image": "https://placehold.co/300x200"
            },
        ]
    }
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTask(state, action) {
            state.task = action.payload;
        },
    },
    extraReducers: {
        [fetchTask.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.task = action.payload;
        }
    }
});

export const {setTask} = taskSlice.actions
export default taskSlice.reducer