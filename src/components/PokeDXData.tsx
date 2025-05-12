import { InitialState } from "../hooks/usePokeNav";
import { useEffect, useState } from "react";
import { PokemonService } from "../api/pokeAPIService";
import Ilustration from "./Ilustration";
import { lazy, Suspense } from "react";
import extractIdFromUrl from "../utils/extractIdFromUrl";
import { ProcessedPokemon } from "../types/processed/pokemon";
import { ProcessedPokemonSpecies } from "../types/processed/species";

const Area = lazy(() => import("./Area"));
const Forms = lazy(() => import("./Forms"));
const Info = lazy(() => import("./Info"));

interface Props {
  setActiveLink: React.Dispatch<React.SetStateAction<number | null>>;
  selectedPokemon: {
    selectedPokemonId: number | null;
    selectedPokemonName: string | null;
  };
  setSelectedPokemon: React.Dispatch<
    React.SetStateAction<{
      selectedPokemonId: number | null;
      selectedPokemonName: string | null;
    }>
  >;
  gen: number;
}

export default function PokeDXData({
  setActiveLink,
  isInfo,
  isArea,
  isForms,
  isSelected,
  selectedPokemon,
  setSelectedPokemon,
  gen,
}: InitialState & Props) {
  const { selectedPokemonName, selectedPokemonId } = selectedPokemon;
  const [info, setInfo] = useState<ProcessedPokemon | undefined>();
  const [specie, setSpecie] = useState<ProcessedPokemonSpecies | undefined>();

  useEffect(() => {
    let isMounted = true;
    const pokemonService = new PokemonService();

    const fetchPokeonsData = async () => {
      if (selectedPokemonName === null || selectedPokemonId === null) return;

      const pokemonInfo = await pokemonService.getPokemonInfo(selectedPokemonId);
      const pokemonSpeciesId = extractIdFromUrl(pokemonInfo.species.url);

      const pokemonSpecies = await pokemonService.getSpeciesInfo(
        pokemonSpeciesId
      );

      if (isMounted) {
        setInfo(pokemonInfo);
        setSpecie(pokemonSpecies);
      }
    };

    fetchPokeonsData();

    return () => {
      isMounted = false;
    };
  }, [selectedPokemonName, selectedPokemonId]);

  return (
    <section className="content content--row">
      <Ilustration
        pokemonName={selectedPokemonName}
        pokemonId={selectedPokemonId}
        info={info}
      />

      <div className={`content ${!isSelected ? "none" : ""}`}>
        <Suspense fallback={<p>Loading...</p>}>
          <Info
            isInfo={isInfo}
            pokemonName={selectedPokemonName}
            pokemonId={selectedPokemonId}
            gen={gen}
            info={info}
            specie={specie}
          />
          <Area
            isArea={isArea}
            pokemonName={selectedPokemonName}
            pokemonId={selectedPokemonId}
          />
          <Forms
            isForms={isForms}
            pokemonName={selectedPokemonName}
            pokemonId={selectedPokemonId}
            setSelectedPokemon={setSelectedPokemon}
            setActiveLink={setActiveLink}
            info={info}
            specie={specie}
          />
        </Suspense>
      </div>
    </section>
  );
}
