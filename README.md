# Angular global locales example

> Example of loading `@angular/common/locales/global` based on the browser's language or selected one.

### 1. Set up assets in `angular.json`

```jsonc
{
  "builder": "@angular-devkit/build-angular:application",
  "options": {
    "polyfills": ["zone.js", "@angular/localize/init"],
    "assets": [
      {
        "input": "node_modules/@angular/common/locales/global",
        "glob": "**/*.js",
        "output": "locales"
      }
    ]
  }
}
```

### 2. Create a provider to set the locale

```ts
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

```

### 3. Create a provider to load the locale

```ts
import { Provider, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { ScriptLoader } from './script-loader.service';

/**
 * Load the locale at app startup.
 */
export function loadLocaleProvider(): Provider {
  return {
    provide: APP_INITIALIZER,
    useFactory: localeLoader,
    deps: [ScriptLoader, LOCALE_ID],
    multi: true,
  };
}

function localeLoader(
  scriptLoader: ScriptLoader,
  localeId: string
): () => Promise<void> {
  return async () => {
    /**
     * Locale 'en-US' is already loaded by Angular.
     */
    if (localeId === 'en-US') return;

    /**
     * Normalize the locale id to match the locale file name.
     */
    const [locale, extension] = localeId.split('-');
    const resource = locale === extension.toLowerCase() ? locale : localeId;

    /**
     * Load the locale file.
     *
     * The locale file is a JavaScript file that exports a function
     * that registers the locale data globally.
     *
     * This is possible because the locale files are copied by
     * the Angular CLI with the `assets` option.
     */
    return scriptLoader.load(`locales/${resource}.js`);
  };
}
```

### 4. Create the ScriptLoader used to load the locale

```ts
import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScriptLoader {
  private readonly document = inject(DOCUMENT);

  /**
   * Load a script file in the document.
   */
  load(src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = this.document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject();
      this.document.body.appendChild(script);
    });
  }
}
```

### 5. Display internationalized content

```html
<div>
  {{ date | date }}
</div>
```
