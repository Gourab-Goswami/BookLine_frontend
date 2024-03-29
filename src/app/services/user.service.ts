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

  //API to get all the request that publisher sent
  getPublisherRequests(id: string | number | null) {
    return this.http.get(
      environment.baseUrl + '/publisher/getAssignedCritics/' + id
    );
  }

  deleteRequestForPublisher(requestId: any, userId: string | number | null) {
    return this.http.post(
      environment.baseUrl + '/publisher/deleteRequest/' + userId,
      requestId
    );
  }

  //payload(form) ---------
  //   {
  //     "form_id": 1,
  //     "form_name": "test form",
  //     "question_details": [
  //       {
  //         "question": "Is this a test form?",
  //         "type": "input",
  //         "options": [],
  //       },
  //   {
  //   "question": "Is this a test form 3?",
  //   "type": "checkbox",
  //   "options": [{"op":"a","ans":"yes"},{"op":"b","ans":"maybe"}],
  // },
  // {
  //   "question": "Is this a test form 5?",
  //   "type": "single_select",
  //   "options": [{"op":"a","ans":"yes"},{"op":"b","ans":"no"}],
  // }
  //     ]
  // }
  addFormForPublisher(id: string | number, form: any) {
    return this.http.post(
      environment.baseUrl + '/publisher/addForm/' + id,
      form
    );
  }

  addQuestionsForPublisher(id: string | number, form: any) {
    return this.http.post(
      environment.baseUrl + '/publisher/addFormQuestions/' + id,
      form
    );
  }

  getFormsForPublisher(id: string | number) {
    return this.http.get(environment.baseUrl + '/publisher/getForm/' + id);
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
