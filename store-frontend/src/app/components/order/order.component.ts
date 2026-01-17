import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Order } from '../../models/Order.model';
import { OrderService } from '../../services/order.service';
import { ItemToBuy } from '../../models/ItemToBuy.model';
import { ItemService } from '../../services/item.service';
import { map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  order: Order | any;
  id: number = 0;
  itemToBuy: ItemToBuy | any;
  itemsToBuy: ItemToBuy[] = []; 
  items: ItemToBuy[] = [];
  stock: number = 0;
  size: number = 0;

  constructor(private router: Router, public itemService: ItemService, public orderService: OrderService, private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.orderService.getOrder(this.id).subscribe(
      order => {
        console.log(order),
        this.order = order
      },
      error => console.log(error)
    );

    this.orderService.getItems(this.id).subscribe(
      items => {
        this.items = items,
        console.log(this.items),
        this.itemToBuy = items[0],
        this.itemsToBuy = items.slice(1),
        this.size = items.length
      },
      error => console.log(error)
    )
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

  home(){
    this.router.navigate(['/home']);
  }

}
