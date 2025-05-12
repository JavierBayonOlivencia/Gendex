import { useEffect, useState } from "react";
import { PokemonService } from "../api/pokeAPIService";
import physical from "../assets/damageClasss/phisical.png";
import special from "../assets/damageClasss/special.png";
import status from "../assets/damageClasss/status.png";
import genVersionGroupMap from "../api/genVersion";
import typeColors from "../api/typeColors";

interface Move {
  name: string;
  level: number;
  power: number | null;
  accuracy: number | null;
  pp: number | null;
  type: string;
  dc: string;
};

interface Props {
  pokemonMoves: Move[];
  setVersionGroups: (groups: string[]) => void;
  generation: number | string;
}

const damageClass: Record<string, string> = { 
    physical: physical,
    status: status,
    special: special 
};

export default function InfoMoves({
  pokemonMoves,
  setVersionGroups,
  generation,
}: Props) {
  const [genCount, setGenCount] = useState<number>(0);
  const [currentGen, setCurrentGen] = useState(Number(generation));

  const genCountArray = Array.from({ length: genCount }, (_, i) => i + 1);

  useEffect(() => {
    const pokemonService = new PokemonService();

    const generationCount = async () => {
      const generation = await pokemonService.getGenerations();
      setGenCount(generation.count);
    };

    generationCount();
  }, []);

  function handleClick(gen: number) {
    setVersionGroups(genVersionGroupMap[gen]);
    setCurrentGen(gen);
  }

  return (
    <article className="content__box content__box--column">
      <h2>Moves:</h2>
      <ul className="flex-wrap">
        {genCountArray?.map((gen) => (
          <li
            key={gen}
            className={`${currentGen === gen ? "btn--link-active" : ""}`}
          >
            <button className="btn btn--link" onClick={() => handleClick(gen)}>
              Gen {gen}
            </button>
          </li>
        )).slice(Number(generation) - 1)}
      </ul>

      <article className="content__box content__box--row">
        <table className="content__box__table">
          <thead>
            <tr>
              <th>Lv.</th>
              <th>Name</th>
              <th>Cat.</th>
              <th>PP.</th>
              <th>Power</th>
              <th>Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {pokemonMoves?.map((move, i) => (
              <tr key={i}>
                <th>{move.level}</th>
                <th style={{ background: typeColors[move.type] }}>
                  {move.name}
                </th>
                <th>
                  {move.dc ? (
                    <img
                      className="icon"
                      src={damageClass[move.dc]}
                      alt={move.dc}
                    />
                  ) : (
                    "-"
                  )}
                </th>
                <th>{move.pp}</th>
                <th>{move.power ? move.power : "-"}</th>
                <th>{move.accuracy ? move.accuracy : "-"}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </article>
  );
}
