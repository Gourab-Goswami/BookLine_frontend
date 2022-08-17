import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private router:Router) {}
  //API call for user sign up
  userSignup(data:any){
    const Url=environment.userUrl+'/signUp';
    return this.http.post(Url,data)
  }

  //API call for user login
  userLogin(data:any){
    const Url=environment.userUrl+'/logIn';
    return this.http.post(Url,data)
  }

  //API call for user details
  getUserDetails(id:any){
    return this.http.get(environment.userUrl+'/'+id);
  }
  
  // get flag from localStorage to check if user is logged in 
  userLoggedIn(){
    return localStorage.getItem('isLoggedIn');
  }
 
  // get user email from localStorage
  getUserData(){
    return localStorage.getItem('username');
  }

  // removing data from localStorage and navigate to login page after logout
  logOut(){
    this.router.navigate(['/login']);
     localStorage.removeItem('isLoggedIn');
     localStorage.removeItem('email');
     return true;
  }
}
