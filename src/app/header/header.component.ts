import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
isPublisher!:Boolean;
  constructor( public userService:UserService) { }

  ngOnInit(): void {
    let userStatus = localStorage.getItem('status');
    if(userStatus == 'publisher') {
      this.isPublisher = true;
    }
    
  } 

  logOut(){
    // calling logOut() function from user service for logging out
    this.userService.logOut();
  }
}
