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

@Component({
  selector: 'app-grandines-vykdymas',
  templateUrl: './grandines-vykdymas.component.html',
  styleUrls: ['./grandines-vykdymas.component.scss']
})
export class GrandinesVykdymasComponent implements OnInit {

  grandine: ProdukcijuGrandine = new ProdukcijuGrandine();
  tipasA = new BehaviorSubject<TipasA>(new TipasA());

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
        this.grandine.ivestis = this.grandine.produkcijos[0].ivestis;
      }
      console.log(this.grandine);
    });

  }

  vykdyti(){
    let info = new GrandinesInfo();
    info.ivestis = 'A';
    info.isvestis = 'B';
    info.ivestiesDuomenys = this.tipasA.value.duomenys;
    this.grandineVykdymasService.vykdyti(info).subscribe( value => {
      console.log(value);
      this.tipasA.next(value);
    });
  }

}
