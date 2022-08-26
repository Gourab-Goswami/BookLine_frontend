import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { BookService } from '../services/book.service';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  errorMsg!: String;
  isList: Boolean = false;
  isError = false;
  books: any = [];
  max: Number = 5;
  isReadonly: Boolean = true;
  starWidth: number = 0;
favourites: any =[];
  constructor(public bookService: BookService) {}

  ngOnInit(): void {
    this.bookService
      .getLibraryBooks()
      .pipe(
        catchError((error) => {
          this.errorMsg = 'Something went wrong! Could not fetch books!';
          this.isError = true;
          console.log(error.message);
          return of(false);
        })
      )
      .subscribe((res) => {
        if (res) this.books = res;
      });
  }
  
  changeView() {
    var element = document.getElementById('myDIV');
    element?.classList.toggle('list');
    this.isList = !this.isList;
  }
}
