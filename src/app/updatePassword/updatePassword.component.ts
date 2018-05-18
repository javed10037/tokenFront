import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
  declare var $:any;
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService ,UserService } from '../Services/index';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { GlobalService } from '../GlobalService';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
//import { MessageService } from 'primeng/components/common/messageservice';
@Component({
    selector : 'updatePassword',
    templateUrl: 'updatePassword.component.html'
})

export class UpdatePasswordComponent implements OnInit {
  public user:any;
   public profileDetail:any;
  updatePassword: UpdatePassword;
  updatePasswordForm: FormGroup;
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    tokenId:any;
    private nativeElement: Node;
    constructor(
                private http: Http,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private alertService: AlertService,
                private element: ElementRef,
                private userService: UserService ,
                 private activatedRoute: ActivatedRoute,
                private global_service:GlobalService,
                 private ng4LoadingSpinnerService: Ng4LoadingSpinnerService
      ) {     
          this.user=JSON.parse(localStorage.getItem('currentUser')); 
  

          this.updatePassword = { 
            //currentPassword: '',
            newPassword: '',
            confirmNewPassword:''            
           }

        }

   
    updateUserPassword(){
      this.ng4LoadingSpinnerService.show(); 
      debugger
      let postData ={
          // userId : this.user._id,   
          // currentPassword:this.updatePassword.currentPassword,
          token:this.tokenId,
          newPassword: this.updatePassword.newPassword,
          //confirmNewPassword: this.updatePassword.confirmNewPassword,

       };
         const url = this.global_service.basePath + 'api/reset_password';
         this.global_service.PostRequest(url , postData).subscribe(response=>{ 
           this.ng4LoadingSpinnerService.hide(); 
           debugger
           this.updatePasswordForm.reset();
            if(response[0].json.status == 200){ 
               this.router.navigateByUrl('/login');
             this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
            }else{
              this.ng4LoadingSpinnerService.hide(); 
               this.updatePasswordForm.reset();
               this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
            }
          })
    }
  ngOnInit() {
       
       this.activatedRoute.params.subscribe(params => {
            this.tokenId = params["token"];
          })
  
        this.loginFormInit();

       var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function() {
            
            $('.card').removeClass('card-hidden');
        }, 700);
       
    }

    loginFormInit(){
      this.updatePasswordForm = this.fb.group({
            // 'currentPassword': new FormControl('', Validators.required),
            'newPassword':  new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(100),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)])),
            'confirmNewPassword': new FormControl('', Validators.required)            
           }, { validator: this.matchingPasswords('newPassword', 'confirmNewPassword') });
    }
    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {       
        return (group: FormGroup): { [key: string]: any } => {
            let newPassword = group.controls[passwordKey];
            let confirmNewPassword = group.controls[confirmPasswordKey];
            if (newPassword.value !== confirmNewPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }
  }