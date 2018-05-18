
  import { Component, OnInit } from '@angular/core';
  import { DomSanitizer } from '@angular/platform-browser';
  import { EqualValidator } from './../../../Directives/validation.directive';
  import { GlobalService } from './../../../GlobalService';
  import * as moment from 'moment';
  import { Router, ActivatedRoute } from '@angular/router';
  import { AlertService, AuthenticationService ,SetupService,UserService} from '../../../Services/index';
  import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Http, Headers, RequestOptions, Response  } from '@angular/http';
  import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-crowdsale',
  templateUrl: './crowdsale.component.html',
  styleUrls: ['./crowdsale.component.scss']
})
export class CrowdsaleComponent implements OnInit {
public data:any;
public postData : any;
tokenaddress:any;
user: any;
crowdSaleToken:any[]=[];
tokenData : any;
tokenId : any;
whitePaperImage:any;
startTime:any;
endTime:any;
lastDate:any;
currentdate:any;
tokenStatus:any;
  constructor(
                private domSanitizer: DomSanitizer,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private global_service:GlobalService,
                private activatedRoute: ActivatedRoute,
                private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,
              

             )
                 {
                   var status = this.global_service.isLogedIn();
                   if(status==false){
                    this.router.navigateByUrl('/login');
                   }
                   
                  this.user=JSON.parse(localStorage.getItem('currentUser'));
                   this.currentdate = moment(new Date()).format("YYYY-MM-DD HH:mm");
                 if(this.user!=null||this.user!=undefined)
                   {

                  }
                  this.activatedRoute.params.subscribe(params => {
                   this.tokenId = params["id"];
                   this.getTokenInfo();
                  })

  }

  ngOnInit() {
            
  }

  gotToInvest(tokenId :any,tokenAddress : any){
    this.router.navigate(['/dashboard/invest', { 'id': tokenId, "tokenAddress" : tokenAddress }]);
  }

  getTokenInfo(){
    this.crowdSaleToken =[];
      let postData = {
        tokenId : this.tokenId,
        userId : this.user._id,
      };
          const url = this.global_service.basePath + 'ETH/getTokenInfoByTokenId';
           this.global_service.PostRequest(url,postData).subscribe(response=>{
             debugger
            // let res = response[0].json.json();
            if(response[0].json.json().status==200){
              this.tokenData=response[0].json.json().data;

              for(var data of response[0].json.json().data.crowdsale){
                let objData ={
                            tierName :'',
                            startTime:'',
                            endTime:'',
                            status:''
                        };
                        objData.tierName=data.tier;
                        objData.startTime=data.startTime
                        objData.endTime=data.endTime
                        objData.status=data.startTime
                   this.startTime=data.startTime;
                   this.endTime=data.endTime;
                   console.log("startTime = = "+this.startTime);
                   console.log("endTime = = ="+this.endTime);
                   if(this.currentdate<=this.startTime)
                   {                     
                     objData.status="Upcomming";
                   }else if(this.currentdate>this.endTime){
                        objData.status="Expired"; 
                   }
                   else {
                       objData.status="Ongoing";  
                   }
                   this.crowdSaleToken.push(objData);
              }
               console.log("this.tokenData = = "+JSON.stringify(this.tokenData));
               
              this.whitePaperImage=this.domSanitizer.bypassSecurityTrustUrl(this.tokenData.whitePaper);
           
            }
          });
    }

  download(){

    
      // window.open("data:application/pdf," + escape(this.tokenData.whitePaper)); 


  }
    
}
