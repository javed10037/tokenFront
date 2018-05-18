  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
// import { GlobalService } from './../GlobalService';
  import { EqualValidator } from './../../../Directives/validation.directive';
  import { GlobalService } from './../../../GlobalService';
//import {DataTableModule} from 'primeng/primeng';
  @Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.css']
  })
  export class HelpComponent implements OnInit {

    loader:boolean = false;
    usersList: any;
    value = 1;
    isDataFound : boolean = false;
    display:boolean = false;
    resetPasswordForm:FormGroup;
    disableMultipleSave:boolean = false;
    validateFields:boolean = false;
    userId:any;
    indexValue:number=1;
      contactForm: FormGroup;
      public contactDetail:ContactDetail;
    constructor(public global_service: GlobalService,public router: Router, public fb:FormBuilder,) {

      var status = this.global_service.isLogedIn();
         if(status==false){
           this.router.navigateByUrl('/login');
         }

         this.contactDetail = {           
            email:'',
            name: '',
            subject:'',
            message: ''
               
           } 
    }

    ngOnInit() {
      this.getUserList(this.value);
      this.formInitialization();
      this.contactFormInit();
    }

    formInitialization(){
        this.resetPasswordForm = this.fb.group({
          userId:['',[]],
          oldPassword:['',[Validators.required]],   
          newPassword:['',[Validators.required]],   
          confirmPassword:['',[Validators.required]],
          token:[this.global_service.userInfo.token,[]]
        })
      }

    getUserList(value) {

      this.loader = true;
      let obj = {page_number:value,token:this.global_service.userInfo.token}
      
      const url = this.global_service.basePath + 'admin/users/list';
      this.global_service.PostRequest(url,obj)

      .subscribe(res => {
          this.loader = false;
          if(res[0].json.json().object.result.count !== 0){
            this.usersList = res[0].json.json().object;
            this.isDataFound = true;
          }
          else{
            this.isDataFound = false;
          }
          
        }, err => {
          this.loader = false;
          this.global_service.consoleFun(err);
      })
    }
    
    deleteUserById(id){

      this.loader = true;
      let obj = {id:id,token:this.global_service.userInfo.token}
      
      const url = this.global_service.basePath + 'admin/skills/users/delete';

      this.global_service.PostRequest(url,obj)
      .subscribe(res => {
        this.loader = false;
        // this.global_service.consoleFun(res[0].json.json());
        this.getUserList(this.value);
      }, 
      err => {
        this.loader = false;
        this.global_service.consoleFun(err);
      })
    }

    paginate(event){
      this.value = event.page + 1;
      if (event.page > 0) { 
      this.indexValue = 10 * event.page +1; 
    }
    else{
        this.indexValue=1;
    }
      this.getUserList(this.value);
    }

    gotoAddUser(){
      this.router.navigateByUrl("dashboard/add-user");
    }

    gotoEditUser(id){
      this.router.navigateByUrl("dashboard/edit-user/" + id);
    }

    resetPassword(id){
      this.display = true;
      this.userId = id;
    }

    resetPasswordOfUser(){
     this.global_service.consoleFun(this.resetPasswordForm.value);
     if(this.global_service.isFormValid(this.resetPasswordForm)){ 
       this.disableMultipleSave = true;
       const url = this.global_service.basePath + 'admin/users/reset/password';
           this.resetPasswordForm.value.oldPassword = window.btoa(this.resetPasswordForm.value.oldPassword); // for encrypt/decrypt password
           this.resetPasswordForm.value.newPassword = window.btoa(this.resetPasswordForm.value.newPassword); // for encrypt/decrypt password
           this.resetPasswordForm.value.confirmPassword = window.btoa(this.resetPasswordForm.value.confirmPassword); // for encrypt/decrypt password
           this.resetPasswordForm.value.userId = this.userId;
           this.global_service.PostRequest(url,this.resetPasswordForm.value)
            .subscribe(res => {
              if (res[0].json.json().error && res[0].json.json().error.object){
              // this.global_service.showNotifications('success', 'Done' ,res[0].json.json().error.object);
                 this.global_service.showNotification('top','right',res[0].json.json().error.object,4,'ti-cross');
                }  
                else {
                  // this.global_service.showNotifications('success', 'Done' ,"Added Successfully");
                this.global_service.showNotification('top','right',"Password Reset Successfully",2,'ti-check');
                this.router.navigateByUrl("dashboard/view-user");
                this.formInitialization();
              }
              this.disableMultipleSave = false;
              this.display = false;
              this.resetPasswordForm.reset();
              }, 
              err => {
              this.disableMultipleSave = false;
              // this.loader = false;
              // this.global_service.consoleFun(err);
              })
            }
      else{
        this.validateFields = true;
        this.resetPasswordForm.reset();
      }
    }

   closePopUp(){
     this.validateFields = false;
     this.display = false;
     this.formInitialization();
     this.resetPasswordForm.reset();
   } 
   contactFormInit(){
      this.contactForm = this.fb.group({            
            'name': new FormControl('', Validators.required),
            'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,8}|[0-9]{1,3})(\]?)$/)])),
            'message': new FormControl('', Validators.required),
            'subject': new FormControl('', Validators.required)
            
        });
    }
    sendMessage(){
         const url = this.global_service.basePath + 'api/contactUs';
         this.global_service.PostRequestUnautorized(url , this.contactDetail)
         .subscribe((response) => {         
          if(response[0].json.status==200){ 
               this.contactForm.reset();                    
            //   this.messageService.add({severity:'success', summary:response[0].json.message+""+"please verify"});
             }else{ 
                this.contactForm.reset();    
            //  this.messageService.add({severity:'error', summary:response[0].json.err});
          }
        })
     }
  }
