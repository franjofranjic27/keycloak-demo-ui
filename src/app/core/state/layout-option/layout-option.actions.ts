import { createAction, props } from '@ngrx/store';

export const setIsWindowHeightLayout = createAction(
  '[Layout Option] Set Is Window Height Layout',
  props<{ isWindowHeightLayout: boolean }>()
);

export const setIsFullWidthLayout = createAction(
  '[Layout Option] Set Is Full Width Layout',
  props<{ isFullWidthLayout: boolean }>()
);

