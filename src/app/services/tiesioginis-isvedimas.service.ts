import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GrandinesInfo} from "../model/grandines-info";
import {Observable} from "rxjs";
import {TipasA} from "../model/tipas-a";
import {IsvedimasInfo} from "../model/isvedimas-info";
import {IsvedimoDuomenys} from "../model/isvedimo-duomenys";

@Injectable({
  providedIn: 'root'
})
export class TiesioginisIsvedimasService {

  constructor(private httpClient: HttpClient) { }

  vykdyti(info: IsvedimasInfo):Observable<IsvedimoDuomenys> {
    return this.httpClient.post<IsvedimoDuomenys>('http://localhost:8080/produkciju-isvedimas/tiesioginis-isvedimas', info)
  }
}
