import {Produkcija} from "./produkcija";

export class ProdukcijuGrandine {
  id: number;
  pavadinimas: string;
  ivestis: string;
  isvestis: string;
  produkcijos: Produkcija [] = [];
}
