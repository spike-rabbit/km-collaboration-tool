import {Answer} from "./answer";
import {Category} from "./category";
/**
 * Created by Paula on 13.01.2017.
 */
export interface Question {

  id: number; title: string; question: string; category: Category; owner: string; answers: Answer[];
}
