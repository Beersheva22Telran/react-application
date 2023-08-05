import { useDispatch } from "react-redux";
import InputResult from "../../model/InputResult"
import Input from "../common/Input"
import { advertsService } from "../../config/service-config";

import CodeType from "../../model/CodeType";
import { codeActions } from "../../redux/slices/codeSlice";
import Advert from "../../model/Advert";
import { getRandomAdvert } from "../../util/randomAdvert";
const MAX_AMOUNT = 500;
const Generation: React.FC = () => {
    const dispatch = useDispatch();
    function onSubmit(value: string): InputResult {
        const amount = +value;
        const res: InputResult = {
            status: 'success',
            message: ''
        };
        if (amount < 1 || amount > MAX_AMOUNT) {
            res.status = 'error';
            res.message = `amount must be in the range [1 - ${MAX_AMOUNT}]`;
        }
        generateAds(amount);

        return res;
    }
    async function generateAds(amount: number): Promise<void> {
        let message: string = '';
        let code: CodeType = CodeType.OK;
        let count: number = 0;
        for (let i = 0; i < amount; i++) {
            try {
                const advert: Advert = getRandomAdvert();
                await
                    advertsService.addAdvert(advert);
                count++;
            } catch (error: any) {
                if (typeof error != "string") {
                    error = JSON.stringify(error);
                }

                if (error.includes('Authentication')) {
                    code = CodeType.AUTH_ERROR;


                }
                message = error;
            }


        }
        message = `added ${count} adverts ` + message;
        dispatch(codeActions.set({ code, message }))
    }
    return <Input submitFn={onSubmit}
        placeholder={`amount of random adverts [1 - ${MAX_AMOUNT}]`} type="number" buttonTitle="Generate" />
}
export default Generation;


