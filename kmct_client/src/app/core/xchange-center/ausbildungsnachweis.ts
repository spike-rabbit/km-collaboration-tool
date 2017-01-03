/**
 * Created by Paula on 03.01.2017.
 */
export class Ausbildungsnachweis {
  kw: number;
  datum: string;

  constructor(kw:number, dat:string){
    this.kw = kw;
    this.datum = dat;
  };
}
