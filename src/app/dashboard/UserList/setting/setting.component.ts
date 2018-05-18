  import { Component, OnInit,NgModule } from '@angular/core';
  import { EqualValidator } from './../../../Directives/validation.directive';
  import { GlobalService } from './../../../GlobalService';
  import * as moment from 'moment';
  import { Router, ActivatedRoute } from '@angular/router';
  import { AlertService, AuthenticationService ,SetupService,UserService} from '../../../Services/index';
  import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Http, Headers, RequestOptions, Response  } from '@angular/http';
  import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

  @Component({
    selector: 'setting-Profile',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.css']
  })
  export class SettingComponent implements OnInit {
  public user:any;
   public profileDetail:any;
  updatePassword: UpdatePassword;
  updatePasswordForm: FormGroup;
    constructor(
                private http: Http,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private _setupService: SetupService,
                private alertService: AlertService,
                private userService: UserService ,
                private global_service:GlobalService
      ) {     

      var status = this.global_service.isLogedIn();
         if(status==false){
           this.router.navigateByUrl('/login');
         }
          this.user=JSON.parse(localStorage.getItem('currentUser')); 
  

          this.updatePassword = { 
            currentPassword: '',
            newPassword: '',
            confirmNewPassword:''            
           }

        }

   
    updateUserPassword(){
      let postData ={
          userId : this.user._id,   
          currentPassword:this.updatePassword.currentPassword,
          newPassword: this.updatePassword.newPassword,
          confirmNewPassword: this.updatePassword.confirmNewPassword,

       };
       
         const url = this.global_service.basePath + 'api/ResetPasswordByUserid';
         this.global_service.PostRequest(url , postData).subscribe(response=>{   
           debugger
            if(response[0].json.json().status == 200){ 
              this.updatePasswordForm.reset();
              this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');  

            }else{
               this.updatePasswordForm.reset();
               this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross'); 

            }
          })
    }
  ngOnInit() {
  
        this.loginFormInit();


       
    }

    loginFormInit(){
      this.updatePasswordForm = this.fb.group({
            'currentPassword': new FormControl('', Validators.required),
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
