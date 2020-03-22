import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Produkcija} from "../model/produkcija";
import {Observable} from "rxjs";
import {ProdukcijuGrandine} from "../model/produkciju-grandine";

@Injectable({
  providedIn: 'root'
})
export class ProdukcijuGrandineService {

  constructor(private httpClient: HttpClient) {
  }

  issaugotiGrandine(grandine: ProdukcijuGrandine) {
    this.httpClient.post<ProdukcijuGrandine>('http://localhost:8080/produkciju-grandines/kurti-nauja', grandine).subscribe(id => {
      console.log(id);
    })
  }

  atnaujintiGrandine(grandine: ProdukcijuGrandine) {
    this.httpClient.patch<ProdukcijuGrandine>('http://localhost:8080/produkciju-grandines/kurti-nauja', grandine).subscribe(id => {
      console.log(id);
    })
  }

  trintiGrandine(id: number) {
    console.log(id);
    this.httpClient.delete('http://localhost:8080/produkciju-grandines/trinti/' + id).subscribe(id => {
      console.log(id);
    });
  }

  getGrandines(): Observable<ProdukcijuGrandine[]> {
    return this.httpClient.get<ProdukcijuGrandine[]>('http://localhost:8080/produkciju-grandines')
  }
}
