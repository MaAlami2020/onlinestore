import { Direction } from "./Direction.model";
import { Item } from "./Item.model";
import { Order } from "./Order.model";
import { ShoppingCart } from "./ShoppingCart.model";

export interface User{
    id?: number,
    username: string,
    name: string,
    email: string,
    password: string,
    rol: string,
    passwordConfirmation: string,
    direction: Direction,
    shoppingCart: ShoppingCart,
    items: Item[],
    orders: Order[]
}