
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NavbarComponent } from './navbar.component';
//import {  DialogModule,ButtonModule} from 'primeng/primeng';

@NgModule({
    imports: [ 
              RouterModule, 
              CommonModule ,
             //  DialogModule,
             // ButtonModule,
           
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,   
  
    HttpModule,
    HttpClientModule],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ]
})

export class NavbarModule {

	depositDialog: boolean = false;
    withdrawDialog: boolean = false;
    constructor(){}
    deposite() {
        this.depositDialog = true;
    }
       withdraw() {
             this.withdrawDialog = true;
    }
}
