/**
 * Created by Paula on 03.01.2017.
 */
export class Ausbildungsnachweis {
  id: number;
  kw: number;
  datum: string;
  montag: string;
  dienstag: string;
  mittwoch: string;
  donnerstag: string;
  freitag: string;

  constructor(id:number, kw:number, dat:string){
    this.id = id;
    this.kw = kw;
    this.datum = dat;
    this.montag = null;
    this.dienstag = null;
    this.mittwoch = null;
    this.donnerstag = null;
    this.freitag = null
  };
}
