import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ShoppingCartService } from '../../services/shoppingcart.service';
import { UserService } from '../../services/user.service';
import { ItemToBuy } from '../../models/ItemToBuy.model';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { ItemService } from '../../services/item.service';
import { Observable, map, of } from 'rxjs';
import { Item } from '../../models/Item.model';

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './shoppingcart.component.html'
})
export class ShoppingcartComponent {

  itemsToBuy: ItemToBuy[] = [];
  totalCost: number = 0;
  firstItem: ItemToBuy | any;
  otherItems: ItemToBuy[] = [];
  stock: number = 0;
  size: number = 0;

  constructor(private router: Router, public itemService: ItemService, public orderService: OrderService, public shoppingcartService: ShoppingCartService, public userService: UserService){}

  ngOnInit(){
    const user = this.userService.getCurrentUser();
    if (!user) return;
    this.shoppingcartService.getUserCart(user.username).subscribe(
      cart => {
        console.log(cart);
        this.totalCost = cart.totalCost,
        this.itemsToBuy = cart.items, 
        this.size = cart.items.length;
        this.firstItem = cart.items[0],
        this.otherItems = cart.items.slice(1)
        console.log(this.otherItems);
      },
      error => console.log(error)
    );
  }

  itemImage(id: number | undefined){
    return '/store/api/items/' + id + '/image';
  }

  removeItemFromCart(id?: number){
    this.shoppingcartService.deleteItem(id).subscribe(
      (_:any) => this.home(),
      (error:any) => console.log(error)
    )
  }

  generateOrder(){
    this.orderService.newOrder(this.userService.getCurrentUser().username).subscribe(
      (_:any) => this.home(),
      (error:any) => console.log(error)
    )
  }

  home(){
    this.router.navigate(['/home']);
  }

  
}
