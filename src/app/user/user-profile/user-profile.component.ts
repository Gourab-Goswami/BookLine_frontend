import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userDetails!: any;
  favourites: any = [];
  limit = 4;

  constructor(
    public userService: UserService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    // fetching user details
    let id = localStorage.getItem('id');
    this.userService
      .getUserDetails(id)
      .pipe(
        catchError((error) => {
          console.log(error.message);
          return of(false);
        })
      )
      .subscribe((res) => {
        if (res) this.userDetails = res;
      });
      
    //fetching favourite books
    this.bookService
      .getFavourites(id)
      .pipe(
        catchError((error) => {
          console.log(error);
          return of(false);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.favourites = res;
        }
      });
  }
}
