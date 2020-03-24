import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Produkcija} from "../model/produkcija";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProdukcijaService {

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  issaugotiProdukcija(produkcija: Produkcija) {
    this.httpClient.post<Produkcija>('http://localhost:8080/produkcijos/kurti-nauja', produkcija).subscribe(id => {
      console.log(id);
      this.router.navigate(['/produkcijos']);
    })
  }

  atnaujintiProdukcija(produkcija: Produkcija) {
    this.httpClient.patch<Produkcija>('http://localhost:8080/produkcijos/kurti-nauja', produkcija).subscribe(id => {
      console.log(id);
    })
  }

  trintiProdukcija(id: number) {
    console.log(id);
    this.httpClient.delete('http://localhost:8080/produkcijos/trinti/' + id).subscribe(id => {
      console.log(id);
    });
  }

  getProdukcijos(): Observable<Produkcija[]> {
    return this.httpClient.get<Produkcija[]>('http://localhost:8080/produkcijos')
  }
}
