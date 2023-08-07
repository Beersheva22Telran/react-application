import { ReactNode } from "react";
import Advert from "../model/Advert";
import { getRandomApplience, getRandomCar, getRandomRealty } from "../util/randomAdvert";
import CarsForm from "../components/forms/CarsForm";
import { Typography } from "@mui/material";

export type Category = "Realty" | "Cars" | "Appliances"
export type CommonProperties = {
    category: string;
    name: string;
    price: number;
}
export type Realty = CommonProperties & {
    rentSale?: "rent" | "sale";
    size?: number;
    rooms?: number;
    type?: "Apartment"| "Cottage"| "Villa"
}
export type Car = CommonProperties &{
    company?: string;
    model?: string; 
    year?: number;
    kilometers?: number;
    color?: string
}
export type Appliance = CommonProperties & {
    type?: "TV Set"| "Fridge"| "Computer"| "Smartphone"|
    "Drone"| "Amplifier",
    rentSale?: "rent"|"sale",
    size?: number,
    rooms?: number
}
export const categories: Map<Category, any> = new Map([
    ["Realty", {
        price: { sale: {min: 900000, max: 10000000}, rent: {min: 3500, max: 10000} },
        type: ["Apartment", "Cottage", "Villa"],
        rentSale: ["rent", "sale"],
        size:{min: 50, max:1000},
        rooms: {min: 1, max: 10}
    }],
    ["Cars", {
        price: { min: 10000, max: 500000},
        company: ["Suzuki", "Nisan", "Toyota", "Mitsubishi",
         "Mazda", "Hundai", "Kia"],
        model: {Suzuki:["Swift", "Ignis", "Baleno",
         "Vitara", "S-Cross", "Sx4", "Jimny"], Nisan: ["Altima",
        "Murano", "Pathfinder", "Juke", "Leaf", "Sentra", "X=Trail"
    , "Maxima"], Toyota: ["Corola", "Camry", "Prius", "Rav4",
     "Yaris", "Land Cruiser"],Mitsubishi: ["Outlander",
      "Eclipse-Cross", "Lancer", "Pajero", "Triton", "Sport"],
      Mazda: ["CX-3", "CX-6", "CX-9", "Mazda2", "Mazda3", "Mazda6",
    "MX-5", "MX-30"],Hundai: ["i10", "i20", "i30", "Tucson",
     "Elantra", "Kona", "Accent", "Ioniq"], Kia: ["Sportage",
      "Sorento", "Forte", "Sorento", "Rio", "Carnival","Picanto", "Stonic"] },
      year: {min: 2000, max: 2023},
      color: ["blue", "green", "red",
       "silver", "black", "white", "gray", "pearl", "metalic"], 
       kilometers: {min: 0, max: 50000}
       
    }],
    [
        "Appliances", {
            price: {min: 1000, max: 10000},
            newSecondHand: ["new", "second-hand"],
            type: ["TV Set", "Fridge", "Computer", "Smartphone",
             "Drone", "Amplifier"]
        }
    ]
   
]);
export const generationFunctions: Map<Category, ()=>Advert> = new Map(
    [
        ["Realty", getRandomRealty],
        ["Cars", getRandomCar],
        ["Appliances", getRandomApplience]
       

    ]
)

 export function getCategoryForms(advert: Advert,
     submitFn: (advert: Advert)=>Promise<void>) :  Map<Category, ReactNode> {
        const categoryForms: Map<Category, ReactNode> =new Map<Category, ReactNode> (
            [
                ["Cars", <CarsForm advert={advert}
                 submitFn={submitFn}
                 ></CarsForm>],
                 ["Realty",<Typography variant={"h4"}>Not Implemented yet</Typography>],
                 ["Appliances",<Typography variant={"h4"}>Not Implemented yet</Typography>]
            ])
            return categoryForms;
     }
 

