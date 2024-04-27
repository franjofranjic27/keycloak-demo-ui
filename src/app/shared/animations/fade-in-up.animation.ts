import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateY(20px)'}),
    animate('300ms ease-out', style({opacity: 1, transform: 'translateY(0)'})),
  ])
]);
