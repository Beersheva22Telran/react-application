import { Observable, map } from "rxjs";
import AdvertsService from "./crud/AdvertsService";
import Advert from "../model/Advert";


export default class AdvertsDataProcessor implements AdvertsService {
    constructor(private advertsService: AdvertsService){}
    async getAdvertsByCategory(category: string): Promise<Advert[]> {
        const res = await this.advertsService.getAdvertsByCategory(category);
        return res.map(propertiesToObj)
    }
    async getAdvertsByPrice(price: number): Promise<Advert[]> {
        const res = await this.advertsService.getAdvertsByPrice(price);
        return res.map(propertiesToObj)
    }
    addAdvert(ad: Advert): Promise<Advert> {
        ad = propertiesToJson(ad);
        return this.advertsService.addAdvert(ad);
    }
    getAdverts(): Observable<string | Advert[]> {
        return this.advertsService.getAdverts().pipe(map(adverts => 
            Array.isArray(adverts) ? adverts.map(ad => propertiesToObj(ad)) : adverts))
    }
    deleteAdvert(id: any): Promise<void> {
        return this.advertsService.deleteAdvert(id);
    }
    updateAdvert(ad: any): Promise<void> {
        return this.advertsService.updateAdvert(propertiesToJson)
    }
    getAdvert(id: any): Promise<Advert|undefined> {
        let res = this.advertsService.getAdvert(id);
        if (res) {
            res = propertiesToObj(res);
        }
        return res;
    }
   
    
    
}

function propertiesToJson(ad: Advert): Advert {
    
   const {id, name, price, ...rest} = ad;
   return {id, name, price, properties: JSON.stringify(rest)}
}
function propertiesToObj(ad: Advert): Advert {
    return {id: ad.id, name: ad.name, price: ad.price,
         ...(JSON.parse(ad.properties))}
}
