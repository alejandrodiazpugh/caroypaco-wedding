import React from "react";
import { useCountdown } from "@/hooks/useCountdown";

type Props = { dateOfEvent: Date };

export default function Countdown({ dateOfEvent }: Props) {
  const [days, hours, minutes, seconds] = useCountdown(dateOfEvent);
  return (
    <div className="countdown-container">
      <span>{days} días, &nbsp;</span>
      <span>{hours} horas, &nbsp;</span>
      <span>{minutes} minutos, &nbsp;</span>
      <span>{seconds} segundos, &nbsp;</span>
    </div>
  );
}
