import {createSlice} from '@reduxjs/toolkit'
import {dimension} from '../../config/life-game-config.json'

export function getSize() {
    return Math.min(window.innerHeight, window.innerWidth) / dimension - 2
}
const initialState: {size: number} = {
    size: getSize()
}
const slice = createSlice({
    initialState,
    name: 'sizeState',
    reducers: {
        setSize: (state, data) => {
            state.size = data.payload as number;
        }

    }
})
export const sizeActions = slice.actions;
export const sizeReducer = slice.reducer;