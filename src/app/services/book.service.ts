import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }
  getBooks(){
    return this.http.get('https://publishing-house-service.herokuapp.com/api/v1/books/');
  }

  addBooks(data:object){
    return this.http.post('https://publishing-house-service.herokuapp.com/api/v1/books/',data);
  }

  deleteBooks(bookId:number){
    return this.http.delete('https://publishing-house-service.herokuapp.com/api/v1/books/'+bookId)
  }

  updateBoocks(bookId:number,bookDetails:any){
    return this.http.put('https://publishing-house-service.herokuapp.com/api/v1/books/'+bookId,bookDetails);
  }
}
