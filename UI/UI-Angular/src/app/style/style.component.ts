import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClientUtilServices} from "../../services/clientUtilServices";
import {PeopleServices} from "../../services/people.services";
import {StyleServices} from "../../services/style.services";

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.css']
})
export class StyleComponent implements OnInit {


    private dataStyles:  any = [];
    private cols: any =[];
    private displayModal = false;
    private displayModalEdit = false;
    private newStyle: any = {};
    private editStyle: any = {};
    public messages = [];
    constructor( private http: HttpClient, private clientUtilService : ClientUtilServices, private styleService : StyleServices) { }

    ngOnInit(): void {
        this.cols = [
            { field: 'id', header: 'ID' },
            {field: 'name', header: 'Nombre' }
        ];

        this.getData();
    }

    private getData() {
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
                this.dataStyles = arrayStyles;
            },
            error => console.log('Error', error));
    }

    addStyle(){
        this.displayModal = true;
    }

    saveStyle(){
        if(this.newStyle.name == "" || this.newStyle.name == undefined){
            this.messages = [];
            this.messages.push({severity:'error', summary:'Error', detail:'debe ingresar un nombre al estilo'});
            return ;
        }

        this.styleService.addRegister(this.newStyle).subscribe(
            result => {
                this.messages = [];
                this.messages.push({severity:'success', summary:'Info', detail:'registro guardado con éxito'});
                this.displayModal = false;
                this.getData();
            },
            error =>{
                console.log(<any>error);
            });


    }

    cancelarSave(){
        this.displayModal=false;
    }

    cancelarEdit(){
        this.displayModalEdit=false;
    }

    goToEditStyle(data){
        this.displayModalEdit = true;
        this.editStyle=data;
    }

    saveEdit(){
        this.styleService.editArtist(this.editStyle).subscribe(
            result => {
                this.messages = [];
                this.messages.push({severity:'success', summary:'Info', detail:'Registro modificado con éxito'});
                this.displayModalEdit = false;
                this.getData();
            },
            error =>{
                console.log(<any>error);
            });
    }
}


