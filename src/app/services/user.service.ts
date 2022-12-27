import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { idText } from 'typescript';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}
  //API call for user sign up
  userSignup(data: any) {
    const Url = environment.userUrl + '/signUp';
    return this.http.post(Url, data);
  }

  //API call for user login
  userLogin(data: any) {
    const Url = environment.userUrl + '/logIn';
    return this.http.post(Url, data);
  }

  //API call for user details
  getUserDetails(id: any, email: string) {
    return this.http.get(
      environment.userUrl + '/singleUser/' + id + '/' + email
    );
  }
  //API call for critics
  getCriticsDetails() {
    return this.http.get(environment.userUrl + '/critics');
  }

  //API for changing notification status "http://localhost:8000/critic/updateRequestStatus/:id",
  //payload:{"bookId":"630217114142f824291dfc7d", "publisher":"ankan_25","status":"denied"}

  //[data:
  //   {
  //     "critic_Id":"6340f2de1a58b3063197e8df",
  //     "critic_name":"gourab_critic",
  //     "bookToReview_Id":"630217114142f824291dfc7d",
  //     "bookToReview_name":"Po the dog",
  //     "status":"invited",
  //     "publisher":"ankan_25",
  //     "INR":2500,
  //     "pages":500
  //    }
  // ]
  addBookToCritic(id: any, data: object) {
    return this.http.post(
      environment.baseUrl + '/publisher/assignCritic/' + id,
      data
    );
  }

  //API to get Requests For Critic
  getRequestsForCritic(id: any, status: string) {
    return this.http.get(
      environment.baseUrl + '/critic/getCriticRequest/' + id + '/' + status
    );
  }

  requestAction(id: any, response: any) {
    return this.http.post(
      environment.baseUrl + '/critic/updateRequestStatus/' + id,
      response
    );
  }

  // get flag from localStorage to check if user is logged in
  userLoggedIn() {
    return localStorage.getItem('isLoggedIn');
  }

  setUserLogInData(userDetails: any) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('status', userDetails.status);
    localStorage.setItem('email', userDetails.email);
    localStorage.setItem('id', userDetails._id);
    localStorage.setItem('username', userDetails.uname);
  }

  localUserStatus() {
    return localStorage.getItem('status');
  }

  // get user email from localStorage
  getUserData() {
    return localStorage.getItem('username');
  }

  // removing data from localStorage and navigate to login page after logout
  logOut() {
    this.router.navigate(['/login']);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('status');
    return true;
  }
}
