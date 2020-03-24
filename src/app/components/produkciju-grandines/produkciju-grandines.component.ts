import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Produkcija} from "../../model/produkcija";
import {ProdukcijuGrandine} from "../../model/produkciju-grandine";
import {ProdukcijuGrandineService} from "../../services/produkciju-grandine.service";
import {Router} from "@angular/router";

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

  grandines: ProdukcijuGrandine [] = [];

  constructor(private grandineService: ProdukcijuGrandineService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.grandineService.getGrandines().subscribe(
      list =>{
        this.grandines = list;
        console.log(this.grandines)
        this.dataSource = this.grandines;
      }
    )
  }
  stulpeliai: string[] = ['vykdyti','id', 'pavadinimas', 'produkcijos'];
  dataSource = this.grandines;

  vykdyti(id: number) {
    //this.produkcijaService.trintiProdukcija(id);
    this.router.navigate(['/grandines-vykdymas/' + id]);
  }
}
