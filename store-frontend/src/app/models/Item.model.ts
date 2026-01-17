import { ItemToBuy } from "./ItemToBuy.model";
import { Stock } from "./Stock.model";
import { User } from "./User.model";

export interface Item{
    id?: number,
    code: string,
    name: string,
    description: string,
    price: number,
    gender: string,
    type: string,
    stocks: Stock[],
    itemsToBuy: ItemToBuy[],
    favouritesItemsUser: User[]
}