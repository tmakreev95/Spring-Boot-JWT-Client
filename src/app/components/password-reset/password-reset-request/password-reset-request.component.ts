import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

import { PasswordResetService } from '../../../services/password-reset/password-reset.service';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export class PasswordResetRequestComponent implements OnInit {
  passwordResetRequestForm: FormGroup;
  errorOnRequest: boolean;
  errorMessage: string;

  //FormControlls Validation
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  

constructor(public fb: FormBuilder, private passwordResetService: PasswordResetService) {
    
    this.passwordResetRequestForm = this.fb.group({
      email: '',
    })
  }

  ngOnInit() {
    
  }

  sendPasswordResetRequest(email: string): void {
    if (this.emailFormControl.valid) {
      email = this.emailFormControl.value;      
      this.passwordResetService.sendPasswordResetRequest(email).subscribe(
        response => {
          if(response.status == false) {
            this.errorMessage = response.message;
            this.errorOnRequest = true;
            this.emailFormControl.setValue('');
            console.log(response);
          }
          else {
            this.emailFormControl.markAsUntouched();
            this.emailFormControl.setValue('');
            console.log(response);
          }
        }
      );
      
    }
    else {
      console.log("TODO Interactive message!");
    }    
  }

}
