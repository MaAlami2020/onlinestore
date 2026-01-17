import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";

const CART_URL = '/store/api/shoppingcart';

@Injectable({ providedIn: 'root'})
export class ShoppingCartService{
    
    constructor(private https: HttpClient){}

    getCartItems(username: string): Observable<any>{
        return this.https.get(CART_URL + '/' + username + '/items').pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>;
    }  

    getUserCart(username: string): Observable<any>{
        return this.https.get(CART_URL + '/' + username).pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>;
    }

    deleteItem(id?: number): Observable<string>{
        return this.https.delete(CART_URL + '/' + id + '/remove', { responseType: 'text' as 'json' }).pipe(
            catchError((error) => {
                return this.handleError(error);
            })
        )as Observable<any>;
    }

    handleError(error: any): any {
        throw new Error("Method not implemented.");
    }
}