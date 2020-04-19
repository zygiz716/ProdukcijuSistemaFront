import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {GrandinesInfo} from "../model/grandines-info";
import {TipasA} from "../model/tipas-a";
import {Observable} from "rxjs";
import { saveAs } from 'file-saver';
import {Produkcija} from "../model/produkcija";
import {Tekstas} from "../model/tekstas";
import {InfoPaveiksleliui} from "../model/info-paveiksleliui";

@Injectable({
  providedIn: 'root'
})
export class GrandineVykdymasService {

  paprastasTekstas: string;
  didelisTekstas: string;
  spalva: string;
  suplanuotosProdukcijos: Produkcija[] = [];

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



  vykdytiGamybosGrandine(){
    console.log(this.suplanuotosProdukcijos);
    if(this.suplanuotosProdukcijos.length > 0){
      if(this.suplanuotosProdukcijos[0].id === 29 && this.paprastasTekstas !== null){
        this.padidintiTeksta()
      }
      if(this.suplanuotosProdukcijos[0].id === 30 && this.didelisTekstas !== null && this.spalva !== null){
        this.gautiTekstoPaveiksleli()
      }
    }
  }

    padidintiTeksta() {
    console.log(this.paprastasTekstas);
      const params = new HttpParams()
        .set('paprastasTekstas', this.paprastasTekstas)
      this.httpClient.get<Tekstas>('http://localhost:8080/produkciju-vykdymas/teksto-didinimas', {params}).subscribe(
        didelisTekstas => {
          console.log(didelisTekstas);
          this.didelisTekstas = didelisTekstas.tekstas;
          this.suplanuotosProdukcijos.shift();
          this.vykdytiGamybosGrandine()
        }
      );
    }

  gautiTekstoPaveiksleli() {
let info: InfoPaveiksleliui = new InfoPaveiksleliui();
info.spalva = this.spalva;
info.tekstas = this.didelisTekstas;
    this.httpClient.post('http://localhost:8080/produkciju-vykdymas/paveikslelio-sukurimas', info,{ responseType: 'arraybuffer'}).subscribe(
      failas => {
        //var blob = new Blob(, { type: 'application/jpg' });
        console.log(failas);
        //var byteArray = new Uint8Array(response[0].binFileImage);
        var blob = new Blob([failas], { type: 'application/jpg' });
        console.log(blob);
        saveAs(blob, 'paveikslelis.jpg');
        this.suplanuotosProdukcijos.shift();
        this.vykdytiGamybosGrandine()
      }
    );
  }

}
