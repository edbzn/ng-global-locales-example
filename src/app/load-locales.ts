import { ScriptLoader } from './script-loader';

export function localesLoader(scriptLoader: ScriptLoader, localeId: string) {
  return async () => {
    if (localeId === 'en-US') return;
    const [locale, extension] = localeId.split('-');
    const resource = locale === extension.toLowerCase() ? locale : localeId;
    return scriptLoader.load(`locales/${resource}.js`);
  };
}
