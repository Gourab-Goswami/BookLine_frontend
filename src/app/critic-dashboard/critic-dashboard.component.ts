import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { response } from 'express';

@Component({
  selector: 'app-critic-dashboard',
  templateUrl: './critic-dashboard.component.html',
  styleUrls: ['./critic-dashboard.component.css'],
})
export class CriticDashboardComponent implements OnInit {
  invitations: any;
  criticId: any;

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.criticId = localStorage.getItem('id');
    this.getInvitationList(this.criticId, 'all');
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

  requestAction(requestDetails: any, action: string) {
    console.log(requestDetails, action);
    let payload = {
      bookId: requestDetails.book_Id,
      publisher: requestDetails.publisher,
      status: action,
    };
    this.userService.requestAction(this.criticId, payload).subscribe({
      next: () => {
        if (action === 'accepted') {
          this.toastr.success('Request Accepted', 'SUCCESS');
        }
        if (action === 'denied') {
          this.toastr.success('Successfully removed request', 'SUCCESS');
        }
      },
      error: () => {
        this.toastr.error('Something went wrong. please try again', 'ERROR');
      },
    });
  }
}
