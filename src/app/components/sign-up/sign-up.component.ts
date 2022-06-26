import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPasswordStrengthComponent } from '@angular-material-extensions/password-strength';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';

import { SignUpService } from '../../services/sign-up/sign-up-service';
import { LocalStorageService } from '../../services/localstorage/localstorage.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  private signUpData = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': ''
  };

  @ViewChild('passwordComponentWithConfirmation', {static: true})
  passwordComponentWithConfirmation: MatPasswordStrengthComponent;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  firstNameFormControl = new FormControl('', [
    Validators.required,
    // Validators.pattern('^[a-zA-Z]+$'),
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  
  showPasswordDetails: boolean;
  position: string;
  color: string;
  model: any;
  constructor(public fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private signUpService: SignUpService,
    ) { 
    this.signUpForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    })    
    this.position = "before"
    this.color = "primary"
    this.model = {
      showPasswordDetails: false,
    }
    
  }

  ngOnInit() {
    this.localStorageService.clearToken();
  }

  onStrengthChanged(strength: number) {
  }

  signUp() {
    if(this.firstNameFormControl.valid && this.lastNameFormControl.valid 
        && this.emailFormControl.valid && this.passwordComponentWithConfirmation.passwordFormControl.valid
        && this.passwordComponentWithConfirmation.passwordConfirmationFormControl.valid) {
      this.signUpData.firstName = this.firstNameFormControl.value;
      this.signUpData.lastName = this.lastNameFormControl.value;
      this.signUpData.email = this.emailFormControl.value;
      this.signUpData.password = this.passwordComponentWithConfirmation.passwordFormControl.value;
  
      this.signUpService.signUp(this.signUpData).pipe(first()).subscribe(
        response => {
          if(response) {          
            console.log(response);                   
          }        
        },
        error =>{
          console.log(error);
        });
      }
      else {
        console.log("Not valid");
      }
    }   

  }


