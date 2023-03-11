import Countdown from "@/components/Countdown";
import HostingCard from "@/components/HostingCard";
import LocationCard from "@/components/LocationCard";
import Nav from "@/components/Nav";
import { THostingCard } from "@/types/types";
import Head from "next/head";
import Image from "next/image";

const DATE_OF_EVENT = new Date("Sep 9, 2023, 15:00");

const scheduleData = [
  { time: "2:00pm", event: "Misa" },
  { time: "3:00pm", event: "Coctel de bienvenida" },
  { time: "4:00pm", event: "Recepción" },
] as const;
const hotelData: THostingCard[] = [
  {
    title: "Hotel Huayacán Curamoría",
    description: "Mencionar en registro: Boda Carolina y Paco 9 de septiembre",
    contactInfo: [
      { name: "443 310 8137", icon: "phone" },
      { name: "443 137 8738", icon: "whatsapp" },
    ],
    imageSrc: "",
    imageAlt: "",
  },
  {
    title: "Hotel Hostería Las Quintas",
    description: "Código de Registro: BCYF09",
    contactInfo: [
      { name: "777 318 3949", icon: "phone" },
      { name: "hosterialasquintas.com.mx", icon: "link" },
    ],
    imageSrc: "",
    imageAlt: "",
  },
  {
    title: "Camino Real Sumiya",
    description: "Código de Registro: xxx39er28rg",
    contactInfo: [{ name: "555 227 7200", icon: "phone" }],
    imageSrc: "",
    imageAlt: "",
  },
];
export default function Home() {
  return (
    <>
      <Head>
        <title>C & P</title>
        <meta name="description" content="Caro y Paco" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
              height="225"
              loading="eager"
              priority
            />
            <h2 className="subtitle">Save the Date</h2>
            <h3 className="date">09.09.23</h3>
            <Countdown dateOfEvent={DATE_OF_EVENT} />
            <a href="#rsvp">
              <button className="btn btn-main">RSVP</button>
            </a>
          </div>
        </section>
        <section className="location" id="location">
          <h2>Lugar</h2>
          <article>
            <h3>Jardín Ixaya</h3>
            <p>Tezontepec No. 200, Lomas de Jiutepec, 62566 Jiutepec, Mor.</p>
            <button>Ver en mapa</button>
            <div className="location-image"></div>
          </article>
          <article>
            <h3>Código de vestimenta: Formal</h3>
            {scheduleData.map((card) => (
              <LocationCard
                key={card.event}
                time={card.time}
                event={card.event}
              />
            ))}
          </article>
        </section>
        <section className="hosting">
          <h2>Hospedaje</h2>
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
        </section>
        <section className="gift-registry">
          <h2>Regalo de Boda</h2>
          <p>
            El mejor regalo que nos pueden dar es acompañarnos en nuestra boda.
            Si quieren apoyarnos en nuestra siguiente etapa, les dejamos la
            información para una transferencia bancaria
          </p>
          <article className="deposit-card">
            <h3>Cuenta BBVA</h3>
            <div className="deposit-card-subsection">
              <h4 className="deposit-card-subheading">Titular</h4>
              <p className="deposit-card-content">Carolina Díaz Pugh</p>
            </div>
            <div className="deposit-card-subsection">
              <h4 className="deposit-card-subheading">Cuenta</h4>
              <p className="deposit-card-content">0125 80015569 197821</p>
              <i>Copy</i>
            </div>
            <div className="deposit-card-subsection">
              <h4 className="deposit-card-subheading">Clabe</h4>
              <p className="deposit-card-content">0125 80015569 197821</p>
              <i>Copy</i>
            </div>
          </article>
        </section>
        <section className="rsvp" id="rsvp"></section>
      </main>
    </>
  );
}
