import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GrandinesInfo} from "../model/grandines-info";
import {Observable} from "rxjs";
import {TipasA} from "../model/tipas-a";
import {IsvedimasInfo} from "../model/isvedimas-info";

@Injectable({
  providedIn: 'root'
})
export class TiesioginisIsvedimasService {

  constructor(private httpClient: HttpClient) { }

  vykdyti(info: IsvedimasInfo):Observable<TipasA> {
    return this.httpClient.post<TipasA>('http://localhost:8080/produkciju-isvedimas/tiesioginis-isvedimas', info)
  }
}
