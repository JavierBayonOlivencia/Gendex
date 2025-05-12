import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PokemonService } from "../api/pokeAPIService";
import gen1 from "../assets/gens/Pallet_Town_RBY.png";
import gen2 from "../assets/gens/New_Bark_Town_GSC.png";
import gen3 from "../assets/gens/Littleroot_Town_RS.png";
import gen4 from "../assets/gens/Twinleaf_Town_DP.png";
import gen5 from "../assets/gens/Nuvema_Town_Spring_BW.png";
import gen6 from "../assets/gens/Vaniville_Town_XY.png";
import gen7 from "../assets/gens/Iki_Town_SM.png";
import gen8 from "../assets/gens/Postwick_Player_house_SwSh.png";
import gen9 from "../assets/gens/Cabo_Poco_SV.png";
import { ProcessedPokemonGeneration } from "../types/processed/generation";

interface Props {
  gen: string;
  genNum: number;
};

const genImage: Record<string, string> = {
  1: gen1,
  2: gen2,
  3: gen3,
  4: gen4,
  5: gen5,
  6: gen6,
  7: gen7,
  8: gen8,
  9: gen9,
};

const pokemonService = new PokemonService();

export default function GenCard({ gen, genNum }: Props) {
  const [pokemonGen, setPokemonGen] = useState<ProcessedPokemonGeneration | null>();
  const genString = gen.slice(0, 3);
  const genNumber = gen.split("-")[1];

  useEffect(() => {
    
    const fetchPokemonGeneration = async () => {
      const generationInfo = await pokemonService.getGeneration(genNum);
      setPokemonGen(generationInfo);
    };

    fetchPokemonGeneration();
  }, [genNum]);

  return (
    <Link
      to={`/generation/${genNum}/${pokemonGen?.main_region.name}`}
      className="gen-card"
    >
      <div className="gen-card__image">
        <img loading="lazy" src={genImage[genNum]} alt={pokemonGen?.main_region.name} />
        <h2 className="gen-card__title">
          {`${genString}-${genNumber}`}
        </h2>
      </div>
      <div className="gen-card__info">
        <span>Region: {pokemonGen?.main_region.name}</span>
        <span>Pokemon: {pokemonGen?.pokemon_species.length}</span>
      </div>
    </Link>
  );
}
