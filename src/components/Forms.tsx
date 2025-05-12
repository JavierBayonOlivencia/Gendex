import { useEffect, useState } from "react";
import { PokemonService } from "../api/pokeAPIService";
import extractIdFromUrl from "../utils/extractIdFromUrl";
import { ProcessedPokemon } from "../types/processed/pokemon";
import { ProcessedPokemonSpecies } from "../types/processed/species";

interface Props {
  isForms: boolean;
  pokemonId: number | null;
  pokemonName: string | null;
  setSelectedPokemon: React.Dispatch<
    React.SetStateAction<{
      selectedPokemonId: number | null;
      selectedPokemonName: string | null;
  }>>;
  setActiveLink: React.Dispatch<React.SetStateAction<number | null>>;
  info: ProcessedPokemon | undefined;
  specie: ProcessedPokemonSpecies | undefined;
}

interface EvolutionForm {
  info: ProcessedPokemon;
  name: string;
  minLevel: number | null;
  trigger: string | null;
}

interface FormsArticleProps {
  title: string;
  pokemon: EvolutionForm[];
  setSelectedPokemon: React.Dispatch<
    React.SetStateAction<{
      selectedPokemonId: number | null;
      selectedPokemonName: string | null;
  }>>;
  setActiveLink: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Forms({
  isForms,
  pokemonId,
  pokemonName,
  setSelectedPokemon,
  setActiveLink,
  info,
  specie,
}: Props) {
  const [evolutionForms, setEvolutionForms] = useState<EvolutionForm[]>([]);
  const [variationForms, setVariationForms] = useState<EvolutionForm[]>([]);

  useEffect(() => {
    const pokemonService = new PokemonService();
    let isMounted = true;

    const fetchPokemonForms = async () => {
      if (info === undefined || specie === undefined) return;

      const evolutionChainId = specie.evolutionChainId;
      const varieties = specie.varieties;

      const evolutionChainInfo = await pokemonService.getEvolutionChain(
        evolutionChainId
      );

      // Pokemon Evolution Chain
      const pokemonInfo = await Promise.all(
        evolutionChainInfo.chain.map(({ id }) =>
          pokemonService.getPokemonInfo(id)
        )
      );

      const pokemonsChains = evolutionChainInfo.chain.map((chain, idx) => ({
        info: pokemonInfo[idx],
        name: chain.name,
        minLevel: chain.minLevel,
        trigger: chain.trigger,
      }));

      // Pokemon Variation
      const relativeVariation = varieties.filter((v) => {
        return v.is_default === false;
      });

      const variationInfo = await Promise.all(
        relativeVariation.map((rv) =>
          pokemonService.getPokemonInfo(extractIdFromUrl(rv.pokemon.url))
        )
      );

      const pokemonsVarieties = relativeVariation.map((varieti, idx) => ({
        info: variationInfo[idx],
        name: varieti.pokemon.name,
        minLevel: null,
        trigger: null,
      }));

      if (isMounted) {
        setEvolutionForms(pokemonsChains);
        setVariationForms(pokemonsVarieties);
      }
    };

    fetchPokemonForms();

    return () => {
      isMounted = false;
    };
  }, [pokemonId, pokemonName, info, specie]);

  return (
    <div
      className={`content content__page ${isForms && "content__page--active"}`}
    >
      {evolutionForms?.length > 0 && (
        <FormsArticle
          title={"Evolution Chain"}
          pokemon={evolutionForms}
          setSelectedPokemon={setSelectedPokemon}
          setActiveLink={setActiveLink}
        />
      )}

      {variationForms?.length > 0 && (
        <FormsArticle
          title={"Variations"}
          pokemon={variationForms}
          setSelectedPokemon={setSelectedPokemon}
          setActiveLink={setActiveLink}
        />
      )}

      {evolutionForms?.length < 0 && variationForms?.length < 0 && (
        <h2>
          This Pokémon currently doesn't have any other forms or variations.
        </h2>
      )}
    </div>
  );
}

function FormsArticle({
  title,
  pokemon,
  setSelectedPokemon,
  setActiveLink,
}: FormsArticleProps) {
  function handleClick(id: number, name: string) {
    setSelectedPokemon({ selectedPokemonId: id, selectedPokemonName: name });
    setActiveLink(id);
  }

  return (
    <article className="content__box content__box--column">
      <span className="font-w700">{title}</span>
      <div className="content__box flex-wrap">
        {pokemon?.map((pf) => (
          <div
            onClick={() => handleClick(pf.info.id, pf.name)}
            key={`${pf.info.id}-${pf.name}`}
            className="content__image content__image--md"
          >
            <span>{pf.name}</span>
            {pf.trigger && (
              <span>
                {pf.trigger}.{pf.minLevel}
              </span>
            )}

            <img
              loading="lazy"
              src={
                pf?.info?.sprites?.other?.["official-artwork"]?.front_default ??
                ""
              }
              alt={pf.name}
            />
          </div>
        ))}
      </div>
    </article>
  );
}