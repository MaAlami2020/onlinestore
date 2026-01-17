import { Component, ViewChild } from '@angular/core';
import { Item } from '../../models/Item.model';
import { ItemService } from '../../services/item.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-shoes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-shoes.component.html'
})
export class NewShoesComponent {

    factory: Map<string, string> = new Map<string, string>;
    types: string[] = [];
    genres: Set<string> = new Set<string>;
    genresArray: string[] = [];
    newItem: Item | undefined;
    item = {
      name: '',
      description: '',
      price: 0,
      gender: '',
      type: ''
    }
  
    @ViewChild('file')
    file: any
  
    constructor(private router: Router, public itemService: ItemService){
      this.factory.set("jeans", "clothes");
      this.factory.set("camisa", "clothes");
      this.factory.set("camiseta", "clothes");
      this.factory.set("zapato", "shoes");
      this.types = Array.from(this.factory.keys()); 
  
      this.genres.add("man");
      this.genres.add("woman");
      this.genres.add("unisex");
      this.genresArray = Array.from(this.genres);
    }
  
    create(){
      this.itemService.addItem(this.item).subscribe(
        (item: any) => {
          this.newItem = item,
          this.addImage(),
          this.router.navigate(['/inventory/items/' + this.newItem?.id + '/shoes/stock'])
        },
        (error: any) => console.log(error)
      );
    }
  
    addImage(){
      const image = this.file.nativeElement.files[0];
      if(image && this.newItem != undefined){
        let formData = new FormData();
        formData.append("imageField", image);
        this.itemService.addImage(this.newItem, formData).subscribe(
          (_:any) => alert("image successfully updated"),
          (_:any) => alert("error updating item image")
        );
      }else{
        alert("create an item first")
      }
    }
  
    home(){
      this.router.navigate(['/inventory/items']);
    }
}
