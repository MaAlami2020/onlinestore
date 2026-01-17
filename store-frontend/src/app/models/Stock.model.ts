import { Size } from "./Size.model";

export interface Stock{
    id?: number,
    code: string,
    stock: number,
    size: Size
}