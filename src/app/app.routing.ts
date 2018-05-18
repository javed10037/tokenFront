import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import { SignupHomeComponent } from './signup-home/signup-home.component';
import { UpdatePasswordComponent } from './updatePassword/updatePassword.component';
import {rootComponent} from './dashboard/error404/error404.component';
import { HomeCrowdsaleComponent } from './home-crowdsale/home-crowdsale.component';
import { FaqComponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ResellerComponent } from './resellerHome/resellerHome.component';
export const AppRoutes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'signupHome',
        component: SignupHomeComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'updatePassword/:token',
        component: UpdatePasswordComponent
    },
    {
      path: 'reseller',
      component: ResellerComponent
    },
    {
        path: 'homecrowdsale',
        component: HomeCrowdsaleComponent
    },
    {
      path: 'dashboard',
      loadChildren: 'app/sidebar/sidebar.module#SidebarModule' ,
    },

     {
        path: 'faq',
        component: FaqComponent
    },
     {
        path: 'privacy',
        component: PrivacyPolicyComponent
    },

    { path: '404',
     component: rootComponent
    },

    { path: '**',
    redirectTo: '/' + '404'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes, { preloadingStrategy: PreloadAllModules });
