import { ApplicationConfig } from '@angular/core';
import { loadLocaleProvider } from './load-locale.provider';
import { setLocaleProvider } from './set-locale.provider';

export const appConfig: ApplicationConfig = {
  providers: [setLocaleProvider(), loadLocaleProvider()],
};
