import { createAction, props } from '@ngrx/store';
import {ThemeType} from "./theme.reducer";

export const updateTheme = createAction(
  '[Theme] Update Theme',
  props<{ newTheme: ThemeType }>()
)
