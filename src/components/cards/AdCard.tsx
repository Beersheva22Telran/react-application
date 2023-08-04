import {  Card, CardContent, Typography } from "@mui/material"
import { useSelectorAdvert} from "../../redux/store";
import { ReactNode } from "react";
import Advert from "../../model/Advert";
type Props = {
     advert: Advert
}
const adCard: React.FC<Props> = ({advert}) => {
     function getContent(advert: Advert): ReactNode {
          return Object.entries(advert).map(e =>  <Typography variant="h5" ml={7} key={e[0]}>
                         {e[0]}: {(e[1] as any).toString()}
                    </Typography>)
     }
     return (
          <Card sx={{ minWidth: 275 }}>
               <CardContent>
                    {getContent(advert)}
                    
               </CardContent>
               
          </Card>
     );
}
export default adCard;