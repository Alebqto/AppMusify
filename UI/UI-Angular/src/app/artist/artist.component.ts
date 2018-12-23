import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
import {ConfirmationService} from 'primeng/api';

import * as $ from 'jquery';
import {forEach} from "@angular/router/src/utils/collection";
import {ClientUtilServices} from "../../services/clientUtilServices";
import {ArtistServices} from "../../services/artist.services";
import {StyleServices} from "../../services/style.services";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})


export class ArtistComponent implements OnInit {

    private dataArtists:  any = [];
    private cols: any =[];
    private stylesArtist: any =[];
    private colstyle: any =[];
    private colsPeople: any =[];
    private dataArtistRelated:  any = [];
    private dataStylesArtist:  any = [];
    private selectedStylesArtist:  any = [];
    private selectedStylesAvailables:  any = [];
    private dataArtistAvailables:  any = [];
    private dataStylesAvailables:  any = [];
    private displayModal = false;
    private displayModalEdit = false;
    private newArtist: any = {};
    private artistSelectd: any = {};
    private selectedArtistAvailables = [];
    private selectedPeopleAssociated = [];
    private selectedPeoplesAvailables = [];
    private selectedArtistRelated = [];
    private dataPeoplesAvailables :  any = [];
    private editArtist: any = {};
    public messages = [];
    private artistSelectedUpdate = false;
    private displayModalAdminPeopleRelated = false;
    private displayModalAdminArtistRelated = false;
    private displayModalAdminStyles = false;
    private styleSelected  :  any =[];
    constructor( private http: HttpClient, private clientUtilService : ClientUtilServices, private artistService : ArtistServices, private styleService: StyleServices) { }

    ngOnInit(): void {
        this.cols = [
            { field: 'id', header: 'ID' },
            {field: 'name', header: 'Nombre' },
            {field: 'year', header: 'Año' }
        ];
        this.colstyle = [
            { field: 'id', header: 'ID' },
            {field: 'name', header: 'Nombre' }
        ];
        this.colsPeople = [
            { field: 'id', header: 'ID' },
            {field: 'name', header: 'Nombre' },
            {field: 'years', header: 'Año' }
        ];


        this.getData();
        this.getPeoplesAvailable();
        this.getStylesArtist();
    }

    searchArtistByStyle(){
        if(this.styleSelected.id != null){
            this.getDataByStyle();
        }else{
            this.getData();
        }
    }

     getDataByStyle() {
        this.http.get(this.clientUtilService.getHostURL()+"artistByStyle/" + this.styleSelected.id).subscribe((result) => {
                var arrayArtists :any= [];
                for (var key in result) {
                    var artist : any ={};
                    artist = result[key];
                    let properties = {
                        id: artist.id,
                        name: artist.name,
                        year: artist.year,
                        members: artist.members,
                        styles: artist.styles
                    };
                    arrayArtists.push(properties);
                }
                this.dataArtists = arrayArtists;
                if(this.artistSelectedUpdate){
                    this.getStylesAvailables();
                    this.updateArtistSelected();
                }
            },
            error => console.log('Error', error));
    }

    private getData() {
        this.http.get(this.clientUtilService.getHostURL()+"artists").subscribe((result) => {
         var arrayArtists :any= [];
            for (var key in result) {
                var artist : any ={};
                artist = result[key];
                let properties = {
                    id: artist.id,
                    name: artist.name,
                    year: artist.year,
                    members: artist.members,
                    styles: artist.styles
                };
                arrayArtists.push(properties);
            }
           this.dataArtists = arrayArtists;
            if(this.artistSelectedUpdate){
                this.getStylesAvailables();
                this.updateArtistSelected();
            }
        },
            error => console.log('Error', error));
    }

    private getPeoplesAvailable() {
        this.http.get(this.clientUtilService.getHostURL()+"peoplesAvailable").subscribe((result) => {
                var arrayPeoplesAvailable :any= [];
                for (var key in result) {
                    var people : any ={};
                    people = result[key];
                    let properties = {
                        id: people.id,
                        name: people.name,
                        years: people.years
                    };
                    arrayPeoplesAvailable.push(properties);
                }
                this.dataPeoplesAvailables = arrayPeoplesAvailable;
            },
            error => console.log('Error', error));
    }

    private getArtistRelated() {
        this.http.get(this.clientUtilService.getHostURL()+"artistRelated/" + this.artistSelectd.id).subscribe((result) => {
                var arrayArtistRelated :any= [];
                for (var key in result) {
                    var artist : any ={};
                    artist = result[key];
                    let properties = {
                        id: artist.id,
                        name: artist.name,
                        years: artist.year
                    };
                    arrayArtistRelated.push(properties);
                }
                this.dataArtistRelated = arrayArtistRelated;
                this.getArtistAvailables();
            },
            error => console.log('Error', error));
    }



    addArtist(){
        this.displayModal = true;
    }

    getArtistAvailables(){
this.dataArtistAvailables = this.dataArtists;
        const deleteObj = (data, column, search) => {
            let result = data.filter(m => m[column] !== search);

            return result;
        }
    for (var i = 0; i < this.dataArtistRelated.length; i++){
    var obj = this.dataArtistRelated[i].id;

        this.dataArtistAvailables = deleteObj(this.dataArtistAvailables, 'id', obj);
}
        this.dataArtistAvailables = deleteObj(this.dataArtistAvailables, 'id', this.artistSelectd.id);

    }



    saveArtist(){
      if(this.newArtist.name == "" || this.newArtist.name == undefined){
          this.messages = [];
          this.messages.push({severity:'error', summary:'Error', detail:'debe ingresar un nombre al artista'});
          return ;
      }
        if(this.newArtist.year == "" || this.newArtist.year == undefined){
            this.messages = [];
            this.messages.push({severity:'error', summary:'Error', detail:'debe ingresar una año al artista'});
            return ;
        }
            this.artistService.addArtist(this.newArtist).subscribe(
                result => {
                    this.messages = [];
                    this.messages.push({severity:'success', summary:'Info', detail:'registro guardado con éxito'});
                    this.displayModal = false;
                    this.searchArtistByStyle();
                },
                error =>{
                    console.log(<any>error);
                });


    }

    addPeoples(){
        this.artistService.addPeoples(this.selectedPeoplesAvailables, this.artistSelectd).subscribe(
            result => {
                this.messages = [];
                this.selectedPeoplesAvailables = [];
                this.messages.push({severity:'success', summary:'Info', detail:'gente vinculadas con éxito'});
                this.artistSelectedUpdate = true;
                this.searchArtistByStyle();
                this.getPeoplesAvailable();

            },
            error =>{
                console.log(<any>error);
            });


    }


    addArtistRelated(){
        this.artistService.addArtistRelated(this.selectedArtistAvailables, this.artistSelectd).subscribe(
            result => {
                this.messages = [];

                this.messages.push({severity:'success', summary:'Info', detail:'artistas vinculados con éxito'});
                this.artistSelectedUpdate = true;
                this.getArtistRelated();
                this.selectedArtistAvailables = [];
                this.selectedArtistRelated = [];
            },
            error =>{
                console.log(<any>error);
            });


    }

    removeArtistRelated(){
        this.artistService.removeArtistRelated(this.selectedArtistRelated, this.artistSelectd).subscribe(
            result => {
                this.messages = [];

                this.messages.push({severity:'success', summary:'Info', detail:'artistas desvinculados con éxito'});
                this.artistSelectedUpdate = true;
                this.getArtistRelated();
                this.selectedArtistRelated = [];
                this.selectedArtistAvailables = [];
            },
            error =>{
                console.log(<any>error);
            });


    }


    updateArtistSelected(){
    for (var i = 0; i < this.dataArtists.length; i++){
    var obj = this.dataArtists[i];
    if(this.artistSelectd.id === obj["id"]){
    this.artistSelectd = obj;

}


}

        this.artistSelectedUpdate = false;
    }
    removePeoples(){
        this.artistService.removePeoples(this.selectedPeopleAssociated).subscribe(
            result => {
                this.messages = [];
                this.selectedPeopleAssociated = [];
                this.messages.push({severity:'success', summary:'Info', detail:'gente desvinculadas con éxito'});
                this.artistSelectedUpdate = true;
                this.searchArtistByStyle();
                this.getPeoplesAvailable();


            },
            error =>{
                console.log(<any>error);
            });


    }


    cancelarSave(){
        this.displayModal=false;
        this.messages = [];
    }

    cancelarEdit(){
        this.displayModalEdit=false;
        this.messages = [];
    }
    closeModalAdminPeopleRelated(){
        this.displayModalAdminPeopleRelated=false
        this.messages = [];
    }
    closeModalAdminArtistRelatedd(){
        this.displayModalAdminArtistRelated=false;
        this.messages = [];
    }
    closeModalAdminStyles(){
        this.displayModalAdminStyles=false;
        this.messages = [];
    }


    goToEditArtist(data){
        this.displayModalEdit = true;
        this.editArtist=data;
        this.messages = [];
    }

    goToAdminPeopleRelated(data){
        this.displayModalAdminPeopleRelated = true;
        this.artistSelectd=data;
        this.messages = [];
    }

    goToAdminStylesArtist(data){
        this.displayModalAdminStyles = true;
        this.artistSelectd=data;
        this.getStylesAvailables();
        this.messages = [];
    }

    goToAdminArtistRelated(data){
        this.displayModalAdminArtistRelated = true;
        this.artistSelectd=data;
        this.getArtistRelated();
        this.messages = [];
    }

    saveEdit(){
        this.artistService.editArtist(this.editArtist).subscribe(
            result => {
                this.messages = [];
                this.messages.push({severity:'success', summary:'Info', detail:'Registro modificado con éxito'});
                this.displayModalEdit = false;
                this.searchArtistByStyle();
            },
            error =>{
                console.log(<any>error);
            });
    }

    private getStylesAvailables() {
        this.http.get(this.clientUtilService.getHostURL()+"styles").subscribe((result) => {
                var arrayStyles :any= [];
                for (var key in result) {
                    var style : any ={};
                    style = result[key];
                    let properties = {
                        id: style.id,
                        name: style.name
                    };
                    arrayStyles.push(properties);
                }
                this.dataStylesAvailables = arrayStyles;

                const deleteObj = (data, column, search) => {
                    let result = data.filter(m => m[column] !== search);

                    return result;
                }

                for (var i = 0; i < this.artistSelectd.styles.length; i++){
                    var obj = this.artistSelectd.styles[i].id;

                    this.dataStylesAvailables = deleteObj(this.dataStylesAvailables, 'id', obj);
                }

            },
            error => console.log('Error', error));
    }


    addStylesArtist(){
        this.artistService.addStylesArtist(this.selectedStylesAvailables, this.artistSelectd).subscribe(
            result => {
                this.messages = [];

                this.messages.push({severity:'success', summary:'Info', detail:'estilos vinculados con éxito'});
                this.artistSelectedUpdate = true;
                this.searchArtistByStyle();
                this.getStylesAvailables();
                this.selectedStylesAvailables = [];
                this.selectedStylesArtist = [];
            },
            error =>{
                console.log(<any>error);
            });
    }

    removeStylesArtist(){
        this.artistService.removeStylesArtist(this.selectedStylesArtist, this.artistSelectd).subscribe(
            result => {
                this.messages = [];

                this.messages.push({severity:'success', summary:'Info', detail:'estilos desvinculados con éxito'});
                this.artistSelectedUpdate = true;

                this.searchArtistByStyle();
                this.selectedStylesAvailables = [];
                this.selectedStylesArtist = [];



            },
            error =>{
                console.log(<any>error);
            });
    }

    getStylesArtist(){
        this.styleService.getStyles().subscribe(
            result => {
             let   styles: any =[];

             this.stylesArtist = result;
                let todos =   {id: null, name: "Todos"};
                this.stylesArtist.push(todos);

            },
            error =>{
                console.log(<any>error);
            });
    }



}
