
export interface Contact {
    name: string;
    type: 'phone' | 'whatsapp' | 'link',
    icon: JSX.Element;
  }
  
export type THostingCard = {
    title: string;
    description: string;
    contactInfo: Array<Contact>;
    imageSrc: string;
    imageAlt: string;
  };