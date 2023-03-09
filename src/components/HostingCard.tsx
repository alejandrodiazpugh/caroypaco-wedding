import React from "react";
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
      <div className="hosting-card-image">
        <Image src={imageSrc} alt={imageAlt} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {contactInfo.map((el) => (
          <li key={el.name}>
            <i>{el.icon}</i> <span>{el.name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
