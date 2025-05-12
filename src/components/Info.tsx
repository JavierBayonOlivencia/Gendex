import { useEffect, useState } from "react";
import { PokemonService } from "../api/pokeAPIService";
import typeColors from "../api/typeColors";
import genVersionGroupMap from "../api/genVersion";
import extractIdFromUrl from "../utils/extractIdFromUrl";
import InfoStats from "./InfoStats";
import InfoMoves from "./InfoMoves";
import InfoEffectiveness from "./InfoEffectiveness";
import { ProcessedPokemon } from "../types/processed/pokemon";
import { ProcessedPokemonSpecies } from "../types/processed/species";


interface Props {
  gen: number;
  isInfo: boolean;
  pokemonName: string | null;
  pokemonId: number | null;
  info: ProcessedPokemon | undefined;
  specie: ProcessedPokemonSpecies | undefined;
};


interface Move {
  name: string;
  level: number;
  power: number | null;
  accuracy: number | null;
  pp: number | null;
  type: string;
  dc: string;
};


export default function Info({ isInfo, pokemonName, pokemonId, gen, info, specie }: Props) {
  const [versionGroups, setVersionGroups] = useState(genVersionGroupMap[gen]);
  const [pokemonInfo, setPokemonInfo] = useState<ProcessedPokemon | null>(null);
  const [pokemonSpecies, setPokemonSpecies] = useState<ProcessedPokemonSpecies | null>(null);
  const [weaknesses, setWeaknesses] = useState<string[] | null>([]);
  const [strongest, setStrongest] = useState<string[] | null>(null);
  const [totalStats, setTotalStats] = useState<number | null>(null);
  const [pokemonMoves, setPokemonMoves] = useState<Move[]>([]);

  useEffect(() => {
    const pokemonService = new PokemonService();
    let isMounted = true;

    const fetchPokemonInfo = async () => {
      if (!info || !specie) return;

      // const info = await pokemonService.getPokemonInfo(pokemonId);
      // const spesieId = extractIdFromUrl(info.species.url);
      // const specie = await pokemonService.getSpeciesInfo(spesieId);

      const statSum = info?.stats.reduce((sum, stat) => sum + stat.base_stat, 0)

      
      // Types
      const typeInfo = await Promise.all(
        info.types.map((t) => 
        pokemonService.getTypeInfo(t.type.name)
      ));

      const weaknessesSet = new Set<string>();
      const halfDamageFromSet = new Set<string>();
      const noDamageFromSet = new Set<string>();

      const superEffectiveSet = new Set<string>();
      // const effectiveSet = new Set<string>();
      // const notEffectiveSet = new Set<string>();

      for (const typeInfoData of typeInfo) {
        typeInfoData.doubleDamageFrom.forEach((ddf) => weaknessesSet.add(ddf));
        typeInfoData.halfDamageFrom.forEach((hdf) => halfDamageFromSet.add(hdf));
        typeInfoData.noDamageFrom.forEach((ndf) => noDamageFromSet.add(ndf));

        typeInfoData.doubleDamageTo.forEach((ddt) => superEffectiveSet.add(ddt));
        // typeInfoData.halfDamageTo.forEach((hdt) => effectiveSet.add(hdt));
        // typeInfoData.noDamageTo.forEach((ndt) => notEffectiveSet.add(ndt));
      }

      const filterdWeaknesses = Array.from(weaknessesSet).filter(
        (t) => !halfDamageFromSet.has(t) && !noDamageFromSet.has(t)
      )

      
      // Moves
      const relevantMoves = info.moves.map((movesObj) => {
        const learnMethod = movesObj.version_group_details.find(
          (vgd) =>
            versionGroups.includes(vgd.version_group.name) &&
            vgd.move_learn_method.name === "level-up" // machine
        );

        if (!learnMethod) return null;

        const moveId = extractIdFromUrl(movesObj.move.url);
        return {
          id: moveId,
          level: learnMethod.level_learned_at,
        };
      }).filter(Boolean) as { id: number; level: number }[];


      const moveData = await Promise.all(
        relevantMoves.map(({ id }) => 
        pokemonService.getMoves(id))
      );

      const moveList = moveData.map((moveData, idx) => (
        {
          name: moveData.name,
          level: relevantMoves[idx].level,
          power: moveData.power,
          accuracy: moveData.accuracy,
          pp: moveData.pp,
          type: moveData.type.name,
          dc: moveData.damage_class.name,
        }
      ));

      moveList.sort((a, b) => a.level - b.level);

      if (isMounted) {
        setPokemonInfo(info);
        setPokemonSpecies(specie);
        setWeaknesses(filterdWeaknesses);
        setTotalStats(statSum);
        setStrongest(Array.from(superEffectiveSet));
        setPokemonMoves(moveList);
        // console.log("Super effective", superEffectiveSet);
        // console.log("Effective", effectiveSet);
        // console.log("Not effective", notEffectiveSet);
      }
    };

    fetchPokemonInfo();

    return () => {
      isMounted = false;
    };
  }, [pokemonName, pokemonId, versionGroups, info, specie]);

  return (
    <div
      className={`content content__page ${isInfo ? "content__page--active" : ""}`}
    >
      <article className="content__box content__box--row">
        <span className="font-w700">Type:</span>
        <ul className="flex-wrap">
          {pokemonInfo?.types?.map((type, i) => (
            <li
              className="content__box__item"
              style={{ background: typeColors[type.type.name] }}
              key={i}
            >
              {type.type.name}
            </li>
          ))}
        </ul>
      </article>

      <p>{pokemonSpecies?.flavorTextEntries}</p>

        <InfoStats pokemonInfo={pokemonInfo} totalStats={totalStats} />
      
        <InfoEffectiveness effectiveness={weaknesses} title="Weakness" />

        <InfoEffectiveness effectiveness={strongest} title="Strength" />

        <InfoMoves pokemonMoves={pokemonMoves} setVersionGroups={setVersionGroups} generation={gen} />
    </div>
  );
}