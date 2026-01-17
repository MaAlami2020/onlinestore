import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { Order } from "../models/Order.model";

const ORDER_URL = '/store/api/orders';
const ORDER_SERV = '/order/api/orders';

@Injectable({providedIn: 'root'})
export class OrderService{

    constructor(private https: HttpClient){}

    /*getUserOrders(id: number, tam: number): Observable<any>{
        return this.https.get('/store/api/orders/user/' + id + '?size=' + tam).pipe(
            catchError((error) => {
                return this.handleError(error)
            })
        )as Observable<any>;
    }*/

    getOrders(tam: number): Observable<any>{
        return this.https.get(ORDER_SERV + '?size=' + tam).pipe(
            catchError((error) => {
                return this.handleError(error)
            })
        )as Observable<any>;
    }

    postOrder(id: number, order: Order): Observable<any>{
        return this.https.post(ORDER_SERV + '/' + id + '/state/update',order).pipe(
            catchError((error) => {
                return this.handleError(error)
            })
        )as Observable<any>;
    }

    getOrder(id: number): Observable<any>{
        return this.https.get(ORDER_URL + '/' + id).pipe(
            catchError((error) => {
                return this.handleError(error)
            })
        )as Observable<any>;
    }

    getByCode(name: string, tam: number): Observable<any>{
        return this.https.get(ORDER_SERV + '/' + name + '?size=' + tam).pipe(
            catchError((error) => {
                return this.handleError(error)
            })
        )as Observable<any>;
    }

    getByDate(name: string, tam: number): Observable<any>{
        return this.https.get(ORDER_SERV + '/date/' + name + '?size=' + tam).pipe(
            catchError((error) => {
                return this.handleError(error)
            })
        )as Observable<any>;
    }

    getItems(id: number): Observable<any>{
        return this.https.get(ORDER_URL + '/' + id + '/items').pipe(
            catchError((error) => {
                return this.handleError(error)
            })
        )as Observable<any>;
    }

    newOrder(username: string): Observable<any>{
        return this.https.get(ORDER_URL + '/users/' + username).pipe(
            catchError((error) => {
                return this.handleError(error)
            })
        )as Observable<any>;
    }

    getNoImage(){
        return '../../img/no_image.png';
    }

    handleError(error: any): any {
        throw new Error("Method not implemented.");
    }
}