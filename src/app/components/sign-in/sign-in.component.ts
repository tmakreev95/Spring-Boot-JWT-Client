import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';


import { User } from '../../model/auth/user';

import { Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';

import { AppState, selectAuthState } from '../../store/app.states';
import { LogIn } from '../../store/actions/auth.actions';

import { LocalStorageService } from '../../services/localstorage/localstorage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string | null;


  //FormControlls Validation
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);
  //FormControlls Validation

constructor(
    public fb: FormBuilder,
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {
    this.getState = this.store.select(selectAuthState);
    
    this.signInForm = this.fb.group({
      email: '',
      password: ''
    })
  }

  ngOnInit() {
    this.localStorageService.clearToken();
    
    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
   });
  }

  signIn(): void {
    if (this.emailFormControl.valid && this.passwordFormControl.valid) {
      const payload = {
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value
      };
      this.store.dispatch(new LogIn(payload));
    }
    else {
      console.log("TODO Interactive message!");
    }    
  }
}
