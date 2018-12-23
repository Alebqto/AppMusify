import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ClientUtilServices} from "./clientUtilServices";

@Injectable()
export class StyleServices{
	public url: string;
	public id: string;
	constructor(
		public _http: HttpClient, private clientUtilService : ClientUtilServices

		){}


	addRegister(newStyle){
		let params = JSON.stringify(newStyle);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.clientUtilService.getHostURL()+"style?name="+newStyle.name, {headers: headers});

	}


    editArtist(editStyle){
        let params = JSON.stringify(editStyle);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.clientUtilService.getHostURL()+"style/"+editStyle.id, params  , {headers: headers});

	}

	getStyles(){
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.clientUtilService.getHostURL()+"styles/"  , {headers: headers});

    }


}