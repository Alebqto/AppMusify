import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ClientUtilServices} from "./clientUtilServices";

@Injectable()
export class ArtistServices{
	public url: string;
	public id: string;
	constructor(
		public _http: HttpClient, private clientUtilService : ClientUtilServices

		){}


	addArtist(newArtist){
		let params = JSON.stringify(newArtist);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post(this.clientUtilService.getHostURL()+"artists?name="+newArtist.name+"&year="+newArtist.year, {headers: headers});

	}

    editArtist(editArtist){
        let params = JSON.stringify(editArtist);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.clientUtilService.getHostURL()+"artists/"+editArtist.id, params  , {headers: headers});

    }

    addPeoples(selectedPeoplesAvailables, artistSelected){
        let params = JSON.stringify(selectedPeoplesAvailables);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.clientUtilService.getHostURL()+"addPeoples/" + artistSelected.id,params, {headers: headers});

    }

    removePeoples(selectedPeopleAssociated){
        let params = JSON.stringify(selectedPeopleAssociated);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.clientUtilService.getHostURL()+"removePeoplesRelated/",params, {headers: headers});

    }


    addStylesArtist(selectedStylesAvailables, artistSelected){
        let params = JSON.stringify(selectedStylesAvailables);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.clientUtilService.getHostURL()+"addStylesArtist/" + artistSelected.id,params, {headers: headers});

    }

    removeStylesArtist(selectedStylesArtist, artistSelected){
        let params = JSON.stringify(selectedStylesArtist);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.clientUtilService.getHostURL()+"removeStylesArtist/" + artistSelected.id,params, {headers: headers});

    }








    addArtistRelated(selectedArtistAvailables, artistSelected){
        let params = JSON.stringify(selectedArtistAvailables);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.clientUtilService.getHostURL()+"addArtistRelated/" + artistSelected.id,params, {headers: headers});

    }

    removeArtistRelated(selectedArtistRelated, artistSelected){
        let params = JSON.stringify(selectedArtistRelated);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.clientUtilService.getHostURL()+"removeArtistRelated/" + artistSelected.id,params, {headers: headers});

    }


}