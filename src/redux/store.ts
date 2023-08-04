import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { codeReducer } from "./slices/codeSlice";
import CodePayload from "../model/CodePayload";
import { adReducer } from "./slices/adSlice";
import Advert from "../model/Advert";

export const store = configureStore({
    reducer: {
     advertState: adReducer,
     codeState: codeReducer
    }
});
export function useSelectorAdvert() {
    return useSelector<any, Advert>(state => state.advertState.advert);
}
export function useSelectorCode() {
    return useSelector<any, CodePayload>(state => state.codeState.codeMessage);
}


