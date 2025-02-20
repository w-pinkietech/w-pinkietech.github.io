import i18n from '../i18n/i18n';

/**
 * Updates the document title and meta tags based on the current language
 */
export const updateMetaTags = () => {
  const t = i18n.t.bind(i18n);
  
  // Update document title
  document.title = t('common.meta.title');
  
  // Update meta tags
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('common.meta.description'));
  document.querySelector('meta[name="keywords"]')?.setAttribute('content', t('common.meta.keywords'));
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', t('common.meta.title'));
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', t('common.meta.description'));
};
