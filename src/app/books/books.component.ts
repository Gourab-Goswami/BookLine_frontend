import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { catchError, of } from 'rxjs';

import { BookService } from '../services/book.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: any = [];
  bookName: string = '';
  deleteBookId: any;
  errorMsg = '';
  isError = false;
  years: number[] = [];
  addBook = new FormGroup({
    name: new FormControl(' '),
    year: new FormControl(' '),
    authors: new FormControl(' '),
    summary: new FormControl(' '),
    content: new FormControl(' '),
  });
  userName: any;

  constructor(
    private formBuilder: FormBuilder,
    public bookService: BookService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.addBook = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(50)]],
      year: [null, [Validators.required]],
      authors: [null, [Validators.required, Validators.maxLength(100)]],
      summary: [null, [Validators.required]],
      content: [],
    });
    this.userName = this.userService.getUserData();
    // getting optons for year input
    for (let i: number = 2022; i >= 1900; i--) {
      this.years.push(i);
    }
    // fetching all the books
    this.bookService
      .getBooks({ publisher: this.userName })
      .pipe(
        catchError(() => {
          this.errorMsg = 'Something went wrong! Could not fetch books!';
          this.isError = true;
          return of(false);
        })
      )
      .subscribe((res) => {
        if (res) this.books = res;
      });
  }

  // function for adding books
  addBooks() {
    // counting the page according to the number of words
    let pageCount = this.addBook.value.content
      ? this.addBook.value.content.split(/\s+/).length
      : 0;
    // split the inputs for authors and assign to the field
    this.addBook.value.authors = this.addBook.value.authors.split(',');
    this.addBook.value.name = this.addBook.value.name.toLowerCase();
    this.addBook.value.publisher = this.userName;
    this.addBook.value.pages = (pageCount / 250 + 1) | 0;
    // adding book
    this.bookService
      .addBooks(this.addBook.value)
      .pipe(
        catchError(() => {
          this.errorMsg = 'Something went wrong! Could not add book!';
          this.isError = true;
          return of(false);
        })
      )
      .subscribe((res) => {
        if (res) {
          // updating page without reloading
          this.books.push(res);
        }
        this.addBook.reset();
      });
  }

  // get book id to delete book from delete modal
  getDeleteBookId(bookId: number) {
    this.deleteBookId = bookId;
  }

  // function to delete book
  deleteBooks(bookId: number) {
    this.bookService
      .deleteBooks(bookId)
      .pipe(
        catchError(() => {
          this.errorMsg = 'Something went wrong! could not delete book!';
          this.isError = true;
          return of(false);
        })
      )
      .subscribe((res) => {
        if (res) {
          // updating page without reloading
          let index = this.books.findIndex((book: any) => book.id == bookId);
          this.books.splice(index, 1);
        }
      });
  }

  // function to search books by name
  searchBooks() {
    this.bookService
      .searchBooks(this.bookName)
      .pipe(
        catchError(() => {
          this.errorMsg = 'Something went wrong! Could not fetch books!';
          this.isError = true;
          return of(false);
        })
      )
      .subscribe((res) => {
        if (res) {
          this.books = res;
        }
      });
  }
}
