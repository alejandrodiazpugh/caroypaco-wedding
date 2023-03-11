import React from "react";
import Image from "next/image";

type Props = {};

export default function Nav({}: Props) {
  return (
    <header>
      <Image src="/cp-06.png" alt="" priority width="50" height="50" />
      <nav>
        <ul role="list" className="nav-items">
          <li>
            <a href="#location">Lugar y Fecha</a>
          </li>
          <li>
            <a href="#hosting">Hospedaje</a>
          </li>
          <li>
            <a href="#registry">Regalos</a>
          </li>
          <li>
            <a href="#rsvp">RSVP</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
