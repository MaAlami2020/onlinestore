import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Item.model';
import { Stock } from '../../models/Stock.model';
import { FormsModule } from '@angular/forms';
import { ItemToBuy } from '../../models/ItemToBuy.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-page',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './item-page.component.html',
  providers: []
})
export class ItemPageComponent {

  id: number = 0;
  item: Item | null = null;
  itemStocks: Stock[] = []
  status: string = '';
  itemToBuy: ItemToBuy;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public userService: UserService, public itemService: ItemService){
    this.itemToBuy = {
      code: '',
      size: '',
      count: 0,
      items: [] // or provide a default Item object if required
    }
  }

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.itemService.getItem(this.id).subscribe(
      (item:any) => {
        this.item = item;
        //this.itemToBuy.items = item;
        console.log(item);
        this.itemStocks = item.stocks;
        console.log(this.itemStocks);
      },
      (error:any) => console.log(error)
    );
  }

  itemImage(){
    return '/store/api/items/' + this.id + '/image';
  }

  buy(){   
    console.log(this.itemToBuy);
    console.log(this.userService.getCurrentUser().username);
    console.log(this.id);
    this.itemService.addItemToCart(this.userService.getCurrentUser().username, this.id, this.itemToBuy).subscribe(
      (_:any) => this.status = "item successfully added to the cart",
      (error:any) => {
        this.status = "fail to add the item to the cart",
        console.log(error)
      }
    );
  }

  home(){
    this.router.navigate(['/home']);
  }

}
