import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent} from './main/main.component';
import {DetailsComponent} from './details/details.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [{path:'',component:MainComponent},
{path:"details/:id/:date",component:DetailsComponent}];

@NgModule({
  imports: [
    [RouterModule.forRoot(routes)] 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
