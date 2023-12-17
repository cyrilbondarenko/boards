import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    auth: {
        id: null,
        name: null,
        surname: null,
        middlename: null,
        login: null,
        email: null,
        avatar: null,
        position: null
    }
};

const boardSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action) {
            state.auth = action.payload;
        },
        logout(state) {
            state.auth = initialState.auth
        }
    }
});

export const { setAuth, logout } = boardSlice.actions
export default boardSlice.reducer