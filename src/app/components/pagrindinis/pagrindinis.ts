import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Produkcija} from "../../model/produkcija";
import {Subject} from "rxjs";

/** @title Select with multiple selection */
@Component({
  selector: 'select-multiple-example',
  templateUrl: 'pagrindinis.html',
  styleUrls: ['pagrindinis.css'],
})
export class Pagrindinis implements OnInit{
  produkcijos: Produkcija[] = [];
  pasirinktosProdukcijos: Produkcija[] = [];

  ngOnInit(): void {
    let p1:Produkcija = new Produkcija()
    p1.id=1;
    p1.pavadinimas='Iš A Į B';
    p1.ivestis = 'A';
    p1.isvestis = 'B';

    let p2:Produkcija = new Produkcija()
    p2.id=2;
    p2.pavadinimas='Iš B Į C';
    p2.ivestis = 'B';
    p2.isvestis = 'C';

    let p3:Produkcija = new Produkcija()
    p3.id=3;
    p3.pavadinimas='Iš C Į D';
    p3.ivestis = 'C';
    p3.isvestis = 'D';

    this.produkcijos.push(p1);
    this.produkcijos.push(p2);
    this.produkcijos.push(p3);

    console.log(this.produkcijos)
  }

  printProd(){
    console.log(this.pasirinktosProdukcijos)
  }
}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
