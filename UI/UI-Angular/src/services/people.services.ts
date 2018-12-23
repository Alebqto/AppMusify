import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ClientUtilServices} from "./clientUtilServices";

@Injectable()
export class PeopleServices{
	public url: string;
	public id: string;
	constructor(
		public _http: HttpClient, private clientUtilService : ClientUtilServices

		){}


	addRegister(newPeople){
		let params = JSON.stringify(newPeople);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.clientUtilService.getHostURL()+"peoples?name="+newPeople.name+"&years="+newPeople.years, {headers: headers});

	}

    editArtist(editPeople){
        let params = JSON.stringify(editPeople);
        console.log(params);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.clientUtilService.getHostURL()+"peoples/"+editPeople.id, params  , {headers: headers});

	}


}