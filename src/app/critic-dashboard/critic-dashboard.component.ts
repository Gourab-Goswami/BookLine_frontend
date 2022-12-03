import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-critic-dashboard',
  templateUrl: './critic-dashboard.component.html',
  styleUrls: ['./critic-dashboard.component.css'],
})
export class CriticDashboardComponent implements OnInit {
  invitations: any;

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let criticId = localStorage.getItem('id');
    this.getInvitationList(criticId, 'all');
  }

  getInvitationList(id: any, status: string) {
    this.userService.getRequestsForCritic(id, status).subscribe({
      next: (res) => {
        this.invitations = res;
      },
      error: () => {
        this.toastr.error('Could not fetch data', 'ERROR');
      },
    });
  }
}
