import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from "rxjs";
import { User } from "../models/User.model";
import { ItemToBuy } from "../models/ItemToBuy.model";
import { Item } from "../models/Item.model";
import { Size } from "../models/Size.model";
import { Stock } from "../models/Stock.model";
import { ItemDTO } from "../models/ItemDTO";
import { StockDTO } from "../models/StockDTO";

const ITEM_URL = '/store/api/items';
const ITEM_INV = '/inventory/api/inventory';

@Injectable({ providedIn: 'root'})
export class ItemService{

    constructor(private https: HttpClient){}

    getItems(tam: number): Observable<any>{
        return this.https.get(ITEM_URL + '?size=' + tam).pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>;
    }

    getTotalItems(): Observable<any>{
        return this.https.get(ITEM_URL + '/listing').pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>; 
    }

    addSize(size: Size):Observable<any>{
        return this.https.post(ITEM_INV + '/sizes', size).pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>; 
    }

    addClothes(clothes: Stock):Observable<any>{
        return this.https.post(ITEM_INV + '/items/clothes/stock', clothes).pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>; 
    }

    addShoes(shoes: Stock):Observable<any>{
        return this.https.post(ITEM_INV + '/items/shoes/stock', shoes).pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>; 
    }

    addSizeAndStockToItem(item: Item, stock: number, size: number):Observable<any>{
        return this.https.get(ITEM_INV + '/items/' + item.id + '/stocks/' + stock + '/sizes/' + size).pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>; 
    }

    getItemsFounded(name: string, tam: number): Observable<any>{
        return this.https.get(ITEM_URL + '/' + name + '?size=' + tam).pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>;
    }

    deleteRelationshipItemStock(id: number): Observable<any>{
        return this.https.delete(ITEM_INV + '/stocks/' + id).pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>;
    }

    deleteItemStock(id: number): Observable<any>{
        return this.https.delete(ITEM_INV + '/stocks/' + id + '/delete').pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>;
    }

    getItem(id: number): Observable<any>{
        return this.https.get(ITEM_URL + '/' + id + '/info').pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>;
    }

    updateItem(id: number, item: ItemDTO): Observable<any>{
        return this.https.put(ITEM_INV + '/items/' + id + '/update', item).pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>;
    }

    addItem(item: ItemDTO): Observable<any>{
        return this.https.post(ITEM_INV + '/items', item).pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>;
    }

    addImage(item: Item, image: FormData){
        return this.https.post(ITEM_INV + '/items/' + item.id + '/image', image).pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        );
    }

    deleteItem(id: number | undefined):Observable<any>{
        return this.https.delete(ITEM_INV + '/items/' + id + '/delete').pipe(
            catchError((error) => {
                return this.handleError(error)
            })
        )as Observable<any>;
    }

    addItemToCart(username: string, id: number, itemToBuy: ItemToBuy){
        return this.https.post('/store/api/add/cart/users/' + username + '/items/' + id, itemToBuy).pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        );
    }

    getUserFavItems(tam: number, user: User): Observable<any>{
        return this.https.get(ITEM_URL + '/favourites/' + user.username).pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>;
    }

    addFavItem(code: string, user: User): Observable<any>{
        return this.https.get(ITEM_URL + '/' + code + '/favourites/' + user.id +'/new').pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>;
    }

    handleError(error: any) {
        console.error('HTTP Error:', error);

        return throwError(() => error);
    }
}