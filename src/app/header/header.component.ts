import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: Boolean = false;
  isPublisher: Boolean = false;
  isCritic: Boolean = false;
  isReader: Boolean = false;
  redirectionPath!: string;
  userId: any;
  invitationCount: number = 0;
  constructor(public userService: UserService, private _router: Router) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.isUserLoggedIn = this.userService.userLoggedIn() ? true : false;
    let userStatus = this.userService.localUserStatus();
    if (userStatus) {
      this.setUserStatus(userStatus);
    }

    this.setRedirectionPath(userStatus);
  }
  get route() {
    let url = this._router.url;
    return url;
  }

  setUserStatus(userStatus: string) {
    if (userStatus === 'publisher') {
      this.isPublisher = true;
    } else if (userStatus === 'critic') {
      this.isCritic = true;
    } else if (userStatus === 'reader') {
      this.isReader = true;
    }
  }

  setRedirectionPath(userStatus: string | null) {
    userStatus === 'publisher'
      ? (this.redirectionPath = '/books')
      : (this.redirectionPath = '/library');
  }

  getInvitationCount(event: any) {
    this.invitationCount = event;
  }

  logOut() {
    // calling logOut() function from user service for logging out
    this.userService.logOut();
  }
}
