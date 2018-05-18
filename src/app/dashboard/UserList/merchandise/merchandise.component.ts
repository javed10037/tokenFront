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
import  * as ico   from'./../../../ico_constant';

 declare const $: any;
@Component({
  selector: 'app-merchandise',
  templateUrl: './merchandise.component.html',
  styleUrls: ['./merchandise.component.scss']
})
export class MerchandiseComponent implements OnInit {

 cartProduct :any[] = [];
 wishlist :any[] = [];
 products:any;
 show:boolean=false;
 cpmETHAdd:any
 amount:any=0;
 finalTransaction:any;
 ethBalance:any;
 user:any;
 ethAddress:any;
 
  constructor(public global_service: GlobalService,public router: Router) {
      this.user=JSON.parse(localStorage.getItem('currentUser'));
                   if(this.user)
                   {
                   this.ethAddress=this.user.EthAddress;     
                   this.getBalance();
                  }
   this.marchandise();
    this.cpmETHAdd = ico.companyETHaddress;
   }

count(){
  this.amount=0;
  for(let i=0;i<this.cartProduct.length;i++){
            this.amount=this.amount+this.cartProduct[i].price;
      }
};
deleteCart(i){
  this.amount=this.amount-this.cartProduct[i].price;
  this.cartProduct.splice(i,1);      
}

addToCart(product:any){
  
console.log(this.cartProduct);
  //debugger;

var index = this.cartProduct.findIndex(function(pro){
        return pro._id === product._id;
    });
//console.log("i = = "+index);
    if (index !== -1){
      this.global_service.showNotification('top','right','Product already added',4,'ti-cross');
      
    }else{
      this.cartProduct.push(product);
      console.log(this.cartProduct);
    }

};

checkOut(){
  
  if(this.cartProduct.length==0){
    this.global_service.showNotification('top','right','Your Shopping Cart Is Empty',4,'ti-cross');
     return;
  }else if(this.amount<this.ethBalance){    
      this.show=true;     
  }else{
    this.global_service.showNotification('top','right','Sorry You Do Not Have Sufficient Balance',4,'ti-cross'); 
  }  

};

checkOutSubmit(currentpassword){
  this.show=false;
  
let user=JSON.parse(localStorage.getItem("currentUser"));
let url=this.global_service.basePath+'api/verifyPassword';
let data={
  "userId" : user._id,
  "password" : currentpassword
}
  this.global_service.PostRequest(url,data).subscribe(response=>{
    if(response[0].json.json().status==200){

        let datas={
                  "userId":user._id,
                  "fromAddress":user.EthAddress,
                  "toAddress":ico.companyETHaddress,
                  "amount":this.amount.toString(),
                  "password":currentpassword

        }
      
      this.global_service.PostRequest(this.global_service.basePath+'ETH/withdrawEth',datas).subscribe(response=>{
        
        console.log(response[0].json.json().status);
         if(response[0].json.json().status==200){
           this.global_service.showNotification('top','right','Thank you for shopping!.',2,'ti-cross'); 
           this.amount=0;  
           this.cartProduct=[];

           this.getBalance();


         }else{
           this.global_service.showNotification('top','right','Server error, Please try again!.',4,'ti-cross');
           this.amount=0;
           this.cartProduct=[];
         }

        });
    }else{
      this.global_service.showNotification('top','right',response[0].json.json().message,4,'ti-cross');
      // this.show=true;
    }   

    });
};
   marchandise(){
     const url = this.global_service.basePath+'merchandise/getProduct';
     this.global_service.GetRequest(url).subscribe(response=>{ 
       if(response[0].status==200){
         this.products=response[0].json.data ? response[0].json.data : [];
          console.log(response[0].json.data);
       }else{
         this.global_service.showNotification('top','right','server error',4,'ti-cross');
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


 wishList(product){
var index = this.wishlist.findIndex(function(pro){
        return pro._id === product._id;
    });
//console.log("i = = "+index);
    if (index !== -1){
      this.global_service.showNotification('top','right','Product removed in wishlist',4,'ti-cross');
      this.wishlist.splice(index,1);
    }else{
      this.global_service.showNotification('top','right','Product added in wish list',2,'ti-cross');
      this.wishlist.push(product);
      
    }
 }



 buyNow(product){

   this.amount=product.price;
   if(this.amount<this.ethBalance){    
      this.show=true;   
      this.amount=product.price;  
  }else{
    this.show=false;
    this.global_service.showNotification('top','right','Sorry You Do Not Have Sufficient Balance',4,'ti-cross'); 
  }  
  

 }
  ngOnInit() {
 
  }

}
