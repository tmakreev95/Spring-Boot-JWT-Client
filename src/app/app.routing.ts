import { Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';

import { PostListComponent } from './components/post-list/post-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PostsComponent } from './components/admin/posts/posts.component';
import { UserDetailsComponent } from '../app/components/userdetails/userdetails.component'
import { PostAddComponent } from './components/post-list/post-add/post-add.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component'
import { PasswordResetRequestComponent } from './components/password-reset/password-reset-request/password-reset-request.component';
import { AuthGuardService } from './helpers/auth.guard';


const appRoutes: Routes = [
    { path: 'user/posts', 
        component: PostListComponent,
        canActivate: [AuthGuardService]  
    },
    { path: 'user/add/post', 
        component: PostAddComponent,
        canActivate: [AuthGuardService]  
    },
    { path: 'sign-in', 
        component: SignInComponent 
    },
    { path: 'sign-up', 
        component: SignUpComponent,
    },
    { path: 'password-reset', 
        component: PasswordResetRequestComponent 
    },
    { path: 'password-reset/verify-token', 
        component: PasswordResetComponent 
    },
    { path: 'admin/posts', 
        component: PostsComponent, 
        canActivate: [AuthGuardService] 
    },
    { path: 'user/profile', 
        component: UserDetailsComponent, 
        canActivate: [AuthGuardService] 
    },
    { path: '**', redirectTo: '' },
    { path: '', 
        component: PostListComponent, 
        canActivate: [AuthGuardService] 
    }
    
];

@NgModule({
    imports: [
      RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}