  import { Component, OnInit,NgModule ,Input} from '@angular/core';
  import { EqualValidator } from './../../../Directives/validation.directive';
  import { GlobalService } from './../../../GlobalService';
  import * as moment from 'moment';
  import { Router, ActivatedRoute } from '@angular/router';
  import { AlertService, AuthenticationService ,SetupService,UserService} from '../../../Services/index';
  import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Http, Headers, RequestOptions, Response  } from '@angular/http';
 import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

  @Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css']
  })

  export class MyProfileComponent implements OnInit {
  public user:any;
  firstName:any;
  public profileDetail:any;
  updateDetails: SignupDetail;
  updateForm: FormGroup;
  constructor(
                private http: Http,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private _setupService: SetupService,
                private alertService: AlertService,              
                private userService: UserService ,
                private global_service:GlobalService,
                private ng4LoadingSpinnerService: Ng4LoadingSpinnerService
      ) {     
    var status = this.global_service.isLogedIn();
         if(status==false){
           this.router.navigateByUrl('/login');
         }
          this.user=JSON.parse(localStorage.getItem('currentUser')); 
          if(this.user!=null||this.user!=undefined){
            this.userInfo();
          }         

          this.updateDetails = { 
            firstName: '',
            lastName: '' ,
            email:''         
           }

        }

   userInfo(){
     
       let postData ={
          userId : this.user._id,  
       };
          const url = this.global_service.basePath + 'api/GetProfileByUserId/';
            this.global_service.PostRequest(url,postData).subscribe(response=>{  
                       
            if(response[0].json.status==200){
              this.updateDetails=response[0].json.json().data; 
                          
            }else{
             console.log("data = = "+response.data)
             
            }
          })
    }
   
    updateUserInfo(){
      this.ng4LoadingSpinnerService.show();
      let postData ={
          userId : this.user._id,
          firstName:this.updateDetails.firstName,
          lastName: this.updateDetails.lastName,
          email:this.updateDetails.email
       };
       const url = this.global_service.basePath + 'api/UpdateUserProfileById/';
       this.global_service.PostRequest(url,postData).subscribe(response=>{ 
            if(response[0].json.status==200){
              this.ng4LoadingSpinnerService.hide();
             this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
                          
            }else{
              this.ng4LoadingSpinnerService.hide();
              this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');              
             }
          })
    }

   ngOnInit() {  

        this.myprofileFormInit();
    }

    myprofileFormInit(){
      this.updateForm = this.fb.group({
            'firstName': new FormControl('',Validators.compose([Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z][a-zA-Z\\s]+$/)])),
            'lastName': new FormControl('',Validators.compose([Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z][a-zA-Z\\s]+$/)])),
            'email': new FormControl('', Validators.required)
        });
    }
   
  }
