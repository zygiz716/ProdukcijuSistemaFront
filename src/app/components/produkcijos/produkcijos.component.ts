import { Component, OnInit } from '@angular/core';
import {Produkcija} from "../../model/produkcija";
import {ProdukcijaService} from "../../services/produkcija.service";

@Component({
  selector: 'app-produkcijos',
  templateUrl: './produkcijos.component.html',
  styleUrls: ['./produkcijos.component.scss']
})
export class ProdukcijosComponent implements OnInit {

  stulpeliai: string[] = ['id', 'pavadinimas', 'ivestis', 'isvestis', 'trinti'];
  produkcijos: Produkcija [] = [];
  dataSource = this.produkcijos;

  constructor(private produkcijaService: ProdukcijaService) { }

  ngOnInit(): void {
     this.produkcijaService.getProdukcijos().subscribe(
       list =>{
         this.produkcijos = list;
         console.log(this.produkcijos)
         this.dataSource = this.produkcijos;
       }
     )
  }

  trinti(id:number){
    this.produkcijaService.trintiProdukcija(id);
  }

}

const ELEMENT_DATA: Produkcija[] = [
  {id: 1, pavadinimas: 'Iš A į B', ivestis: 'A', isvestis: 'B'},
  {id: 2, pavadinimas: 'Iš B į C', ivestis: 'B', isvestis: 'C'},
  {id: 3, pavadinimas: 'Iš C į D', ivestis: 'C', isvestis: 'D'}
];

