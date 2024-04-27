import {Injectable, OnDestroy} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
// import LangHelper from 'rch-language-js';
import {Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

import {PrimeNGConfig} from 'primeng/api';
// import { getPrimeNGTranslations } from 'rch-primeng-translations';
// import {ConfigurationService} from '../../../config/configuration.service';
import {LanguageState, LanguageType} from "./language.reducer";
import {Store} from "@ngrx/store";
import {updateLanguage} from "./language.actions";


@Injectable({providedIn: 'root'})
export class LanguageService implements OnDestroy {

  // private isLocal = this.configurationService.config.stage === 'local';
  private onDestroy$ = new Subject<void>();
  // private langHelper = new LangHelper({cookieDomain: this.isLocal ? 'localhost' : 'raiffeisen.ch'});

  constructor(
    // private configurationService: ConfigurationService,
    private translateService: TranslateService,
    private store: Store<LanguageState>,
    private primeNGConfig: PrimeNGConfig
  ) {
    // this.initPrimeNG();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  initLanguage(): Observable<void> {
    // const language = this.langHelper.getAndPersistLanguage(location.pathname + location.search);
    // const languageEnum = (LanguageType as never)[language];

    return this.translateService.use('de').pipe(
      map(() => this.store.dispatch(updateLanguage({newLanguage: LanguageType.de})))
    );
  }

  // private initPrimeNG(): void {
  //   this.store.pipe(
  //     takeUntil(this.onDestroy$),
      // map((language) => getPrimeNGTranslations(language))
  //   ).subscribe(primeng => this.primeNGConfig.setTranslation(primeng));
  // }

  setLanguage(language: LanguageType): void {
    this.translateService.use(language).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      // this.langHelper.persistLanguage(language);
      this.store.dispatch(updateLanguage({newLanguage: language}));
    });
  }
}

export function languageInitializer(languageService: LanguageService): () => Observable<void> {
  return () => languageService.initLanguage();
}
