
interface Contact {
    name: string;
    icon: string;
  }
  
export type THostingCard = {
    title: string;
    description: string;
    contactInfo: Array<Contact>;
    imageSrc: string;
    imageAlt: string;
  };