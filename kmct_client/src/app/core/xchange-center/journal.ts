/**
 * Created by Paula on 03.01.2017.
 */
export interface Journal {

  id:number;
  week:number;
  startDate: Date;
  monday:string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  location: string;
  editable: boolean;
}
