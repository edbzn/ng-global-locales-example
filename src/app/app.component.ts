import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, LOCALE_ID, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

function localeToCurrencyCode(locale: string) {
  return locale === 'fr-FR' ? 'EUR' : locale === 'en-US' ? 'USD' : 'EUR';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, FormsModule],
  template: `
    <select [ngModel]="locale()" (ngModelChange)="changeLocale($event)">
      <option value="fr-FR">fr-FR</option>
      <option value="en-US">en-US</option>
      <option value="de-DE">de-DE</option>
    </select>

    <div>
      {{ date | date }}
    </div>

    <div>
      {{ price | currency : currencyCode() }}
    </div>
  `,
})
export class AppComponent {
  date = new Date();
  price = 10;
  locale = signal(inject(LOCALE_ID));
  currencyCode = signal(localeToCurrencyCode(this.locale()));

  changeLocale(locale: string): void {
    localStorage.setItem('locale', locale);
    window.location.reload();
  }
}
