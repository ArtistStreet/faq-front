import { BaseModel } from "./common";

export default interface Shop extends BaseModel {
     name: string;
     address: string;
     desc?: string;
}

export interface ShopCreate {
     createShop: Shop;
     updateShop: Shop;
}