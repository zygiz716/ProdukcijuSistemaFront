import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Produkcija} from "../../model/produkcija";
import {ProdukcijuGrandine} from "../../model/produkciju-grandine";

@Component({
  selector: 'app-produkciju-grandines',
  templateUrl: './produkciju-grandines.component.html',
  styleUrls: ['./produkciju-grandines.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProdukcijuGrandinesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  stulpeliai: string[] = ['id', 'pavadinimas', 'produkcijos'];
  dataSource = ELEMENT_DATA;

}

const ELEMENT_DATA: ProdukcijuGrandine[] = [
  {
    id: 1,
    pavadinimas: 'Produkciju grandine 1',
    produkcijos: [
      {id: 1, pavadinimas: 'Iš A į B', ivestis: 'A', isvestis: 'B'},
      {id: 2, pavadinimas: 'Iš B į C', ivestis: 'B', isvestis: 'C'},
      {id: 3, pavadinimas: 'Iš C į D', ivestis: 'C', isvestis: 'D'}]
  },
  {
    id: 2,
    pavadinimas: 'Produkciju grandine 2',
    produkcijos: [
      {id: 2, pavadinimas: 'Iš B į C', ivestis: 'B', isvestis: 'C'},
      {id: 3, pavadinimas: 'Iš C į D', ivestis: 'C', isvestis: 'D'}]
  },
  {
    id: 3,
    pavadinimas: 'Produkciju grandine 3',
    produkcijos: [
      {id: 1, pavadinimas: 'Iš A į B', ivestis: 'A', isvestis: 'B'},
      {id: 2, pavadinimas: 'Iš B į C', ivestis: 'B', isvestis: 'C'}]
  }
];
