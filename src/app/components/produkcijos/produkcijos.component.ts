import { Component, OnInit } from '@angular/core';
import {Produkcija} from "../../model/produkcija";
import {ProdukcijaService} from "../../services/produkcija.service";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-produkcijos',
  templateUrl: './produkcijos.component.html',
  styleUrls: ['./produkcijos.component.scss']
})
export class ProdukcijosComponent implements OnInit {

  stulpeliai: string[] = ['id', 'pavadinimas', 'ivestys', 'isvestis','kaina', 'trinti'];
  produkcijos: Produkcija [] = [];
  dataSource = this.produkcijos;

  constructor(private produkcijaService: ProdukcijaService,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              private router: Router) {
    iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }

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
    location.reload();
  }

  vykdyti(id: number) {
    //this.produkcijaService.trintiProdukcija(id);
    this.router.navigate(['/grandines-vykdymas/' + id]);
  }

}

