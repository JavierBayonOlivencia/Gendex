import { Moves, NameUrl, Sprites, Stat, Type } from "../raw/pokemon";

export interface ProcessedPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Type[];
  stats: Stat[];
  sprites: Sprites;
  order: number;
  moves: Moves[];
  species: NameUrl;
};