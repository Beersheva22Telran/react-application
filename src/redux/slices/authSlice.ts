import {createSlice} from '@reduxjs/toolkit';
const initialState: {username: string} = {
username: ''
}
const authSlice = createSlice({
    initialState,
    name: "authState",
    reducers: {
        set: (state, data) => {
            state.username = data.payload;
        },
        reset: (state) => {
            state.username = ''
        }

    }
});
export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;