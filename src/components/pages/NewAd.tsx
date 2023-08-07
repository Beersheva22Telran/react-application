import { Typography } from "@mui/material";
import Advert from "../../model/Advert";
import { advertsService } from "../../config/service-config";
import AdvertForm from "../forms/AdvertForm";


const NewAdd: React.FC = () => {
    const submitFn = async (advert: Advert) => {
        await advertsService.addAdvert(advert);
    }
    
    return <AdvertForm submitFn={submitFn}/>
}

export default NewAdd;