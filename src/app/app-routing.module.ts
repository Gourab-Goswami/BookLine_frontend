import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

import { LoginComponent } from './user/login/login.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component'
import { UserProfileComponent } from './user/user-profile/user-profile.component';



const routes: Routes = [
  //setting "/login" path as default
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },

  //added guard to the paths so that without login these paths can't be accessed
  { path: 'profile', component: UserProfileComponent,canActivate: [AuthGuard]},
  { path: 'books', component: BooksComponent ,canActivate: [AuthGuard]},
  { path: 'bookdetails/:id', component: BookDetailsComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
