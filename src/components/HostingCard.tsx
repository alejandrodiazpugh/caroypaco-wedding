import Image from "next/image";
import { THostingCard } from "@/types/types";

export default function HostingCard({
  title,
  description,
  contactInfo,
  imageSrc,
  imageAlt,
}: THostingCard) {
  return (
    <article className="hosting-card">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={300}
        height={200}
        loading="lazy"
      />
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {contactInfo.map((el) => (
          <li key={el.name}>
            {el.icon}{" "}
            {el.type === "link" ? (
              <span>
                <a
                  href={`https://${el.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {el.name}
                </a>
              </span>
            ) : (
              <span>{el.name}</span>
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
