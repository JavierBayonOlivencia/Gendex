import { useEffect, useState } from "react";
import { PokemonService } from "../api/pokeAPIService";

interface Props {
  isArea: boolean;
  pokemonName: string | null;
  pokemonId: number | null;
};

interface EncounterGroup {
  area: string;
  method: string;
  versions: string[];
}

export default function Area({ isArea, pokemonName, pokemonId }: Props) {
  const [pokemonArea, setPokemonArea] = useState<EncounterGroup[] | null>(null);

  useEffect(() => {
    const pokemonService = new PokemonService();
    let isMounted = true;

    const fetchPokemonArea = async () => {
      if (pokemonName === null || pokemonId === null) return;

      const location = await pokemonService.getLocationInfo(pokemonId);

      const encounterMap = new Map<string, {
        area: string;
        method: string;
        versions: Set<string>;
      }>();
  
      for (const encounter of location.encounters) {
        const area = encounter.location_area.name;
  
        for (const versionDetail of encounter.version_details) {
          const version = versionDetail.version.name;
  
          for (const encounterDetail of versionDetail.encounter_details) {
            const method = encounterDetail.method?.name;
            if (!method) continue;
  
            const key = `${method}`;
  
            if (!encounterMap.has(key)) {
              encounterMap.set(key, {
                area: area,
                method: method,
                versions: new Set([version]),
              });
            } else {
              encounterMap.get(key)?.versions.add(version);
            }
          }
        }
      }
  
      const groupedEncounters = Array.from(encounterMap.values()).map(entry => ({
        area: entry.area,
        method: entry.method,
        versions: Array.from(entry.versions).sort(),
      }));

      if (isMounted) {
        setPokemonArea(groupedEncounters);
      }
    };

    fetchPokemonArea();

    return () => {
      isMounted = false;
    };
  }, [pokemonName, pokemonId]);

  return (
    <div
      className={`content content__page ${isArea ? "content__page--active" : ""}`}
    >
      {pokemonArea?.length === 0 && <h2>Location not found.</h2>}
      {pokemonArea?.map((encounter, i) => (
        <article key={i} className="content__box content__box--column">
          <span className="font-w700">Pokemon {encounter.versions.join(" / ")}</span>
          <p>
            {encounter.method}. {encounter.area}
          </p>
        </article>
      ))}
    </div>
  );
}
