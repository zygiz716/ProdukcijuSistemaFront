import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Produkcija} from "../../model/produkcija";
import {Router, RouterLink} from "@angular/router";
import {ProdukcijaService} from "../../services/produkcija.service";

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

  constructor(private produkcijaService:ProdukcijaService,
              private router: Router) { }

  ngOnInit(): void {
  }

  getErrorMessageIvestis() {
    return this.ivestis.hasError('required') ? 'Įvestis privaloma' : '';
  }

  getErrorMessageIsvestis() {
    return this.isvestis.hasError('required') ? 'Išvestis privaloma' : '';
  }

  issaugoti() {
    this.produkcijaService.issaugotiProdukcija(this.produkcija);
  }

}
