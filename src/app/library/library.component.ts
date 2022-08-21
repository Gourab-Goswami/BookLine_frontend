import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { BookService } from '../services/book.service';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  errorMsg!:String;
  isList : Boolean = false;
  isError = false;
  books: any =[];
  constructor(public bookService:BookService) { }

  ngOnInit(): void {
    this.bookService.getLibraryBooks().pipe(
      catchError((error) => {
        this.errorMsg = 'Something went wrong! Could not fetch books!';
        this.isError = true;
        console.log(error.message);
        return of(false);
      })).subscribe((res) => {
      if (res)
        this.books = res;
    });
  }

  // Get the elements with class="column"
  elements = document.getElementsByClassName('view-group') as HTMLCollectionOf<HTMLElement>

  // List View
  listView() {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].style.display = "grid";
      this.elements[i].style.width = "300%";
    }
  }

  // Grid View
  gridView() {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].style.display = "flex";
    }
  }

  myFunction() {
    var element = document.getElementById("myDIV");
    element?.classList.toggle("list");
    this.isList = !this.isList;
 }
}
