import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service'
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: any = [];

  name: string = '';
  year: number = 0;
  authors: string = '';
  summary: string = '';
  bookId:any;
  bookDetails = {};
  constructor(public bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((books) => {
      console.log('check books', books);
      this.books = books
    }), (err: any) => {
      console.log(err)
    };
  }
  addBooks() {
    this.bookDetails =
    {
      name: this.name,
      year: this.year,
      authors: [this.authors],
      summary: this.summary

    };

    console.log('check payload', this.bookDetails);
    this.bookService.addBooks(this.bookDetails).subscribe((res) => {
      console.log(res);
      this.books.push(res);
    }), (err: any) => console.log(err)

  }

  deleteBooks(bookId: number) {
    this.bookService.deleteBooks(bookId).subscribe((res) => {
      console.log(res)
      if (res) {
        let index = this.books.findIndex((book: any) => book.id == bookId);
        console.log('check', index);
        this.books.splice(index, 1);
      }      
    }), (err: any) => console.log(err)
  }

  updateBlock(bookId: number){
this.books.map((book:any)=>{
if(book.id == bookId){
this.name=book.name;
this.year = book.year;
this.authors = book.authors;
this.summary = book.summary
this.bookId = bookId;
}
})
  }

  updateBooks(){
    this.bookDetails =
    {
      name: this.name,
      year: this.year,
      authors: this.authors,
      summary: this.summary

    };
this.bookService.updateBoocks(this.bookId,this.bookDetails).subscribe((res)=>{
  console.log('successfully uploaded',res);
  if (res) {
    let index = this.books.findIndex((book: any) => book.id == this.bookId);
    console.log('check', index);
    this.books.splice(index, 1,res);
  }      
})
  }

}
