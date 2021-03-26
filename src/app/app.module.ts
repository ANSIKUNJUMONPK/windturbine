import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { DetailsComponent } from './details/details.component';
import { TableComponent } from './table/table.component';
import {MatCardModule} from '@angular/material/card';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';


import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MainComponent } from './main/main.component';
import {AppRoutingModule} from './app-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import {FormsModule} from '@angular/forms';

import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = []
@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    TableComponent,
    MainComponent
    
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule ,
    AgGridModule.withComponents([]),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatListModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule
   
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
