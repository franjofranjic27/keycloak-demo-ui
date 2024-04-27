import { animateChild, query, stagger, transition, trigger } from '@angular/animations';

export const staggeredFade = (queryAnimation: string) => [
  trigger('staggeredContainer', [
    transition(
      ':enter, :increment, :decrement',
      query(queryAnimation, stagger(100, animateChild()), {optional: true}),
    ),
  ]),
];
