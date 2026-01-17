import { Item } from "./Item.model";

export interface ItemToBuy{
    id?: number,
    code: string,
    size: string,
    count: number,
    items: Item[]
}