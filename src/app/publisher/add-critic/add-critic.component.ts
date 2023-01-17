import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  TOASTR_STATUS,
  WARNING_MESSAGE,
} from 'src/app/constants/toastr-message';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-critic',
  templateUrl: './add-critic.component.html',
  styleUrls: ['./add-critic.component.scss'],
})
export class AddCriticComponent implements OnInit {
  userName!: string | null;
  userId!: string | null;
  books: any = [];
  critics: any = [];
  forms: any = [];
  newFormName: string = '';
  selectedCritic!: any;
  isShowForm: boolean = false;
  toggleMenu: boolean = false;
  isInputType: boolean = true;
  addQuestion = new FormGroup({
    question: new FormControl(' '),
    type: new FormControl(' '),
  });
  options: any = [];
  choiceOption!: string;
  choiceText!: string;
  selectedForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.addQuestion = this.formBuilder.group({
      question: [null, [Validators.required, Validators.maxLength(100)]],
      type: [null, [Validators.required]],
    });
    this.getBooks();
    this.getCriticsData();
    this.getForms();
  }

  setFormName(formName: string) {
    this.newFormName = formName;
  }

  removeFormName() {
    this.newFormName = '';
  }

  addOptions() {
    if (this.options.length > 10) {
      this.toastr.warning(WARNING_MESSAGE.choiceLimit, TOASTR_STATUS.WARNING);
      return;
    }
    if (this.choiceOption && this.choiceText) {
      let option = { op: this.choiceOption, ans: this.choiceText };
      this.options.push(option);
      this.choiceOption = '';
      this.choiceText = '';
    }
  }

  removeOption(choice: any) {
    let optionIndex = this.options.findIndex(
      (p: any) => p.op === choice.op && p.ans === choice.ans
    );
    this.options.splice(optionIndex, 1);
  }

  getBooks() {
    this.userName = localStorage.getItem('username');
    this.userId = localStorage.getItem('id');
    this.bookService.getBooks({ publisher: this.userName }).subscribe({
      next: (res) => {
        if (res) {
          this.books = res;
        }
      },
      error: () => {
        this.toastr.error('Could not fetch books', 'ERROR');
      },
    });
  }

  getCriticsData() {
    this.userService.getCriticsDetails().subscribe({
      next: (res) => (this.critics = res),
      error: () => {
        this.toastr.error('Please try again', 'ERROR');
      },
    });
  }

  getForms() {
    this.userService.getFormsForPublisher(this.userId as string).subscribe({
      next: (res: any) => {
        this.forms = res.forms;
      },
      error: () => {
        this.toastr.error('Please try again', 'ERROR');
      },
    });
  }

  changeCritic(event: any) {
    this.critics.forEach((critic: any) => {
      if (critic._id === event.target.value) {
        this.selectedCritic = critic;
      }
    });
  }

  changeForm(event: any) {
    this.forms.forEach((form: any) => {
      if (form.form_name === event.target.value) {
        this.selectedForm = form;
      }
    });
  }

  sendRequestToCritic(bookDetails: any) {
    if (bookDetails && bookDetails.pages && this.selectedCritic) {
      bookDetails.INR = bookDetails.pages * 20;
      let requestData = {
        critic_Id: this.selectedCritic?._id,
        critic_name: this.selectedCritic?.uname,
        critic_email: this.selectedCritic?.email,
        bookToReview_Id: bookDetails._id,
        bookToReview_name: bookDetails.name,
        status: 'invited',
        publisher: this.userName,
        INR: bookDetails.INR,
        pages: bookDetails.pages,
        form: this.selectedForm,
      };

      this.userService.addBookToCritic(this.userId, requestData).subscribe({
        next: (response) => {
          if (response === 'Request has been sent previously') {
            this.toastr.warning(
              ERROR_MESSAGE.requestExist,
              TOASTR_STATUS.WARNING
            );
          } else {
            this.toastr.success(
              SUCCESS_MESSAGE.requestSent,
              TOASTR_STATUS.SUCCES
            );
          }
        },
        error: () => {
          this.toastr.error(ERROR_MESSAGE.requestError, TOASTR_STATUS.ERROR);
        },
      });
    }
  }

  createNewForm() {
    const payload = { form_name: this.newFormName, question_details: [] };
    this.userService
      .addFormForPublisher(this.userId as string, payload)
      .subscribe({
        next: (res: any) => {
          this.newFormName = '';
          this.forms = res.forms;
          this.toastr.success(SUCCESS_MESSAGE.formAdded, TOASTR_STATUS.SUCCES);
        },
        error: (error) => {
          if (error.status === 400) {
            this.toastr.warning(
              WARNING_MESSAGE.duplicateName,
              TOASTR_STATUS.WARNING
            );
            return;
          }
          this.toastr.error(ERROR_MESSAGE.tryAgain, TOASTR_STATUS.ERROR);
        },
      });
  }

  checkQuestionType() {
    if (this.addQuestion.value.type !== 'input') {
      this.isInputType = false;
    } else {
      this.isInputType = true;
    }
  }

  addQuestions() {
    if (this.addQuestion.value.type !== 'input' && this.options.length < 2) {
      this.toastr.warning(
        WARNING_MESSAGE.atleastTwoChoice,
        TOASTR_STATUS.WARNING
      );
      return;
    }
    this.addQuestion.value.options = this.options;
    let payload = {
      form_name: this.newFormName,
      question_details: [this.addQuestion.value],
    };
    this.userService
      .addQuestionsForPublisher(this.userId as string, payload)
      .subscribe({
        next: (res: any) => {
          this.forms = res.forms;
          this.toastr.success(
            SUCCESS_MESSAGE.questionAdded,
            TOASTR_STATUS.SUCCES
          );
          this.addQuestion.reset();
        },
        error: (error) => {
          this.toastr.error(ERROR_MESSAGE.tryAgain, TOASTR_STATUS.ERROR);
        },
      });
    this.newFormName = '';
    this.options = [];
  }
}
