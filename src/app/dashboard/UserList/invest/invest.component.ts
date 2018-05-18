 import { Component, OnInit,NgModule,Injectable } from '@angular/core';
  import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Router, ActivatedRoute } from '@angular/router';
  import { Http, Headers, RequestOptions, Response  } from '@angular/http';
  import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
  import { GlobalService } from '../../../GlobalService';
  import * as moment from 'moment';
  import  * as CONST from '../../../ico_constant';
 import  * as ico   from'./../../../ico_constant';
  declare const paypal: any;

@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.scss']
})

export class InvestComponent implements OnInit {
  useraddress:any;
  tokenAddress:any;
  investData : any;
  user :any;
  tokenEndAt : any;
  enddate : any;
  tokenBalance :any;
  ethBalance : any;
  buyToken : any;
  password : any;
  calculatedEth : number = 0;
  enablePaypal : boolean = false;
  dollerAmount : number = 0 ;
  ethrate : string = '';
  holderCount:any;
  crowdSaleAddress:any;
  buyingToken:any= {
                      amount:""
                   }
  passwordDetails:any={
                       password:""
                      }
  investForm:FormGroup;
  passwordForm:FormGroup;
  constructor(
  	private http: Http,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private global_service:GlobalService,
                private activatedRoute: ActivatedRoute,
                private ng4LoadingSpinnerService: Ng4LoadingSpinnerService

  	) {
      var status = this.global_service.isLogedIn();
      if(status==false){
       this.router.navigateByUrl('/login');
      }

        this.getEthereumFromUSD();
        this.user=JSON.parse(localStorage.getItem('currentUser'));
        this.activatedRoute.params.subscribe(params => {
            this.tokenAddress = params["id"];
        });
        this.getBalance();
        this.getTokenInfo();
      }

  ngOnInit() {
  	 this.investerForm();
     this.passwordforms();
  }
  investerForm(){
    this.investForm = this.fb.group({
          'amount': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^.?(0|[0-9]\d*)(\.\d+)?$/)])),
        });
  }
  passwordforms(){
     this.passwordForm = this.fb.group({
          'password':  new FormControl('', Validators.required)
        });
  }
   eventHandler(e) {
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 45 && e.keyCode < 58)
      || e.keyCode == 8)) {
        return false;
      }
    }


  enterTokenValue(event:any){
    if(!this.enablePaypal){
      this.calculatedEth = this.getETHERUM();
      if(this.calculatedEth > this.ethBalance){
       
        this.global_service.showNotification('top','right','Sorry you cant purchase.'+this.buyingToken.amount,4,'ti-cross');
         event.preventDefault();
        return false;
        
        
      }
    }else{
      this.calculatedEth = this.getDoller();
    }

  }

  getETHERUM(){

    let value =(this.buyingToken.amount / this.investData.tokenRate);
    return value;
  }

  getDoller(){
    let currentVal = parseFloat(this.ethrate);
    let value = ((this.buyingToken.amount/ this.investData.tokenRate) * currentVal);
    return value;
  }

  calculateDollerFromETH(){
    // let currentVal = parseFloat(this.ethrate);
    // this.calculatedEth = (parseFloat(this.calculatedEth) * currentVal).toString()+" $";
    //
  }

  getTokenBalanceForInvest(crowdsaleAddress : any) :any{
    let postData = {
      crowdSaleAddress :crowdsaleAddress,
      userId : this.user._id,
    };
   
          const url = this.global_service.basePath + 'ETH/getTokenBalanceForInvest';
           this.global_service.PostRequest(url,postData).subscribe(response=>{
             let res = response[0].json.json();
            if(res.status==200){
                this.tokenBalance=res.data.tokenBalance;
            }else{
                 //
            }
          });
  }

  getTokenInfo(){
    // let postData = this.tokenAddress;
    let postData = {
      tokenId : this.tokenAddress,
      userId : this.user._id,
    };
          const url = this.global_service.basePath + 'ETH/getTokenInfoByTokenId';
           this.global_service.PostRequest(url,postData).subscribe(response=>{
            
             let res = response[0].json.json();
            if(res.status==200){
                this.investData=res.data;
                this.crowdSaleAddress=this.investData.crowdsaleAddress
                this.enddate=moment(res.data.endTime).format('LL');
                this.investData.endDate = this.enddate;
                this.getTokenBalanceForInvest(res.data.crowdsaleAddress);
            }else{
                 //
            }
          });

      }

  getBalance(){
       let postData ={
         userId : this.user._id,
         address:this.user.EthAddress
       };
        const url = this.global_service.basePath + 'ETH/getBalanceByAddress';
        this.global_service.PostRequest(url , postData).subscribe(response=>{
        if(response[0].json.status==200){
        this.ethBalance=response[0].json.json().data;
        this.ethBalance = this.ethBalance.toFixed(5);
        }else{
         this.ethBalance="NA";
        }
      })
  }

  // method for payment type
  handleChange(evt,type) {
      var target = evt.target;

      if(type==1)  {
        this.calculatedEth = this.getETHERUM();
         this.enablePaypal = false;
         // this.gotoEthPayment();
      }else if(type==2){

        this.calculatedEth = this.getDoller();
        if(this.calculatedEth > CONST.minDoller){
          // all thing calculated for doller by payment
          this.enablePaypal = true;
          this.gotoPaypalPayment();
        }else{
          this.global_service.showNotification('top','right','Buy token',4,'ti-cross');
        }

      }else{
        alert('3');
      }

    }



  gotoEthPayment(){    
   
       let postData ={
                      fromAddress:this.user.EthAddress,
                      toAddress:this.crowdSaleAddress,
                      userId : this.user._id,
                      //amount: (this.buyToken).toString(),
                      amount: (this.calculatedEth).toString(),
                      password : this.passwordDetails.password
        };
      
        const url = this.global_service.basePath + 'ETH/buyTokens';
        this.global_service.PostRequest(url , postData).subscribe(response=>{
              

            if(response[0].json.json().status==200)
              {
               this.getBalance();
               this.global_service.showNotification('top','right','You have bought '+this.buyingToken.amount+" tokens!.",2,'ti-cross');
                 this.buyingToken.amount = '';
              }
               else
              {
                this.buyingToken.amount = '';
               this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
              }
        })
  }

  investInToken(){

    // if(this.password){

      if(this.calculatedEth && this.buyingToken.amount){
        this.gotoEthPayment();
        this.deductAmount();
        // check payment type
        // if(this.enablePaypal){
        //   this.gotoPaypalPayment();
        // }
        // else{
        //   this.gotoEthPayment();
        // }
      }else{
        this.global_service.showNotification('top','right','Please buy token first!.',4,'ti-cross');
      }

      this.passwordDetails.password ='';
    // }
    // else{
    //   this.password ='';
    //   this.global_service.showNotification('top','right','Please enter your password.',4,'ti-cross');
    // }

  }

  loadExternalScript(scriptUrl: string) {
          return new Promise((resolve, reject) => {
            const scriptElement = document.createElement('script')
            scriptElement.src = scriptUrl
            scriptElement.onload = resolve
            document.body.appendChild(scriptElement)
      });
  }

   getEthereumFromUSD(){
           const url = this.global_service.basePath + 'api/getEthereumFromUSD';
           this.global_service.GetRequest(url).subscribe(response=>{
            if(response[0].status==200){
                this.ethrate=response[0].json.data.last;
            }else{
             this.ethrate= '';
            }
          })
    }

  gotoPaypalPayment(){
     let self = this;
        this.loadExternalScript(CONST.paypalButtonLoader).then(() => {
          paypal.Button.render({
            env: CONST.paypalEnv,
            client: {
              production: '',
              sandbox: CONST.paypalSandboxKey
            },
            commit: true,
            payment: function (data, actions) {
              return actions.payment.create({
                payment: {
                  transactions: [
                    {
                      amount: { total: '10', currency: 'USD' }
                    }
                  ]
                }
              })
            },
            onAuthorize: function(data, actions) {
              return actions.payment.execute().then(function(payment) {
               
                if(payment.state =='approved' && payment.payer.status=="VERIFIED"){

                    let amount = (10 * payment.transactions[0].amount.total);
                     let postData ={
                                    fromAddress:CONST.companyETHaddress,
                                    toAddress:self.user.EthAddress,
                                    userId : self.user._id,
                                    amount:amount,
                                    password : ''
                                   };
                      const url = self.global_service.basePath + 'ETH/withdrawEth';
                      self.global_service.PostRequest(url , postData).subscribe(response=>{
                            if(response[0].json.json().status==200)
                              {
                              
                               self.getBalance();
                               self.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
                              }
                               else
                              {
                               self.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
                              }
                      })
                   // let amount = (this.ethrate*payment.transactions[0].amount.total);
                   // this.giveETHtoUserByUSD(payment);
                }
                else{
                  self.global_service.showNotification('top','right','Payment Failed!.',4,'ti-cross');
                }

              })
            }
          }, '#paypal-button');
        });
  }

  investToToken(){
      let postData ={
         userId : this.user._id,
         fromAddress:this.user.EthAddress,
         amount : this.buyingToken.amount,
         toAddress : '',
         password : this.password
       };
        const url = this.global_service.basePath + 'ETH/buyTokens';
        this.global_service.PostRequest(url , postData).subscribe(response=>{
        if(response[0].json.status==200){

        // this.ethBalance=response[0].json.json().data;

        }else{

        }
      })
  }



  getHolderCount(){
    let data = {
      tokenAddress : this.tokenAddress
    }
     const url = this.global_service.basePath + 'api/getTokenInfo';
        this.global_service.PostRequest(url , data).subscribe(response=>{
        if(response[0].json.status==200){
          this.holderCount = response[0].json.json().holdersCount; 
        }else{

        }

  })
}
deductAmount(){    
   
    let investAmount = (this.calculatedEth)/100;
       let postData ={
                      fromAddress:this.user.EthAddress,
                      toAddress: ico.companyETHaddress,
                      userId : this.user._id,
                      amount: investAmount.toString(),
                      password : this.password
        };
        const url = this.global_service.basePath + 'ETH/WithdrawEth';
        this.global_service.PostRequest(url , postData).subscribe(response=>{
              

            if(response[0].json.json().status==200)
              {
               this.getBalance();
               this.buyingToken.amount = '';
               // this.global_service.showNotification('top','right','You have bought '+this.buyToken+" tokens!.",2,'ti-cross');
              }
               else
              {
               this.buyingToken.amount = '';
               this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
              }
        })
  }
}
