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
