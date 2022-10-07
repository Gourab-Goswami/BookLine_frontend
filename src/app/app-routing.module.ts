import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ReaderAuthGuard } from './guard/reader-auth.guard'
import { PublisherAuthGuard } from './guard/publisher-auth.guard';

import { LoginComponent } from './user/login/login.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component'
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { LibraryComponent } from './library/library.component';


const routes: Routes = [
  //setting "/login" path as default
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },

  //added guard to the paths so that without login these paths can't be accessed
  { path: 'profile', component: UserProfileComponent,canActivate: [AuthGuard]},
  { path: 'books', component: BooksComponent ,canActivate: [PublisherAuthGuard]},
  { path: 'bookdetails/:id', component: BookDetailsComponent,canActivate: [AuthGuard] },
  { path: 'library', component: LibraryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
