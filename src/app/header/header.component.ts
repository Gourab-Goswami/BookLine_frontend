import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public userService:UserService) { }

  ngOnInit(): void {
  } 

  logOut(){
    // calling logOut() function from user service for logging out
    this.userService.logOut();
  }
}
