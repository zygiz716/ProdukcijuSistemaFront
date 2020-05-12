import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Produkcija} from "../../model/produkcija";
import {Router, RouterLink} from "@angular/router";
import {ProdukcijaService} from "../../services/produkcija.service";
import {ReiksmiuTipai} from "../../enums/reiksmiu-tipai.enum";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-kurti-produkcija',
  templateUrl: './kurti-produkcija.component.html',
  styleUrls: ['./kurti-produkcija.component.scss']
})
export class KurtiProdukcijaComponent implements OnInit {

  produkcija:Produkcija = new Produkcija();

  ivestis = new FormControl('', [Validators.required]);
  isvestis = new FormControl('', [Validators.required]);
  pavadinimas = new FormControl();
  kaina = new FormControl();
  reiksmiuTipai = Object.keys(ReiksmiuTipai);
  error = new BehaviorSubject(false);

  constructor(private produkcijaService:ProdukcijaService,
              private router: Router) { }

  ngOnInit(): void {
  }

  issaugoti() {
    if(this.pavadinimas.valid && this.ivestis.valid && this.isvestis.valid && this.isvestis.valid) {
      this.produkcijaService.issaugotiProdukcija(this.produkcija);
    } else {
      this.error.next(true);
    }
  }

}
