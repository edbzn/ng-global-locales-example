import { LOCALE_ID, Provider } from '@angular/core';

/**
 * Set locale from the local storage or the browser's language.
 */
export function setLocaleProvider(): Provider {
  return {
    provide: LOCALE_ID,
    useValue: localStorage.getItem('locale') || navigator.language || 'fr-FR',
  };
}
