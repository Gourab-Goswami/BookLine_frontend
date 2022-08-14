import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
userDetails!: any;
  constructor(public userService:UserService) { }

  ngOnInit(): void {
        // fetching user details
        let id = localStorage.getItem('id')
        this.userService.getUserDetails(id).pipe(
          catchError((error) => {
            console.log(error.message);
            return of(false);
          })).subscribe((res) => {
          if (res)
            this.userDetails = res;
        });
  }

}
