import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './myprofile.component.html'
})
export class MyprofileComponent {

  user = {
    name: '',
    email: '',
    code: '',
    street: '',
    number: 0,
    zipCode: 0,
    city: ''
  };

  //@ViewChild('file')
  //file:any;

  constructor(private router: Router, public userService: UserService){}
  
  home(){
    this.router.navigate(['/home']);
  }

  update(){
    console.log(this.currentUser());
    this.userService.updateUser(this.currentUser()?.id, this.user).subscribe(
      (user:any) => {
        alert('user information successfully updated');
        //console.log(user);
        this.userService.setCurrentUser(user);
        this.router.navigate(['/home']);
      },
      (error:any) => console.log(error)
    )
  }

  /*updateUserImage(user: User): void {
    const image = this.file.nativeElement.files[0];
    if(image) {
      let formData = new FormData();
      formData.append("imageFile",image);
      this.userService.setUserImage(user.id,formData).subscribe(
        (_: any) => alert('image successfully updated'),
        (_: any) => alert('error updating user image')
      );
    }
  }*/
  

  userImage(id: number | undefined){
      return '/store/api/users/' + id + '/image';
  }

  adminImage(){
      return '/store/api/users/6/image';
  }

  currentUser(){
    //console.log(this.userService.getCurrentUser());
    const user = this.userService.getCurrentUser();
    if (!user) return;
    return user;
  }
}
