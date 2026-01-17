import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './items.component.html'
})
export class ItemsComponent {

  name: string = '';
  tam: number = 10;
  tam1: number = 10;
  itemsFounded: Item[] = [];
  capacityFounded: number = 0;
  items: Item[] = [];
  capacity: number = 0;

  constructor(private router: Router, public itemService: ItemService, public userService: UserService){}

  ngOnInit(){
    this.itemService.getItems(this.tam).subscribe(
        items => {
            this.items = items.content;
            this.capacity = items.totalElements;
        },
        error => console.log(error)
    );
  }

  home(){
    this.router.navigate(['/home']);
  }

  deleteItem(id?: number){
    this.itemService.deleteItem(id).subscribe(
      (_:any) => {
        alert("item successfully deleted"),
        window.location.reload();
      },
      (error: any) => console.log(error)
    );
  }

  clothesPage(){
    return this.router.navigate(['/inventory/items/clothes/page']);
  }

  shoesPage(){
    return this.router.navigate(['/inventory/items/shoes/page']);
  }

  searchItem(){
    this.itemService.getItemsFounded(this.name, this.tam1).subscribe(
        (items:any) => {
            this.itemsFounded = items.content;
            this.capacityFounded = items.totalElements;
        },
        (error:any) => console.log(error)
    );
  }

  moreItems(){
    this.tam += 10;
    this.itemService.getItems(this.tam).subscribe(
      (items: any) => this.items = items.content,
      (error: any) => console.log(error)
    );
  }

  itemImage(id: number | undefined){
    return '/store/api/items/' + id + '/image';
  }

  moreItemsFounded(){
    this.tam1 += 10;
    this.itemService.getItemsFounded(this.name, this.tam1).subscribe(
      (items: any) => {
        this.itemsFounded = items.content,
        this.capacityFounded = items.totalElements
      },
      (error: any) => console.log(error)
    )
  }

  adminImage(){
    return '/store/api/users/6/image';
  }

}
