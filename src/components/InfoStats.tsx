import { ProcessedPokemon } from "../types/processed/pokemon";


interface Props {
  pokemonInfo: ProcessedPokemon | null;
  totalStats: number | null;
}

export default function InfoStats({ pokemonInfo, totalStats }: Props) {
  return (
    <article className="content__box content__box--column">
      <h2>Stats</h2>
      <ul>
        {pokemonInfo?.stats?.map((statInfo, i) => (
          <li key={i}>
            <span>{statInfo.stat.name}: </span>
            {statInfo.base_stat}
          </li>
        ))}
        <li>
          <span>Total: </span>
          {totalStats}
        </li>
      </ul>
    </article>
  );
}