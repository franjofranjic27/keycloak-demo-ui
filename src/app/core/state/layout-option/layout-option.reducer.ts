import { createReducer, on } from '@ngrx/store';
import * as LayoutOptionActions from './layout-option.actions';

export interface LayoutOptionState {
  isWindowHeightLayout: boolean;
  isFullWidthLayout: boolean;
}

export const initialState: LayoutOptionState = {
  isWindowHeightLayout: false,
  isFullWidthLayout: false
};
createReducer(
  initialState,
  on(LayoutOptionActions.setIsWindowHeightLayout, (state, { isWindowHeightLayout }) => ({
    ...state,
    isWindowHeightLayout
  })),
  on(LayoutOptionActions.setIsFullWidthLayout, (state, { isFullWidthLayout }) => ({
    ...state,
    isFullWidthLayout
  }))
);
