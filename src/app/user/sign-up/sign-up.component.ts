import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isSignUpSuccess = false;
  signupForm = new FormGroup({
    fname:new FormControl(' '),
    lname: new FormControl(' '),
    email: new FormControl(' '),
    password: new FormControl(' ')
  })
  constructor(private formBuilder: FormBuilder,public userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fname: [null, [Validators.required]],
      lname: [null, [Validators.required]],
      email: [null,[Validators.required,Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required,Validators.minLength(4), Validators.maxLength(10)]]
    });
  }
  signUpUser(){
    
    this.userService.userSignup(this.signupForm.value)
      .subscribe(Details =>{
        console.log("Users data Submitted", Details);
        this.isSignUpSuccess = true;
      },(err) =>{
       err='Sorry could not Sign Up ! ';
      })
  }

}
