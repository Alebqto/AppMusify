import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Router} from '@angular/router';

@Injectable()
export class LoginService{
	public url: string;
	public id: string;

	constructor(public http: HttpClient, private router: Router){



	}


    public loggedIn // {1}

    get isLoggedIn() {
        if(sessionStorage.getItem('sessionActive')==='true'){
            this.loggedIn = true;
        }
        return this.loggedIn; // {2}
    }

    logout() {
        this.loggedIn = false;
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['']);
    }



     doLogin(username, password) {
         this.loggedIn = true;
         sessionStorage.setItem("sessionActive" , "true");
    }



}