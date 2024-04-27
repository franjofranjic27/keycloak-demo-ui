import { createReducer, on } from '@ngrx/store';
import {updateLanguage} from "./language.actions";

export enum LanguageType {
  de = 'de',
  fr = 'fr',
  it = 'it',
}

export interface LanguageState {
  language: LanguageType;
}

const initialState: LanguageState = { language: LanguageType.de}; // Set initial theme (optional)

export const languageReducer = createReducer(
  initialState,
  on(updateLanguage, (state, { newLanguage }) => ({ ...state, language: newLanguage }))
);
