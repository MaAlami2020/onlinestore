import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../models/Item.model';
import { Stock } from '../../models/Stock.model';
import { ItemService } from '../../services/item.service';
import { Size } from '../../models/Size.model';

@Component({
  selector: 'app-shoes-stock',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './shoes-stock.component.html'
})
export class ShoesStockComponent {

  id: number = 0;
  item: Item | any;
  size = {
    code: '',
    label: ''
  }
  stocks: Stock[] = [];
  shoes = {
    code: '',
    stock: 0,
    size: this.size
  }
  
   
    constructor(private router: Router, private activatedRoute: ActivatedRoute, public itemService: ItemService){
    }
  
    currentIndex = 0;

    previousItem() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    }

    nextItem() {
      if (this.currentIndex < this.item!.stocks.length - 1) {
        this.currentIndex++;
      }
    }

    addNewStock(){
      this.itemService.addSize(this.size).subscribe(
        (size:any) => {
          this.size = size,
          this.shoes.size = this.size
        },
        (error:any) => console.log(error) 
      );
  
      this.itemService.addShoes(this.shoes).subscribe(
        (shoes:any) => {
          this.shoes = shoes,
          this.itemService.addSizeAndStockToItem(this.item, shoes.id, shoes.size.id).subscribe(
            (item:any) => {
              this.item = item,
              window.location.reload()
              //this.router.navigate(['/inventory/items/' + this.id + '/shoes/stock'])
            },
            (error:any) => console.log(error) 
          )
        },
        (error:any) => console.log(error) 
      );  
    }
  
    ngOnInit(){
      this.id = this.activatedRoute.snapshot.params['id'];
      this.itemService.getItem(this.id).subscribe(
        (item:any) => {
          this.stocks = item.stocks,
          this.item = item
        },
        (error:any) => console.log(error) 
      );
    }
  
    deleteStock(stock: Stock | any){
      this.itemService.deleteRelationshipItemStock(stock.id).subscribe(
        (_:any) => {
          this.itemService.deleteItemStock(stock.id).subscribe(
            (_:any) => {
              alert("stock successfully deleted"),
              //window.location.reload()
              this.router.navigate(['/inventory/items/'+ this.id])
            },
            (_:any) => alert("error deleting stock")
          );
        },
        (_:any) => alert("error deleting stock")
      );
    }
  
    itemImage(){
      return '/store/api/items/' + this.id + '/image';
    }
  
    home(){
      this.router.navigate(['/inventory/items']);
    }
  }
