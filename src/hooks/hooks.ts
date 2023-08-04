import { useDispatch } from "react-redux";
import CodeType from "../model/CodeType";
import { codeActions } from "../redux/slices/codeSlice";
import { useEffect, useState } from "react";
import { Subscription } from "rxjs";
import { advertsService } from "../config/service-config";
import Advert from "../model/Advert";

export function useDispatchCode() {
    const dispatch = useDispatch();
    return (error: string, successMessage: string) => {
        let code: CodeType = CodeType.OK;
        let message: string = '';

        if (error.includes('Authentication')) {

            code = CodeType.AUTH_ERROR;
            message = "Authentication error, mooving to Sign In";
        } else {
            code = error.includes('unavailable') ? CodeType.SERVER_ERROR :
                CodeType.UNKNOWN;
            message = error;
        }
        dispatch(codeActions.set({ code, message: message || successMessage }))
    }
}
export function useSelectorAdverts() {
    const dispatch = useDispatchCode();
    const [adverts, setAdverts] = useState<Advert[]>([]);
    useEffect(() => {

        const subscription: Subscription = advertsService.getAdverts()
            .subscribe({
                next(adsArray: Advert[] | string) {
                    let errorMessage: string = '';
                    if (typeof adsArray === 'string') {
                        errorMessage = adsArray;
                    } else {
                        setAdverts(adsArray);
                    }
                    dispatch(errorMessage, '');

                }
            });
        return () => subscription.unsubscribe();
    }, []);
    return adverts;
}

