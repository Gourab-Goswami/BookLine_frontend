import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  adminData = {
    email:'user@gmail.com',
    password:1234
  }
  loginForm = new FormGroup({
    email: new FormControl(' '),
    password: new FormControl(' ')
  })
  invalidInput:boolean = false;
  constructor(private formBuilder: FormBuilder, public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
    });
    // removing data from localStorage if user is in logIn page
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
  }
  loginUser() {
    if(this.adminData.email == this.loginForm.value.email && this.adminData.password == this.loginForm.value.password ){
    // setting flag and userName to localstorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', this.loginForm.value.email);

    // navigate to /books route after login
    this.router.navigate(['/books']);
    }
    else{
    this.invalidInput = true;
    }
  }


}
