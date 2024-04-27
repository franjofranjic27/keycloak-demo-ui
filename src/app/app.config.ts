import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom, Provider} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {KeycloakBearerInterceptor, KeycloakService} from "keycloak-angular";
import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideStore} from "@ngrx/store";
import {provideAnimations} from "@angular/platform-browser/animations";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {languageInitializer, LanguageService} from "./core/state/language/language.service";
import {languageReducer} from "./core/state/language/language.reducer";
import {themeReducer} from "./core/state/theme/theme.reducer";
import {ConfirmationService, MessageService} from "primeng/api";
import {themeInitializer, ThemeService} from "./core/state/theme/theme.service";

// Function to initialize Keycloak with the necessary configurations
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      // Configuration details for Keycloak
      config: {
        realm: 'keycloak-angular-sandbox',
        url: 'http://localhost:8080',
        clientId: 'keycloak-angular'
      },
      // Options for Keycloak initialization
      initOptions: {
        onLoad: 'check-sso', // Action to take on load
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html' // URI for silent SSO checks
      },
      // Enables Bearer interceptor
      enableBearerInterceptor: true,
      // Prefix for the Bearer token
      bearerPrefix: 'Bearer',
      // URLs excluded from Bearer token addition (empty by default)
      //bearerExcludedUrls: []
    });
}



// Provider for Keycloak Bearer Interceptor
const KeycloakBearerInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: KeycloakBearerInterceptor,
  multi: true
};

// Provider for Keycloak Initialization
const KeycloakInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeKeycloak,
  multi: true,
  deps: [KeycloakService]
}

const ThemeProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: themeInitializer,
  deps: [ThemeService],
  multi: true
}

const LanguageProvider: Provider = {
  provide: APP_INITIALIZER,
    useFactory: languageInitializer,
  deps: [LanguageService],
  multi: true
}

// Exported configuration for the application
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // Provides HttpClient with interceptors
    provideStore({language: languageReducer, theme: themeReducer}),
    provideAnimations(),
    MessageService,
    ConfirmationService,
    importProvidersFrom(TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })),
    LanguageProvider,
    ThemeProvider,
    KeycloakInitializerProvider, // Initializes Keycloak
    KeycloakBearerInterceptorProvider, // Provides Keycloak Bearer Interceptor
    KeycloakService, // Service for Keycloak
    provideRouter(routes) // Provides routing for the application
  ]
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translations/', '.json')
}
