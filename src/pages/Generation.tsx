import { useParams } from "react-router-dom";
import PokeDXNav from "../components/PokeDXNav";
import PokeNav from "../components/PokeNav";
import { usePokeNav } from "../hooks/usePokeNav";
import { useEffect, useState } from "react";
import { PokemonService } from "../api/pokeAPIService";
import PokeDXData from "../components/PokeDXData";

interface Species {
  name: string;
  url: string;
};

interface GenerationData {
  pokemon_species: Species[];
};

interface SelectedPokemon {
  selectedPokemonId: number | null;
  selectedPokemonName: string | null;
}

export default function Generation() {
  const { id, name } = useParams<{ id: string; name: string}>();
  const { state, dispatch } = usePokeNav();
  const { isSelected, isInfo, isArea, isForms } = state;
  const [activeLink, setActiveLink] = useState<number | null>(null);
  const [pokemonSpecies, setPokemonSpecies] = useState<GenerationData | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<SelectedPokemon>({
    selectedPokemonId: null,
    selectedPokemonName: null,
  });
  

  useEffect(() => {
    const pokemonService = new PokemonService();
    let isMounted = true;

    const fetchPokemonGeneration = async () => {
      const generationInfo = await pokemonService.getGeneration(id);

      if (isMounted) {
        setPokemonSpecies(generationInfo);
      }
    };

    fetchPokemonGeneration();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <>
      {isSelected ? (
        <PokeNav dispatch={dispatch} state={state} />
      ) : (
        <span className="header__location">Gen {id}: {name}</span>
      )}
      <main className="container container--grid">
        <PokeDXNav
          activeLink={activeLink}
          setActiveLink={setActiveLink}
          isSelected={isSelected}
          dispatch={dispatch}
          species={pokemonSpecies?.pokemon_species}
          setSelectedPokemon={setSelectedPokemon}
        />

        <PokeDXData
          setActiveLink={setActiveLink}
          gen={Number(id)}
          isInfo={isInfo}
          isArea={isArea}
          isForms={isForms}
          isSelected={isSelected}
          selectedPokemon={selectedPokemon}
          setSelectedPokemon={setSelectedPokemon}
          activeState=""
        />

        <button
          onClick={() => dispatch({ type: "SET_SELECTED", payload: false })}
          className="btn btn--outline btn--fixed"
        >
          Back to list
        </button>
      </main>
    </>
  );
}