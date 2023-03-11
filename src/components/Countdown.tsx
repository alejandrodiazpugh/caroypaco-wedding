import { useCountdown } from "@/hooks/useCountdown";

type Props = { dateOfEvent: Date };

export default function Countdown({ dateOfEvent }: Props) {
  const [days, hours, minutes, seconds] = useCountdown(dateOfEvent);

  return (
    <div className="countdown-container">
      <span>
        {days} {days === 1 ? "día" : "días"}, &nbsp;
      </span>
      <span>
        {hours} {hours === 1 ? "hora" : "horas"}, &nbsp;
      </span>
      <span>
        {minutes} {minutes === 1 ? "minuto" : "minutos"}, &nbsp;
      </span>
      <span>
        {seconds} {seconds === 1 ? "segundo" : "segundos"}&nbsp;
      </span>
    </div>
  );
}
