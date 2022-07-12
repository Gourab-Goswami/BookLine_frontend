import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isSignUpSuccess = false;
  loginForm = new FormGroup({
    fname:new FormControl(' '),
    lname: new FormControl(' '),
    email: new FormControl(' '),
    password: new FormControl(' ')
  })
  constructor(private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      fname: [null, [Validators.required]],
      lname: [null, [Validators.required]],
      email: [null,[Validators.required,Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required,Validators.minLength(4), Validators.maxLength(10)]]
    });
  }
  signUpUser(){
    this.isSignUpSuccess = true;
  }

}
