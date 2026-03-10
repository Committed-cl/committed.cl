
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SectionContent {
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  about: {
    title: string;
    content: string;
  };
  services: Service[];
  contact: {
    title: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    ctaTitle: string;
  };
}

export type SectionKey = keyof SectionContent;
