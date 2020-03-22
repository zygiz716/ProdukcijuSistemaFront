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
import { PlanoKurimasComponent } from './components/plano-kurimas/plano-kurimas.component';
import { ProdukcijosComponent } from './components/produkcijos/produkcijos.component';
import { ProdukcijuGrandinesComponent } from './components/produkciju-grandines/produkciju-grandines.component';
import { KurtiProdukcijaComponent } from './components/kurti-produkcija/kurti-produkcija.component';

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
    PlanoKurimasComponent,
    ProdukcijosComponent,
    ProdukcijuGrandinesComponent,
    KurtiProdukcijaComponent
  ],
  entryComponents: [AppComponent],
  bootstrap: [ AppComponent ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})

export class AppModule { }
