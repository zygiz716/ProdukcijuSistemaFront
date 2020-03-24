import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GrandinesInfo} from "../model/grandines-info";
import {TipasA} from "../model/tipas-a";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GrandineVykdymasService {

  constructor(private httpClient: HttpClient) { }

  vykdyti(grandinesInfo: GrandinesInfo):Observable<TipasA> {
    return this.httpClient.post<TipasA>('http://localhost:8080/produkciju-vykdymas', grandinesInfo)
  }
}
