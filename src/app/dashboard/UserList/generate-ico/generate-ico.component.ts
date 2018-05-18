 import { Component, OnInit,NgModule,Injectable,OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
 import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
 import { Router, ActivatedRoute } from '@angular/router';
 import { Http, Headers, RequestOptions, Response  } from '@angular/http';
 import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
 import { GlobalService } from './../../../GlobalService';
 import  * as ico   from'./../../../ico_constant';
 import  * as moment from 'moment';
 import { DomSanitizer } from '@angular/platform-browser';

 declare const $: any;


interface FileReaderEventTarget extends EventTarget {
    result: string;
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}

@Component({
  selector: 'app-generate-ico',
  templateUrl: './generate-ico.component.html',
  styleUrls: ['./generate-ico.component.scss']
})

export class GenerateIcoComponent implements OnInit, OnChanges, AfterViewInit {
 icowizards:Icowizards;
 selectedTeamImage : any;
 selectedTokenImage:any;
 ethBalance:any;
 teamCard:boolean=false;
 teamList:boolean=true;
 roadmapCard:boolean=false;
 roadmapList:boolean=true;
 reservedToken:boolean=false;
 reservedTokenList:boolean=true;
 name:any;
 whitepaper : 'whitepaper';
 designation:any;
 linkedinname:any;
 teamImages:any;
 promoCode:any;
 length:any;
 tierBoolean:boolean=false;
 promo:boolean=false;
 hidebutton1:boolean=true;
 hidebutton2:boolean=false;
 generalInfoForm: FormGroup;
 purchaseItems : any[];
 totalValue : number = 5000;
 transtFees:any;
 user: any;
 counter:number = 0;
 withdrawDialog: boolean = false;
 withDrawForm: FormGroup;
 withdrawDetails: WithdrawDetail;
 ethrate:any;
 password : any;
 reseradd:boolean=false;
 startDateValid:boolean=false;
 currentDate:any;
 currentDate2:any;
 space:boolean=false;
 tiker:boolean=false;
 mincap:boolean=false;
 tokImage:boolean=false;
 noteam:boolean=false;
 resToken:boolean=false
 noBussiness:boolean=false;
 teamselect:boolean=false;
 milesto:boolean=false;
 decimalValid:boolean=false;
 tierCard:boolean=true;
 addBoolean:boolean=false;
 userToken:any;
 coupenbalance:any;
 dollerBalance:any
 checkSavetier:boolean=false;
 startTimeStatus:boolean=false;
 endTimeStatus:boolean=false;
 addStatus:boolean=false;
 selectedWhitePaperImage:any;
 generalInfo:any={
                  company : "",
                  description : "",
                  vedio       : "",
                  website     : "",
                  facebook    : "",
                  twitter     : "",
                  linkedin    : "",
                  companyName : "",
                  address     : "",
                  address2    : "",
                  country     : "",
                  zipcode     : "",
                 };

   team : any={
                image         : "",
                teamname      : "",
                linkedinname  : "",
                designation   : ""
              }


   token: any={
                name               :  "",
                ticker                  :  "",
                supply                  :  0,
                decimals                :  "",
                reservedTokens          :  [],
                reservedTokensElements  :  [],
                reservedTokensInput     :  "",
              }


   reservedTokensInput : any={
                              val : "",
                              addr : "",
                              dim : ""
                             }

   reservedElements: any={
                          _owner : null,
                          props : {
                              val : "",
                              dim : "",
                              addr : "",
                              num : 0
                          },
                          ref : null,
                          key : "0"
                         }

    crowdsale : any={
                      walletAddress:"",
                      whitelistdisabled : "yes",
                      updatable: "off",
                      whiteListElements :[],
                      whitelist:  [],
                      whiteListInput: {
                          addr      : '',
                          min       : 0,
                          mx        : 0
                      },
                      tier: "tier1",
                      supply: "",
                      endTime : "",
                      startTime : ""
                    };


    milestone : any={
                      milestone1 : "",
                      milestonedate : ""

                    };

    pricingStrategy:any={
                         rate: '',
                        }

    whitelist: any={
                    address:"",
                    min: "",
                    max:""
                    }

    allowingModifyng:any={
                           allow:true,
                         }

    inversterMinCap:any={
                          mincap:""
                        }

    promoCoupen:any={
                      coupon :""
                    }
    public min = new Date();
    public min1 = new Date();
    editTokenId:any;
    whitepaperStatus:boolean=false;
// constructor start
  constructor(
                  private http: Http,
                  private route: ActivatedRoute,
                  private router: Router,
                  private fb: FormBuilder,
                  private global_service:GlobalService,
                  private ng4LoadingSpinnerService: Ng4LoadingSpinnerService,
                  private domSanitizer :DomSanitizer
  	) {

       this.userToken=localStorage.getItem('token');
       var status = this.global_service.isLogedIn();
       if(status==false){
         this.router.navigateByUrl('/login');
       }

         this.currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm ");
         this.currentDate2= moment(new Date()).format("YYYY-MM-DD");
         this.crowdsale.startTime= this.currentDate;
         this.purchaseItems = ico.defaultState.purchaseItems;
         this.transtFees=ico.ETHmargin;
    	   this.user=JSON.parse(localStorage.getItem('currentUser'));
         if(this.user!=null ||this.user!=undefined)	{
             this.crowdsale.walletAddress=this.user.EthAddress;
             this.getBalance();
          }
      	  this.icowizardsDetails();
          this.withdrawDetail();
          this.getEthereumFromUSD();

          $(function(){
            $('#txt_box').keyup(function()
         {
          var yourInput = $(this).val();
            var re = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
            var isSplChar = re.test(yourInput);
            if(isSplChar)
            {
              var no_spl_char = yourInput.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
              $(this).val(no_spl_char);
            }
          });
         });
                  this.editTokenId=localStorage.getItem('editToken');                
                  if(this.editTokenId){
                    
                    this.getEditTokenInfo(this.editTokenId);
                  }
      } 
     
      getEditTokenInfo(tokenId:any){
      let postData = {
         icoId : tokenId,
         userId:this.user._id      
      };
          const url = this.global_service.basePath + 'api/getCrowdsale';
           this.global_service.PostRequest(url,postData).subscribe(response=>{
            if(response[0].json.json().statusCode==200){
              debugger
              this.tierCard=false;
              this.addBoolean=true;
              let generalInfo=response[0].json.json().result;        
            if(generalInfo.crowdsale.generalInfo.length){
                 this.generalInfo.company=generalInfo.crowdsale.generalInfo[0].company;
                 this.generalInfo.description=generalInfo.crowdsale.generalInfo[0].description;
                 this.generalInfo.vedio=generalInfo.crowdsale.generalInfo[0].vedio;
                 this.generalInfo.website=generalInfo.crowdsale.generalInfo[0].website;
                 this.generalInfo.facebook=generalInfo.crowdsale.generalInfo[0].facebook;
                 this.generalInfo.twitter=generalInfo.crowdsale.generalInfo[0].twitter;
                 this.generalInfo.linkedin=generalInfo.crowdsale.generalInfo[0].linkedin;
           }
                 if(generalInfo.crowdsale.image){
                   this.icowizards.crowdsale.image=generalInfo.crowdsale.image;
                   this.tokImage=true;
                 }
                 
                 this.icowizards.crowdsale.team=generalInfo.crowdsale.team;
                 this.icowizards.crowdsale.milestone=generalInfo.crowdsale.milestone;
                 this.icowizards.crowdsale.pricingStrategy=generalInfo.crowdsale.pricingStrategy;
                 this.icowizards.crowdsale.crowdsale=generalInfo.crowdsale.crowdsale;
                 this.token.name = generalInfo.crowdsale.token.name;
                 this.token.ticker = generalInfo.crowdsale.token.ticker;
                 this.token.decimals = generalInfo.crowdsale.token.decimals;
                 this.token.reservedTokens=generalInfo.crowdsale.token.reservedTokens;
                 if(generalInfo.crowdsale.whitePaper){       
                     this.icowizards.crowdsale.whitePaper=generalInfo.crowdsale.whitePaper;
                 }
            
            }
          });
    }



      // End Constructor

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

    saveDraft(){
                if(this.icowizards.crowdsale.crowdsale.length==0){
                   this.global_service.showNotification('top','right','please fill at last one tier and save',3,'ti-cross');
                }else{
                     this.ng4LoadingSpinnerService.show();
                     this.icowizards.crowdsale.generalInfo.push(this.generalInfo);
                     this.token.reservedTokensInput=this.reservedTokensInput;
                     this.icowizards.crowdsale.token=this.token;
                     this.icowizards.crowdsale.contracts = ico.FILE_CONTENTS.files.contracts;
                     let data={
                         state  :this.icowizards.crowdsale,
                         userId : this.user._id,
                         token : this.userToken,
                         icoId :this.editTokenId
           }
   const url = this.global_service.basePath + 'api/updateSaveDraftByUserId';
   this.global_service.PostRequest(url,data).subscribe(response=>{
    if(response[0].json.json().status==200){
      this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');
       this.ng4LoadingSpinnerService.hide();
       // let ID = response[0].json.json().result._id;
       this.router.navigateByUrl('/dashboard/view-user');

    }else{
      this.ng4LoadingSpinnerService.hide();
       this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
    }
   });
  }
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

      withdraw() {
         this.withdrawDialog = true;
      }


      pushtier(){

                   this.crowdsale.startTime= moment(this.crowdsale.startTime).format('YYYY-MM-DD HH:mm:s ');
                   this.crowdsale.endTime= moment(this.crowdsale.endTime).format('YYYY-MM-DD HH:mm:s');

                    if(!this.crowdsale.tier){
                      this.global_service.showNotification('top','right','tier should be requiered',4,'ti-cross');
                    }
                    else if(!this.crowdsale.startTime)
                    {
                      this.global_service.showNotification('top','right','startTime should be requiered',4,'ti-cross');
                    }
                     else if(!this.crowdsale.endTime)
                    {
                      this.global_service.showNotification('top','right','endTime should be requiered',4,'ti-cross');
                    }
                     else if(!this.pricingStrategy.rate)
                    {
                      this.global_service.showNotification('top','right','rate should be requiered',4,'ti-cross');
                    }
                    else if(!this.crowdsale.supply)
                    {
                      this.global_service.showNotification('top','right','supply should be requiered',4,'ti-cross');
                    }
                    else if(this.crowdsale.startTime<this.currentDate){
                      this.global_service.showNotification('top','right','Start date should be greater than current date',4,'ti-cross');
                    }
                    else if(this.crowdsale.endTime<this.crowdsale.startTime){
                      this.global_service.showNotification('top','right','End date should be greater than start date',4,'ti-cross');
                    }

                    else{
                          this.tierCard=false;
                          this.tierBoolean=true;
                          this.startDateValid=false;
                          this.addBoolean=true;
                          this.checkSavetier=false;
                          this.startTimeStatus=false;
                          let data={
                                     tier : this.crowdsale.tier,
                                     supply : this.crowdsale.supply,
                                     walletAddress : this.crowdsale.walletAddress,
                                     startTime : this.crowdsale.startTime,
                                     endTime : this.crowdsale.endTime,
                                     whitelistdisabled : "yes",
                                     updatable: "off",
                                     whiteListElements :[],
                                     whitelist:  [],
                                     whiteListInput: {
                                                       addr      : '',
                                                       min       : 0,
                                                       mx        : 0
                                                     },
                                  }

                          let data1={
                                     rate : this.pricingStrategy.rate.toString()
                                    }

                          this.icowizards.crowdsale.pricingStrategy.push(data1);
                          this.counter++;
                          if(this.counter>1){
                               delete data.walletAddress;
                               delete data.whitelistdisabled;
                             }

                          if(this.icowizards.crowdsale.crowdsale.length)
                          {
                            if(this.icowizards.crowdsale.crowdsale[this.icowizards.crowdsale.crowdsale.length-1].endTime>data.startTime)
                            {

                             this.global_service.showNotification('top','right','Next tier start date should be greater than previous token End Date',4,'ti-cross');
                            }
                            else
                            {
                              this.tierCard=false;
                             this.icowizards.crowdsale.crowdsale.push(data);
                             //console.log("this.icowizards.crowdsale.crowdsale    "+JSON.stringfy(this.icowizards.crowdsale.crowdsale));
                            }
                          }
                          else
                          {
                           this.icowizards.crowdsale.crowdsale.push(data);
                           this.global_service.showNotification('top','right','Tier add successfully',2,'ti-cross');
                          }
                    }
       }



       addTier(){
          this.crowdsale={
                           tier : "",
                           supply : "",
                           walletAddress : this.crowdsale.walletAddress,
                           startTime : "",
                           endTime : "",
                           whitelistdisabled : "yes",
                           updatable: "off",
                           whiteListElements :[],
                           whitelist:  [],
                           whiteListInput: {
                                             addr      : '',
                                             min       : 0,
                                             mx        : 0
                                           },
                        }
                        this.pricingStrategy={
                                                 rate:""
                                             }

          this.tierCard=true;
       }
        

        closetierbox(){
          this.tierCard=false;
          this.addBoolean=true;
       }

      poptier(itemNo1){
          var index = this.icowizards.crowdsale.crowdsale.findIndex(function(o,index){
            return index === itemNo1;
          })
          if (index != this.icowizards.crowdsale.crowdsale.length) {
            this.icowizards.crowdsale.crowdsale.splice(index, 1);
          }else{
            this.global_service.showNotification('top','right','You can not removed tiers',4,'ti-cross');
          }
     }



     updatetier(item:any){
      var index = this.icowizards.crowdsale.crowdsale.findIndex(function(o,index){
          return index === item;
        })
        if (index !== -1) {
           this.tierCard=true;
          this.icowizards.crowdsale.crowdsale[index];
        }
     }

     promoclick(){
       this.promo=!this.promo;
    }

    selectItems(e,item) {
     if(e.target.checked){
       e = JSON.stringify(e)
      this.totalValue = this.totalValue + item.price;
     }
     else{
      this.totalValue = this.totalValue - item.price;
     }
    }

      addteam(){
       this.team={};
       this.teamCard=true;
     }

     closeTeamCard(){
           this.teamCard=false;
        }

    pushteam(){
               if(this.team.teamname){
                                  this.teamCard=false;
                                  this.teamList=false;
                                  this.noteam=true;
                                  this.teamselect=false;
                                  let data={
                                             name  :this.team.teamname,
                                             designation : this.team.designation,
                                             linkedinname  :this.team.linkedinname,
                                             teamImages : this.team.image
                                           }
                                 this.icowizards.crowdsale.team.push(data);
                                 
                                }else{
                                      this.teamselect=true;
                                 }
             }

    popteam(itemNo1){
        var index = this.icowizards.crowdsale.team.findIndex(function(o,index){
          return index === itemNo1;
       })
       if (index !== -1) this.icowizards.crowdsale.team.splice(index, 1);
    }

    addroadmap(){
         this.milestone={
           dim : "tokens"
         };
         this.roadmapCard=true;
    }

    closeRoadMapCard(){
       this.roadmapCard=false;
    }

    pushroadmap(){
       this.milestone.milestonedate= moment(this.milestone.milestonedate).format('YYYY-MM-DD');
        if(this.milestone.milestone1){
           this.roadmapCard=false;
           this.roadmapList=false;
           this.noBussiness=true;
           this.milesto=false;
          let data={
             milestone1  :this.milestone.milestone1,
             milestonedate : this.milestone.milestonedate
       }
       this.icowizards.crowdsale.milestone.push(data);
        }else{
         this.milesto=true;
        }
    }

   poproadmap(itemNo){
         var index = this.icowizards.crowdsale.milestone.findIndex(function(o,index){
         return index === itemNo;
      })
      if (index !== -1) this.icowizards.crowdsale.milestone.splice(index, 1);
  }

  addreservedToken(){
       this.reservedTokensInput={
         dim : "tokens"
       };
       this.reservedToken=true;
  }

   pushreservedToken(){                     
                  if(this.reservedTokensInput.addr[0]!=='0'||this.reservedTokensInput.addr[1]!=='x'){
                    this.global_service.showNotification('top','right','address should start from 0x',4,'ti-cross');
                  }else if(this.reservedTokensInput.addr.length<42){
                     this.global_service.showNotification('top','right','address length should be 42',4,'ti-cross');
                  }
     else if(this.reservedTokensInput.addr && this.reservedTokensInput.val){
     this.reservedToken=false;
     this.reservedTokenList=true;
     this.resToken=true;
     let data={
        val  :this.reservedTokensInput.val,
        addr : this.reservedTokensInput.addr,
        dim : this.reservedTokensInput.dim
    }
    this.reservedElements.props.addr = data.addr;
    this.reservedElements.props.dim = data.dim;
    this.reservedElements.props.val = data.val;
    this.reservedElements.props.num = 0;
    this.token.reservedTokensElements.push(this.reservedElements);
    this.token.reservedTokens.push(this.reservedTokensInput);
     }else{
       this.global_service.showNotification('top','right','please enter required fields',4,'ti-cross');
     }


   }

   popreservedToken(itemNo){
       var index = this.token.reservedTokens.findIndex(function(o,index){
         return index === itemNo;
      })
       ;
      if (index !== -1) this.token.reservedTokens.splice(index, 1);
   }

  applyPromo(){
    if(this.icowizards.crowdsale.crowdsale.length==0){
       this.global_service.showNotification('top','right','please fill at last one tier and save',3,'ti-cross');
    }else{
   this.ng4LoadingSpinnerService.show();
            let postData = {
            user_id : this.user._id,
            refferalCode  : this.promoCoupen.coupon,

        };
        const url = this.global_service.basePath + 'users/Addcoupon';
        this.global_service.PostRequest(url, postData).subscribe(response => {
            if (response[0].json.status == 200) {
              this.ng4LoadingSpinnerService.hide();
              this.promo=false;
              this.coupenbalance=response[0].json.json().balance;
              if(this.coupenbalance && this.ethrate){
                this.totalValue = (this.totalValue - (this.coupenbalance /this.ethrate )) ;
              }
              else{
                this.totalValue = this.totalValue;
              }
              this.global_service.showNotification('top','right',response[0].json.json().message,2,'ti-cross');

             } else
              {
                this.ng4LoadingSpinnerService.hide();
                this.promoCoupen={};
                this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');

              }
        })
  }
}
  checkETHBalance(){
                     this.totalValue=(this.totalValue/this.ethrate);
                     if(this.icowizards.crowdsale.crowdsale.length==0){
                       this.global_service.showNotification('top','right','please fill at last one tier and save',3,'ti-cross');
                     }
                     else if(this.ethBalance<this.totalValue){
                      this.global_service.showNotification('top','right','you have insufficient ETH please buy ETH first',4,'ti-cross');
                     }else{
                       $('#noticeModalinvest23212').modal('show');
                  }
                }


  checkPassword(){
    this.ng4LoadingSpinnerService.show();
    let postData = {
            userId : this.user._id,
            password:this.withdrawDetails.password
        };
         const url = this.global_service.basePath + 'api/verifyPassword';
            this.global_service.PostRequest(url, postData).subscribe(response => {
            if (response[0].json.json().status == 200) {
              this.ng4LoadingSpinnerService.hide();
              this.sendtoReact();
             } else
              {
                this.ng4LoadingSpinnerService.hide();
                this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
                this.withDrawForm.reset();
                this.withdrawDialog = false;
              }
        })
  }





  sendtoReact(){
    debugger
    this.ng4LoadingSpinnerService.show();
    this.icowizards.crowdsale.generalInfo.push(this.generalInfo);
    this.token.reservedTokensInput=this.reservedTokensInput;
    this.icowizards.crowdsale.token=this.token;
    this.icowizards.crowdsale.contracts = ico.FILE_CONTENTS.files.contracts;
    console.log("this.icowizards.crowdsale = = "+JSON.stringify(this.icowizards.crowdsale));
    let data={
        state  :this.icowizards.crowdsale,
        userId : this.user._id,
        token : this.userToken
    }
    const url = this.global_service.basePath + 'api/saveCrowdsale';
    this.global_service.PostRequest(url,data).subscribe(response=>{
     if(response[0].json.json().status==200){
       this.withdrawEth();
        this.ng4LoadingSpinnerService.hide();
        let ID = response[0].json.json().result._id;
        //window.location.href = this.global_service.basePathforReact +"4"+"?userId="+ID;
         window.location.href = this.global_service.basePathforReact +"4"+"?userId="+this.user._id+"="+ID;
     }else{
       this.ng4LoadingSpinnerService.hide();
        this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
     }
    });
  }

  withdrawEth(){
      this.totalValue=(this.totalValue/this.ethrate);
      this.ng4LoadingSpinnerService.show();
      let postData = {
            userId : this.user._id,
            fromAddress: this.user.EthAddress,
            toAddress: ico.companyETHaddress,
            amount: (this.totalValue+ico.ETHmargin).toString(),
            password:this.withdrawDetails.password
        };
         const url = this.global_service.basePath + 'ETH/withdrawEth';
        this.global_service.PostRequest(url, postData).subscribe(response => {
            if (response[0].json.status == 200) {
              //this.deleteCrowdsale();
              this.ng4LoadingSpinnerService.hide();
              this.global_service.showNotification('top','right','Your Amount has been deducted ',2,'ti-cross');
              this.withDrawForm.reset();
             } else
              {
                this.ng4LoadingSpinnerService.hide();
                this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
                this.withDrawForm.reset();
                this.withdrawDialog = false;
              }
        })

  }

  deleteCrowdsale(){
    let postData={
      userId : this.user._id
    }
    const url=this.global_service.basePath + 'api/deleteCrowdsale';
            this.global_service.PostRequest(url, postData).subscribe(response => {
            if (response[0].json.status == 200) {
             console.log("delete crowdsale");

             }
        })
  }


   tokenImage(event){
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = (e:any) => {
      this.selectedTokenImage = e.target.result;
      this.icowizards.crowdsale.image = this.selectedTokenImage;
      this.tokImage=true;
    }
     reader.readAsDataURL(file)
   }

   teamImage(event){
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = (e:any) => {
      this.selectedTeamImage = e.target.result;
      this.team.image = this.selectedTeamImage;
    }
     reader.readAsDataURL(file)
   }

    whitePaper(event){
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = (e:any) => {
      this.selectedWhitePaperImage = e.target.result;
      this.whitepaperStatus=true;
     
      this.icowizards.crowdsale.whitePaper = this.domSanitizer.bypassSecurityTrustResourceUrl(this.selectedWhitePaperImage);
      console.log("this.icowizards.crowdsale.whitePaper = = "+this.icowizards.crowdsale.whitePaper);
    }
     reader.readAsDataURL(file)
   }


    // whitepaperOpen(){
    //   window.location.href=this.icowizards.crowdsale.whitePaper;
    // }



    deleteteam(){
      this.teamCard=false;
    }

    withdrawFormInit() {
        this.withDrawForm = this.fb.group({
            'amount': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^.?(0|[0-9]\d*)(\.\d+)?$/)])),
            'toAddress': new FormControl('', Validators.required),
            'password':  new FormControl('', Validators.required)
        });
    }




     ngOnInit() {
       var hello = this;

     this.withdrawFormInit();
     this.saveCrowdsaleForm()
        const $validator = $('.wizard-card form').validate({
            rules: {
                  company: {
                  required: true,

              },
              description: {
                  required: true
              },

                teamname: {
                    required: true,
                    
                },

                name:{
                    required: true,
                    minlength: 1,
                    maxlength:30,
                    validator: function (v) {
                      var data = document.forms["icoForm"]["name"].value
                      var t = /^[a-zA-Z_\-]+$/;
                if (data.match(/\s/g)) {
                  hello.space=true;
                }else{
                  hello.space=false;
                }
                  }
                },

                ticker: {
                    required: true,
                    minlength: 1,
                    maxlength:3
                } ,

                decimals: {
                    required: true,
                    minlength: 1,
                       validator: function (v) {
                      var data = document.forms["icoForm"]["decimals"].value
                        if(data>18){
                          hello.decimalValid=true;
                        }else{
                          hello.decimalValid=false;
                        }
                  }
                } ,

                addr: {
                    required: true,
                    minlength: 10,
                    validator: function (v) {

                      var data = document.forms["icoForm"]["addr"].value
                        data = data.split('');
                        if(data[0]!=='0' || data[1]!=='x' || data.length!==42){
                          hello.addStatus=true;
                        }
                        else{

                          hello.addStatus=false;
                        }
                  }
                } ,

                val: {
                    required: true,
                    minlength: 1,
                    maxlength:100
                } ,

                dim: {
                    required: true,
                }  ,

                tier :{
                   required: true,
                },


                startTime: {
                    required: true,
                    validator: function (v) {
                      var data = document.forms["icoForm"]["startTime"].value
                        console.log(data)
                        if(data<new Date().toISOString()){
                          hello.startTimeStatus=true;
                        }else{
                           hello.startTimeStatus=false;
                        }
                  }

                },

                endTime: {

                    required: true,
                    validator: function (v) {
                      var startDATE = document.forms["icoForm"]["startTime"].value
                      var endDATE = document.forms["icoForm"]["endTime"].value
                        if(endDATE < startDATE){
                          hello.tiker=true;
                        }else{
                            hello.tiker=false;
                        }

                  }
                },


                rate: {
                    required: true,

                } ,
                supply: {
                    required: true,

                },

                mincap :{
                  required:true,
                  validator: function (v) {
                      var values = document.forms["icoForm"]["mincap"].value;
                        if(values==0)
                          {
                              hello.mincap=true;
                          }else{
                              hello.mincap=false;
                          }

                  }
                }
            },

            errorPlacement: function(error: any, element: any) {
                $(element).parent('div').addClass('has-error');
             }
         });

        // Wizard Initialization
        $('.wizard-card').bootstrapWizard({
            'tabClass': 'nav nav-pills',
            'nextSelector': '.btn-next',
            'previousSelector': '.btn-previous',
            onNext: function(tab, navigation, index) {
                var $valid = $('.wizard-card form').valid();
                if(!$valid) {
                    $validator.focusInvalid();
                    return false;
                }
            },

            onInit: function(tab: any, navigation: any, index: any){

              // check number of tabs and fill the entire row
              let $total = navigation.find('li').length;
              let $wizard = navigation.closest('.wizard-card');
              let $first_li = navigation.find('li:first-child a').html();
              let $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
              $('.wizard-card .wizard-navigation').append($moving_div);
              $total = $wizard.find('.nav li').length;
              let  $li_width = 100/$total;

              let total_steps = $wizard.find('.nav li').length;
              let move_distance = $wizard.width() / total_steps;
              let index_temp = index;
              let vertical_level = 0;

              let mobile_device = $(document).width() < 600 && $total > 3;

              if(mobile_device){
                  move_distance = $wizard.width() / 2;
                  index_temp = index % 2;
                  $li_width = 50;
              }

              $wizard.find('.nav li').css('width',$li_width + '%');

              let step_width = move_distance;
              move_distance = move_distance * index_temp;

              let $current = index + 1;

              if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
                  move_distance -= 8;
              } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
                  move_distance += 8;
              }

              if(mobile_device){
                  let x: any = index / 2;
                  vertical_level = parseInt(x);
                  vertical_level = vertical_level * 38;
              }

              $wizard.find('.moving-tab').css('width', step_width);
              $('.moving-tab').css({
                  'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                  'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

              });
              $('.moving-tab').css('transition','transform 0s');
           },

            onTabClick : function(tab: any, navigation: any, index: any){

                const $valid = $('.wizard-card form').valid();

                if (!$valid) {
                    return false;
                } else {
                    return true;
                }
            },

            onTabShow: function(tab: any, navigation: any, index: any) {
                let $total = navigation.find('li').length;
                let $current = index + 1;

                const $wizard = navigation.closest('.wizard-card');

                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $($wizard).find('.btn-next').hide();
                    $($wizard).find('.btn-finish').show();
                } else {
                    $($wizard).find('.btn-next').show();
                    $($wizard).find('.btn-finish').hide();
                }

                const button_text = navigation.find('li:nth-child(' + $current + ') a').html();

                setTimeout(function(){
                    $('.moving-tab').text(button_text);
                }, 150);

                const checkbox = $('.footer-checkbox');

                if ( index !== 0 ) {
                    $(checkbox).css({
                        'opacity':'0',
                        'visibility':'hidden',
                        'position':'absolute'
                    });
                } else {
                    $(checkbox).css({
                        'opacity':'1',
                        'visibility':'visible'
                    });
                }
                $total = $wizard.find('.nav li').length;
               let  $li_width = 100/$total;

                let total_steps = $wizard.find('.nav li').length;
                let move_distance = $wizard.width() / total_steps;
                let index_temp = index;
                let vertical_level = 0;

                let mobile_device = $(document).width() < 600 && $total > 3;

                if(mobile_device){
                    move_distance = $wizard.width() / 2;
                    index_temp = index % 2;
                    $li_width = 50;
                }

                $wizard.find('.nav li').css('width',$li_width + '%');

                let step_width = move_distance;
                move_distance = move_distance * index_temp;

                $current = index + 1;

                if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
                    move_distance -= 8;
                } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
                    move_distance += 8;
                }

                if(mobile_device){
                    let x: any = index / 2;
                    vertical_level = parseInt(x);
                    vertical_level = vertical_level * 38;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

                });
            }
        });


        // Prepare the preview for profile picture
        $('#wizard-picture').change(function(){
            const input = $(this);

            if (input[0].files && input[0].files[0]) {
                const reader = new FileReader();

                reader.onload = function (e: FileReaderEvent) {
                    $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
                };
                reader.readAsDataURL(input[0].files[0]);
            }
        });

        $('[data-toggle="wizard-radio"]').click(function(){
            const wizard = $(this).closest('.wizard-card');
            wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
            $(this).addClass('active');
            $(wizard).find('[type="radio"]').removeAttr('checked');
            $(this).find('[type="radio"]').attr('checked', 'true');
        });

        $('[data-toggle="wizard-checkbox"]').click(function(){
            if ( $(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).find('[type="checkbox"]').removeAttr('checked');
            } else {
                $(this).addClass('active');
                $(this).find('[type="checkbox"]').attr('checked', 'true');
            }
        });

        $('.set-full-height').css('height', 'auto');

      }
       ngOnChanges(changes: SimpleChanges) {
        const input = $(this);

        if (input[0].files && input[0].files[0]) {
            const reader: any = new FileReader();

            reader.onload = function (e: FileReaderEvent) {
                $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
            };
            reader.readAsDataURL(input[0].files[0]);
        }
      }
      ngAfterViewInit() {

        $( window ).resize( () => { $('.wizard-card').each(function(){

            const $wizard = $(this);
            const index = $wizard.bootstrapWizard('currentIndex');
            let $total = $wizard.find('.nav li').length;
            let  $li_width = 100/$total;

            let total_steps = $wizard.find('.nav li').length;
            let move_distance = $wizard.width() / total_steps;
            let index_temp = index;
            let vertical_level = 0;

            let mobile_device = $(document).width() < 600 && $total > 3;

            if(mobile_device){
                move_distance = $wizard.width() / 2;
                index_temp = index % 2;
                $li_width = 50;
            }

            $wizard.find('.nav li').css('width',$li_width + '%');

            let step_width = move_distance;
            move_distance = move_distance * index_temp;

            let $current = index + 1;

            if($current == 1 || (mobile_device == true && (index % 2 == 0) )){
                move_distance -= 8;
            } else if($current == total_steps || (mobile_device == true && (index % 2 == 1))){
                move_distance += 8;
            }

            if(mobile_device){
                let x: any = index / 2;
                vertical_level = parseInt(x);
                vertical_level = vertical_level * 38;
            }

            $wizard.find('.moving-tab').css('width', step_width);
            $('.moving-tab').css({
                'transform':'translate3d(' + move_distance + 'px, ' + vertical_level +  'px, 0)',
                'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'
            });

            $('.moving-tab').css({
                'transition': 'transform 0s'
            });
            });
        });
      }

    saveCrowdsaleForm() {
                     this.generalInfoForm = this.fb.group({
                       'company'     : new FormControl('', Validators.required)

                     });
                 }


   icowizardsDetails(){
     this.icowizards={
                 crowdsale: {
                               totalETH             : 2,
                               image                : "",
                               whitePaper           : "",
                               contractTypes        : {
                                                         whitelistwithcap    :  "white-list-with-cap",
                                                         capped              :  "capped",
                                                         standard            :   "standard"
                                                       },
                              contractType          :  "white-list-with-cap",
                              contractName          :  "MintedTokenCappedCrowdsaleExt",
                              optimized             :  true,
                              compilerVersion       :  "0.4.11",
                              blockTimeGeneration   :  17,
                              pricingStrategy       :  [],
                              crowdsale             :  [],
                              generalInfo           :  [],
                              businessRoadMap       :  [],
                              milestone             :  [],
                              contracts             :  ico.defaultState.contracts,
                              team                  :  [],
                              token                 :  ""
                           },

       }
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

}
