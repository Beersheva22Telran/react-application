import { Category, categories, generationFunctions } from "../config/adverts-config";
import Advert from "../model/Advert";
import { getRandomElement, getRandomInt } from "./random";

export function getRandomRealty(): Advert {
    const cities = ["Tel-Aviv", "Lod", "Rehovot", "Kfar-Saba",
     "Raanana", "Beersheba", "Holon", "Bat-Yam", "Haifa"];
    const data = categories.get("Realty");
    const rentSale = getRandomElement(data.rentSale);
    const price =  getRandomInt(data.price[rentSale].min, data.price[rentSale].max + 1);
    
    const type = getRandomElement(data.type);
    const name = `${type} in ${getRandomElement(cities)}(${rentSale})`;
    const category = "Realty";
    const size = getRandomInt(data.size.min, data.size.max + 1);
    const rooms = getRandomInt(data.rooms.min, data.rooms.max + 1);
    
    return {category, price, name,  type, size, rooms, rentSale}
}
export function getRandomCar(): Advert {
    
            
        const data = categories.get("Cars");
        const category = "Cars";
        
        const company = getRandomElement(data.company);
        const model = getRandomElement(data.model[company]);
        
        const color = getRandomElement(data.color);
        

        const kilometers = getRandomInt(0, 2) == 1 ? getRandomInt(data.kilometers.min,
             data.kilometers.max + 1) : 0;
             const price = 
             kilometers == 0 ? getRandomInt(80000, data.price.max + 1) :
             getRandomInt(data.price.min, 80000);
             const year = kilometers == 0 ? 2023:getRandomInt(data.year.min, data.year.max + 1);
             const name = `${company}-${model}-${year}`;
        return {category, price, name, company, model, year, color, kilometers}
    }
    export function getRandomApplience(): Advert {
        const category: Category = "Appliances"
        const data = categories.get(category);
        
        const type = getRandomElement(data.type);
        const newSecondHand = getRandomElement(data.newSecondHand);
        const name = `${type}(${newSecondHand})`;
        const price = newSecondHand == "new" ? getRandomInt(data.price.min, data.price.max + 1)
        : getRandomInt(data.price.min * 0.5, (data.price.max) * 0.5 + 1);
        return {category, price, name, type, newSecondHand};
    }
    export function getRandomAdvert(): Advert {
        const categoriesAr: Category[] = Array.from(categories.keys());
        const category = getRandomElement(categoriesAr);
        const randomFn = generationFunctions.get(category);
        return randomFn ? randomFn() : {category, name: "unknown", price: 0};
    }
