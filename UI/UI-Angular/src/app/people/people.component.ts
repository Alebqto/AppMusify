import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClientUtilServices} from "../../services/clientUtilServices";
import {PeopleServices} from "../../services/people.services";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})



export class PeopleComponent implements OnInit  {

    private dataPeoples:  any = [];
    private cols: any =[];
    private displayModal = false;
    private displayModalEdit = false;
    private newPeople: any = {};
    private editPeople: any = {};
    public messages = [];
    constructor( private http: HttpClient, private clientUtilService : ClientUtilServices, private peopleService : PeopleServices) { }

    ngOnInit(): void {
        this.cols = [
            { field: 'id', header: 'ID' },
            {field: 'name', header: 'Nombre' },
            {field: 'years', header: 'Año' }
        ];

        this.getData();
    }

    private getData() {
        this.http.get(this.clientUtilService.getHostURL()+"peoples").subscribe((result) => {
                var arrayPeoples :any= [];
                for (var key in result) {
                    var people : any ={};
                    people = result[key];
                    let properties = {
                        id: people.id,
                        name: people.name,
                        years: people.years
                    };
                    arrayPeoples.push(properties);
                }
                this.dataPeoples = arrayPeoples;
            },
            error => console.log('Error', error));
    }

    addPeople(){
        this.displayModal = true;
    }

    savePeople(){
        if(this.newPeople.name == "" || this.newPeople.name == undefined){
            this.messages = [];
            this.messages.push({severity:'error', summary:'Error', detail:'debe ingresar un nombre a la persona'});
            return ;
        }
        if(this.newPeople.years == "" || this.newPeople.years == undefined){
            this.messages = [];
            this.messages.push({severity:'error', summary:'Error', detail:'debe ingresar la edad de la persona'});
            return ;
        }
        this.peopleService.addRegister(this.newPeople).subscribe(
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

    goToEditPeople(data){
        this.displayModalEdit = true;
        this.editPeople=data;
    }

    saveEdit(){
        this.peopleService.editArtist(this.editPeople).subscribe(
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


