import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { PublisherAuthGuard } from './guard/publisher-auth.guard';

import { LoginComponent } from './user/login/login.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { LibraryComponent } from './library/library.component';
import { CriticDashboardComponent } from './critic/critic-dashboard/critic-dashboard.component';
import { AddCriticComponent } from './publisher/add-critic/add-critic.component';
import { TaskComponent } from './critic/task/task.component';
import { SentRequestsComponent } from './publisher/sent-requests/sent-requests.component';

const routes: Routes = [
  //setting "/login" path as default
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },

  //added guard to the paths so that without login these paths can't be accessed
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'books',
    component: BooksComponent,
    canActivate: [PublisherAuthGuard],
  },
  {
    path: 'bookdetails/:id',
    component: BookDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'library', component: LibraryComponent },
  { path: 'critic-dashboard', component: CriticDashboardComponent },
  {
    path: 'add-critic',
    component: AddCriticComponent,
    canActivate: [PublisherAuthGuard],
  },
  {
    path: 'sent-requests',
    component: SentRequestsComponent,
    canActivate: [PublisherAuthGuard],
  },
  {
    path: 'tasks',
    component: TaskComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
