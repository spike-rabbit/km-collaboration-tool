import {AnimationEntryMetadata, trigger, state, style, animate, transition} from "@angular/core";
/**
 * Created by Maxi- PC on 04.01.2017.
 */
export const slideInOutAnimation: AnimationEntryMetadata = trigger('routeAnimation', [
  state('*',
    style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate('0.3s ease-in')
  ]),
  transition(':leave', [
    animate('0.3s ease-out', style({
      opacity: 0
    }))
  ])
]);
