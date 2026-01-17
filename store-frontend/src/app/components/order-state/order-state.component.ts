import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../models/Item.model';
import { State } from '../../models/State.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order } from '../../models/Order.model';
import { OrderService } from '../../services/order.service';
import { ItemService } from '../../services/item.service';
import { map, Observable, of } from 'rxjs';
import { ItemToBuy } from '../../models/ItemToBuy.model';

@Component({
  selector: 'app-order-state',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-state.component.html',
  styleUrl: './order-state.component.css'
})
export class OrderStateComponent {

  id: number = 0;
  item: Item | null = null;
  states: State[] = [State.PENDING, State.CONFIRMED, State.DELIVERED, State.CANCELLED];
  order: Order | null = null;
  newOrder: Order;
  itemToBuy: ItemToBuy | undefined;
  itemsToBuy: ItemToBuy[] = []; 
  items: ItemToBuy[] = [];
  stock: number = 0;
  size: number = 0;

  constructor(private router:Router, private activatedRoute: ActivatedRoute, public itemService: ItemService, public orderService: OrderService){
    this.newOrder = {
      code: '',
      itemsToBuy: [],
      totalCost: 0,
      creationDate: '',
      state: null as any
    }
  }

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.orderService.getOrder(this.id).subscribe(
      (order:any) => {
        console.log(order),
        this.order = order
      },
      (error:any) => console.log(error)
    );

    this.orderService.getItems(this.id).subscribe(
      items => {
        
        this.itemToBuy = items[0],
        console.log(this.itemToBuy),
        this.itemsToBuy = items.slice(1),
        this.items = items,
        this.size = items.length
      },
      error => console.log(error)
    );
  }

  adminIndex(){
    this.router.navigate(['order/orders/admin']);
  }

  itemImage(id: number | undefined){
      return '/store/api/items/' + id + '/image';
    }
  
  getItemStock(id?: number): Observable<any> {
    if (id == null) {
        return of(0); // o EMPTY
    }
    return this.itemService.getItem(id).pipe(
      // Use map to transform the observable result
      map((item: any) => {
        this.stock = 0;
        for (let object of item.content.stocks) {
          this.stock += object.stock;
        }
        return this.stock;
      })
    );
  }

  updateState(){
    this.orderService.postOrder(this.id, this.newOrder).subscribe(
      (_:any) => {
        alert("order state successfully updated"),
        this.adminIndex()
      },
      (error:any) => {
        alert("fail to update the order state"),
        console.log(error)
      }
    );
  }
}
