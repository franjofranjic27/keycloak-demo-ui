import { animate, style, transition, trigger } from '@angular/animations';

export const cardFade = trigger('cardFade', [
  transition(':enter', [
    style({transform: 'scale(0.9)', opacity: '0'}),
    animate('200ms ease-out',
      style({transform: 'scale(1)', opacity: '1'}))
  ])
]);
