import { ElementRef,Component, OnInit ,NgModule,Input,Output,ViewChild,EventEmitter,ChangeDetectionStrategy,VERSION} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { GlobalService } from '../../../GlobalService';
import { Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

 declare const $: any;
  @Component({
    selector: 'app-investIco',
    templateUrl: './investIco.component.html',
    styleUrls: ['./investIco.component.css']
  })

  export class InvestIcoComponent implements OnInit {
   public counter:number;
   public name:string;
   public tokenData:any;
   public user:any;
   tokensList:any[]=[];
   value = 1;
   isDataFound : boolean = false;
   tokenLink:any;

   // for filter
  public _items: Array<any>;
  public enableFilter: boolean;
  public filterText: string;
  public filterPlaceholder: string;
  public tokenImage:string;
  public filterInput = new FormControl();
  public endtime: any;
  public startTime:any;
  currentDate:any;

  @Input() items: Observable<any[]>;
  content:any[]=new Array();

   complete:boolean=false;

    noToken1 :boolean=false;
     noToken2 :boolean=false;
      noToken3 :boolean=false;
      noToken4 :boolean=false;
   allStatus:boolean=true;
   ongoingStatus:boolean=false;
   upcommingStatus:boolean=false;
   expierStatus:boolean=false;
   allList : any[]=[];
   onGoingLIst : any[]=[];
   expierList : any[]=[];
   upComming : any[]=[];

    constructor(public global_service: GlobalService,public router: Router, public fb:FormBuilder) {
      this.currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm");
      var status = this.global_service.isLogedIn();
         if(status==false){
           this.router.navigateByUrl('/login');
         }
      this.tokenImage="assets/images/No-preview.png";
     this.counter=0;
     this.user=JSON.parse(localStorage.getItem('currentUser'));
     this.getToken();
      this.name = `Angular! v${VERSION.full}`
    }

      getToken(){
        this.tokensList = [];
        this.onGoingLIst=[];
        this.upComming=[];
        this.expierList=[];

      debugger
       const url = this.global_service.basePath + 'api/getAllTokens';
             this.global_service.GetRequest(url).subscribe(response=>{
             $('#loader1').hide();
              $('#loader2').hide();
              $('#loader3').hide();
              $('#loader4').hide();
              //debugger
             if(response[0].json.status==200){

                this.tokenData=response[0].json.data;
                var tokenLength=response[0].json.data.length;
                if(tokenLength){
                  for(var i=0;i<this.tokenData.length;i++){
                   let objData ={
                     id:'',
                     tokenName :'',
                     tokenTicker:'',
                     tokenAddress:'',
                     tokenSupply :'',
                     endTime:'',
                     tokenImage:'',
                     completeToken:false

                  };
                     objData.id = this.tokenData[i]._id ? this.tokenData[i]._id : '--';
                     objData.tokenName=this.tokenData[i].tokenName ? this.tokenData[i].tokenName : '--';
                     objData.tokenTicker=this.tokenData[i].tokenTicker ? this.tokenData[i].tokenTicker :'--';
                     objData.tokenAddress=this.tokenData[i].tokenAddress ? this.tokenData[i].tokenAddress : '--';
                     objData.tokenSupply=this.tokenData[i].tokenSupply ? this.tokenData[i].tokenSupply : '--';
                     objData.tokenImage=this.tokenData[i].tokenImage ? this.tokenData[i].tokenImage : './assets/img/No-preview.png';
                     this.endtime=this.tokenData[i].endTime;
                     var endDate=moment(this.endtime).format("YYYY-MM-DD HH:mm");
                     this.startTime=this.tokenData[i].startTime;
                     var startDate=moment(this.startTime).format("YYYY-MM-DD HH:mm");
                     if(endDate<this.currentDate){

                       this.complete=true;
                       objData.completeToken = true;
                       this.expierList.push(objData);
                     }
                    else if((startDate<this.currentDate) && (this.currentDate<endDate)){
                       this.complete=false;
                       objData.completeToken = false;
                       objData.endTime=moment(this.endtime).format('LL');
                       this.onGoingLIst.push(objData);

                     }else{
                      this.complete=false;
                      objData.completeToken = false;
                      objData.endTime=moment(this.endtime).format('LL');
                      this.upComming.push(objData);
                     }
                    this.tokensList.push(objData);


                   // if(i%10==0) break;
                 }

                } else{
                this.noToken1=true;
                }

                if (this.tokensList.length==0){
                  this.noToken1=true;
                } else{
                  this.noToken1=false;
                }
                  if(this.onGoingLIst.length==0){
                   this.noToken2=true;
                 }else{
                   this.noToken2=false;
                 }
                 if(this.upComming.length==0){
                    this.noToken3=true;
                  }else{ this.noToken3=false;
                     this.noToken3=false;
                  }
                     if(this.expierList.length==0){
                    this.noToken4=true;
                  }else{ this.noToken3=false;
                     this.noToken4=false;
                  }
                  // this.counter+=10;
            }else{

              this.isDataFound = false;
            }
          })
       }
        invest_ICO(value:any){
            this.router.navigate(['/dashboard/crowdsale', { 'id': value }]);
        }

        onGoing(){
          this.onGoingLIst=[];

         this.ongoingStatus=true;
         this.upcommingStatus=false;
         this.expierStatus=false;
         this.allStatus=false;
         this.noToken2=false;
         this.getToken();
        }

        upCommings(){


        this.upComming=[];

         this.ongoingStatus=false;
         this.upcommingStatus=true;
         this.expierStatus=false;
         this.allStatus=false;
         this.noToken3=false;
         this.getToken();
        }

        expier(){
          this.expierList=[];

         this.expierStatus=true;
         this.ongoingStatus=false;
         this.upcommingStatus=false;
         this.allStatus=false;
         this.noToken4=false;
         this.getToken();
        }

        all(){
             this.tokensList = [];
         this.allStatus=true;
         this.ongoingStatus=false;
         this.upcommingStatus=false;
         this.expierStatus=false;
         this.noToken1=false;
         this.getToken();

        }
         ngOnInit() {

         }


  }
