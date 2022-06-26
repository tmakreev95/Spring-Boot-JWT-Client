import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
//Forms
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';

//Model
import { UserDetails } from '../../model/userdetails/userdetails';
import { Address } from '../../model/userdetails/address/address';
import { Contact } from '../../model/userdetails/contact/contact';

//Services
import { UserDetailsService } from '../../services/userdetails/userdetails.service';
import { LocalStorageService } from '../../services/localstorage/localstorage.service';

//Store
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../../store/app.states';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserDetailsComponent implements OnInit {
  panelOpenState = true;
  addressShowUpdateButton: boolean;
  addressShowRegisterButton: boolean;
  contactShowUpdateButton: boolean;
  contactShowRegisterButton: boolean;


  userDetailsForm: FormGroup;
  userAddressForm: FormGroup;
  userContactForm: FormGroup;

  // userDetails: Observable<UserDetails>;  
  // userAddress: Observable<Address>;
  // userContact: Observable<Contact>;

  userDetailsForUpdate = new UserDetails();
  userAddress = new Address();
  userCotanct = new Contact();

  getState: Observable<any>;

  errorMessage: string | null;

  //FormControlls Validation
  firstName = new FormControl('', [
    Validators.required 
  ]);
  lastName = new FormControl('', [ 
    Validators.required 
  ]);
  addressCountry = new FormControl('', []);
  addressDistrict = new FormControl('', []);
  addressMunicipality = new FormControl('', []);
  addressCity = new FormControl('', []);
  addressAddress = new FormControl('', []);
  contactWebsite = new FormControl('', []);
  contactMobile = new FormControl('', []);
  contactFax = new FormControl('', []);
  contactAltEmail = new FormControl('', [ 
    Validators.required, Validators.email 
  ]);


  // email = new FormControl({value: '', disabled: true}, []);
  // status = new FormControl({value: '', disabled: true}, []);

  //FormControlls Validation

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>, private userDetailsService: UserDetailsService) { 
      this.getState = this.store.select(selectAuthState);
    }

  ngOnInit() {
    this.userDetailsForm = this.formBuilder.group({
      firstName: ['', []],
      lastName: ['', []],
      email: [{value: '', disabled: true}],
      status: [{value: '', disabled: true}],
    });

    this.userAddressForm = this.formBuilder.group({
      addressCountry: [],
      addressDistrict: [],
      addressMunicipality: [],
      addressCity: [],
      addressAddress: [],
      addressStatus: [{value: '', disabled: true}],
    });

    this.userContactForm = this.formBuilder.group({
      contactWebsite: [],
      contactMobile: [],
      contactFax: [],
      contactAltEmail: ['', [ Validators.email ]],
      contactStatus: [{value: '', disabled: true}],
    });

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;   
    });  

    //UserDetails Call
    this.userDetailsService.getUserDetails().subscribe(
      response => {
        this.firstName.setValue(response.firstName);
        this.lastName.setValue(response.lastName);
        //Updating the form on load               
        this.userDetailsForm.patchValue({
          email: response.email,
          status: response.status
        });
        //Updating the form on load
      }
    );

    //Address Call
    this.userDetailsService.getUserAddress().subscribe(
      response => {
        if(response != null) {
          this.addressCountry.setValue(response.country);
          this.addressDistrict.setValue(response.district);
          this.addressMunicipality.setValue(response.municipality);
          this.addressCity.setValue(response.city);
          this.addressAddress.setValue(response.address);
  
          this.userAddressForm.patchValue({          
            addressStatus: response.status
          });

          this.addressShowRegisterButton = false;
          this.addressShowUpdateButton = true;
        }
        else {
          this.addressShowRegisterButton = true;
          this.addressShowUpdateButton = false;
        }        
      }
    )

    //Contact Call
    this.userDetailsService.getUserContact().subscribe(
      response => {
        if(response != null) {
          this.contactWebsite.setValue(response.website);
          this.contactMobile.setValue(response.mobile);
          this.contactFax.setValue(response.fax);
          this.contactAltEmail.setValue(response.altEmail);
  
          this.userContactForm.patchValue({   
            contactStatus: response.status
          });

          this.contactShowRegisterButton = false;
          this.contactShowUpdateButton = true;
        } 
        else {
          this.contactShowRegisterButton = true;
          this.contactShowUpdateButton = false
        }      
      }
    );

    // this.userDetailsService.checkUserRole().subscribe(
    //   response => {
    //     console.log(response);
    //   }
    // );
  }
  //Address Register/Update
  registerUserAddress() {
    this.userAddress.country = this.addressCountry.value;
    this.userAddress.district = this.addressDistrict.value;
    this.userAddress.municipality = this.addressMunicipality.value;
    this.userAddress.city = this.addressCity.value;
    this.userAddress.address = this.addressAddress.value;

    this.userDetailsService.registerAddress(this.userAddress).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  //Contact Register/Update
  registerUserContact() {    
    if(this.contactAltEmail.valid) {
      this.userCotanct.website = this.contactWebsite.value;
      this.userCotanct.mobile = this.contactMobile.value;
      this.userCotanct.fax = this.contactFax.value;
      this.userCotanct.altEmail = this.contactAltEmail.value;

      this.userDetailsService.registerContact(this.userCotanct).subscribe(
        response => {
          console.log(response);
        }
      );
    }    
  }

  //User Profile Update
  updateUserProfile() {
    if(this.firstName.valid == true && this.lastName.valid == true) {
      this.userDetailsForUpdate.firstName = this.firstName.value;
      this.userDetailsForUpdate.lastName = this.lastName.value;

      this.userDetailsService.updateUserDetails(this.userDetailsForUpdate).subscribe(
        response => {
          console.log(response);
        }
      );  
    }
  }


}
