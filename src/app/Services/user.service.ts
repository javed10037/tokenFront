import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { User } from '../models/index';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(appConfig.apiUrl + 'users');
    }

    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + 'users/' + _id);
    }

    create(user: SignupDetail) {  
        console.log("user = = ="+JSON.stringify(user));
       return this.http.post<any>(appConfig.apiUrl + 'api/register', user)
            .map(user => {
               // send link that will allow you to reset your password. if there's a jwt token in the response    
                return user;
            });      
        
    }

    update(user: any) {
        console.log("user = = = "+JSON.stringify(user));
        return this.http.post<any>(appConfig.apiUrl + 'api/UpdateUserProfileById' , user)
        .map(user => {
               // send link that will allow you to reset your password. if there's a jwt token in the response    
                return user;
            });
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + 'users/' + _id);
    }
}