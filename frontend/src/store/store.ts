import {combineReducers, configureStore} from '@reduxjs/toolkit'
import boardReducer from "./reducers/boardSlice";
import taskReducer from "./reducers/taskSlice";
import authReducer from "./reducers/authSlice";
import boardsReducer from "./reducers/boardsSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    boards: boardsReducer,
    board: boardReducer,
    task: taskReducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']