import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-signup-home',
  templateUrl: './signup-home.component.html',
  styleUrls: ['./signup-home.component.css']
})
export class SignupHomeComponent implements OnInit {
model: any = {};
   account: string;
    loading = false;
    year:any
  constructor(
        private router: Router        
        //private userService: UserService,
        ) { 
       this.year=moment(new Date()).format('YYYY');
  }

  ngOnInit() {

   
  }
  signup() {
        this.loading = true;
    }

   home(){
     window.location.href='https://www.kryptual.com/';
    }

}



