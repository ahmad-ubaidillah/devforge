/**
 * I18nService
 * 
 * Manages localizations and translations for the DevForge ecosystem.
 */
export class I18nService {
  private locales: Record<string, Record<string, string>> = {};
  private currentLocale: string = 'en';

  constructor(defaultLocale: string = 'en') {
    this.currentLocale = defaultLocale;
  }

  /**
   * Load translations for a specific locale.
   */
  loadTranslations(locale: string, translations: Record<string, string>) {
    this.locales[locale] = {
      ...(this.locales[locale] || {}),
      ...translations,
    };
  }

  /**
   * Set the active locale.
   */
  setLocale(locale: string) {
    this.currentLocale = locale;
  }

  /**
   * Get the current locale.
   */
  getLocale(): string {
    return this.currentLocale;
  }

  /**
   * Translate a key into the current locale.
   * Supports dot-notation for nested keys (conceptually, though this impl uses flat keys).
   */
  t(key: string, params: Record<string, string> = {}): string {
    const translation = this.locales[this.currentLocale]?.[key] || key;
    
    // Simple interpolation
    return Object.entries(params).reduce((acc, [k, v]) => {
      return acc.replace(new RegExp(`{{${k}}}`, 'g'), v);
    }, translation);
  }
}

export const i18n = new I18nService();
