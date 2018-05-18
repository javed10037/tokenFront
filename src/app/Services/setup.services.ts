import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { GlobalService } from '../GlobalService';
import { appConfig } from '../app.config';

@Injectable()
export class SetupService {

  constructor(private http: HttpClient, private global_service : GlobalService) {
    this.http = http;       
  }
   createETHaddress(email:UserEmail) {   
     let url = "ETH/createETHaddress";
   this.global_service.PostRequest(url,email) .subscribe(res => {
     debugger;
   });   
        // return this.http.post<any>(appConfig.apiUrl + 'ETH/createETHaddress', email)
        //         .map(data => {
        //             console.log('data::::'+data);
        //             return data;
        //         });
        }
     

      getAllETHaddress() {           
        return this.http.get<any>(appConfig.apiUrl + 'ETH/getAllETHaddress',)
            .map(user => {  
                return user;
            });
    }

    getBalanceByAddress(ethAddress:ETHAddress){   
      
      return this.http.post<any>(appConfig.apiUrl + 'ETH/getBalanceByAddress',ethAddress)
            .map(data => {
                console.log('data::::'+data);
                

                return data;
            });
    }
   getTokenByUserId(userId:any){   
       
      return this.http.post<any>(appConfig.apiUrl + 'ETH/getTokenByUserId',userId)
            .map(data => {
                console.log('data::::'+data); 
                return data;
            });
    }

  withdrawETH(withdraw:any){
    console.log("this.withdrawDetails = = "+JSON.stringify(withdraw));
     return this.http.post<any>(appConfig.apiUrl + 'ETH/withdrawEth',withdraw)
            .map(data => {
                console.log('data::::'+data); 
                return data;
            });
    }

    getTokenByAddress(ethval:ETHAddress){
           return this.http.post<any>(appConfig.apiUrl + 'ETH/getTokenByAddress',ethval)
            .map(user => {
                // login successful if there's a jwt token in the response
                

                return user;
            });
    }
    
    getTransactionsByAccount(transData:any){
        return this.http.post<any>(appConfig.apiUrl + 'ETH/getTransactionsByAccount',transData)
            .map(user => {
                // login successful if there's a jwt token in the response
                

                return user;
            });
    }
    getTransactionByAddress(txHashAddress:TxHashAddress){
      return this.http.post<any>(appConfig.apiUrl + 'ETH/getTransactionByAddress',txHashAddress)
            .map(user => {
                // login successful if there's a jwt token in the response
                

                return user;
            });
    }

    getAllTokens(){
      return this.http.get<any>(appConfig.apiUrl + 'ETH/getAllTokens')
            .map(user => {
                  return user;
            });
    }


    storeTokenInformation(tokenInfo:any){
         return this.http.post<any>(appConfig.apiUrl + 'ETH/storeTokenInformation',tokenInfo)
            .map(user => {
                // login successful if there's a jwt token in the response
                

                return user;
            });
    }


    submitICO(txHashAddress:any){
         return this.http.post<any>(appConfig.apiUrl + 'ETH/submitICO',txHashAddress)
            .map(user => {
                // login successful if there's a jwt token in the response
                

                return user;
            });
    }

   getuserInfo(userId:any){
     return this.http.post<any>(appConfig.apiUrl + 'api/GetProfileByUserId',userId)
            .map(user => {

                return user;
            });
   }
      
}


