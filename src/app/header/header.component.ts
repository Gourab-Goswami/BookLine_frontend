import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isPublisher: Boolean = false;
  redirectionPath!: string;
  userStatus!: string | null;
  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userStatus = localStorage.getItem('status');
    this.setRedirectionPath();
  }

  setRedirectionPath() {
    this.userStatus === 'publisher'
      ? (this.redirectionPath = '/books')
      : (this.redirectionPath = '/library');
  }

  logOut() {
    // calling logOut() function from user service for logging out
    this.userService.logOut();
  }
}
