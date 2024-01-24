import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageSwitcher {
  /**
   * Set the locale in the local storage and reload the page.
   */
  setLanguage(locale: string): void {
    localStorage.setItem('locale', locale);
    window.location.reload();
  }
}
