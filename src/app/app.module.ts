import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { BooksComponent } from './books/books.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookDetailsComponent } from './book-details/book-details.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { HeaderComponent } from './header/header.component';
import { LibraryComponent } from './library/library.component';
import { AlertComponent } from './alert/alert.component';
import { CriticDashboardComponent } from './critic/critic-dashboard/critic-dashboard.component';
import { AddCriticComponent } from './publisher/add-critic/add-critic.component';
import { NotificationComponent } from './notification/notification.component';
import { ModalModule } from './modals';
import { TaskComponent } from './critic/task/task.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { SentRequestsComponent } from './publisher/sent-requests/sent-requests.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BooksComponent,
    BookDetailsComponent,
    SignUpComponent,
    UserProfileComponent,
    HeaderComponent,
    LibraryComponent,
    AlertComponent,
    CriticDashboardComponent,
    AddCriticComponent,
    NotificationComponent,
    TaskComponent,
    DateAgoPipe,
    SentRequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
