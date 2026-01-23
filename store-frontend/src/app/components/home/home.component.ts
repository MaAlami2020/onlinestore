import { Component } from "@angular/core";
import { UserService } from "../../services/user.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule, RouterOutlet } from "@angular/router";
import { NgxSpinnerService, NgxSpinnerModule } from "ngx-spinner";
import { ItemService } from "../../services/item.service";
import { User } from "../../models/User.model";
import { Item } from "../../models/Item.model";


@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, NgxSpinnerModule],
    templateUrl: './home.component.html',
    providers: []
})
export class HomeComponent{

    name: string = '';
    tam: number = 10;
    tam1: number = 10;
    tam2: number = 10;
    items: Item[] = [];
    itemsFounded: Item[] = [];
    itemsFav: Item[] = [];
    item: Item | null = null;
    capacity: number = 0;
    capacityFounded: number = 0;
    capacityFav: number = 0;

    constructor(private router: Router, private spinner: NgxSpinnerService, public userService: UserService, public itemService: ItemService){}

    ngOnInit(){
        this.itemService.getItems(this.tam).subscribe(
            items => {
                this.items = items.content;
                this.capacity = items.totalElements;
            },
            error => console.log(error)
        );
    }

    my_profile(){
        this.router.navigate(['/store/my_profile']);
    }

    shoppingCartPage(){
        this.router.navigate(['/store/shoppingcart/page']);
    }

    userOrders(id: number){
        this.router.navigate(['/order/orders/users/' + this.userService.getCurrentUser().id]);
    }

    inventory(){
        this.router.navigate(['/inventory/items']);
    }

    orders(){
        this.router.navigate(['/order/orders/admin']);
    }

    login(){
        this.router.navigate(['/store/login']);
    }

    signup(){
        this.router.navigate(['/store/signup']);
    }

    signout(){
        this.userService.signout();
        this.router.navigate(['/home']);
    }

    userImage(id: number | undefined){
        return '/store/api/users/' + id + '/image';
    }

    adminImage(){
        return '/store/api/users/6/image';
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

    userFavItems() {
        this.itemService.getUserFavItems(this.tam2, this.userService.getCurrentUser()).subscribe(
            (items: any) => {
                this.itemsFav = items.content;
                this.capacityFav = items.totalElements;
            },
            (error: any) => console.log(error)
        );
    }

    addFavItem(code: string, user: User){
        this.itemService.addFavItem(code, user).subscribe(
            (item: any) => this.item = item,
            (error:any) => console.log(error)
        );
    }

    moreItems(){
        this.tam += 10;
        this.itemService.getItems(this.tam).subscribe(
            (items:any) => this.items = items.content,
            (error:any) => console.log(error)
        );
    }

    moreItemsFounded(){
        this.tam1 += 10;
        this.itemService.getItemsFounded(this.name, this.tam1).subscribe(
            (items:any) => this.itemsFounded = items.content,
            (error:any) => console.log(error)
        );
    }

    moreFavItems(){
        this.tam2 += 10;
        this.itemService.getUserFavItems(this.tam2, this.userService.getCurrentUser()).subscribe(
            (items: any) => this.itemsFav = items.content,
            (error: any) => console.log(error)
        );
    }

    getItemImage(id: number | undefined){
        return '/store/api/items/' + id + '/image';
    }
}