import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/Order.model';
import { CommonModule } from '@angular/common';
//import { NgIf } from "../../../../node_modules/@angular/common/index";

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css'
})
export class AdminOrdersComponent {

  nameByCode: string | any;
  nameByDate: string = '';
  tam: number = 0;
  tam1: number = 0;
  tam2: number = 0; 
  ordersByCode: Order[] = [];
  ordersByDate: Order[] = [];
  orders: Order[] = [];
  size: number = 0;
  size1: number = 0;
  size2: number = 0;

  constructor(private router: Router, public orderService: OrderService, public userService: UserService){}

  ngOnInit(){
    this.tam = 10;
    this.orderService.getOrders(this.tam).subscribe(
      orders => {
        this.orders = orders.content,
        this.size = orders.totalElements
      },
      error => console.log(error)
    );
  }

  moreOrders(){
    this.tam += 10;
    this.orderService.getOrders(this.tam).subscribe(
      orders => this.orders = orders.content,
      error => console.log(error)
    );
  }

  moreOrdersByCode(){
    this.tam1 += 10;
    this.orderService.getByCode(this.nameByCode, this.tam1).subscribe(
      (orders: any) => this.ordersByCode = orders.content,
      (error: any) => console.log(error)
    );
  }

  moreOrdersByDate(){
    this.tam2 += 10;
    this.orderService.getByDate(this.nameByDate, this.tam2).subscribe(
      (orders: any) => this.ordersByDate = orders.content,
      (error: any) => console.log(error)
    );
  }

  home(){
    this.router.navigate(['/home']);
  }

  adminImage(){
    return '/store/api/users/6/image';
  }

  searchOrdersByCode(){
    this.tam1 = 10;
    this.orderService.getByCode(this.nameByCode, this.tam1).subscribe(
      (orders: any) => {
        this.ordersByCode = orders.content,
        this.size1 = orders.totalElements
      },
      (error: any) => console.log(error)
    );
  }

  searchOrdersByDate(){ 
    this.tam2 = 10;
    this.orderService.getByDate(this.nameByDate, this.tam2).subscribe(
      (orders: any) => {
        this.ordersByDate = orders.content,
        this.size2 = orders.totalElements
      },
      (error: any) => console.log(error)
    );
  }
}
