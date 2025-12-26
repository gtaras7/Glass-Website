import { useEffect } from 'react';
import { Language, translations } from '../i18n';

export const useMetaTags = (language: Language) => {
  useEffect(() => {
    const meta = translations[language].meta;

    // Update document title
    document.title = meta.title;

    // Update HTML lang attribute
    document.documentElement.lang = language === 'en' ? 'en' : 'el';

    // Update meta description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', meta.description);
    }

    // Update meta keywords
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.setAttribute('content', meta.keywords);
    }

    // Update Open Graph title
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', meta.title);
    }

    // Update Open Graph description
    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionMeta) {
      ogDescriptionMeta.setAttribute('content', meta.ogDescription);
    }

    // Update Twitter title
    const twitterTitleMeta = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitleMeta) {
      twitterTitleMeta.setAttribute('content', meta.title);
    }

    // Update Twitter description
    const twitterDescriptionMeta = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescriptionMeta) {
      twitterDescriptionMeta.setAttribute('content', meta.ogDescription);
    }
  }, [language]);
};
