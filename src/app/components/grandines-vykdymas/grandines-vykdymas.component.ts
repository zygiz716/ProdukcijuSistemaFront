import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProdukcijuGrandineService} from "../../services/produkciju-grandine.service";
import {ProdukcijuGrandine} from "../../model/produkciju-grandine";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {take} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {GrandineVykdymasService} from "../../services/grandine-vykdymas.service";
import {GrandinesInfo} from "../../model/grandines-info";
import {TipasA} from "../../model/tipas-a";
import {FormControl, Validators} from "@angular/forms";
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-grandines-vykdymas',
  templateUrl: './grandines-vykdymas.component.html',
  styleUrls: ['./grandines-vykdymas.component.scss']
})
export class GrandinesVykdymasComponent implements OnInit {

  grandine: ProdukcijuGrandine = new ProdukcijuGrandine();
  //tipasA = new BehaviorSubject<TipasA>(null);
  duomenys = new BehaviorSubject<string>('');
  tekstas = new FormControl();

  constructor(private _Activatedroute: ActivatedRoute,
              private grandineService: ProdukcijuGrandineService,
              private _ngZone: NgZone,
              private grandineVykdymasService: GrandineVykdymasService) {
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {
    const id = this._Activatedroute.snapshot.paramMap.get("id");
    this.grandineService.getGrandine(id).subscribe(item => {
      this.grandine = item;
      if(this.grandine.produkcijos.length > 0) {
        this.grandine.isvestis = this.grandine.produkcijos[this.grandine.produkcijos.length - 1].isvestis;
        this.grandine.ivestys = this.grandine.produkcijos[0].ivestys;
      }
      console.log(this.grandine);
    });

  }

  vykdyti(){
    let info = new GrandinesInfo();
    info.ivestis = 'A';
    info.isvestis = 'B';
    info.ivestiesDuomenys = this.duomenys.getValue();
    console.log('dsafsadsaffdsadfdsafdsadfsa')
    this.grandineVykdymasService.vykdyti(info).subscribe( value => {
      console.log(value);
      this.duomenys.next(value.duomenys);
    });
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
    this.grandineVykdymasService.gautiFaila(info);
  }

  setValue(data:string){
    this.duomenys.next(data);
  }

}
