import { Component, OnInit } from '@angular/core';
import {ReiksmiuTipai} from "../../enums/reiksmiu-tipai.enum";
import {IsvedimasInfo} from "../../model/isvedimas-info";
import {BehaviorSubject} from "rxjs";
import {FormControl} from "@angular/forms";
import {GrandinesInfo} from "../../model/grandines-info";
import {TiesioginisIsvedimasService} from "../../services/tiesioginis-isvedimas.service";

@Component({
  selector: 'app-tiesioginis-isvedimas',
  templateUrl: './tiesioginis-isvedimas.component.html',
  styleUrls: ['./tiesioginis-isvedimas.component.scss']
})
export class TiesioginisIsvedimasComponent implements OnInit {

  reiksmiuTipai = Object.keys(ReiksmiuTipai);
  isvedimasInfo: IsvedimasInfo = new IsvedimasInfo();
  duomenys = new BehaviorSubject<string>('');
  tekstas = new FormControl();

  constructor(private tiesioginisIsvedimasService: TiesioginisIsvedimasService) { }

  ngOnInit(): void {
  }

  setValue(data:string){
    this.duomenys.next(data);
  }

  vykdyti() {
    //if (this.isvedimasInfo && this.isvedimasInfo.isvestis && this.isvedimasInfo.ivestys.length > 0) {
      this.tiesioginisIsvedimasService.vykdyti(this.isvedimasInfo).subscribe(value => {
        console.log(value.duomenys);
        this.duomenys.next(value.duomenys);
      });
    //}
  }

}
