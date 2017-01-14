import {User} from "../../../data-definitions";
import {Answer} from "./answer";
/**
 * Created by Paula on 13.01.2017.
 */
export class Question{

  constructor(public id: number, public title: string, public question: string, public category: string, public owner: string, public answers: Answer[]) {};
}
