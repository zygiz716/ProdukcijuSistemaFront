import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProdukcijuGrandineService} from "../../services/produkciju-grandine.service";
import {ProdukcijuGrandine} from "../../model/produkciju-grandine";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {take} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {PlanoVykdymasService} from "../../services/plano-vykdymas.service";
import {GrandinesInfo} from "../../model/grandines-info";
import {TipasA} from "../../model/tipas-a";
import {FormControl, Validators} from "@angular/forms";
import { saveAs } from 'file-saver';
import {ReiksmiuTipai} from "../../enums/reiksmiu-tipai.enum";
import {Spalvos} from "../../enums/spalvos.enum";
import {IsvedimasInfo} from "../../model/isvedimas-info";

@Component({
  selector: 'app-grandines-vykdymas',
  templateUrl: './grandines-vykdymas.component.html',
  styleUrls: ['./grandines-vykdymas.component.scss']
})
export class GrandinesVykdymasComponent implements OnInit {

  grandine: ProdukcijuGrandine = new ProdukcijuGrandine();
  //tipasA = new BehaviorSubject<TipasA>(null);
  //duomenys = new BehaviorSubject<string>('');
  tekstas = new FormControl();

  constructor(private _Activatedroute: ActivatedRoute,
              private grandineService: ProdukcijuGrandineService,
              private _ngZone: NgZone,
              public grandinesVykdymasService: PlanoVykdymasService) {
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  reiksmiuTipai = Object.keys(ReiksmiuTipai);
  spalvos = Object.values(Spalvos);
  reiksmiuTipuReiksmes = ReiksmiuTipai;
  isvedimasInfo: IsvedimasInfo = new IsvedimasInfo();
  duomenys = new BehaviorSubject<string>('');
  tekstas1 = new FormControl();
  tekstas2 = new FormControl();
  color: string;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
    const id = this._Activatedroute.snapshot.paramMap.get("id");
    this.grandineService.getGrandine(id).subscribe(item => {
      this.grandine = item;
      this.grandinesVykdymasService.suplanuotosProdukcijos = this.grandine.produkcijos;
        this.isvedimasInfo.ivestys = item.ivestys;
      this.isvedimasInfo.isvestis = item.isvestis;
      console.log(this.isvedimasInfo);
      console.log(this.grandine);
    });

  }

  vykdyti(){
    this.grandinesVykdymasService.vykdytiPlana()
  }

  vykdytiImage(){
    let info = new GrandinesInfo();
    info.ivestis = 'A';
    info.isvestis = 'B';
    info.ivestiesDuomenys = this.duomenys.getValue();
    console.log('dsafsadsaffdsadfdsafdsadfsa')
/*    this.grandineVykdymasService.vykdytiImage(info).subscribe( value => {
      console.log(value);
      saveAs(value, 'paveikslelis.jpg');
    });*/
    this.grandinesVykdymasService.gautiFaila(info);
  }

  setValue(data:string){
    this.duomenys.next(data);
  }

}
