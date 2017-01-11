/**
 * Created by Paula on 03.01.2017.
 */
export class Ausbildungsnachweis {

  constructor(public ausbildungswoche:number, public kw:number, public datum: Date, public montag:string,
              public dienstag: string, public mittwoch: string, public donnerstag: string,
              public freitag: string, public spe: boolean) { };
}
