import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/Order.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-orders.component.html',
  providers: []
})
export class UserOrdersComponent {

  orders: Order[] = [];
  size: number = 0;
  tam: number = 0;

  constructor(private router: Router, public orderService: OrderService, public userService: UserService){}

  ngOnInit(){
    this.tam = 10;
    this.userService.getUserOrders(this.currentUser()?.id, this.tam).subscribe(
      (orders:any) => {
        console.log(orders),
        this.size = orders.totalElements,
        this.orders = orders.content

      },
      (error: any) => console.log(error)
    )
  }

  loadMore(){
    this.tam += 10;
    this.userService.getUserOrders(this.currentUser()?.id, this.tam).subscribe(
      (orders:any) => {
        this.orders = orders.content

      },
      (error: any) => console.log(error)
    )
  }

  home(){
    this.router.navigate(['/home']);
  }

  userImage(id: number | undefined){
      return '/store/api/users/' + id + '/image';
  }

  getNoImage(){
    return this.orderService.getNoImage();
  }

  currentUser(){
    const user = this.userService.getCurrentUser();
    if (!user) return;
    return user;
  }
}
