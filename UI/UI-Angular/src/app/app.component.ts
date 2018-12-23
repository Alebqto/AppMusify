import { Component } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {LoginService} from "../services/login.services";
import {MenuItem} from "primeng/api";
import {MegaMenuModule} from 'primeng/megamenu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo1';

    isLoggedIn: Boolean;                  // {1}
    items: MenuItem[];
    private UserModel = {
        id:null,
        username:'',
        password:'',
        confirmationPassword:'',
        firstName:'',
        lastName:'',
        email:'',
        companyCode:'',
        description:'',
        blockedUser: false,
        activeUser: true,
        userLanguage: {'id':3,'code':'NL',value:'Dutch'}
    };

    constructor(private loginService: LoginService) { }

    ngOnInit() {
        this.isLoggedIn = this.loginService.isLoggedIn; // {2}
        this.UserModel.username = sessionStorage.getItem('username');
        this.UserModel.password = sessionStorage.getItem('password');
        this.UserModel.id = sessionStorage.getItem('userId');
    }


    onLogout(){
        this.loginService.logout();                      // {3}
    }
}
