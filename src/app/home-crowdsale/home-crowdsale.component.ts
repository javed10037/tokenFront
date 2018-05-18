  import { Component, OnInit } from '@angular/core';
  import { EqualValidator } from '../Directives/validation.directive';
  import { GlobalService } from '../GlobalService';
  import * as moment from 'moment';
  import { Router, ActivatedRoute } from '@angular/router';
  import { AlertService, AuthenticationService ,SetupService,UserService} from '../Services/index';
  import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Http, Headers, RequestOptions, Response  } from '@angular/http';
  import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-home-crowdsale',
  templateUrl: './home-crowdsale.component.html',
  styleUrls: ['./home-crowdsale.component.scss']
})
export class HomeCrowdsaleComponent implements OnInit {
public data:any;
public postData : any;
tokenaddress:any;
user: any;
tokenData : any;
tokenId : any;

  constructor(
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,              
                private global_service:GlobalService,
                private activatedRoute: ActivatedRoute,            
                private ng4LoadingSpinnerService: Ng4LoadingSpinnerService

             )
                 { 
                  this.user=JSON.parse(localStorage.getItem('currentUser')); 
                 if(this.user!=null||this.user!=undefined)
                   {
                    
                  }

  }

  ngOnInit() {
  	 this.activatedRoute.params.subscribe(params => {
            this.tokenId = params["id"];
            debugger;
            this.getTokenInfo();
        })
  }

  gotToInvest(tokenId :any){
  	// check if user login then go to dashbord invest and if not then go to login

    // this.router.navigate(['/dashboard/invest', { 'id': tokenId }]);
  }

  getTokenInfo(){   
      let postData = {
        tokenId : this.tokenId,
        userId : this.user._id,
      };
          const url = this.global_service.basePath + 'ETH/getTokenInfoByTokenId';
           this.global_service.PostRequest(url,postData).subscribe(response=>{
             let res = response[0].json.json();
            if(res.status==200){  
                debugger;
                this.tokenData=res.data;
               
            }else{          
                 this.global_service.showNotification('top','right',res.message,2,'ti-cross');
            }          
          });
    }



}
