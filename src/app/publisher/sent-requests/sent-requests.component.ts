import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  TOASTR_STATUS,
} from 'src/app/constants/toastr-message';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sent-requests',
  templateUrl: './sent-requests.component.html',
  styleUrls: ['./sent-requests.component.scss'],
})
export class SentRequestsComponent implements OnInit {
  userId: string | number | null = null;
  requests: any;

  constructor(
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.userService.getPublisherRequests(this.userId).subscribe({
      next: (requests) => {
        this.requests = requests;
      },
      error: () => {
        this.toastr.error(ERROR_MESSAGE.tryAgain, TOASTR_STATUS.ERROR);
      },
    });
  }

  deleteRequest(requestId: string | number) {
    this.userService
      .deleteRequestForPublisher({ id: requestId }, this.userId)
      .subscribe({
        next: (response) => {
          this.requests = response;
          this.toastr.success(SUCCESS_MESSAGE.removed, TOASTR_STATUS.ERROR);
        },
        error: (error) => {
          if (error.status === 400) {
            this.toastr.error(
              ERROR_MESSAGE.inProgressRequest,
              TOASTR_STATUS.ERROR
            );
            return;
          }
          this.toastr.error(ERROR_MESSAGE.tryAgain, TOASTR_STATUS.ERROR);
        },
      });
  }
}
