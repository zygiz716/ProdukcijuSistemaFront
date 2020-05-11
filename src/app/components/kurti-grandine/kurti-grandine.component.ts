import { Component, OnInit } from '@angular/core';
import {Produkcija} from "../../model/produkcija";
import {FormControl, Validators} from "@angular/forms";
import {ProdukcijaService} from "../../services/produkcija.service";
import {ProdukcijuGrandine} from "../../model/produkciju-grandine";
import {ProdukcijuGrandineService} from "../../services/produkciju-grandine.service";
import {ReiksmiuTipai} from "../../enums/reiksmiu-tipai.enum";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-plano-kurimas',
  templateUrl: './kurti-grandine.component.html',
  styleUrls: ['./kurti-grandine.component.scss']
})
export class KurtiGrandineComponent implements OnInit {

  //produkcija:Produkcija = new Produkcija();
  produkcijos:Produkcija[] = [];
  grandine:ProdukcijuGrandine = new ProdukcijuGrandine();

  pavadinimas = new FormControl();
  ivestys = new FormControl();
  isvestis = new FormControl();
  reiksmiuTipai = Object.keys(ReiksmiuTipai);
  error = new BehaviorSubject(false);
  produkcijaControl = new FormControl();


  constructor(private produkcijaService:ProdukcijaService,
              private produkcijuGrandineService:ProdukcijuGrandineService,) { }

  ngOnInit(): void {
    this.produkcijaService.getProdukcijos().subscribe(list => {
      this.produkcijos = list;
    })
  }

  issaugoti() {
    if(this.pavadinimas.valid && this.ivestys.valid && this.isvestis.valid && this.produkcijaControl.valid) {
      this.produkcijuGrandineService.issaugotiGrandine(this.grandine);
    } else {
      this.error.next(true);
    }
  }

}
