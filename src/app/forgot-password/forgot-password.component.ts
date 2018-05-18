import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from  '@angular/router';
import { GlobalService } from '../GlobalService';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
declare var $:any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    forgotPsswordForm: FormGroup;
    loader: boolean= false;
    is_login_email: boolean;
    public user;
    sub: any;
    subscription:boolean=true;
     forgotPasswordDetail:ForgotPasswordDetail;
        test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    constructor(
                public fb: FormBuilder, 
                public global_service: GlobalService,
                private element: ElementRef,
                public router: Router ,
                private ng4LoadingSpinnerService: Ng4LoadingSpinnerService
     ) {
      localStorage.clear();

       this.forgotPasswordDetail = { 
             email:''
             
           } 
     }

    ngOnInit() {
     this.formInitialization();
             var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 400);
    }

    formInitialization(){
     this.forgotPsswordForm = this.fb.group({
      // email: ['',[Validators.required]]
      'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{3,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
     })
    }

    forgotPassword(){
       this.ng4LoadingSpinnerService.show(); 
           const url = this.global_service.basePath + 'api/forgot_password';
          this.global_service.PostRequestUnautorized(url , this.forgotPasswordDetail)
        .subscribe((response) => {
                 
                  if(response[0].json.status==200){  
                  this.ng4LoadingSpinnerService.hide();   
                  this.forgotPsswordForm.reset();       
                 this.global_service.showNotification('top','right',response[0].json.msg,2,'ti-cross');
                            
              }else{
                this.ng4LoadingSpinnerService.hide();
                  this.forgotPsswordForm.reset();
                  this.global_service.showNotification('top','right',response[0].json.msg,4,'ti-cross');
              }                     
     
          });
    
       
     
    }

    gotoForgotPassword(){
      this.router.navigateByUrl('forgot-password');
    }

}
