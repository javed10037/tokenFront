import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from '../GlobalService';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { appConfig } from '../app.config';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient,private global_service : GlobalService) { }

    login(loginDetail:LoginDetail) {
        let url = appConfig.apiUrl+"api/login";
    this.global_service.PostRequest(url,loginDetail) .subscribe(res => {
    
   });  
    console.log("loginDetail = = "+JSON.stringify(loginDetail)) 
   // debugger     
        // return this.http.post<any>(appConfig.apiUrl + 'api/login', loginDetail)
        //     .map(user => {        
             
        //         if (user && user.token) {
        //             // store user details and jwt token in local storage to keep user logged in between page refreshes
        //             localStorage.setItem('currentUser', JSON.stringify(user));
        //         }
        //         return user;
        //     });
    }

    // forgot password
    forgotPassword(forgotPasswordDetail:ForgotPasswordDetail) {      
        return this.http.post<any>(appConfig.apiUrl + 'api/forgot_password', forgotPasswordDetail)
            .map(user => {
               // send link that will allow you to reset your password. if there's a jwt token in the response    
                return user;
            });
    }

    logout1() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
     logout(userId:any) {
         return this.http.post<any>(appConfig.apiUrl + 'api/logout', userId)
            .map(user => {
               // send link that will allow you to reset your password. if there's a jwt token in the response    
                return user;
            });
    }
}