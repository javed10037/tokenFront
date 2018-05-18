import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService ,UserService } from '../Services/index';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { EqualValidator } from '../Directives/validation.directive';
import * as moment from 'moment';
import { GlobalService } from '../GlobalService';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
@Component({
    selector : 'reseller',
    templateUrl: 'resellerHome.component.html'
})

export class ResellerComponent implements OnInit {
    loading = false;
    returnUrl: string;
    submitted: boolean;
    account: string;
    isClick=false;
    passwordRegex: any = '/^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{4,20}/' ;
    registerForm: FormGroup;
    signUpDetails: SignupDetail;
    year:any
    referalStatus:boolean;
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    constructor(
        private http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private userService: UserService,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private activatedRoute: ActivatedRoute,
        private global_service : GlobalService,
         private element: ElementRef,
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService

        ) 
    { 
       this.year=moment(new Date()).format('YYYY');
        //debugger;
        this.http = http          
         this.signUpDetails = { 
            firstName: '',
            lastName: '',
            email:'',
            password:'',
            confirmPassword: '',
            accountType:'',      
            referralUser:''
           }

    }

    ngOnInit() {
         this.activatedRoute.params.subscribe(params => {
            this.account = params["paramKey"]; 
            if(this.account == "Investor") {
               this.referalStatus=false;
            }else{
               this.referalStatus=true;
            }
        })
        this.loginFormInit();
       

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 400);
    }

    loginFormInit(){
      this.registerForm = this.fb.group({
            'firstName': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
            'lastName': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z]{3,32}$/)])),
            'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-zA-Z][-_.a-zA-Z0-9]{3,29}\@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/)])),
            'password': new FormControl('',Validators.compose([Validators.required,Validators.minLength(6), Validators.maxLength(16),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/)])),
            'confirmPassword':new FormControl('', Validators.required),
        }, { validator: this.matchingPasswords('password', 'confirmPassword') });
    }
    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {       
        return (group: FormGroup): { [key: string]: any } => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];
            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }

     
     register(){
        this.ng4LoadingSpinnerService.show(); 
         const url = this.global_service.basePath + 'api/register';
         this.signUpDetails.accountType=this.account;  
          this.global_service.PostRequestUnautorized(url , this.signUpDetails)
        .subscribe((response) => {  
          if(response[0].json.status==200){
          this.ng4LoadingSpinnerService.hide();   
           this.global_service.showNotification('top','right',response[0].json.message,2,'ti-cross');                    
             
               this.router.navigate(['/login']);
          }else{                 
         this.ng4LoadingSpinnerService.hide(); 
           this.global_service.showNotification('top','right',response[0].json.message,4,'ti-cross');
          }
       
        })
     }

      home(){
     window.location.href='https://www.kryptual.com/';
    }
}