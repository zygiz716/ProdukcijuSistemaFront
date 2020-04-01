import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {DemoMaterialModule} from "./material-module";
import {Pagrindinis} from "./components/pagrindinis/pagrindinis";
import { KurtiGrandineComponent } from './components/kurti-grandine/kurti-grandine.component';
import { ProdukcijosComponent } from './components/produkcijos/produkcijos.component';
import { ProdukcijuGrandinesComponent } from './components/produkciju-grandines/produkciju-grandines.component';
import { KurtiProdukcijaComponent } from './components/kurti-produkcija/kurti-produkcija.component';
import { GrandinesVykdymasComponent } from './components/grandines-vykdymas/grandines-vykdymas.component';
import { TiesioginisIsvedimasComponent } from './components/tiesioginis-isvedimas/tiesioginis-isvedimas.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatOptionModule,
    MatSelectModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    MatNativeDateModule,
  ],
  declarations: [
    AppComponent,
    Pagrindinis,
    KurtiGrandineComponent,
    ProdukcijosComponent,
    ProdukcijuGrandinesComponent,
    KurtiProdukcijaComponent,
    GrandinesVykdymasComponent,
    TiesioginisIsvedimasComponent
  ],
  entryComponents: [AppComponent],
  bootstrap: [ AppComponent ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})

export class AppModule { }
