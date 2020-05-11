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
import {ProdukcijuGrandineService} from "../../services/produkciju-grandine.service";
import {ProdukcijuGrandine} from "../../model/produkciju-grandine";
import {IsvedimoDuomenys} from "../../model/isvedimo-duomenys";

@Component({
  selector: 'app-tiesioginis-isvedimas',
  templateUrl: './tiesioginis-isvedimas.component.html',
  styleUrls: ['./tiesioginis-isvedimas.component.scss']
})
export class TiesioginisIsvedimasComponent implements OnInit {

  isvestiesBudas: string = 'tiesioginis';
  isvedimasIvykdytas: boolean = false;
  reiksmiuTipai = Object.keys(ReiksmiuTipai);
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
              public grandinesVykdymasService: GrandineVykdymasService,
              private produkcijuGrandineService: ProdukcijuGrandineService) { }

  ngOnInit(): void {
    this.produkcijaService.getProdukcijos().subscribe(produkcijos => this.produkcijos = produkcijos);
  }

  setValue(data:string){
    this.duomenys.next(data);
  }

  vykdytiIsvedima() {
    //if (this.isvedimasInfo && this.isvedimasInfo.isvestis && this.isvedimasInfo.ivestys.length > 0) {
    console.log(this.isvestiesBudas);
    if (this.isvestiesBudas === 'suKaina') {
      this.tiesioginisIsvedimasService.vykdytiSuKaina(this.isvedimasInfo).subscribe(value => {
        this.grandinesVykdymasService.suplanuotosProdukcijos = [];
        this.duomenys.next(value.isvedimoInfo);
        if (value.produkcijosIds.length > 0) {
          this.sukurtiGrandine(value);
        }
      });
    }
    if (this.isvestiesBudas === 'tiesioginis') {
      this.tiesioginisIsvedimasService.vykdyti(this.isvedimasInfo).subscribe(value => {
        this.grandinesVykdymasService.suplanuotosProdukcijos = [];
        this.duomenys.next(value.isvedimoInfo);
        if (value.produkcijosIds.length > 0) {
          this.sukurtiGrandine(value);
        }
      });
    }
    if (this.isvestiesBudas === 'atbulinis') {
      this.tiesioginisIsvedimasService.vykdytiAtbulinis(this.isvedimasInfo).subscribe(value => {
        this.grandinesVykdymasService.suplanuotosProdukcijos = [];
        this.duomenys.next(value.isvedimoInfo);
        if (value.produkcijosIds.length > 0) {
          this.sukurtiGrandine(value);
        }
        //this.grandinesVykdymasService.vykdytiGamybosGrandine()

      });
    }
  }

  sukurtiGrandine(duomenys: IsvedimoDuomenys){
    let grandine = new ProdukcijuGrandine();
    grandine.pavadinimas = this.isvestiesBudas;
    grandine.isvestis = this.isvedimasInfo.isvestis;
    grandine.ivestys = this.isvedimasInfo.ivestys;
    console.log(this.isvedimasInfo.ivestys)
    duomenys.produkcijosIds.forEach(id => {
      let prod = this.produkcijos.find(produkcija => produkcija.id === id);
      if (prod) {
        this.grandinesVykdymasService.suplanuotosProdukcijos.push(prod)
      }
    });
    grandine.produkcijos = this.grandinesVykdymasService.suplanuotosProdukcijos;
    this.produkcijuGrandineService.issaugotiIsvedimoGrandine(grandine);

    this.grandinesVykdymasService.produkcijosRodymui.next(grandine.produkcijos);
    this.grandinesVykdymasService.zemelapioPavadinimas.next('Produkcijų išvedimas');


    console.log(this.suplanuotosProdukcijos);
  }

}
