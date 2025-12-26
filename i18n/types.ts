export type Language = 'en' | 'el';

export interface TranslationKeys {
  navbar: {
    home: string;
    services: string;
    portfolio: string;
    about: string;
    contact: string;
  };
  hero: {
    titlePart1: string;
    titlePart2: string;
    locationHighlight: string;
    titlePart3: string;
    description: string;
    cta: string;
  };
  services: {
    title: string;
    subtitle: string;
    webDesign: {
      title: string;
      description: string;
    };
    automation: {
      title: string;
      description: string;
    };
    business: {
      title: string;
      description: string;
    };
  };
  portfolio: {
    title: string;
    subtitle: string;
    websitesTab: string;
    workflowsTab: string;
    visitSite: string;
    viewWorkflow: string;
    timeSaved: string;
    intellity: {
      title: string;
      description: string;
    };
    withoutSessions: {
      title: string;
      description: string;
    };
    googleMaps: {
      title: string;
      description: string;
    };
    financialDoc: {
      title: string;
      description: string;
    };
  };
  about: {
    title: string;
    paragraph1: string;
    paragraph2: string;
    credential1: string;
    credential2: string;
    credential3: string;
  };
  contact: {
    title: string;
    description: string;
    location: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    sendingButton: string;
    sentButton: string;
  };
  footer: {
    tagline: string;
  };
  meta: {
    title: string;
    description: string;
    keywords: string;
    ogDescription: string;
  };
}
