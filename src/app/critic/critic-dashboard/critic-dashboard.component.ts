import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-critic-dashboard',
  templateUrl: './critic-dashboard.component.html',
  styleUrls: ['./critic-dashboard.component.scss'],
})
export class CriticDashboardComponent implements OnInit {
  invitations: any;
  criticId: any;

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
}
