import { describe, it, expect } from 'vitest';
import { I18nService } from '../../../packages/core/src/i18n/i18n-service';

describe('i18n-service-edge', () => {
  it('should handle translation of non-existent locale', () => {
    const service = new I18nService('fr');
    // We haven't loaded any 'fr' translations
    expect(service.t('hello')).toBe('hello');
  });

  it('should replace multiple occurrences of the same param', () => {
    const service = new I18nService('en');
    service.loadTranslations('en', { greet: 'Hello {{name}}! Welcome, {{name}}.' });
    expect(service.t('greet', { name: 'Dev' })).toBe('Hello Dev! Welcome, Dev.');
  });
});
