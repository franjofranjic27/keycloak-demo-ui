import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';

export const staggeredFade = [
  trigger('staggeredFadeContainer', [
    transition(
      ':enter, :increment, :decrement',
      query('@staggeredFade', stagger(100, animateChild()), {optional: true}),
    ),
  ]),
  trigger('staggeredFade', [
    transition(':enter', [
      style({transform: 'scale(0.95)', opacity: '0'}),
      animate('250ms ease-out', style({transform: 'scale(1)', opacity: '1'}))
    ]),
    transition(':leave', [
      style({transform: 'scale(1)', opacity: '1'}),
      animate('200ms ease-in', style({transform: 'scale(0.95)', opacity: '0'}))
    ])
  ])
];
