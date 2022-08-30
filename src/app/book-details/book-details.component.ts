import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookDetails: any;
  loadingBook:boolean = true;
  bookAvailable: boolean = false;
  years: number[] = [];
  errorMsg = '';
  isError = false;
  successMsg = '';
  isSuccess = false;
  userStatus:any;
  isRead!:Boolean;

  constructor(public bookService: BookService, public route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    // getting book id from route parameter
    let bookId = this.route.snapshot.paramMap.get('id');

    //getting user status from localStorage
    this.userStatus = localStorage.getItem('status');

    // fetching book details
    this.bookService.getBookDetails(bookId).pipe(
      catchError(error => {
        this.errorMsg = "Something went wrong! could not fetch book!";
        this.isError = true;
        console.log(error.message);
        return of(false);
      })).subscribe((res) => {
      if (res) {
        this.bookDetails = res;
        this.bookAvailable = true;
      }
    })

    // getting optons for year input
    for (let i: number = 2022; i >= 1900; i--) {
      this.years.push(i);
    }
  }

  // function to update book
  updateBooks() {
    if (typeof this.bookDetails.authors == 'string') {
      // split the inputs for authors and assign to the field 
      this.bookDetails.authors = this.bookDetails.authors.split(',');
    }
    this.bookDetails.name = this.bookDetails.name.toLowerCase(); 
    this.bookService.updateBoocks(this.bookDetails.id, this.bookDetails).pipe(
      catchError(error => {
        this.errorMsg = "Something went wrong! could not update book!";
        this.isError = true;
        console.log(error.message);
        return of(false);
      })).subscribe((res) => {
      if (res) {
        this.successMsg = 'Book is updated successfully.';
        this.isSuccess = true;
      }
    })
  }

  // function to delete book
  deleteBooks(bookId: number) {
    this.bookService.deleteBooks(bookId).pipe(
      catchError(error => {
        this.errorMsg = "Something went wrong! could not delete book!";
        this.isError = true;
        console.log(error.message);
        return of(false);
      })).subscribe((res) => {
      if (res) {
        this.bookAvailable = false;
        this.loadingBook = false;
      }
    });
  }

  goBack(){
    this.location.back();
  }

}
