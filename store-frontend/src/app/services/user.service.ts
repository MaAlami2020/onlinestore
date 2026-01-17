import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../models/User.model";
import { Direction } from "../models/Direction.model";
import { catchError, Observable } from "rxjs";
import { UserDTO } from "../models/UserDTO";
import { newUserDTO } from "../models/newUserDTO";

const USER_URL = '/store/api/users';
const BASE_URL = '/store/api/auth';
const ORDER_URL = '/store/api/orders';


@Injectable({ providedIn: 'root'})
export class UserService{

    logged: boolean = false;
    user: any;

    //constructor
    constructor(private https: HttpClient){
        this.reqIsLogged(); 
    }

    reqIsLogged(){
        this.https.get<User>(USER_URL + '/current', {withCredentials: true}).subscribe(
            response => {
                this.user = response as User;
                this.logged = true;
            },
            error => {
                if (error.status === 401 || error.status === 403) {
                    this.logged = false;
                    this.user = undefined;
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        )
    }

    signin(user: string, pass: string) {
		this.https.post(BASE_URL + "/login", { username: user, password: pass }, { withCredentials: true })
		.subscribe(
			(_:any) => this.reqIsLogged(),
			(_:any) => alert("Wrong credentials")
		);
	}

    signout() {
		return this.https.post(BASE_URL + '/logout', { withCredentials: true })
		.subscribe((_: any) => {
			console.log("LOGOUT: succesfully");
			this.logged = false;
			this.user = undefined;
		});
	}

    isLogged(){
        return this.logged;
    }

    isUser(){
        //return this.user && this.user.rol.indexOf('USER') !== -1;
        return this.user?.rol?.includes("USER");
    }

    isAdmin(){
        //return this.user && this.user.rol.indexOf('ADMIN') !== -1;
        return this.user?.rol?.includes("ADMIN");
    }

    //getUserImage(id: number | undefined){
    //    return this.https.get(USER_URL + '/' + id + '/image');
    //}

    setUserImage(user: User, formData: FormData){
        return this.https.post(USER_URL + '/' + user.id + '/image', formData).pipe(
            catchError((error) => {
                return this.handleError(error)
            })
        );
    }

    addUser(user: newUserDTO): Observable<any>{
        return this.https.post(USER_URL + '/new', user).pipe(
            catchError((error) => {
                return this.handleError(error)
            })
        )as Observable<any>;
    }

    //getAdminImage(){
    //    return this.https.get(USER_URL + '/6/image');
    //}


    setCurrentUser(user: User){
        this.user = user;
    }

    getCurrentUser(){
        return this.user;
    }

    updateUser(id: number, user:UserDTO): Observable<any>{
        return this.https.put(USER_URL + '/' + id + '/update', user).pipe(
            catchError((error) => {
                return this.handleError(error)
            })
        )as Observable<any>;
    }

    getUserOrders(id: number, tam: number): Observable<any>{
        return this.https.get(ORDER_URL + '/user/' + id + '?size=' + tam).pipe(
            catchError((error) => {
                return this.handleError(error)
            })
        )as Observable<any>;
    }

    /*updateUserAddress(id: number, address:Direction){
        return this.https.put(USER_URL + '/' + id + '/update/address', address).pipe(
            catchError((error) => {
                return this.handleError(error)
            })
        )as Observable<any>;
    }*/

    handleError(error: any): any {
        throw new Error("Method not implemented.");
    }
}