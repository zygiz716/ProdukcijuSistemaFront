import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Pagrindinis} from "./components/pagrindinis/pagrindinis";
import {KurtiGrandineComponent} from "./components/kurti-grandine/kurti-grandine.component";
import {ProdukcijosComponent} from "./components/produkcijos/produkcijos.component";
import {ProdukcijuGrandinesComponent} from "./components/produkciju-grandines/produkciju-grandines.component";
import {KurtiProdukcijaComponent} from "./components/kurti-produkcija/kurti-produkcija.component";
import {GrandinesVykdymasComponent} from "./components/grandines-vykdymas/grandines-vykdymas.component";
import {TiesioginisIsvedimasComponent} from "./components/tiesioginis-isvedimas/tiesioginis-isvedimas.component";

const routes: Routes = [
  { path: '', redirectTo: '/pagrindinis', pathMatch: 'full' },
  { path: 'pagrindinis', component: Pagrindinis },
  { path: 'produkcijos', component: ProdukcijosComponent },
  { path: 'produkcijos/kurti-nauja', component: KurtiProdukcijaComponent },
  { path: 'produkciju-grandines', component: ProdukcijuGrandinesComponent },
  { path: 'produkciju-grandines/kurti-nauja', component: KurtiGrandineComponent },
  { path: 'tiesioginis-isvedimas', component: TiesioginisIsvedimasComponent },
  { path: 'grandines-vykdymas/:id', component: GrandinesVykdymasComponent },
  { path: '**', redirectTo: '/pagrindinis', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
