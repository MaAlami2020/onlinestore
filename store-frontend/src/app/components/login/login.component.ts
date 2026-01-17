import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from "@angular/router";
import { UserService } from '../../services/user.service';
import { Item } from '../../models/Item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  //itemsFav: Item[] = [];
  //tam2: number = 10;
  //capacityFav: number = 0;

  constructor(private router: Router, private userService: UserService){}

  signin(event: any, user: string, pass: string) {

    event.preventDefault();

    this.userService.signin(user, pass);

    /*this.itemService.getUserFavItems(this.tam2, this.userService.getCurrentUser()).subscribe(
      (items: any) => {
          this.itemsFav = items.content;
          this.capacityFav = items.totalElements;
      },
      (error: any) => console.log(error)
    );*/

    this.router.navigate(['/home']);  
  }
  
  home(){
    this.router.navigate(['/home']);
  }
}
