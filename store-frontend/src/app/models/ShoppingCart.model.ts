import { ItemToBuy } from "./ItemToBuy.model";

export interface ShoppingCart{
    id?: number,
    code: string,
    totalCost: number,
    buyTime: string,
    items: ItemToBuy[]
}