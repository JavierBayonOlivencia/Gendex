import { useEffect, useState } from "react";
import GenCard from "../components/GenCard";
import { PokemonService } from "../api/pokeAPIService";
import { ProcessedAllPokemonGenerations } from "../types/processed/generation";
import extractIdFromUrl from "../utils/extractIdFromUrl";



export default function Home() {
  const [pokemonGen, setPokemonGen] = useState<ProcessedAllPokemonGenerations | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const pokemonService = new PokemonService();
    
    const fetchPokemonGeneration = async () => {
      const generation = await pokemonService.getGenerations();

      if (isMounted) {
        setPokemonGen(generation);
      }
    }

    fetchPokemonGeneration();
    return () => {
      isMounted = false;
    }
  }, []);


  return (
      <main className="container">
        <div className="container__title">
          <h1>Pokemon encyclopedia</h1>
          <span className="gen-counter">
            {pokemonGen?.count} Gens
          </span>
        </div>
        <section className="content">
          <div className="content__grid">
            {pokemonGen?.results.map(({ name, url }) => (
              <GenCard key={extractIdFromUrl(url)} 
                gen={name} 
                genNum={extractIdFromUrl(url)} 
              />
            ))}
          </div>
        </section>
      </main>
  );
}

/*
-- Pokémon Generations and Their Representative Pokémon--
| Generation | Region | Representative Pokémon           | Notes                                                                      |
| ---------- | ------ | -------------------------------- | -------------------------------------------------------------------------- |
| **Gen 1**  | Kanto  | **Pikachu**, Charizard, Mewtwo   | Pikachu is the franchise mascot, Charizard is iconic, Mewtwo is legendary. |
| **Gen 2**  | Johto  | **Lugia**, Ho-Oh                 | Lugia was the mascot of Pokémon Silver and the anime movie.                |
| **Gen 3**  | Hoenn  | **Groudon**, Kyogre, Rayquaza    | Box art legendaries of Ruby, Sapphire, Emerald.                            |
| **Gen 4**  | Sinnoh | **Dialga**, Palkia, Giratina     | Legendary trio of Diamond, Pearl, and Platinum.                            |
| **Gen 5**  | Unova  | **Reshiram**, Zekrom, Kyurem     | Legendaries for Black/White and Black 2/White 2.                           |
| **Gen 6**  | Kalos  | **Xerneas**, Yveltal, Zygarde    | Mascots for X, Y, and the lore of Kalos.                                   |
| **Gen 7**  | Alola  | **Solgaleo**, Lunala, Necrozma   | Featured in Sun, Moon, and Ultra versions.                                 |
| **Gen 8**  | Galar  | **Zacian**, Zamazenta, Eternatus | Legendaries of Sword and Shield.                                           |
| **Gen 9**  | Paldea | **Koraidon**, Miraidon           | Legendary Pokémon from Scarlet and Violet.                                 |
*/