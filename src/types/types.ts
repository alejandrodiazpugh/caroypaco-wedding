export interface Contact {
	name: string;
	type: 'phone' | 'whatsapp' | 'link';
	icon: JSX.Element;
}

export type THostingCard = {
	title: string;
	description: string;
	contactInfo: Array<Contact>;
	imageSrc: string;
	imageAlt: string;
};

type TDrink = 'gin' | 'rum' | 'whiskey' | 'tequila';

export type TGuest = {
	_id: string;
	firstName: string;
	lastName: string;
	fullname: string;
	phoneNumber: string;
	drinks: Array<TDrink>;
	otherDrink: string;
	isAttending: 'yes' | 'no' | '';
	guests: number;
};
