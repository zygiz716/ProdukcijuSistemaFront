import {Produkcija} from "./produkcija";

export class ProdukcijuGrandine {
  id: number;
  pavadinimas: string;
  ivestys: string [] = [];
  isvestis: string;
  produkcijos: Produkcija [] = [];
}
