import typeColors from "../api/typeColors";

interface EffectivenessProps {
  effectiveness: string[] | null;
  title: string;
}

export default function InfoEffectiveness({
  effectiveness,
  title,
}: EffectivenessProps) {
  return (
    <article className="content__box content__box--column">
      <h2>{title}:</h2>
      <article className="content__box content__box--row">
        <span className="font-w700">type:</span>
        <ul className="flex-wrap">
          {effectiveness?.map((effective, i) => (
            <li
              className="content__box__item"
              style={{ background: typeColors[effective] }}
              key={i}
            >
              {effective}
            </li>
          ))}
        </ul>
      </article>
    </article>
  );
}
