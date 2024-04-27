import {createAction, createSelector, props} from '@ngrx/store';
import {LanguageState, LanguageType} from "./language.reducer";


export const updateLanguage = createAction(
  '[Language] Update Language',
  props<{ newLanguage: LanguageType }>()
);

export const selectLanguage = createSelector(
  (state: any) => state.language, // Access the language slice in the state
  (languageState: LanguageState) => languageState.language // Extract the language property
);
