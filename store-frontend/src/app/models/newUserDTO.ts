import { Item } from "./Item.model";
import { Order } from "./Order.model";

export interface newUserDTO{
    username: string,
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    rol: string,
    code: string,
    street: string,
    number: number,
    zipCode: number,
    city: string
}