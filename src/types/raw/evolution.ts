export interface RawPokemonEvolution {
    baby_trigger_item: null;
    chain: Chain;
};

export interface NameUrl {
    name: string;
    url: string;
};

export interface Chain {
    evolution_details: [];
    evolves_to: EvolvesTo[];
    is_baby: boolean;
    species: NameUrl;
    id: number;
};

export interface EvolvesTo {
    evolution_details: EvolutionDetails[];
    evolves_to: EvolvesTo[];
    is_baby: boolean;
    species: NameUrl;
};

export interface EvolutionDetails {
    gender: null;
    held_item: null;
    item: null;
    known_move: null;
    known_move_type: null;
    location: null;
    min_affection: null;
    min_beauty: null;
    min_happiness: null;
    min_level: number;
    needs_overworld_rain: boolean;
    party_species: null;
    party_type: null;
    relative_physical_stats: null;
    time_of_day: string;
    trade_species: null;
    trigger: NameUrl;
    turn_upside_down: boolean;
};