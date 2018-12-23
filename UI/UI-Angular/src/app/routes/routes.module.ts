import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {ArtistComponent} from "../artist/artist.component";
import {PeopleComponent} from "../people/people.component";
import {StyleComponent} from "../style/style.component";

// - Routes instead of RouteConfig
// - RouterModule instead of provideRoutes
const routes: Routes = [
    {
        path: 'artists',
        component: ArtistComponent
    },{
        path: 'peoples',
        component: PeopleComponent
    },{
        path: 'styles',
        component: StyleComponent
    },
    {
        path: '',
        component: LoginComponent
    },
];

// - Updated Export
export const routing = RouterModule.forRoot(routes);


@NgModule({
    imports: [
        CommonModule
    ],
    declarations: []
})
export class RoutesModule { }