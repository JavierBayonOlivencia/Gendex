export interface NamedApiResource {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: NamedApiResource;
}

export interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: NamedApiResource;
}

export interface PokemonMoves {
  move: NamedApiResource;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: NamedApiResource;
    version_group: NamedApiResource;
  }[];
}

export interface EncounterDetails {
  chance: number;
  condition_values: NamedApiResource[];
  max_level: number;
  method: NamedApiResource;
}

export interface PokemonSprites {
  front_default: string | null;
  [key: string]: string | null; // For other sprite variations
}

export interface PokemonInfo {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  sprites: PokemonSprites;
  stats: PokemonStats[];
  order: number;
  moves: PokemonMoves[];
  species: NamedApiResource;
}

export interface TypeInfo {
  name: string;
  doubleDamageFrom: string[];
  halfDamageFrom: string[];
  noDamageFrom: string[];
  doubleDamageTo: string[];
  halfDamageTo: string[];
  noDamageTo: string[];
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: NamedApiResource;
  version: NamedApiResource;
}

export interface SpeciesInfo {
  flavorTextEntries: FlavorTextEntry[];
  evolutionChainId: {
    url: string;
  };
  varieties: {
    is_default: boolean;
    pokemon: NamedApiResource;
  }[];
}

export interface LocationInfo {
  encounters: {
    location_area: NamedApiResource;
    version_details: {
      encounter_details: EncounterDetails[];
      max_chance: number;
      version: NamedApiResource;
    }[];
  }[];
}

export interface EvolutionStep {
  id: string;
  name: string;
  minLevel: number | null;
  trigger: string | null;
}

export interface EvolutionChain {
  chain: EvolutionStep[];
}

export interface Generation {
  gen: {
    count: number;
    results: NamedApiResource[];
  };
}

export interface MoveInfo {
  name: string;
  accuracy: number;
  power: number;
  pp: number;
  type: NamedApiResource;
  generation: NamedApiResource;
  damageClass: NamedApiResource;
}