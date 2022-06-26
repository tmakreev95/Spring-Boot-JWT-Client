import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//Material Import
import { MaterialModule } from './material/material.module';

//Font Awesome
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//AuthGuard
import { AuthGuardService } from './helpers/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor, ErrorInterceptor } from './helpers/token.interceptor';
//AuthGuard

//Loader Interceptor
import { LoaderInterceptor } from './helpers/loader/loader.interceptor';
//Loader Interceptor

//Ngrx
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './store/effects/auth.effects';
import { reducers } from './store/app.states';
//Ngrx

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

//Services
import { PostService } from './services/post/post.service';
import { SignUpService } from './services/sign-up/sign-up-service';
import { AuthenticationService } from './services/auth/authentication.service';
import { LocalStorageService } from './services/localstorage/localstorage.service';
import { UserDetailsService } from './services/userdetails/userdetails.service';
import { LoaderService } from './services/loader/loader.service';
import { PasswordResetService } from './services/password-reset/password-reset.service';
//Services

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './components/navigation/main-nav/main-nav.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PostsComponent } from './components/admin/posts/posts.component';
import { UserDetailsComponent } from './components/userdetails/userdetails.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PostComponent, LikesBottomSheet, DeletePostDialog, UpdatePostDialog } from './components/post/post.component';
import { PostAddComponent } from './components/post-list/post-add/post-add.component';
import { from } from 'rxjs';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordResetRequestComponent } from './components/password-reset/password-reset-request/password-reset-request.component';

@NgModule({
  entryComponents: [
    LikesBottomSheet,
    DeletePostDialog,
    UpdatePostDialog
 ],
  declarations: [
    AppComponent,
    PostListComponent,
    MainNavComponent,
    SignInComponent,
    SignUpComponent,
    PostsComponent,
    UserDetailsComponent,
    LoaderComponent,
    PostComponent,  
    PostAddComponent,
    LikesBottomSheet,
    DeletePostDialog,
    UpdatePostDialog,
    PasswordResetComponent,
    PasswordResetRequestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    //Ngrx
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    //Ngrx
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFontAwesomeModule
  ],
  providers: [
    PostService,
    SignUpService,
    AuthenticationService,
    AuthGuardService,
    LocalStorageService,
    UserDetailsService,
    LoaderService,
    PasswordResetService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
