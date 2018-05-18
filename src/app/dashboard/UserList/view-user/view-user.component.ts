  import { Component, OnInit,NgModule,Injectable } from '@angular/core';
  import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
  import { Router, ActivatedRoute } from '@angular/router';
  import { Http, Headers, RequestOptions, Response  } from '@angular/http';
  import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
  import * as moment from 'moment';
  import { EqualValidator } from './../../../Directives/validation.directive';
  import { GlobalService } from './../../../GlobalService';
  import { TableData } from './../../../md/md-table/md-table.component';
  import { AlertService, AuthenticationService ,SetupService,UserService} from '../../../Services/index';
  declare const $: any;
  declare const paypal: any;
   import  * as ico   from'./../../../ico_constant';
import { Observable } from 'rxjs/Rx';
  declare interface DataTable {
   dataRows?: string[][];
  }



  @Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.css']
  })

  export class ViewUserComponent implements OnInit {
    public dataTable: DataTable;
    public dataTable2: DataTable;
    public tableData: TableData;
    public tableData2: TableData;

    transData: Transdata;
    updateDetails:TokenDetails;
    withdrawDetails: WithdrawDetail;
    withDrawForm: FormGroup;
    updateTokenForm: FormGroup;
    user: any;
    tokenList:any;
    tokenDetail:any;
    transactionData:any[]=[];
    tokenBalanceList:any[]=[];
    incompleteICO : any[]=[];
    ethBalance:any;
    submitted: boolean;
    accountType:boolean;
    currentToken:any[]=[];
    completedToken:any[]=[];
    currentDate:any;
    currentDate1:any;
    ethAddress:any;
    enddate:any;
    endTime:any;
    lastDate:any;
    time: any = "March 3, 2018";
 
    ethrate:any;
    editToken_Id:any;
    depositDialog: boolean = false;
    withdrawDialog: boolean = false;
    complete:boolean=false;
    teamInfo:any=false;
    inputDescr:boolean=false;
    inputLinkedName:boolean=false;
    save:boolean=false;
    remove:boolean=true;
    editTokenInfo:boolean=false;
    noImageForCompleteToken :boolean=false;
    noImageForcurrentToken:boolean=false;
    selectedTeamImage : any;
    tabeldata:boolean=true;
    tabeldata2:boolean=true;
    depositEth:any;
    mymodel:any;
    ongoing:boolean=true;
    banner:boolean=false;
    incomplete:boolean = false;
    paypalStatus:boolean=true;
    selectedWhitePaperImage:any;
    deleteTokenStatus:boolean=false;
    text:any = {
                Year: 'Year',
                Month: 'Month',
                Weeks: "Weeks",
                Days: "Days",
                Hours: "Hours",
                Minutes: "Minutes",
                Seconds: "Seconds",
                MilliSeconds: "MilliSeconds",
    };
    noToken:boolean=false;
    completeTokenStatus:boolean=false
    ongoingTokenStatus:boolean=false;
    incompleteTokenStatus:boolean=false;

    //private eventDate: Date = new Date(2018, 3, 3);

    private diff: number;
    private countDownResult: number;
    private days: number;
    private hours: number;
    private minutes: number;
    private seconds: number;

    // constructor start
    constructor(
                private http: Http,
                private route: ActivatedRoute,
                private router: Router,
                private fb: FormBuilder,
                private global_service:GlobalService,
                private activatedRoute: ActivatedRoute,
                private _setupService: SetupService,
                private ng4LoadingSpinnerService: Ng4LoadingSpinnerService
               )
               {

                var status = this.global_service.isLogedIn();
                if(status==false){
                 this.router.navigateByUrl('/login');
                }
                   this.user=JSON.parse(localStorage.getItem('currentUser'));
                   this.currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm");
                   this.currentDate1 = moment(new Date()).format('LL');
                   if(this.user!=null||this.user!=undefined)
                   {
                     if(this.user.accountType == "Investor")
                     {
                       this.accountType=false;
                     }else
                     {
                       this.accountType=true;
                        //this.getTokenByUserId();
                    }
                   this.ethAddress=this.user.EthAddress;
                   this.getEthereumFromUSD();
                   this.getBalance();
                   this.getTransactionsByAccount();
                   this.getTokenByUserId();
                   // this.getTokenBalanceByAddress();
                  }
                   this.tokenInfo();
                   this.withdrawDetail();
                   this.transDataDetail();
                   this.loadPaypalButton();
                   // for left side token balance
                  this.getTokenBalanceAndName();
                  this.tabelJquery();
                  // alert("this.eventDate.getTime() = = "+this.eventDate.getTime());
                  // alert("this.eventDate.getTime() = = "+new Date().getTime());
            // Observable.interval(1000).map((x) => {
            // this.diff = Math.floor((this.eventDate.getTime() - new Date().getTime()) / 1000);
            // }).subscribe((x) => {   
            // if(this.diff==0){
            //           this.days=1;
            // } else{
            //     this.days = this.getDays(this.diff);
            //     this.hours = this.getHours(this.diff);
            //     this.minutes = this.getMinutes(this.diff);
            //     this.seconds = this.getSeconds(this.diff);
            // }     
                

            //});
               }

                tabelJquery(){
                    $(document).ready( function () {
                      $('#table_id007').DataTable({
                         'pagingType': 'full_numbers',
                         'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
                         responsive: true,
                         language: {
                         search: '_INPUT_',
                         searchPlaceholder: 'Search records',
                        }
                      });
                     });

                     $(document).ready( function () {
                      $('#table_id7777').DataTable({
                         'pagingType': 'full_numbers',
                         'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
                         responsive: true,
                         language: {
                         search: '_INPUT_',
                         searchPlaceholder: 'Search records',
                        }
                      });
                     });
            }

            depositeETHModal(){
               this.mymodel="" ;
               this.depositEth="" ;
               $('#noticeModal').modal('show');
            }

            valuechange(value : any){
                 if(value && this.ethrate){
                 this.depositEth = (value / this.ethrate);
               }    else{
                 this.depositEth=0
               }
            }


             getEthereumFromUSD(){
                   const url = this.global_service.basePath + 'api/getEthereumFromUSD';
                   this.global_service.GetRequest(url).subscribe(response=>{
                    if(response[0].status==200){
                        this.ethrate=response[0].json.data.last;
                    }else{
                     this.ethrate="NA";
                    }
                  })
            }

            editTokenToGenerateIco(tokenid:any){ 
                localStorage.setItem('editToken', tokenid); 
                this.router.navigate(['/dashboard/generateIco']);
            }


      loadPaypalButton()  {
        let self = this;
        this.loadExternalScript("https://www.paypalobjects.com/api/checkout.js").then(() => {
          paypal.Button.render({
            env: 'sandbox',
            client: {
              production: '',
              sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R'
            },
            commit: true,
            payment: function (data, actions) {
              return actions.payment.create({
                payment: {
                  transactions: [
                    {
                      amount: { total: self.mymodel, currency: 'USD' }
                    }
                  ]
                }
              })
            },
             onAuthorize: function(data, actions) {
              return actions.payment.execute().then(function(payment) {
                
                if(payment.state =='approved' && payment.payer.status=="VERIFIED"){

                    // let amount = (10 * payment.transactions[0].amount.total);
                     let postData = {
                                      userId : self.user._id,
                                      toAddress: self.user.EthAddress,
                                      fromAddress: ico.companyETHaddress,
                                      amount: self.depositEth.toString(),
                                      password:ico.companyPassword
                                    };
                                
                      const url = self.global_service.basePath + 'ETH/sendEthToUser';
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

      loadExternalScript(scriptUrl: string) {
          return new Promise((resolve, reject) => {
            const scriptElement = document.createElement('script')
            scriptElement.src = scriptUrl
            scriptElement.onload = resolve
            document.body.appendChild(scriptElement)
        });
      }

      withdrawDetail() {
          this.withdrawDetails = {
            fromAddress: "",
            amount: "",
            toAddress: "",
            userId: "",
            password:''
        }
      }

      transDataDetail(){
         this.transData ={
              sn:"",
              hash:"",
              value:""
         }
       }

      Ongoing(){
      this.currentToken =[];
         this.ongoing = true;
         this.complete = false;
         this.incomplete = false;
         this.ongoingTokenStatus=false;
         this.getTokenByUserId();
      }

      Completed(){
        this.completedToken =[];
        this.ongoing = false;
        this.complete=true;
        this.incomplete = false;
        this.completeTokenStatus=false;
        this.getTokenByUserId();

     }

     InCompleted(){
       this.incompleteICO=[]
       this.ongoing = false;
       this.complete = false;
       this.incomplete = true;
       this.completeTokenStatus=false;
       this.ongoingTokenStatus=false;
       this.incompleteTokenStatus=false;
    
       this.getIncompleteICO();
     }



    // get token by user id

    getTokenByUserId(){
      this.completedToken =[];
      this.currentToken =[];
      let postData ={
          userId : this.user._id,
      };

    const url = this.global_service.basePath + 'ETH/getTokenByUserId';
    this.global_service.PostRequest(url , postData).subscribe(response=>{
    $('#loader1').hide();
    $('#loader2').hide();
   debugger
    if(response[0].json.status == 200)
      {
        if(response[0].json.json().data.length!=0)
          {

            for(var data of response[0].json.json().data)
            {
             this.enddate=moment(data.endTime).format('LL');
             this.lastDate=moment(data.endTime).format("YYYY-MM-DD HH:mm");
             data.endTime = this.enddate;
            //   Observable.interval(1000).map((x) => {
            //     this.diff = Math.floor((this.eventDate.getTime() - new Date().getTime()) / 1000);
            // }).subscribe((x) => {           
            //     this.days = this.getDays(this.diff);
            //     this.hours = this.getHours(this.diff);
            //     this.minutes = this.getMinutes(this.diff);
            //     this.seconds = this.getSeconds(this.diff);
            // });
             if(this.lastDate<this.currentDate)
             {

                this.noImageForcurrentToken=false;                
                this.completedToken.push(data);

             }
             else
             {
               this.currentToken.push(data);

             }
             if(data.tokenImage==null||data.tokenImage==undefined||data.tokenImage==""){
                data.tokenImage="assets/img/No-preview.png";
              }
              else{
                data.tokenImage=data.tokenImage;
              }
            }         
            if (this.completedToken.length)
              {
              this.completeTokenStatus=false;

              }else{
               this.completeTokenStatus=true;
              }

             if (this.currentToken.length)
              {
               this.ongoingTokenStatus=false;

             }else{
               this.ongoingTokenStatus=true;
             }

          }
        else
        {
          this.completeTokenStatus=true;
          this.ongoingTokenStatus=true;
         
        }
      }
      else
      {
            alert("No Data found");
      }
    })
    }

        // get completeICO

    getIncompleteICO(){
      let postData={
         userId:this.user._id
      }
      this.incompleteICO=[]
      const url = this.global_service.basePath + 'api/inCompleteICO';
      this.global_service.PostRequest(url,postData).subscribe(response=>{
         $('#loader3').hide();       
          debugger
            if(response[0].json.status==200)
              {
                 
                 if(response[0].json.json().data.length!=0)
                {
                
                    for(var data of response[0].json.json().data)
                      {
                         if(!data.crowdsale.image.length){
                           data.crowdsale.image="assets/img/No-preview.png";
                         }
                         this.incompleteICO=response[0].json.json().data;
                         console.log("this.incompleteICO = = "+JSON.stringify(this.incompleteICO[2]));
                     }
                }
                  else
                  {
                    this.incompleteTokenStatus=true;

                  }
             }
               else
              {
               this.global_service.showNotification('top','right',response[0].json.message,4,'ti-cross');
              }
            })
    }
   //    getDays(t){
   //      var days;
   //      days = Math.floor(t / 86400);

   //      return days;
    
   // }
   //   getHours(t){
   //      var days, hours;
   //      days = Math.floor(t / 86400);
   //      t -= days * 86400;
   //      hours = Math.floor(t / 3600) % 24;

   //      return hours;
   //  }

   //  getMinutes(t){
   //      var days, hours, minutes;
   //      days = Math.floor(t / 86400);
   //      t -= days * 86400;
   //      hours = Math.floor(t / 3600) % 24;
   //      t -= hours * 3600;
   //      minutes = Math.floor(t / 60) % 60;

   //      return minutes;
   //  }

   //  getSeconds(t){
   //      var days, hours, minutes, seconds;
   //      days = Math.floor(t / 86400);
   //      t -= days * 86400;
   //      hours = Math.floor(t / 3600) % 24;
   //      t -= hours * 3600;
   //      minutes = Math.floor(t / 60) % 60;
   //      t -= minutes * 60;
   //      seconds = t % 60;

   //      return seconds;
   //  }


    // get token name and token balance by KUNVAR SUINGH
getTokenBalanceAndName(){
     let postData ={
                    Address:this.user.EthAddress,
                    userId:this.user._id
                   };
      const url = this.global_service.basePath + 'ETH/getAllsendTokens';
      this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].json.status==200)
              {
               this.tokenBalanceList = [];
               var result=response[0].json.json().data.tokens;

               if(result){
                 if(result.length!=0){
                     this.tabeldata2=false;
                     for(var i=0;i<result.length;i++){
                        let objData ={
                            sn :'',
                            tokenAddress:'',
                            tokenName:'',
                            result:''
                        };
                        var j = i+1;

                        objData.sn =j.toString();
                        objData.tokenAddress=(result[i].tokenInfo.tokenAddress);
                        objData.tokenName=(result[i].tokenInfo.name);
                        objData.result=(result[i].balance/(Math.pow(10,result[i].tokenInfo.decimals))).toString();
                        this.tokenBalanceList.push(objData);
                     }
                       $(document).ready( function () {
                        $('#tabledata_id').DataTable({
                           'pagingType': 'full_numbers',
                           'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
                           responsive: true,
                           language: {
                           search: '_INPUT_',
                           searchPlaceholder: 'Search records',
                          }
                        });
                     });
                   }
              }else{
                 this.tabeldata2=true;

              }

               }
               else
              {
                 console.log(response);
              }
            })
    }

    // get token balance by address

    getTokenBalanceByAddress(){
     let postData ={
                    ETHaddress:this.user.EthAddress,
                    userId:this.user._id
                   };
      const url = this.global_service.basePath + 'ETH/getTokenBalanceByAddress';
      this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].json.status==200)
              {
               this.tokenBalanceList = [];
               var result=response[0].json.json().data;
               if(result.length!=0){
                 this.tabeldata2=false;
                 for(var i=0;i<result.length;i++){
                  let objData ={
                      sn :'',
                      tokenAddress:'',
                      result:''
                  };
                  var j = i+1;
                  objData.sn =j.toString();
                  objData.tokenAddress=(result[i].tokenAddress);
                  objData.result=result[i].result;

                 this.tokenBalanceList.push(objData);
                 }
                   $(document).ready( function () {
                    $('#tabledata_id').DataTable({
                       'pagingType': 'full_numbers',
                       'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
                       responsive: true,
                       language: {
                       search: '_INPUT_',
                       searchPlaceholder: 'Search records',
                      }
                    });
                 });
              }else{
                 this.tabeldata2=true;

              }

               }
               else
              {
                 console.log(response);
              }
            })
    }

    // Get Transaction By account 2nd tabel
    getTransactionsByAccount(){
      this.tabeldata=true;
      let postData ={
                 address:this.user.EthAddress,
                 userId:this.user._id,
                 startBlock:'',
                 endBlock: ''
                 };

          const url = this.global_service.basePath + 'ETH/getTransactionFromRopston';                   //getTransactionsByAccount';
          this.global_service.PostRequest(url , postData).subscribe(response=>{
               if(response[0].json.status==200){
               this.transactionData = [];
               var result=response[0].json.json().data;
               if(result.length!=0){
                 this.tabeldata=false;
                  for(var i=0;i<result.length;i++){
                  let objData ={
                     sn :'',
                     hash:'',
                     value:''
                  };

                  var j = i+1;
                  objData.sn =j.toString();
                  objData.hash=(result[i].hash);
                  objData.value=result[i].value;
                  this.transactionData.push(objData);
              }
              $(document).ready( function () {
              $('#table_id').DataTable({
                 'pagingType': 'full_numbers',
                 'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
                 responsive: true,
                 language: {
                 search: '_INPUT_',
                 searchPlaceholder: 'Search records',
                }
              });
             });
               }else{
                 this.tabeldata=true;
               }
             }
             else{
               console.log(response);
            }
         })
        }



    ngOnInit() {
         this.withdrawFormInit();
         this.tokenFormInit();
    }

    tokenInfo(){
      this.updateDetails = {
              tokenName: '',
              companyName: '',
              description:'',
              videoLink:'',
              twitterLink:'',
              facebookLink: '',
              websiteLink: '',
              editTokenImage:'',
              linkedinLink:'',
              team:[],
              linkedinname:'',
              designation:'',
              image:'',
              teamid:'',
              whitePaper:''
           }
       }


     tokenFormInit(){
      this.updateTokenForm = this.fb.group({
           'companyName': new FormControl(''),
           'description': new FormControl(''),
           'twitterLink': new FormControl(''),
           'videoLink': new FormControl(''),
           'facebookLink': new FormControl(''),
           'websiteLink': new FormControl(''),
           'editTokenImage': new FormControl(''),
           'linkedinLink': new FormControl(''),
           'linkedinname': new FormControl('') ,
           'designation': new FormControl('') ,
           'image': new FormControl('') ,
           'whitePaper': new FormControl('')
        });
    }

    getTokenInfoByTokenId(value:any){
      this.ng4LoadingSpinnerService.show();
      this.updateTokenForm.reset();
      this.editToken_Id=value;
      this.teamInfo=false;
      this.editTokenInfo=true;
      let postData ={
                  userId: this.user._id,
                  tokenId:value
               };
           const url = this.global_service.basePath + 'Eth/getTokenInfoByTokenId';
           this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].status==200){
               this.ng4LoadingSpinnerService.hide();
                var data = response[0].json.json().data;
                  if(data.tokenImage==null||data.tokenImage==undefined||data.tokenImage==""){
                     this.updateDetails.editTokenImage="assets/img/No-preview.png";
                   }
                   else{
                     this.updateDetails.editTokenImage=data.tokenImage;
                    }
                this.updateDetails.companyName=data.generalInfo.companyName;
                this.updateDetails.description=data.generalInfo.description;
                this.updateDetails.videoLink=data.generalInfo.vedio;
                this.updateDetails.websiteLink =data.generalInfo.website;
                this.updateDetails.facebookLink=data.generalInfo.facebook;
                this.updateDetails.twitterLink=data.generalInfo.twitter;
                this.updateDetails.linkedinLink=data.generalInfo.linkedin;
                this.updateDetails.team =data.generalInfo.team;
                this.updateDetails.whitePaper=data.generalInfo.whitePaper
            }else{
             this.global_service.showNotification('top','right','server error',4,'ti-cross');
            }
          })
    }



    updateTokenInfoByTokenId(){
              let postData ={
                   userId:  this.user._id,
                   tokenId: this.editToken_Id ,
                   companyName:this.updateDetails.companyName,
                   description:this.updateDetails.description,
                   vedio:this.updateDetails.videoLink,
                   website:this.updateDetails.websiteLink ,
                   facebook:this.updateDetails.facebookLink,
                   twitter:this.updateDetails.twitterLink,
                   linkedin:this.updateDetails.linkedinLink,
                   tokenImage:this.updateDetails.editTokenImage,
                   whitePaper:this.updateDetails.whitePaper
               };

           const url = this.global_service.basePath + 'ETH/updateTokenInformationByTokenId';
           this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].status==200){
              this.getTokenByUserId();
              this.updateTokenForm.reset();
              this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
             }else{
              this.updateTokenForm.reset();
               this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
            }
          })
    }

    _handleTokenImageChange(event){
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = (e:any) => {
          this.selectedTeamImage = e.target.result;
          this.updateDetails.editTokenImage = this.selectedTeamImage;
        }
         reader.readAsDataURL(file)
   }

   whitePaper(event){

    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = (e:any) => {
      this.selectedWhitePaperImage = e.target.result;
      this.updateDetails.whitePaper = this.selectedWhitePaperImage;
      //this.tokImage=true;
    }
     reader.readAsDataURL(file)
   }


delete_token(value:any){

  $('#noticeModalinvest_delete').modal('show');
}
    deleteToken(value:any){
       let postData ={
                 userId : this.user._id,
                 tokenId: value
               };

            const url = this.global_service.basePath + 'Eth/tokenDeletedByTokenId';
            this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].json.status==200){
               this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
               this.getTokenByUserId();
            }else{
              this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
            }
          })
    }

    deleteIncompleteToken(value:any){
      let postData ={
                 userId : this.user._id,
                 icoId: value
               };

            const url = this.global_service.basePath + 'api/deletedCompleteICO';
            this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].json.status==200){
               this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
               this.getIncompleteICO();
            }else{
              this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
            }
          })
    }

    sendTransaction() {
        let postData = {
            userId : this.user._id,
            fromAddress: this.user.EthAddress,
            toAddress:this.withdrawDetails.toAddress,
            amount: this.withdrawDetails.amount.toString(),
            password:this.withdrawDetails.password
        };
        const url = this.global_service.basePath + 'ETH/withdrawEth';
        this.global_service.PostRequest(url, postData).subscribe(response => {

            if (response[0].json.json().status == 200) {
              this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
              this.withDrawForm.reset();
              this.getBalance();
              this.getTokenBalanceByAddress();
              this.getTransactionsByAccount();
             } else
              {
                this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
                this.withDrawForm.reset();
                this.withdrawDialog = false;
              }
        })
    }

   showTeamDesc(teamId:any){
        this.teamInfo=true;
        var index = this.updateDetails.team.findIndex(function(o){
        return o._id === teamId;
    })
      ;
    if (index !== -1){
      var team = this.updateDetails.team[index];
      this.updateDetails.linkedinname = team.linkedinname;
      this.updateDetails.designation = team.designation;
      this.updateDetails.image = team.image;
      this.updateDetails.teamid=team._id
    }
   }

  saveTeamMembers(teamId:any){
       let postData ={
                 userId:  this.user._id,
                 tokenId: this.editToken_Id ,
                 teamId: teamId,
                 linkedinname:this.updateDetails.linkedinname,
                 designation:this.updateDetails.designation,
                 image:this.selectedTeamImage,
               };


           const url = this.global_service.basePath + 'Eth/updateTokenInformationByTokenId';
           this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].status==200){
              this.teamInfo=false;
              this.save=false;
              this.remove=true;
              this.inputDescr=false;
              this.inputLinkedName=false;
              this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
             }else{
              this.save=false;
              this.remove=true;
              this.inputDescr=false;
              this.inputLinkedName=false;
              this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
            }
          })

      }

  removeTeamMembers(teamId:any){
       let postData ={
                 userId : this.user._id,
                 teamId: teamId,
                 tokenId: this.editToken_Id
               };

           const url = this.global_service.basePath + 'Eth/deleteTeamInfoByTeamId';
            this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].json.status==200){
             this.teamInfo=false;
              var index = this.updateDetails.team.findIndex(function(o){
                    return o._id === teamId;
             });
              if (index !== -1){
                    this.updateDetails.team.splice(index, 1);
              }
            }else{
              console.log(response);
            }
          })
    }

   _handleWhitePaperChange(event){
     this.save=true;
         this.remove=false;
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = (e:any) => {
      this.selectedTeamImage = e.target.result;
      this.updateDetails.image = this.selectedTeamImage;
    }
     reader.readAsDataURL(file)
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

   getUserEthByUSD(amount:any){  
   
                    let postData = {
                    userId : this.user._id,
                    toAddress: this.user.EthAddress,
                    fromAddress: ico.companyETHaddress,
                    amount: amount.toString(),
                    password:ico.companyPassword
        };
                    
                  
      const url = this.global_service.basePath + 'ETH/withdrawEth';
      this.global_service.PostRequest(url , postData).subscribe(response=>{
            if(response[0].json.status==200)
              {
                this.getBalance();
               this.global_service.showNotification('top','right','You have recived '+amount,2,'ti-cross');
              }
               else
              {
               this.global_service.showNotification('top','right',response[0].json.message,4,'ti-cross');
              }
            })
    }



    withdrawFormInit() {
        this.withDrawForm = this.fb.group({
          'amount': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^.?(0|[0-9]\d*)(\.\d+)?$/)])),
            'toAddress': new FormControl('', Validators.required),
            'password':  new FormControl('', Validators.required)
        });
    }



      deposite() {
         this.depositDialog = true;
      }

      withdraw() {
         this.withdrawDialog = true;
      }




      onCancel() {
        this.withdrawDialog = false;
        this.withdrawFormInit();
      }

      cancelDeposite(){
       this.depositDialog=false;
      }
      teamdescr(){
         this.save=true;
         this.remove=false;
         this.inputDescr=true;

      }

      teamlinkdinName(){
        this.save=true;
        this.remove=false;
        this.inputLinkedName=true;
      }

      viewIco(value :any){
        window.open(this.global_service.basePathforReact+"invest?addr="+value);
      }

      ngAfterViewInit() {

        $('#datatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
            responsive: true,
            language: {
            search: '_INPUT_',
            searchPlaceholder: 'Search records',
            }

        });



         $('#datatables2').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [[5, 10, 15, -1], [5, 10, 15, 'All']],
            responsive: true,
            language: {
              search: '_INPUT_',
              searchPlaceholder: 'Search records',
            }
        });


    }
    eventHandler(e) {
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 45 && e.keyCode < 58)
      || e.keyCode == 8)) {
        return false;
      }
    }
      eventHandler1(e) {
      if(!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 45 && e.keyCode < 58)
        || e.keyCode == 8)) {
          return false;
      }
    }
}
