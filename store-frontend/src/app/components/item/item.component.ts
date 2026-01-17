import { Component, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Item.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './item.component.html'
})
export class ItemComponent {

  factory: Map<string, string> = new Map<string, string>;
  types: string[] = [];
  genres: Set<string> = new Set<string>;
  genresArray: string[] = [];
  id: number = 0;
  category: string | undefined;
  item: Item | any;
  itemUpdated = {
    name: '',
    description: '',
    price: 0,
    gender: '',
    type: ''
  }

  @ViewChild('file')
  file: any

  constructor(private router: Router, public itemService: ItemService, private activatedRoute: ActivatedRoute){
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

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.itemService.getItem(this.id).subscribe(
      (item: any) => {
        console.log(item),
        this.item = item,
        this.category = this.factory.get(item.type)
      },
      (error: any) => console.log(error)
    );
  }

  itemImage(id?: number){
    return '/store/api/items/' + id + '/image';
  }

  update(){
    this.itemService.updateItem(this.id, this.itemUpdated).subscribe(
      (item: any) => {
        console.log(item),
        this.item = item,
        this.category = this.factory.get(item.type),
        //this.updateImage(this.id),
        this.router.navigate(['/inventory/items'])
      },
      (error: any) => console.log(error)
    );
  }

  updateImage(){
    const image = this.file.nativeElement.files[0];
    if(image){
      let formData = new FormData();
      formData.append("itemImage", image);
      this.itemService.addImage(this.item, formData).subscribe(
        (_:any) => {alert("image successfully updated"),
          this.home()
        },
        (_:any) => alert("error updating item image")
      );
    }
  }

  home(){
    this.router.navigate(['/inventory/items']);
  }

}
