import {
  APP_INITIALIZER,
  ApplicationConfig,
  LOCALE_ID,
} from '@angular/core';
import { localesLoader } from './load-locales';
import { ScriptLoader } from './script-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: localStorage.getItem('locale') || navigator.language || 'fr-FR' },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: localesLoader,
      deps: [ScriptLoader, LOCALE_ID]
    },
  ],
};
