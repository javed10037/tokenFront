  import { Component, OnInit,NgModule,Injectable } from '@angular/core';
  import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Router, ActivatedRoute } from '@angular/router';
  import { Http, Headers, RequestOptions, Response  } from '@angular/http';
  import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
  import { GlobalService } from './../../../GlobalService';
  declare const $: any;
  @Component({
    selector: 'app-sendtoken',
    templateUrl: './sendtoken.component.html',
    styleUrls: ['./sendtoken.component.scss']
  })
  export class SendtokenComponent implements OnInit {
      user: any;
      sendTokenDetail:SendTokenDetail;
      transactionHistory:any;
      tokenList:any[]=[];
      ethBalance:any="0";
      sendTokenForm: FormGroup;
      passwordForm: FormGroup;
      tokenBalance:any;
      crowdsaleAddress:any;
      noTokenFound:boolean=false;
      constructor(
                  private http: Http,
                  private route: ActivatedRoute,
                  private router: Router,
                  private fb: FormBuilder,
                  private global_service:GlobalService,
                  private ng4LoadingSpinnerService: Ng4LoadingSpinnerService
  	             )
                  {

                    var status = this.global_service.isLogedIn();
                    if(status==false){
                     this.router.navigateByUrl('/login');
                    }
                    this.user=JSON.parse(localStorage.getItem('currentUser'));
                    if(this.user!=null||this.user!=undefined)
                        {
                              this.getBalance();
                              this.getTokens();
                              this.getTransactionHistory();
                       }
                       this.tokenDetails();
                  }

                  // get eth balance

                  getBalance(){
                               let postData ={
                               userId : this.user._id,
                               address:this.user.EthAddress
                             };
                             const url = this.global_service.basePath + 'ETH/getBalanceByAddress';
                             this.global_service.PostRequest(url , postData).subscribe(response=>{
                               if(response[0].json.status==200)
                               {
                                 this.ethBalance=response[0].json.json().data;
                                 this.ethBalance = this.ethBalance.toFixed(5);
                               }else
                               {
                                this.ethBalance="NA";
                               }
                             })
                   }

                  // get token details

                     getTokens(){
                                let postData ={
                                    userId : this.user._id,
                                    Address: this.user.EthAddress
                                };
                               const url = this.global_service.basePath + 'ETH/getAllsendTokens';
                               this.global_service.PostRequest(url , postData).subscribe(response=>{
                               debugger
                               if(response[0].status == 200)
                                {
                                  var tokenDetails=response[0].json.json().data;
                                  if(tokenDetails.length!=0)
                                    {
                                      for(var data of tokenDetails.tokens)
                                      {
                                       var balance = (data.balance/(Math.pow(10,data.tokenInfo.decimals)))
                                       data.tokenBalance = balance;
                                       this.tokenList.push(data);
                                      }

                                    }
                                  else
                                  {
                                    this.noTokenFound=true;
                                    console.log("No token Founds Image");
                                  }
                              }
                              else
                              {
                                    alert("No Data found");
                              }
                            })
                     }


                    // Get get Contract Address By Token

                    getContractAddressByToken(tokenAddress:any){
                      this.sendTokenForm.reset();
                      this.passwordForm.reset();
                      let postData ={
                                    userId : this.user._id,
                                    tokenAddress: tokenAddress
                       };
                       const url = this.global_service.basePath + 'ETH/getContractAddressByToken';
                       this.ng4LoadingSpinnerService.show();
                       this.global_service.PostRequest(url , postData).subscribe(response=>{
                       if(response[0].status == 200 )
                       {
                          this.ng4LoadingSpinnerService.hide();
                          this.crowdsaleAddress = "skfhaskdjaskdjaskdsj"
                          if(response[0].json.json().data.length!=0){
                            this.crowdsaleAddress=response[0].json.json().data.crowdsaleAddress;
                          }

                        }else{
                          console.log("no data found");
                        }
                        });
                    }

                    checkAddress(){

                         if(this.crowdsaleAddress){
                           $('#noticeModa1232').modal('show');
                         }else{
                            this.global_service.showNotification('top','right','please select token first',3,'ti-cross');
                         }
                       }

                  // get transaction history
                    getTransactionHistory(){

                    }


                   tokenDetails() {
                         this.sendTokenDetail = {
                           fromAddress: "",
                           amount: "",
                           toAddress: "",
                           userId: "",
                           password:''
                       }
                     }



                  // send token

                   sendTokens() {
                     this.ng4LoadingSpinnerService.show();
                     let postData = {
                         userId : this.user._id,
                         email:this.user.email,
                         contractAddress:this.crowdsaleAddress,
                         fromAddress: this.user.EthAddress,
                         toAddress:this.sendTokenDetail.toAddress,
                         amount: this.sendTokenDetail.amount,
                         password:this.sendTokenDetail.password
                     };

                     const url = this.global_service.basePath + 'ETH/sendToken';
                     this.global_service.PostRequest(url, postData).subscribe(response => {
                         if (response[0].json.status == 200) {
                           this.ng4LoadingSpinnerService.hide();
                             this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
                             this.sendTokenForm.reset();
                             this.passwordForm.reset();
                             this.getTokens();
                             this.getTransactionHistory();
                            } else
                           {
                             this.ng4LoadingSpinnerService.hide();
                             this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
                             this.sendTokenForm.reset();
                             this.passwordForm.reset();
                           }
                     })
                 }

                 withdrawFormInit() {
                     this.sendTokenForm = this.fb.group({
                         'amount': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^.?(0|[0-9]\d*)(\.\d+)?$/)])),
                         'toAddress': new FormControl('', Validators.required)
                     });
                 }
                 eventHandler(e) {
                  if(!((e.keyCode > 95 && e.keyCode < 106)
                    || (e.keyCode > 45 && e.keyCode < 58)
                    || e.keyCode == 8)) {
                      return false;
                  }
                  }

                 passwordFormInit() {
                     this.passwordForm = this.fb.group({
                         'password':  new FormControl('', Validators.required)
                     });
                 }

                 ngOnInit() {
  	               this.withdrawFormInit();
  	               this.passwordFormInit();
                 }

  }
