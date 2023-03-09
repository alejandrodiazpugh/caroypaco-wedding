import React from "react";

type Props = {};

export default function Nav({}: Props) {
  return (
    <header>
      <nav>
        <ul>
          <li>Lugar y Fecha</li>
          <li>Hospedaje</li>
          <li>Regalos</li>
          <li>RSVP</li>
        </ul>
      </nav>
    </header>
  );
}
