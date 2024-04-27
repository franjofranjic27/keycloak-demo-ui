import { createReducer, on } from '@ngrx/store';
import {updateTheme} from "./theme.actions";

export enum ThemeType {
  LIGHT = 'LIGHT',
  BLUE = 'BLUE',
  DARK = 'DARK',
}

export interface ThemeState {
  theme: ThemeType;
}

const initialState: ThemeState = { theme: ThemeType.LIGHT }; // Set initial theme (optional)

export const themeReducer = createReducer(
  initialState,
  on(updateTheme, (state, { newTheme }) => ({ ...state, theme: newTheme }))
);
