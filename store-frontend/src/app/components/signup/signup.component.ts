import { Component, ViewChild, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User.model';
import { FormsModule } from '@angular/forms';
import { Direction } from '../../models/Direction.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  id: number = 0;
  user = {
    username: '',
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    rol: 'USER',
    code: '',
    street: '',
    number: 0,
    zipCode: 0,
    city: ''
  }

  @ViewChild("file")
  file: any;

  constructor(private router: Router, public userService: UserService){}

  ngOnInit(){
    if(this.userService.isLogged() && this.userService.isUser())
      this.id = this.userService.getCurrentUser().id;
  }

  home(){
    this.router.navigate(['/home']);
  }

  userImage(id: number | undefined){
    return '/store/api/users/' + id + '/image';
  }

  anonymousImage(){
    return '/store/api/users/6/image';
  }

  register() {
    this.userService.addUser(this.user).subscribe(
      (user: any) => { 
        console.log(user)
        this.uploadImage(user)
      },
      (_: any) => alert('failed to register')
    );  
  }

  uploadImage(user: User): void {
    const image = this.file.nativeElement.files[0];
    if(image) {
      let formData = new FormData();
      formData.append("imageFile",image);
      this.userService.setUserImage(user,formData).subscribe(
        (_: any) => { 
          alert('registered successfully')
        },
        (_: any) => alert('error uploading user image')
      );
    }
  }
}
