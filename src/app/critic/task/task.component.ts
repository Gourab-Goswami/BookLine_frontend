import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  tasks: any = [];
  totalCharge: number = 0;
  formToSubmit: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    let userId = localStorage.getItem('id');
    this.getInvitationList(userId, 'accepted');
  }

  getInvitationList(id: any, status: string) {
    this.userService.getRequestsForCritic(id, status).subscribe({
      next: (res: any) => {
        this.tasks = res;
        this.getTotalCharge(this.tasks);
      },
    });
  }

  setReviewForm(form: any) {
    this.formToSubmit = form;
  }

  getTotalCharge(tasks: any) {
    if (!tasks) {
      this.totalCharge = 0;
      return;
    }
    tasks.forEach((task: any) => {
      this.totalCharge += task.INR;
    });
  }
}
