import { Varieties } from "../raw/species";

export interface ProcessedPokemonSpecies {
    flavorTextEntries: string,
    evolutionChainId: number,
    varieties: Varieties[],
};