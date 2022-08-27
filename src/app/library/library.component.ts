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
  userId: any;
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

      this.userId = localStorage.getItem('id');
      this.getFavourites();
  }
  
  changeView() {
    var element = document.getElementById('bookView');
    element?.classList.toggle('list');
    this.isList = !this.isList;
  }

  getFavourites(){
    this.bookService.getFavourites(this.userId).pipe(
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    )
    .subscribe((res) => {
      if (res) {
        this.favourites = res
      };
    });
  }

  addToFavourite(book:any){
    if(this.favourites?.length>10){
      this.errorMsg = "Can't add more book ! Favourite section is full";
      this.isError = true;
      return;
    }
    let bookdata = {
      bookId : book._id,
      bookName : book.name,
      bookYear: book.year,
      bookAuthors: book.authors,
      bookRating: book.rating,
      bookPublisher : book.publisher

    }
    this.bookService.addToFavourites(bookdata,this.userId).pipe(
      catchError((error) => {
        this.errorMsg = error.error;
        this.isError = true;
        console.log(error);
        return of(false);
      })
    )
    .subscribe((res) => {
      if (res) {
       this.getFavourites();
      };
    });
   }

   hasFaourite(book:any){
    if(this.favourites.some((id:any)=>id.bookId===book._id)){
      return true;
    }else{
      return false;
    }
   
   }
}
