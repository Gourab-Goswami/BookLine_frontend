import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router:Router) {}

  // get flag from localStorage to check if user is logged in 
  userLoggedIn(){
    return localStorage.getItem('isLoggedIn');
  }
 
  // get user email from localStorage
  getUserData(){
    return localStorage.getItem('email');
  }

  // removing data from localStorage and navigate to login page after logout
  logOut(){
    this.router.navigate(['/login']);
     localStorage.removeItem('isLoggedIn');
     localStorage.removeItem('email');
     return true;
  }
}
