import HostingCard from '@/components/HostingCard';
import LocationCard from '@/components/LocationCard';
import Nav from '@/components/Nav';
import { TGuest, THostingCard } from '@/types/types';
import Head from 'next/head';
import Image from 'next/image';
import { HiLocationMarker } from 'react-icons/hi';
import { BsTelephoneFill } from 'react-icons/bs';
import { AiOutlineLink } from 'react-icons/ai';
import { FaWhatsapp } from 'react-icons/fa';
import DepositCard from '@/components/DepositCard';
import RsvpCardInitial from '@/components/RsvpCardInitial';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import RsvpForm from '@/components/RsvpForm';

const DATE_OF_EVENT = new Date('Sep 9, 2023, 15:00');

const Countdown = dynamic(() => import('@/components/Countdown'), {
	ssr: false,
});

const scheduleData = [
	{ time: '2:00pm', event: 'Misa' },
	{ time: '3:00pm', event: 'Coctel de bienvenida' },
	{ time: '4:00pm', event: 'Recepción' },
] as const;
const hotelData: THostingCard[] = [
	{
		title: 'Hotel Huayacán Curamoría',
		description:
			'Marcar directo, mencionando que se hospedan para la boda de Carolina y Paco 09 de septiembre, o por whatsapp con el códico G1NL0G',
		contactInfo: [
			{ name: '777 516 1010', type: 'phone', icon: <BsTelephoneFill /> },
			{ name: '443 137 8738', type: 'whatsapp', icon: <FaWhatsapp /> },
		],
		imageSrc: '/hotel-huayacan.png',
		imageAlt: 'Hotel Huayacan',
	},
	{
		title: 'Hotel Hostería Las Quintas',
		description: 'Utilizar código de registro: BCYF09',
		contactInfo: [
			{ name: '777 318 3949', type: 'phone', icon: <BsTelephoneFill /> },
			{
				name: 'hosterialasquintas.com.mx',
				type: 'link',
				icon: <AiOutlineLink />,
			},
		],
		imageSrc: '/las-quintas.png',
		imageAlt: 'Hotel Hostería Las Quintas',
	},
	{
		title: 'Hotel Sumiya',
		description:
			'Marcar directo, mencionando que se hospedan para la boda de Carolina y Paco 09 de septiembre',
		contactInfo: [
			{ name: '555 227 7200', type: 'phone', icon: <BsTelephoneFill /> },
		],
		imageSrc: '/sumiya.png',
		imageAlt: 'Sumiya',
	},
];
export default function Home() {
	const [formShowing, setFormShowing] = useState(false);
	const [guestData, setGuestData] = useState<TGuest>();
	const [formSent, setFormSent] = useState(false);
	const [error, setShowError] = useState(false);

	return (
		<>
			<Head>
				<title>C & P</title>
				<meta name="description" content="Caro y Paco" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Nav />
			<main>
				<section className="hero">
					<div className="hero-overlay"></div>
					<div className="hero-image"></div>
					<div className="hero-content">
						<Image
							className="site-title"
							src="/cp-04.png"
							alt=""
							width="450"
							height="150"
							loading="eager"
						/>
						<h2 className="subtitle">Save the Date</h2>
						<h3 className="date">09.09.23</h3>
						<Countdown dateOfEvent={DATE_OF_EVENT} />
						<a href="#rsvp">
							<button className="btn btn-main">RSVP</button>
						</a>
					</div>
				</section>
				<section className="section" id="location">
					<h2 className="section-title">Lugar</h2>
					<article className="location-info">
						<div className="location-info__main">
							<h3>Jardín Ixaya</h3>
							<p>
								<HiLocationMarker /> Tezontepec No. 200, Lomas
								de Jiutepec, 62566 Jiutepec, Mor.
							</p>
							<a
								href="https://goo.gl/maps/nUk9UQgqmMR3WDxg7"
								target="_blank"
								rel="noopener noreferrer"
							>
								<button className="btn btn-cta">
									Ver en mapa
								</button>
							</a>
						</div>
						<Image
							className="location-image"
							src="/jardin-ixaya.png"
							alt="jardin Ixaya"
							width={588}
							height={392}
						/>
					</article>
					<article className="dress-code">
						<h3>
							Código de vestimenta: &nbsp;
							<span>Formal</span>{' '}
						</h3>
						<h4>Solo adultos</h4>
					</article>
					<article className="schedule">
						<h2>HORARIO</h2>
						<svg
							className="schedule-shape-desktop"
							width="1000"
							height="58"
							fill="#586355"
							viewBox="0 0 1000 58"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								cx="28.6533"
								cy="28.6533"
								r="28.6533"
								fill="#D9D9D9"
							/>
							<circle
								cx="499.653"
								cy="28.6533"
								r="28.6533"
								fill="#D9D9D9"
							/>
							<circle
								cx="970.653"
								cy="28.6533"
								r="28.6533"
								fill="#D9D9D9"
							/>
							<rect
								x="28.6533"
								y="28.6533"
								width="942.693"
								height="5.73066"
								fill="#D9D9D9"
							/>
						</svg>
						<svg
							className="schedule-shape-mobile"
							width="36"
							height="350"
							viewBox="0 0 36 612"
							fill="#586355"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								cx="17.6533"
								cy="594.452"
								r="17.548"
								transform="rotate(-90 17.6533 594.452)"
								fill="#D9D9D9"
							/>
							<circle
								cx="17.6533"
								cy="306"
								r="17.548"
								transform="rotate(-90 17.6533 306)"
								fill="#D9D9D9"
							/>
							<circle
								cx="17.6533"
								cy="17.548"
								r="17.548"
								transform="rotate(-90 17.6533 17.548)"
								fill="#D9D9D9"
							/>
							<rect
								x="17.6533"
								y="594.452"
								width="577.329"
								height="3.5096"
								transform="rotate(-90 17.6533 594.452)"
								fill="#D9D9D9"
							/>
						</svg>

						<div className="schedule-cards">
							{scheduleData.map((card) => (
								<LocationCard
									key={card.event}
									time={card.time}
									event={card.event}
								/>
							))}
						</div>
					</article>
				</section>
				<section className="section" id="hosting">
					<h2 className="section-title">Hospedaje</h2>
					<div className="hosting-cards">
						{hotelData.map((entry) => (
							<HostingCard
								key={entry.title}
								title={entry.title}
								description={entry.description}
								contactInfo={entry.contactInfo}
								imageSrc={entry.imageSrc}
								imageAlt={entry.imageAlt}
							/>
						))}
					</div>
				</section>
				<section className="section" id="registry">
					<h2 className="section-title">Regalo de Boda</h2>
					<p className="registry-message">
						El mejor regalo que nos pueden dar es acompañarnos en
						nuestra boda. Si quieren apoyarnos en nuestra siguiente
						etapa, les dejamos la información para una transferencia
						bancaria
					</p>
					<DepositCard />
				</section>
				<section className="section" id="rsvp">
					<h2 className="section-title">RSVP</h2>
					<article className="rsvp-card">
						{formSent ? (
							<section>
								¡Se ha enviado tu respuesta, muchas gracias!
							</section>
						) : !formShowing || !guestData ? (
							<RsvpCardInitial
								setter={setFormShowing}
								guestSetter={setGuestData}
								errorSetter={setShowError}
							/>
						) : (
							<RsvpForm
								guest={guestData}
								setFormSent={setFormSent}
							/>
						)}
					</article>
					{error ? (
						<article className="error-alert">
							Error al buscar el nombre, intenta solo un nombre y
							un apellido.
						</article>
					) : null}
				</section>
			</main>
		</>
	);
}
