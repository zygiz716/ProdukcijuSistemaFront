import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Produkcija} from "../model/produkcija";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProdukcijaService {

  constructor(private httpClient: HttpClient) {
  }

  issaugotiProdukcija(produkcija: Produkcija) {
    this.httpClient.post<Produkcija>('http://localhost:8080/produkcijos/kurti-nauja', produkcija).subscribe(id => {
      console.log(id);
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
