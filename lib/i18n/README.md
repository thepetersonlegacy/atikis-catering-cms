# Multi-Language Translation System

This document provides comprehensive instructions for maintaining and extending the multi-language translation system implemented for the Atikis Minnesota Aviation Catering website.

## Overview

The translation system supports 5 languages:
- English (en) - Default
- Spanish (es)
- Mandarin Chinese (zh-CN)
- French (fr)
- Arabic (ar)

## Architecture

### Core Components

1. **Translation Files** (`lib/i18n/translations.ts`)
   - Contains all translation strings organized by language and namespace
   - Structured as nested objects for better organization

2. **I18n Context** (`lib/i18n/i18n-context.tsx`)
   - React context provider for language state management
   - Handles language switching, localStorage persistence, and RTL support

3. **Language Selector** (`components/i18n/LanguageSelector.tsx`)
   - Dropdown component for language selection
   - Accessible with keyboard navigation and ARIA labels

4. **CSS Styles** (`app/globals.css`)
   - RTL support for Arabic
   - Font loading for Chinese and Arabic scripts
   - Language-specific styling adjustments

## Usage

### Basic Translation

```tsx
import { useI18n } from '@/lib/i18n/i18n-context';

function MyComponent() {
  const { t } = useI18n();
  
  return (
    <h1>{t('hero.title')}</h1>
  );
}
```

### Language Detection

The system automatically:
- Loads saved language from localStorage
- Falls back to browser language if available
- Defaults to English if no match found

### RTL Support

Arabic language automatically enables RTL layout:
- Text direction changes to right-to-left
- Spacing and margins are adjusted
- Component layouts adapt accordingly

## Adding New Languages

### Step 1: Add Language Configuration

In `lib/i18n/translations.ts`, add the new language to the `languages` array:

```typescript
export const languages = [
  // ... existing languages
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' }
];
```

### Step 2: Add Translation Strings

Add the complete translation object to the `translations` object:

```typescript
export const translations: Translations = {
  // ... existing translations
  de: {
    nav: {
      home: "Startseite",
      menu: "Menü",
      // ... all other keys
    },
    // ... all other namespaces
  }
};
```

### Step 3: Add Font Support (if needed)

For languages requiring special fonts, update `app/globals.css`:

```css
.lang-de {
  font-family: 'Your German Font', sans-serif;
}
```

And add the font link in `app/layout.tsx`:

```tsx
<link href="https://fonts.googleapis.com/css2?family=Your+German+Font&display=swap" rel="stylesheet" />
```

### Step 4: RTL Support (if needed)

For RTL languages, update the RTL detection in `lib/i18n/i18n-context.tsx`:

```typescript
const rtlLanguages = ['ar', 'he', 'ur']; // Add new RTL language codes
```

## Adding New Translation Keys

### Step 1: Add to English (Default)

Always start by adding the key to the English translation:

```typescript
en: {
  // ... existing translations
  newSection: {
    title: "New Section Title",
    description: "New section description"
  }
}
```

### Step 2: Add to All Other Languages

Add the corresponding translations to all other language objects:

```typescript
es: {
  // ... existing translations
  newSection: {
    title: "Título de Nueva Sección",
    description: "Descripción de nueva sección"
  }
}
```

### Step 3: Use in Components

```tsx
function NewComponent() {
  const { t } = useI18n();
  
  return (
    <div>
      <h2>{t('newSection.title')}</h2>
      <p>{t('newSection.description')}</p>
    </div>
  );
}
```

## Translation Guidelines

### Key Naming Conventions

- Use camelCase for keys: `heroTitle`, `contactForm`
- Use namespaces for organization: `nav.home`, `contact.title`
- Keep keys descriptive but concise
- Group related translations under common namespaces

### Translation Quality

- Maintain consistent tone and style within each language
- Consider cultural context, not just literal translation
- Test translations with native speakers when possible
- Keep translations concise for UI elements

### Fallback Behavior

The system automatically falls back to English if:
- A translation key is missing in the selected language
- The selected language is not available
- An error occurs during translation lookup

## SEO Considerations

### URL Structure

For SEO-friendly URLs, consider implementing:

```typescript
// Example: /es/menu, /fr/contact
const localizedRoutes = {
  en: { menu: 'menu', contact: 'contact' },
  es: { menu: 'menu', contact: 'contacto' },
  fr: { menu: 'menu', contact: 'contact' }
};
```

### Meta Tags

Update meta tags based on language:

```tsx
export function generateMetadata({ params }: { params: { lang: string } }) {
  return {
    title: translations[params.lang]?.meta?.title || translations.en.meta.title,
    description: translations[params.lang]?.meta?.description || translations.en.meta.description
  };
}
```

## Performance Optimization

### Code Splitting

Consider splitting translations by route:

```typescript
// Load only necessary translations
const homeTranslations = await import(`@/lib/i18n/translations/home/${language}.json`);
```

### Lazy Loading

Implement lazy loading for non-critical languages:

```typescript
const loadLanguage = async (langCode: string) => {
  if (!translations[langCode]) {
    const langModule = await import(`@/lib/i18n/translations/${langCode}.ts`);
    translations[langCode] = langModule.default;
  }
};
```

## Testing

### Translation Coverage

Ensure all keys are translated:

```typescript
// Test helper to check translation coverage
function checkTranslationCoverage(baseLanguage: string, targetLanguage: string) {
  const baseKeys = flattenObject(translations[baseLanguage]);
  const targetKeys = flattenObject(translations[targetLanguage]);
  
  const missingKeys = Object.keys(baseKeys).filter(key => !targetKeys[key]);
  return missingKeys;
}
```

### RTL Testing

Test RTL languages thoroughly:
- Text alignment and direction
- Icon and image positioning
- Form layouts and inputs
- Navigation and menus

## Accessibility

The language selector includes:
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast mode compatibility
- Focus management

## Maintenance Checklist

### Regular Tasks

- [ ] Review translation quality with native speakers
- [ ] Check for missing translation keys
- [ ] Test RTL layout with Arabic content
- [ ] Verify font loading for all languages
- [ ] Update translations when content changes

### When Adding New Features

- [ ] Add translation keys for all new text content
- [ ] Test with longest translations (usually German)
- [ ] Verify RTL compatibility
- [ ] Update this documentation if needed

## Troubleshooting

### Common Issues

1. **Missing Translations**: Check console for fallback warnings
2. **RTL Layout Issues**: Verify CSS RTL rules are applied
3. **Font Loading**: Check network tab for font loading errors
4. **Language Not Persisting**: Check localStorage functionality

### Debug Mode

Enable debug mode to see translation keys:

```typescript
const DEBUG_TRANSLATIONS = process.env.NODE_ENV === 'development';

const t = (key: string): string => {
  const translation = getTranslation(key);
  return DEBUG_TRANSLATIONS ? `[${key}] ${translation}` : translation;
};
```

## Future Enhancements

### Potential Improvements

1. **Pluralization Support**: Handle singular/plural forms
2. **Date/Number Formatting**: Locale-specific formatting
3. **Dynamic Content Translation**: API-based content translation
4. **Translation Management**: Admin interface for managing translations
5. **A/B Testing**: Test different translations for conversion optimization

This system provides a solid foundation for multi-language support while remaining maintainable and extensible.