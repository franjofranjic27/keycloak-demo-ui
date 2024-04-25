import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {APP_CONFIG, AppConfig} from "./app/config/app-config";
import {enableProdMode} from "@angular/core";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// fetch('/assets/config/config.json')
//   .then((response) => response.json())
//   .then((config: AppConfig) => {
//
//     if (config.production) {
//       enableProdMode();
//     } else {
//       // akitaDevtools();
//     }
//
//     // config.airlockAuthConfig.authConfig.redirectUri = window.location.origin + '/';
//
//     //   platformBrowserDynamic([{provide: APP_CONFIG, useValue: config}])
//     //     .bootstrapModule(AppModule)
//     //     .catch((err) => console.error(err));
//     // });
//   });
