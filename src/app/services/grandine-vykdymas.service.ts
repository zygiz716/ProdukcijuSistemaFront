import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {GrandinesInfo} from "../model/grandines-info";
import {TipasA} from "../model/tipas-a";
import {Observable} from "rxjs";
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class GrandineVykdymasService {

  constructor(private httpClient: HttpClient) { }

  vykdyti(grandinesInfo: GrandinesInfo):Observable<TipasA> {
    return this.httpClient.post<TipasA>('http://localhost:8080/produkciju-vykdymas', grandinesInfo)
  }

  vykdytiImage(grandinesInfo: GrandinesInfo):Observable<Blob> {
    return this.httpClient.post<Blob>('http://localhost:8080/produkciju-vykdymas/text-to-image', { responseType: 'blob'})
  }

  gautiFaila(info: GrandinesInfo) {
    this.httpClient.post('http://localhost:8080/produkciju-vykdymas/text-to-image', info,{ responseType: 'arraybuffer'}).subscribe(
      failas => {
        //var blob = new Blob(, { type: 'application/jpg' });
        console.log(failas);
        //var byteArray = new Uint8Array(response[0].binFileImage);
        var blob = new Blob([failas], { type: 'application/jpg' });
        console.log(blob);
        saveAs(blob, 'paveikslelis.jpg');
      }
      );
    }
}
