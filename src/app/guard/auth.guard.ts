import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  // check if user is logged in or not
  canActivate(): boolean {
    if (this.userService.userLoggedIn()) {
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }
  }

}
