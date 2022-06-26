import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPasswordStrengthComponent } from '@angular-material-extensions/password-strength';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';

import { PasswordResetService } from '../../services/password-reset/password-reset.service';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  passwordResetForm: FormGroup;
  //showPasswordResetForm: boolean;

  private passwordResetData = {
    'token': '',
    'password': ''
  };

  @ViewChild('passwordComponentWithConfirmation', {static: true})
  passwordComponentWithConfirmation: MatPasswordStrengthComponent;

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  
  showPasswordDetails: boolean;
  position: string;
  color: string;
  model: any;

  constructor(public fb: FormBuilder,
    private router: Router,
    private passwordResetService: PasswordResetService,
    private activatedRoute: ActivatedRoute
    ) { 

    this.passwordResetForm = this.fb.group({
      password: ''
    });

    this.position = "before"
    this.color = "primary"
    this.model = {
      showPasswordDetails: false,
    }
    
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.passwordResetData.token = params.token;
    });

    this.passwordResetService.resetPasswordValidateToken(this.passwordResetData.token).subscribe(
      response => {
        if(response.status == false) {
          console.log(response);
          this.router.navigateByUrl('sign-in');
        }        
      }
    );

  }
  

  onStrengthChanged(strength: number) {
  }

  resetPassword() {
    if (this.passwordComponentWithConfirmation.passwordFormControl.valid
      && this.passwordComponentWithConfirmation.passwordConfirmationFormControl.valid) {
      this.passwordResetData.password = this.passwordComponentWithConfirmation.passwordFormControl.value;

      this.passwordResetService.resetPasswordRequest(this.passwordResetData.token, this.passwordResetData.password).subscribe(
        response => {
          if(response.status == true) {
            console.log(response);
            this.router.navigateByUrl('sign-in');
          }
          else {
            
          }
        }
      );

    }
  }
}
