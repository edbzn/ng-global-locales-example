import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, LOCALE_ID, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageSwitcher } from './language-switcher.service';

function toCurrencyCode(locale: string) {
  return locale === 'fr-FR' ? 'EUR' : locale === 'en-US' ? 'USD' : 'EUR';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, FormsModule],
  template: `
    <div>
      {{ date | date }}
    </div>

    <div>
      {{ price | currency : currencyCode }}
    </div>

    <select [ngModel]="locale" (ngModelChange)="changeLocale($event)">
      <option value="fr-FR">fr-FR</option>
      <option value="en-US">en-US</option>
      <option value="de-DE">de-DE</option>
    </select>
  `,
})
export class AppComponent {
  readonly locale = inject(LOCALE_ID);

  readonly date = new Date();
  readonly price = 10;
  readonly currencyCode = toCurrencyCode(this.locale);

  private readonly languageSwitcher = inject(LanguageSwitcher);

  changeLocale(locale: string) {
    this.languageSwitcher.setLanguage(locale);
  }
}
