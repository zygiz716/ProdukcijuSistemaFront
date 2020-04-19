import { Component, OnInit } from '@angular/core';
import {ReiksmiuTipai} from "../../enums/reiksmiu-tipai.enum";
import {IsvedimasInfo} from "../../model/isvedimas-info";
import {BehaviorSubject} from "rxjs";
import {FormControl} from "@angular/forms";
import {GrandinesInfo} from "../../model/grandines-info";
import {TiesioginisIsvedimasService} from "../../services/tiesioginis-isvedimas.service";
import {Produkcija} from "../../model/produkcija";
import {ProdukcijaService} from "../../services/produkcija.service";
import {Spalvos} from "../../enums/spalvos.enum";
import {GrandineVykdymasService} from "../../services/grandine-vykdymas.service";

@Component({
  selector: 'app-tiesioginis-isvedimas',
  templateUrl: './tiesioginis-isvedimas.component.html',
  styleUrls: ['./tiesioginis-isvedimas.component.scss']
})
export class TiesioginisIsvedimasComponent implements OnInit {

  reiksmiuTipai = Object.values(ReiksmiuTipai);
  spalvos = Object.values(Spalvos);
  reiksmiuTipuReiksmes = ReiksmiuTipai;
  isvedimasInfo: IsvedimasInfo = new IsvedimasInfo();
  duomenys = new BehaviorSubject<string>('');
  paprastasTekstas: string;
  didelisTekstas: string;
  spalva: string;
  tekstas = new FormControl();
  tekstas1 = new FormControl();
  tekstas2 = new FormControl();
  produkcijos: Produkcija[] = [];
  suplanuotosProdukcijos: Produkcija[] = [];
  rodytiTekstoIvedimoLauka: boolean = false;

  constructor(private tiesioginisIsvedimasService: TiesioginisIsvedimasService,
              private produkcijaService: ProdukcijaService,
              private grandinesVykdymasService: GrandineVykdymasService) { }

  ngOnInit(): void {
    this.produkcijaService.getProdukcijos().subscribe(produkcijos => this.produkcijos = produkcijos);
  }

  setValue(data:string){
    this.duomenys.next(data);
  }

  vykdyti() {
    //if (this.isvedimasInfo && this.isvedimasInfo.isvestis && this.isvedimasInfo.ivestys.length > 0) {
      this.tiesioginisIsvedimasService.vykdyti(this.isvedimasInfo).subscribe(value => {
        this.grandinesVykdymasService.suplanuotosProdukcijos = [];
        console.log(value.produkcijosIds);
        console.log(this.produkcijos);
        this.duomenys.next(value.isvedimoInfo);
        value.produkcijosIds.forEach( id => {
          let prod = this.produkcijos.find( produkcija => produkcija.id === id);
          if(prod){this.grandinesVykdymasService.suplanuotosProdukcijos.push(prod)}});
        console.log(this.suplanuotosProdukcijos);
        this.grandinesVykdymasService.vykdytiGamybosGrandine()

      });
    //}
  }

}
