// import { RawPokemonGenerations } from "../raw/generation";

import { NameUrl } from "../raw/generation";

export interface ProcessedAllPokemonGenerations {
    count: number,
    results: NameUrl[]
};

export interface ProcessedPokemonGeneration {
    main_region: NameUrl;
    pokemon_species: NameUrl[];
};