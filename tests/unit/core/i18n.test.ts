import { describe, it, expect } from 'vitest';
import { I18nService } from '../../../packages/core/src/i18n/i18n-service';

describe('Task 17: i18n Core Service Smoke Test', () => {
  const i18n = new I18nService('en');
  
  i18n.loadTranslations('en', {
    'welcome': 'Welcome to DevForge',
    'greet': 'Hello, {{name}}!'
  });
  
  i18n.loadTranslations('es', {
    'welcome': 'Bienvenido a DevForge',
    'greet': '¡Hola, {{name}}!'
  });

  it('should translate keys in English', () => {
    expect(i18n.t('welcome')).toBe('Welcome to DevForge');
    expect(i18n.t('greet', { name: 'User' })).toBe('Hello, User!');
  });

  it('should translate keys in Spanish', () => {
    i18n.setLocale('es');
    expect(i18n.t('welcome')).toBe('Bienvenido a DevForge');
    expect(i18n.t('greet', { name: 'Usuario' })).toBe('¡Hola, Usuario!');
  });

  it('should fallback to key if translation missing', () => {
    expect(i18n.t('missing_key')).toBe('missing_key');
  });
});
