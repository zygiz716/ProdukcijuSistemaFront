import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Pagrindinis} from "./components/pagrindinis/pagrindinis";
import {PlanoKurimasComponent} from "./components/plano-kurimas/plano-kurimas.component";
import {ProdukcijosComponent} from "./components/produkcijos/produkcijos.component";
import {ProdukcijuGrandinesComponent} from "./components/produkciju-grandines/produkciju-grandines.component";
import {KurtiProdukcijaComponent} from "./components/kurti-produkcija/kurti-produkcija.component";

const routes: Routes = [
  { path: '', redirectTo: '/pagrindinis', pathMatch: 'full' },
  { path: 'pagrindinis', component: Pagrindinis },
  { path: 'produkcijos', component: ProdukcijosComponent },
  { path: 'produkcijos/kurti-nauja', component: KurtiProdukcijaComponent },
  { path: 'gamybos-grandines', component: ProdukcijuGrandinesComponent },
  { path: 'gamybos-grandines/kurti-nauja', component: PlanoKurimasComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
