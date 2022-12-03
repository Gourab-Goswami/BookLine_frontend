import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  adminData = {
    email: 'user@gmail.com',
    password: 1234,
  };
  loginForm = new FormGroup({
    email: new FormControl(' '),
    password: new FormControl(' '),
  });
  isLoading!: Boolean;
  invalidInput: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        [
          Validators.required,
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
    });
    // removing data from localStorage if user is in logIn page
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
  }
  loginUser() {
    this.isLoading = true;
    this.userService.userLogin(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res) {
          // naviagete to books page after successful log in
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('id', res._id);
          localStorage.setItem('username', res.uname);
          localStorage.setItem('status', res.status);
          if (res.status === 'publisher') {
            this.router.navigate(['/books']);
          }
          if (res.status === 'reader') {
            this.router.navigate(['/library']);
          }
          if (res.status === 'critic') {
            this.router.navigate(['/critic-dashboard']);
          }
          this.hideloader();
        }
      },
      error: () => {
        this.toastr.error('Please try again', 'ERROR');
      },
    });
  }

  hideloader() {
    let loading = document.getElementById('loading');
    if (loading) {
      loading.style.display = 'none';
    }
  }
}
