import { ElementRef,Component, OnInit ,NgModule,Input,Output,ViewChild,EventEmitter,ChangeDetectionStrategy,VERSION} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FormsModule, FormControl, FormBuilder, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Http, Headers, RequestOptions, Response  } from '@angular/http';
import { GlobalService } from '../GlobalService';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
declare const $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

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
  public filterInput = new FormControl();
  //private _subscription: Subscription;
  @Input() items: Observable<any[]>;
  content:any[]=new Array();
  userName:any;
  active:boolean=true;
  contactForm: FormGroup;
  subscribeForm: FormGroup;
  public contactDetail:ContactDetail;
  public subscribeDetail:ContactDetail;
  public status:any;
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
  upComming : any[]=[]
  public endtime: any;
  public startTime:any;
  currentDate:any;
    constructor(
        private element: ElementRef,
        private global_service : GlobalService,
        private http: Http,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        ) {
            this.currentDate = moment(new Date()).format("YYYY-MM-DD HH:mm");
           this.nativeElement = element.nativeElement;
           this.sidebarVisible = false;
           this.status = this.global_service.isLogedIn();
           if(this.status==false){
            this.active=false;
           }
         else{
           this.active=true;
           this.user=JSON.parse(localStorage.getItem('currentUser'));
           this.userName=this.user.firstName + " "+this.user.lastName;
         }
    this.counter=0;

     this.getToken();

      this.user=JSON.parse(localStorage.getItem('currentUser'));

      this.contactDetail = {
            email:'',
            name: '',
            subject:'',
            message: ''

           }
           this.subscribeDetail = {
            email:''
           }
           var TxtType = function(el, toRotate, period) {
                                        this.toRotate = toRotate;
                                        this.el = el;
                                        this.loopNum = 0;
                                        this.period = parseInt(period, 10) || 2000;
                                        this.txt = '';
                                        this.tick();
                                        this.isDeleting = false;
                                    };

                                    TxtType.prototype.tick = function() {
                                        var i = this.loopNum % this.toRotate.length;
                                        var fullTxt = this.toRotate[i];

                                        if (this.isDeleting) {
                                            this.txt = fullTxt.substring(0, this.txt.length - 1);
                                        } else {
                                            this.txt = fullTxt.substring(0, this.txt.length + 1);
                                        }

                                        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

                                        var that = this;
                                        var delta = 200 - Math.random() * 100;

                                        if (this.isDeleting) { delta /= 2; }

                                        if (!this.isDeleting && this.txt === fullTxt) {
                                            delta = this.period;
                                            this.isDeleting = true;
                                        } else if (this.isDeleting && this.txt === '') {
                                            this.isDeleting = false;
                                            this.loopNum++;
                                            delta = 500;
                                        }

                                        setTimeout(function() {
                                            that.tick();
                                        }, delta);
                                    };

                                    window.onload = function() {
                                        var elements = document.getElementsByClassName('typewrite');
                                        for (var i = 0; i < elements.length; i++) {
                                            var toRotate = elements[i].getAttribute('data-type');
                                            var period = elements[i].getAttribute('data-period');
                                            if (toRotate) {
                                                new TxtType(elements[i], JSON.parse(toRotate), period);
                                            }
                                        }
                                        // INJECT CSS
                                        var css = document.createElement("style");
                                        css.type = "text/css";
                                        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
                                        document.body.appendChild(css);
                                    };
    }
    getToken(){
         this.tokensList = [];
         this.onGoingLIst=[];
         this.upComming=[];
         this.expierList=[];
       const url = this.global_service.basePath + 'api/getAllTokens';
             this.global_service.GetRequest(url).subscribe(response=>{
               $('#loader1').hide();
                $('#loader2').hide();
                $('#loader3').hide();
                $('#loader4').hide();
             if(response[0].json.status==200){


                this.tokenData=response[0].json.data;
                var tokenLength=response[0].json.data.length;
                  if(tokenLength){
                 for(var i=this.counter+1;i<this.tokenData.length;i++){
                   let objData ={
                     tokenName :'',
                     tokenTicker:'',
                     tokenAddress:'',
                     tokenSupply :'',
                     endTime:'',
                     tokenImage:'',
                     tokenRate:'',
                     minCap:'',
                     completeToken:false
                  };
                     objData.tokenName=this.tokenData[i].tokenName;
                     objData.tokenTicker=this.tokenData[i].tokenTicker;
                     objData.tokenAddress=this.tokenData[i].tokenAddress;
                     objData.tokenSupply=this.tokenData[i].tokenSupply;
                     objData.tokenSupply=this.tokenData[i].tokenSupply;
                     objData.tokenRate=this.tokenData[i].tokenRate;
                     objData.minCap=this.tokenData[i].investorMinCap;
                     this.endtime=this.tokenData[i].endTime;
                     objData.tokenImage=this.tokenData[i].tokenImage ? this.tokenData[i].tokenImage : '../assets/img/No-preview.png';
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
                    // if(i%9==0) break;
                 }
               }   else{
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
                  // this.counter+=9;
            }else{
              this.isDataFound = false;
              // this.active=true;
              // this.notActive=false;
            }
          })

          var main = function() {
  /* Push the body and the nav over by 285px over */
  $('.icon-menu').click(function() {
    $('.menu').animate({
      left: "0px"
    }, 200);

    $('body').animate({
      left: "285px"
    }, 200);
  });

  /* Then push them back */
  $('.icon-close').click(function() {
    $('.menu').animate({
      left: "-285px"
    }, 200);

    $('body').animate({
      left: "0px"
    }, 200);
  });
};


$(document).ready(main);
  }



  invest_ICO(value:any){
    if(this.user==null||this.user==undefined){
        this.tokenLink=1
         localStorage.setItem('token_link', this.tokenLink);
         this.router.navigate(['/login'])
    }
    else{
      window.open(this.global_service.basePathforReact+"invest?addr="+value);

    }
  }

  logout() {
            let postData = {
                    ETHaddress: this.user.EthAddress,
                    userId: this.user._id
                };

                const url = this.global_service.basePath + 'api/logout';
                this.global_service.PostRequest(url, postData).subscribe(response => {
                    debugger
                    if (response[0].json.status == 200) {
                        console.log("response = = =" + response[0].json.json().message)
                        localStorage.clear();
                        localStorage.removeItem('currentUser');
                        localStorage.removeItem('token');
                        localStorage.removeItem('token_link');
                        this.router.navigateByUrl('/login');
                        //this.messageService.add({ severity: 'success', summary: response[0].json.json().message });

                    } else {

                      //  this.messageService.add({ severity: 'success', summary: 'cancel logout' });
                    }

                })
    }


    ngOnInit() {
        this.contactFormInit();
        this.subscribeFormInit();
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

        // setTimeout(function() {
        //     // after 1000 ms we add the class animated to the login/register card
        //     $('.card').removeClass('card-hidden');
        // }, 700);
    }

     contactFormInit(){
      this.contactForm = this.fb.group({
            'name': new FormControl('', Validators.required),
            'email': new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,8}|[0-9]{1,3})(\]?)$/)])),
            'message': new FormControl('', Validators.required),
            'subject': new FormControl('', Validators.required)

        });
    }
    subscribeFormInit(){
      this.subscribeForm = this.fb.group({
            'email': new  FormControl('',Validators.compose([Validators.required,Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,8}|[0-9]{1,3})(\]?)$/)])),
        });
    }
    sendMessage(){
         const url = this.global_service.basePath + 'api/contactUs';
         this.global_service.PostRequestUnautorized(url , this.contactDetail)
         .subscribe((response) => {
          if(response[0].json.status==200){
               this.subscribeForm.reset();

             }else{
                this.subscribeForm.reset();

          }
        })
     }
     subscribe(){
       const url = this.global_service.basePath + 'api/subscribeUs';
         this.global_service.PostRequestUnautorized(url , this.subscribeDetail)
         .subscribe((response) => {
          if(response[0].json.status==200){
               this.contactForm.reset();

             }else{
                this.contactForm.reset();

          }
        })
     }
     getStarted(){
       if(this.status==false){
       this.router.navigateByUrl('/signupHome');
       }else{
       this.router.navigateByUrl('//dashboard/view-user');
       }
     }


     sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function() {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
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
}
