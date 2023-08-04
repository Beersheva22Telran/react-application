import { Observable } from "rxjs";
import Advert from "../../model/Advert";

export default interface AdvertsService {
    addAdvert(ad: Advert): Promise<Advert>;
    getAdverts(): Observable<Advert[] | string>;
    deleteAdvert(id: any): Promise<void>;
    updateAdvert(ad: Advert): Promise<void>;
    getAdvert(id: any): Promise<Advert | undefined>;
    getAdvertsByCategory(category: string): Promise<Advert[]>;
    getAdvertsByPrice(price: number): Promise<Advert[]>
}