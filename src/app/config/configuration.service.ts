import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from './app-config';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  public readonly config: AppConfig;

  constructor(
    @Inject(APP_CONFIG) private appConfig: AppConfig
  ) {
    this.config = this.appConfig;
  }
}
