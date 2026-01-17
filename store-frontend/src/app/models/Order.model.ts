import { ItemToBuy } from "./ItemToBuy.model";
import { State } from "./State.enum";

export interface Order{
    id?: number,
    code: string,
    itemsToBuy: ItemToBuy[],
    totalCost: number,
    creationDate: string,
    state: State
}