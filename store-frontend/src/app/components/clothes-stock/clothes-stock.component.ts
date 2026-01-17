import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Item.model';
import { Stock } from '../../models/Stock.model';
import { FormsModule } from '@angular/forms';
import { Size } from '../../models/Size.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clothes-stock',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './clothes-stock.component.html'
})
export class ClothesStockComponent {

  id: number = 0;
  item: Item | any;
  size = {
    code: '',
    label: ''
  }
  stocks: Stock[] = [];
  clothes = {
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
        console.log(size),
        this.size = size,
        this.clothes.size = this.size
      },
      (error:any) => console.log(error) 
    );

    this.itemService.addClothes(this.clothes).subscribe(
      (clothes:any) => {
        console.log(clothes),
        this.clothes = clothes,
        
        this.itemService.addSizeAndStockToItem(this.item, clothes.id ,clothes.size.id).subscribe(
          (item:any) => {
            this.item = item,
            console.log(this.item),
            window.location.reload()
            //this.router.navigate(['/inventory/items/' + this.id])
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
        console.log(this.stocks),
        this.item = item
      },
      (error:any) => console.log(error) 
    );
  }

  deleteStock(stock: Stock | any){
    console.log(stock);
    console.log(stock.id);
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
