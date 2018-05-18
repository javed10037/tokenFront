import { Component, OnInit,NgModule, ElementRef } from '@angular/core';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../Services/index';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { ToasterContainerComponent, ToasterService, ToasterConfig} from 'angular2-toaster';
import { GlobalService } from '../GlobalService';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  
    selector : 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
   
    loading = false;
    isClick=false;
    returnUrl: string;
    submitted: boolean;
    loginDetail:LoginDetail;
    loginForm: FormGroup;
    tokens:any;

    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    
    constructor(
        private http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private authenticationService: AuthenticationService,
        private global_service : GlobalService,
        private alertService: AlertService,
        private element: ElementRef,
        public toasterService:ToasterService,
        private ng4LoadingSpinnerService: Ng4LoadingSpinnerService
        )   { 
      
            this.nativeElement = element.nativeElement;
            this.sidebarVisible = false;
           this.http = http;
           this.loginDetail = {           
            email:'',
            password: '',
           }
         }

        ngOnInit() {       
        this.loginFormInit();
        this.authenticationService.logout1();       
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
         var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 400);
    }

    loginFormInit(){
      this.loginForm = this.fb.group({
            'email': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required)
            
        });
    }

      login(){  
       this.ng4LoadingSpinnerService.show(); 
       this.loading=true;
       this.loginDetail.email=this.loginDetail.email.toLowerCase();
      
     const url = this.global_service.basePath + 'api/login';
          this.global_service.PostRequestUnautorized(url , this.loginDetail)
        .subscribe((response) => {     
          if(response[0].json.status==200){
            this.ng4LoadingSpinnerService.hide();
            this.loading=false;
            this.loginForm.reset();                    
              localStorage.setItem('currentUser', JSON.stringify(response[0].json.data));
               localStorage.setItem('token', response[0].json.token);
              var user=JSON.parse(localStorage.getItem('currentUser')); 
              this.router.navigateByUrl('/dashboard/view-user');
              if(this.tokens == null || this.tokens == undefined){
  
                 this.router.navigateByUrl('/dashboard/view-user');
                this.global_service.showNotification('top','right','Login successfully',2,'ti-cross');
              }else{
                  //window.open("https://www.google.co.in", "_blank");
                 // http://localhost:3000/crowdsale?addr=0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0

                 // "http://192.168.0.165:3000/crowdsale?addr="+user._id+"="+this.TOKEN, "_blank"
              }                     
     
          }else{     
              this.loginForm.reset();
               this.ng4LoadingSpinnerService.hide();  
              this.loading=false;   
              this.global_service.showNotification('top','right',response[0].json.message,4,'ti-cross');   
             
          }
       
        })
    }

     home(){
      window.location.href='https://www.kryptual.com/';
    }

    
}
