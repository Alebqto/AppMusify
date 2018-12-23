import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpInterceptor, HttpResponse} from '@angular/common/http';
import {Router} from "@angular/router";
import 'rxjs/add/operator/do';
import {LoginService} from "./login.services";
import {ClientUtilServices} from "./clientUtilServices";
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _router: Router, private loginService : LoginService, private clientUtilService : ClientUtilServices) { }

  intercept(req,next){
      let currentUser = localStorage.getItem('clientToken');
      if (currentUser && this._router.toString() !== 'login') {
           req = req.clone({
              setHeaders: {
                  Authorization: 'Barrer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzA1NTcxODYsInVzZXJfbmFtZSI6ImFsZSIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwianRpIjoiZGViMDA5OTgtODk1NS00NjE2LWFjZjctNDE4MmNmNzM0MjhmIiwiY2xpZW50X2lkIjoiaXRhY2EtY2xpZW50Iiwic2NvcGUiOlsic2NvcGVfcmVhZCIsInNjb3BlX3dyaXRlIiwidHJ1c3QiXX0._cxTrxNz8epSeYgMKVtxRvMCfHyLbEhD1nAfqP8iGr'
              }
          })
      }

      const apiReq = req.clone({ url: this.clientUtilService.getHostURL()+req.url });
      return next.handle(apiReq).do((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              // do stuff with response if you want
          }
      }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                  this.loginService.logout();

              }else if(err.status === 500){
                  console.log("Error 500");
              }
          }

      });
  }

}
