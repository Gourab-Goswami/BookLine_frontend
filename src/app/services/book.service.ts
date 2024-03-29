import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  // http get request for fetching all the books for publisher
  getBooks(publisher: any): Observable<any> {
    return this.http.post(environment.bookUrl, publisher);
  }

  // http get request for fetching particular book details by id
  getBookDetails(bookId: any): Observable<any> {
    return this.http.get(environment.bookUrl + '/' + bookId);
  }

  // http post request for adding books
  addBooks(data: object): Observable<any> {
    return this.http.post(environment.bookUrl + '/addBook', data);
  }

  // http delete request for deleting books by id
  deleteBooks(bookId: number): Observable<any> {
    return this.http.delete(environment.bookUrl + bookId);
  }

  // http put request for updating a book by id
  updateBoocks(bookId: number, bookDetails: any): Observable<any> {
    return this.http.put(environment.bookUrl + bookId, bookDetails);
  }

  // http get request for fetching(searching) books by their name
  searchBooks(name: string): Observable<any> {
    return this.http.get(environment.bookUrl + '?name=' + name);
  }

  // http get request for fetching all the books for reader
  getLibraryBooks(): Observable<any> {
    return this.http.get(environment.bookUrl + '/lib');
  }

  //http get request for getting books from favourites
  getFavourites(id: any) {
    const Url = environment.baseUrl + '/favourites/' + id;
    return this.http.get(Url);
  }

  //http post request for adding books to favourites
  addToFavourites(data: any, id: any) {
    const Url = environment.baseUrl + '/favourites/' + id;
    return this.http.post(Url, data);
  }

  deleteFavourites(bookId:any,userId:any){
    const Url = environment.baseUrl + '/favourites/' + userId;
    return this.http.patch(Url,{bookId});
  }
}
