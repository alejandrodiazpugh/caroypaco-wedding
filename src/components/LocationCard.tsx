type Props = { time: string; event: string };

export default function LocationCard({ time, event }: Props) {
  return (
    <div className="schedule-card">
      <h4>{time}</h4>
      <h5>{event}</h5>
    </div>
  );
}
