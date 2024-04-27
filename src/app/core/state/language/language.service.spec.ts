// import { fakeAsync, TestBed, tick } from '@angular/core/testing';
// import { TranslateService } from '@ngx-translate/core';
// import { of } from 'rxjs';
//
// // import { TestingModule } from '@testing/testing.module';
//
// import { languageInitializer, LanguageService } from './language.service';
// // import { LanguageStore, LanguageType } from './language.store';
// // import { LanguageQuery } from './language.query';
// import { PrimeNGConfig } from 'primeng/api';
// // import { de } from 'rch-primeng-translations';
// import { ConfigurationService } from '../../../config/configuration.service';
//
// describe('LanguageService', () => {
//   let languageService: LanguageService;
//   let languageStore: LanguageStore;
//   let translateService: TranslateService;
//   let primeNGConfig: PrimeNGConfig;
//   let languageQuery: LanguageQuery;
//   let configurationService: ConfigurationService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [LanguageService, LanguageStore],
//       imports: [TestingModule]
//     });
//
//     languageService = TestBed.inject(LanguageService);
//     languageStore = TestBed.inject(LanguageStore);
//     translateService = TestBed.inject(TranslateService);
//     primeNGConfig = TestBed.inject(PrimeNGConfig);
//     languageQuery = TestBed.inject(LanguageQuery);
//     configurationService = TestBed.inject(ConfigurationService);
//   });
//
//   it('should be created', () => {
//     expect(languageService).toBeDefined();
//   });
//
//   describe('ngOnDestroy()', () => {
//     it('should unsubscribe from subscriptions', () => {
//       spyOn((languageService as any).onDestroy$, 'next').and.stub();
//       spyOn((languageService as any).onDestroy$, 'complete').and.stub();
//
//       languageService.ngOnDestroy();
//
//       expect((languageService as any).onDestroy$.next).toHaveBeenCalled();
//       expect((languageService as any).onDestroy$.complete).toHaveBeenCalled();
//     });
//   });
//
//   describe('initLanguage', () => {
//     it('should initLanguage', (done) => {
//       spyOn((languageService as any).langHelper, 'getAndPersistLanguage').and.returnValue('de');
//       spyOn(translateService, 'use').and.returnValue(of({}));
//       spyOn(languageStore, 'update').and.stub();
//
//       languageService.initLanguage().subscribe(() => {
//         expect((languageService as any).langHelper.getAndPersistLanguage).toHaveBeenCalled();
//         expect(translateService.use).toHaveBeenCalledWith('de');
//         expect(languageStore.update).toHaveBeenCalledWith({language: LanguageType.de});
//         done();
//       });
//     });
//   });
//
//   describe('initPrimeNG', () => {
//     it('initPrimeNG', fakeAsync(() => {
//       spyOn(primeNGConfig, 'setTranslation').and.stub();
//       languageQuery.language$ = of(LanguageType.de);
//
//       (languageService as any).initPrimeNG();
//       tick();
//
//       expect(primeNGConfig.setTranslation).toHaveBeenCalledWith(de);
//     }));
//   });
//
//   describe('setLanguage', () => {
//     it('should setLanguage', fakeAsync(() => {
//       spyOn(translateService, 'use').and.returnValue(of({}));
//       spyOn((languageService as any).langHelper, 'persistLanguage').and.stub();
//       spyOn(languageStore, 'update').and.stub();
//
//       languageService.setLanguage(LanguageType.de);
//       tick();
//
//       expect(translateService.use).toHaveBeenCalledWith('de');
//       expect((languageService as any).langHelper.persistLanguage).toHaveBeenCalledWith('de');
//       expect(languageStore.update).toHaveBeenCalledWith({language: LanguageType.de});
//     }));
//   });
//
//   describe('languageInitializer', () => {
//     it('should init language',  (done) => {
//       const initLanguageReturn = of({} as any);
//       spyOn(languageService, 'initLanguage').and.returnValue(initLanguageReturn);
//
//       const fun = languageInitializer(languageService);
//
//       expect(fun).toBeDefined();
//       fun().subscribe(() => {
//         expect(languageService.initLanguage).toHaveBeenCalled();
//         done();
//       });
//     });
//   });
//
//   // FIXME test error since angular upgrade
//   // describe('langHelper', () => {
//   //   it('should set cookieDomain localhost on local', () => {
//   //     configurationService.config.stage = 'local';
//   //
//   //     const service = new LanguageService(configurationService, languageStore, translateService, languageQuery, primeNGConfig);
//   //
//   //     expect(((service as any).langHelper as any).cookieDomain).toBe('localhost');
//   //   });
//   //
//   //   it('should set cookieDomain raiffeisen.ch on not local', () => {
//   //     configurationService.config.stage = 'notLocal';
//   //
//   //     const service = new LanguageService(configurationService, languageStore, translateService, languageQuery, primeNGConfig);
//   //
//   //     expect(((service as any).langHelper as any).cookieDomain).toBe('raiffeisen.ch');
//   //   });
//   // });
//
// });
