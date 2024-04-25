import { InjectionToken } from '@angular/core';
// import { AirlockAuthConfig } from 'ng-airlock-auth';


export interface AppConfig {
  production: boolean;
  stage: string;
  roles: {
    controlRoom: string;
    fachlicherSupervisor: string;
    mitarbeiter: string;
  };
  // airlockAuthConfig: AirlockAuthConfig;
  backendUrl: string;
}

export let APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
