import { BrowserModule } from '@angular/platform-browser';

import { CommonModule, LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { AlertService, AuthenticationService, UserService,SetupService,} from './Services/index';
import { LoginComponent } from './login/login.component';
import { GlobalService } from './GlobalService';
import { CommonService } from './Services/CommonService';
import { AuthGuard } from './auth-guard.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import { SignupHomeComponent } from './signup-home/signup-home.component';
import { HomeComponent } from './home/home.component'
import { ResellerComponent } from './resellerHome/resellerHome.component';
import { UpdatePasswordComponent } from './updatePassword/updatePassword.component';
import { rootComponent } from './dashboard/error404/error404.component';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { HomeCrowdsaleComponent } from './home-crowdsale/home-crowdsale.component';
import { Angular2SocialLoginModule } from 'angular2-social-login';
import { FaqComponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ScrollToModule} from 'ng2-scroll-to';
let providers ={
    "google": {
               "clientId": "81d3o0yh46ejah",
                "secretId" : "gY3vSxBOrD50VJNr"
               },
               "linkedin":
               {
                   "clientId": "LINKEDIN_CLIENT_ID"
                    },
                    "facebook":
                    {
                    "clientId": "FACEBOOK_CLIENT_ID",
                        "apiVersion": "<version>" //like v2.4
              }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignupComponent,
    SignupHomeComponent,
    UpdatePasswordComponent,
    rootComponent,
    HomeCrowdsaleComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    ResellerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NoopAnimationsModule,
    RouterModule.forRoot(AppRoutes,{useHash:false}),
    Ng4LoadingSpinnerModule,
    Angular2SocialLoginModule,
    SidebarModule,
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ToasterModule,
    HttpModule,
    HttpClientModule,
    ScrollToModule
  ],

  providers: [
             AuthGuard,
             AlertService,
             AuthenticationService,
             UserService,
             SetupService,
             ToasterService,
             GlobalService,
             CommonService,
             AuthGuard,
             Ng4LoadingSpinnerService,

             // below line is use for add # in url
             {
                 provide:
                 LocationStrategy,
                 useClass: HashLocationStrategy
             },
             DatePipe],
  bootstrap: [AppComponent],
})

export class AppModule { }
