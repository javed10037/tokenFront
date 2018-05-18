import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../GlobalService';
import PerfectScrollbar from 'perfect-scrollbar';
import { Router, ActivatedRoute } from '@angular/router';
declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: 'view-user',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },{
        path: 'my-profile',
        title: 'MyProfile',
        type: 'link',
        icontype: 'perm_identity'

    },
    {
        path: 'sendtoken',
        title: 'Send Token',
        type: 'link',
        icontype: 'sendtoken'
    }, 
    {
        path: 'refer',
        title: 'Reseller',
        type: 'link',
        icontype: 'record_voice_over'
    },

    {        path: 'merchandise',   
             title: 'Merchandise',      
             type: 'link',      
             icontype: 'shop'   
              },
    {
        path: 'setting',
        title: 'Setting',
        type: 'link',
        icontype: 'settings'

    },{
        path: 'help',
        title: 'Help',
        type: 'link',
        icontype: 'help'
    }
    // ,
    // {
    //     path: 'crowdsale',
    //     title: 'Crowdsale',
    //     type: 'link',
    //     icontype: 'help'
    // },

];
//Menu Items
export const ROUTESINVESTER: RouteInfo[] = [{
        path: 'view-user',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard'
    },{
        path: 'my-profile',
        title: 'MyProfile',
        type: 'link',
        icontype: 'perm_identity'

    },

    {
        path: 'sendtoken',
        title: 'Send Token',
        type: 'link',
        icontype: 'sendtoken'
    },  
    {        path: 'merchandise',   
             title: 'Merchandise',      
             type: 'link',      
             icontype: 'shop'   
              },
       
    {
        path: 'invester-refer',
        title: 'Refer',
        type: 'link',
        icontype: 'sendtoken'
    },  
    {
        path: 'setting',
        title: 'Setting',
        type: 'link',
        icontype: 'settings'

    },{
        path: 'help',
        title: 'Help',
        type: 'link',
        icontype: 'help'
    },
     {
        path: 'crowdsale',
        title: 'Crowdsale',
        type: 'link',
        icontype: 'help'
    },

];
@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
     loader:boolean = false;
     addState:string='';
      public user:any;
      accountType:boolean;
      ethBalance: any;
      userName: any;
      TOKEN:any;
      ethAddress: any;
    constructor(public router:Router, public global_service:GlobalService){      
           this.user=JSON.parse(localStorage.getItem('currentUser')); 
           this.TOKEN=localStorage.getItem('token');
              if (this.user != null || this.user != undefined) {
                 if (this.user.accountType != "Investor") {
                    this.userName = this.user.firstName;
                     this.accountType=true;                
                 } else {
                    this.userName = this.user.firstName;
                    this.accountType=false;               
                 }
                   this.ethAddress = this.user.EthAddress;
               }
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
         // this.menuItems = ROUTES.filter(menuItem => menuItem);      
            if (this.user != null || this.user != undefined) {
                 if (this.user.accountType != "Investor") { 
                    this.menuItems = ROUTES.filter(menuItem => menuItem);              
                 } else {                    
                   this.menuItems = ROUTESINVESTER.filter(menuItem => menuItem);              
                 }                  
               }
       // this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            let ps = new PerfectScrollbar(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    // genrateIco(){ 
    // window.open(this.global_service.basePathforReact+"1"+"?userId="+this.user._id+"="+this.TOKEN +"="+ this.user.EthAddress, "_blank");      
   
    // }
    genrateIco(){ 
    localStorage.removeItem('editToken');
    this.router.navigateByUrl('/dashboard/generateIco');
    }
   
   InvestIco(){ 
          
    this.router.navigateByUrl('/dashboard/investIco');
    }


  logout() {
                let postData = {
                    ETHaddress: this.user.EthAddress,
                    userId: this.user._id
                };
                const url = this.global_service.basePath + 'api/logout';
                this.global_service.PostRequest(url, postData).subscribe(response => {             
                    if (response[0].json.status == 200) {
                        console.log("response = = =" + response[0].json.json().message)
                        localStorage.clear();
                        localStorage.removeItem('currentUser');
                        localStorage.removeItem('token');
                        localStorage.removeItem('token_link');
                        this.router.navigateByUrl('/login');
                        this.global_service.showNotification('top','right',response[0].json.json().message ,2,'ti-cross');   
                    } else {
                        this.global_service.showNotification('top','right','cancel logout',4,'ti-cross');
                    }

                })
      }
}
