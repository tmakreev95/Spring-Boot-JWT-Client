import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material Modules
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select'; 
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatRippleModule } from '@angular/material/core'; 
//Material Modules

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatPasswordStrengthModule,
    MatTableModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatStepperModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatDialogModule,
    MatRippleModule
  ],
  exports: [
    LayoutModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatPasswordStrengthModule,
    MatTableModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatStepperModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatDialogModule,
    MatRippleModule
  ]
})
export class MaterialModule { }
