import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userDetails!: any;
  favourites: any = [];
  limit = 4;
  userId: any;
  image: any;
  href: any;
  constructor(
    public userService: UserService,
    private bookService: BookService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // fetching user details
    this.userId = localStorage.getItem('id');
    const email = localStorage.getItem('email');
    this.userService.getUserDetails(this.userId, email as string).subscribe({
      next: (res) => {
        if (res) {
          this.userDetails = res;
          this.getFavourites();
        }
      },
      error: () => {
        this._toastr.error('Could not get data', 'ERROR');
      },
    });
  }

  getFavourites() {
    //fetching favourite books
    this.bookService.getFavourites(this.userId).subscribe({
      next: (res) => {
        if (res) {
          this.favourites = res;
        }
      },
      error: () => {
        this._toastr.error('Could not get favourites', 'ERROR');
      },
    });
  }

  deleteFavourites(bookId: any) {
    this.bookService.deleteFavourites(bookId, this.userId).subscribe({
      next: (res) => {
        if (res) {
          this.getFavourites();
        }
      },
      error: () => {
        this._toastr.error('Could not delete. Please try again', 'ERROR');
      },
    });
  }
}
