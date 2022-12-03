import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-add-critic',
  templateUrl: './add-critic.component.html',
  styleUrls: ['./add-critic.component.css'],
})
export class AddCriticComponent implements OnInit {
  userName!: string | null;
  userId!: string | null;
  books: any = [];
  critics: any = [];
  selectedCritic!: any;
  errorMsg = '';
  isError = false;

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.getCriticsData();
  }

  getBooks() {
    this.userName = localStorage.getItem('username');
    this.userId = localStorage.getItem('id');
    this.bookService.getBooks({ publisher: this.userName }).subscribe({
      next: (res) => {
        if (res) {
          this.books = res;
        }
      },
      error: () => {
        this.toastr.error('Could not fetch books', 'ERROR');
      },
    });
  }

  getCriticsData() {
    this.userService.getCriticsDetails().subscribe({
      next: (res) => (this.critics = res),
      error: () => {
        this.toastr.error('Please try again', 'ERROR');
      },
    });
  }
  changeCritic(event: any) {
    this.critics.forEach((critic: any) => {
      if (critic._id === event.target.value) {
        this.selectedCritic = critic;
      }
    });
  }
  sendRequestToCritic(bookDetails: any) {
    if (bookDetails && bookDetails.pages && this.selectedCritic) {
      bookDetails.INR = bookDetails.pages * 20;
      let requestData = {
        critic_Id: this.selectedCritic?._id,
        critic_name: this.selectedCritic?.uname,
        bookToReview_Id: bookDetails._id,
        bookToReview_name: bookDetails.name,
        status: 'invited',
        publisher: this.userName,
        INR: bookDetails.INR,
        pages: bookDetails.pages,
      };

      this.userService.addBookToCritic(this.userId, requestData).subscribe({
        next: () => {
          this.toastr.success('Request has been sent', 'SUCCESS');
        },
        error: () => {
          this.toastr.error('Please try again', 'ERROR');
        },
      });
    }
  }
}
