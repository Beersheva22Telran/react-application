import { Observable, Subscriber } from "rxjs";
import AdvertsService from "./crud/AdvertsService";
import { getRandomInt } from "../util/random";
import Advert from "../model/Advert";
export default class AdvertsServiceArray implements AdvertsService {
    
    adverts: Advert[] = [];
    subscriber: Subscriber<Advert[]|string> | null = null;
    observable: Observable<Advert[]|string> = new Observable(subscriber => {
        if (!this.subscriber) {
            this.subscriber = subscriber;
            subscriber.next(this.adverts);
        }
        return () => this.subscriber = null;
    })
    getAdvertsByCategory(category: string): Promise<Advert[]> {
        return Promise.resolve(this.adverts.filter(ad => ad.category === category))
    }
    getAdvertsByPrice(price: number): Promise<any[]> {
        return Promise.resolve(this.adverts.filter(ad => ad.price <= price))
    }
getAdvert(id: any): Promise<Advert|undefined> {
        return Promise.resolve(this.findById(id));
    }
    private findById(id: any): Advert | undefined {
        return this.adverts.find(a => a.id == id);
    }

    addAdvert(ad: Advert): Promise<Advert> {
       let id: number = this.getId();
       const res = {...ad, id};
       this.adverts.push(res);
       this.subscriber?.next(this.adverts);
       return Promise.resolve(res);
    }
    private getId(): number {
        let id: number;
        do {
            id = getRandomInt(10000, 100000);
        } while (this.findById(id));
        return id;
    }

    getAdverts(): Observable<string | Object[]> {
        return this.observable;
    }
    async deleteAdvert(id: any): Promise<void> {
        const index = this.adverts.findIndex(a => a.id == id);
        if (index >= 0) {
            this.adverts.splice(index, 1);
            this.subscriber?.next(this.adverts)
        } else {
            throw "not found"
        }
        
    }
    async updateAdvert(ad: object): Promise<void> {
        const index = this.adverts.findIndex(a => (a as any).id == (ad as any).id);
        if (index >= 0) {
            this.adverts.splice(index, 1, ad);
            this.subscriber?.next(this.adverts)
        } else {
            throw "not found"
        }
    }
    
}