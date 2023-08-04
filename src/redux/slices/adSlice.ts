import {createSlice} from "@reduxjs/toolkit";
const initialState: {advert: object} =  {
    advert: {}
}
const adSlice = createSlice({
    initialState,
    name: 'advertState',
    reducers: {
        set: (state, data) => {

            state.advert = data.payload;
            
        }
    }
});
export const adActions = adSlice.actions;
export const adReducer = adSlice.reducer;