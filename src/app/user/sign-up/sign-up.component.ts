import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isSignUpSuccess = false;
  status:string = '';
  signupForm = new FormGroup({
    fname:new FormControl(' '),
    lname: new FormControl(' '),
    gender: new FormControl(' '),
    age: new FormControl(' '),
    education: new FormControl(' '),
    education_dep: new FormControl(' '),
    uname: new FormControl(' '),
    email: new FormControl(' '),
    password: new FormControl(' ')
  });
  bookGenre = ["action and adventure", "Alternate history", "Anthology", "Art/architecture", "Autobiography", "Biography", "Business/economics", "Chick lit", "Children's", "Classic", "Comic book", "Coming-of-age", "Cookbook", "Crafts/hobbies", "Crime", "Diary", "Dictionary", "Drama", "Encyclopedia", "Fairy tale", "Fantasy", "Graphic novel", "Guide", "Health/fitness", "Historical fiction", "History", "Home and garden", "Horror", "Humour", "Journal", "Math", "Memoir", "Mystery", "Paranormal romance", "Philosophy", "Picture book", "Poetry", "Political thriller", "Prayer", "Religion, spirituality, and new age", "Review", "Romance", "Satire", "Science", "Science fiction", "Self help", "Short story", "Sports and leisure", "Suspense", "Textbook", "Thriller", "Travel", "True crime", "Western", "Young adult"];
  isGenreOn!: boolean;
  checkedPreferredGenre: any;

  constructor(private formBuilder: FormBuilder,public userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fname: [null, [Validators.required]],
      lname: [null, [Validators.required]],
      gender: ['', [Validators.required]],
      age: [null, [Validators.required]],
      education: ['', [Validators.required]],
      education_dep: [null, [Validators.required]],
      preferred_genre: this.formBuilder.array([], [Validators.required]),
      uname: [null,[Validators.required,Validators.pattern("^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$")]],
      email: [null,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, [Validators.required,Validators.minLength(4), Validators.maxLength(10)]]
    });
  }

  onCheckboxChange(e:any) {
    const preferred_genre: FormArray = this.signupForm.get('preferred_genre') as FormArray;
    if (e.target.checked) {
      preferred_genre.push(new FormControl(e.target.value));
    } else {
       const index = preferred_genre.controls.findIndex(x => x.value === e.target.value);
       preferred_genre.removeAt(index);
    } 
    this.checkedPreferredGenre = this.signupForm.value.preferred_genre;
  }

  checkboxCheck(genre:any){
    if(this.checkedPreferredGenre){
      return this.checkedPreferredGenre.includes(genre);
    }   
  }

  deleteChoice(choice:any){
    let index = this.checkedPreferredGenre.indexOf(choice);
    this.checkedPreferredGenre.splice(index,1);
  }

  signUpUser(){
    this.signupForm.value.status = this.status;
    this.userService.userSignup(this.signupForm.value)
      .subscribe(Details =>{
        console.log("Users data Submitted", Details);
        this.isSignUpSuccess = true;
      },(err) =>{
       err='Sorry could not Sign Up ! ';
      })
  }

}
