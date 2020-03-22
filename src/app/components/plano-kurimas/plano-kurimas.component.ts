import { Component, OnInit } from '@angular/core';
import {Produkcija} from "../../model/produkcija";
import {FormControl, Validators} from "@angular/forms";
import {ProdukcijaService} from "../../services/produkcija.service";
import {ProdukcijuGrandine} from "../../model/produkciju-grandine";
import {ProdukcijuGrandineService} from "../../services/produkciju-grandine.service";

@Component({
  selector: 'app-plano-kurimas',
  templateUrl: './plano-kurimas.component.html',
  styleUrls: ['./plano-kurimas.component.scss']
})
export class PlanoKurimasComponent implements OnInit {

  //produkcija:Produkcija = new Produkcija();
  produkcijos:Produkcija[] = [];
  grandine:ProdukcijuGrandine = new ProdukcijuGrandine();

  produkcijosFormControl = new FormControl('', [Validators.required]);
  pavadinimas = new FormControl();

  constructor(private produkcijaService:ProdukcijaService,
              private produkcijuGrandineService:ProdukcijuGrandineService,) { }

  ngOnInit(): void {
    this.produkcijaService.getProdukcijos().subscribe(list => {
      this.produkcijos = list;
    })
  }

  getErrorMessageProdukcijos() {
    return this.produkcijosFormControl.hasError('required') ? 'Pasirinkite bent vieną produkciją' : '';
  }

  issaugoti() {
    this.produkcijuGrandineService.issaugotiGrandine(this.grandine);
    console.log(this.grandine);
  }

}
