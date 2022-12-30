import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../modals';
import {
  TOASTR_STATUS,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '../constants/toastr-message';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  invitations: any;
  modalDetails: any;

  @Input()
  userId!: string;

  @Output()
  invitationCount = new EventEmitter<number>();

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    this.getInvitationList(this.userId, 'pending');
  }

  getInvitationList(id: any, status: string) {
    this.userService.getRequestsForCritic(id, status).subscribe({
      next: (res) => {
        this.invitations = res;
        this.invitationCount.emit(this.invitations?.length);
      },
    });
  }

  requestAction(requestDetails: any, action: string) {
    let payload = {
      bookId: requestDetails.book_Id,
      publisher: requestDetails.publisher,
      status: action,
    };
    let index = this.invitations
      .map((e: any) => e._id)
      .indexOf(requestDetails._id);
    this.userService.requestAction(this.userId, payload).subscribe({
      next: () => {
        if (action === 'accepted') {
          this.toastr.success(
            SUCCESS_MESSAGE.requestAccept,
            TOASTR_STATUS.SUCCES
          );
        }
        if (action === 'denied') {
          this.toastr.success(
            SUCCESS_MESSAGE.requestDecline,
            TOASTR_STATUS.SUCCES
          );
        }
        this.invitations.splice(index, 1);
        this.invitationCount.emit(this.invitations?.length);
      },
      error: () => {
        this.toastr.error(ERROR_MESSAGE.tryAgain, TOASTR_STATUS.ERROR);
      },
    });
  }

  openRequest(requestDetail: string, request: any) {
    this.modalDetails = request;
    this.modal.open(requestDetail);
  }
}
