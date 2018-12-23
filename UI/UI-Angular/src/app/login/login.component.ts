import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {LoginService} from "../../services/login.services";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private loginService: LoginService, private router: Router) {
        this.loginService.logout();
    }

    ngOnInit() {
    }

    private msgLogin = [];

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

    private  ChangePwdModel = {
        username:'',
        currentPassword:'',
        newPassword:'',
        confirmationPassword:''
    };


    init(){

    }


    doLogin(){
        if(this.UserModel.username === ""){
            this.msgLogin = [];
            this.msgLogin.push({severity:'error', summary:'Error', detail:'you must enter username'});
            return;
        }
        if(this.UserModel.password === "" || this.UserModel.password.length <4){
            this.msgLogin = [];
            this.msgLogin.push({severity:'error', summary:'Error', detail:'coloque usaurio:admin / clave:admin'});
            return;
        }
        if(this.UserModel.username === "admin" && this.UserModel.password === "admin"){
            this.router.navigate(['artists']);
        }else{
            this.msgLogin = [];
            this.msgLogin.push({severity:'error', summary:'Error', detail:'coloque usaurio:admin / clave:admin'});
            return;
        }
        this.loginService.doLogin(this.UserModel.username, this.UserModel.password);


    }

    logout() {                            // {4}
        this.loginService.loggedIn=false;
        this.router.navigate(['/login']);
    }




}
