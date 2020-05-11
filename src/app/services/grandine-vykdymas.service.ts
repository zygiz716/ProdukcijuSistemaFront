import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {GrandinesInfo} from "../model/grandines-info";
import {TipasA} from "../model/tipas-a";
import {BehaviorSubject, Observable} from "rxjs";
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
  zemelapioPavadinimas: BehaviorSubject<string> = new BehaviorSubject<string>('Visos produkcijos')
  spalva: string;
  suplanuotosProdukcijos: Produkcija[] = [];
  rodytiAnimacijosLanga: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  produkcijosRodymui: BehaviorSubject<Produkcija[]> = new BehaviorSubject<Produkcija[]>([]);
  atnaujintiAnimacija: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  nodes = [
    { id: 0, reflexive: false, color: 'ff00ff' },
    { id: 'labas vakaras', reflexive: false, color: 'ff00ff' },
    { id: 2, reflexive: false, color: 'ff00ff' }
  ];
  links = [
    { source: this.nodes[0], target: this.nodes[1], left: false, right: true, type: "KNOWS" },
    { source: this.nodes[1], target: this.nodes[2], left: false, right: true }
  ];

  constructor(private httpClient: HttpClient) {
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
      if(this.suplanuotosProdukcijos[0].pavadinimas === 'R1' && this.paprastasTekstas !== null){
        this.padidintiTeksta()
      }
      if(this.suplanuotosProdukcijos[0].pavadinimas === 'R2' && this.didelisTekstas !== null && this.spalva !== null){
        this.gautiTekstoPaveiksleli(this.didelisTekstas)
      }
      if(this.suplanuotosProdukcijos[0].pavadinimas === 'R3' && this.paprastasTekstas !== null){
        this.gautiTekstoPaveiksleli(this.paprastasTekstas)
      }
    }
  }

    padidintiTeksta() {
      const params = new HttpParams()
        .set('paprastasTekstas', this.paprastasTekstas)
      this.httpClient.get<Tekstas>('http://localhost:8080/produkciju-vykdymas/teksto-didinimas', {params}).subscribe(
        didelisTekstas => {
          this.didelisTekstas = didelisTekstas.tekstas;
          this.suplanuotosProdukcijos.shift();
          this.vykdytiGamybosGrandine()
        }
      );
    }

  gautiTekstoPaveiksleli(tekstas: string) {
    let info: InfoPaveiksleliui = new InfoPaveiksleliui();
    info.spalva = this.spalva;
    info.tekstas = tekstas;
    this.httpClient.post('http://localhost:8080/produkciju-vykdymas/paveikslelio-sukurimas', info, {responseType: 'arraybuffer'}).subscribe(
      failas => {
        var blob = new Blob([failas], {type: 'application/jpg'});
        saveAs(blob, 'paveikslelis.jpg');
        this.suplanuotosProdukcijos.shift();
        this.vykdytiGamybosGrandine()
      }
    );
  }

}
