import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'bookcomet';

  constructor(public _userService: UserService) {}
  ngOnInit() {}
}
