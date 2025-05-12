export interface RawPokemonSpecies {
    base_happiness: number;
    capture_rate: number;
    color: NameUrl;
    egg_groups: NameUrl[];
    evolution_chain: { url: string };
    evolves_from_species: NameUrl;
    flavor_text_entries: FlavorTextEntries[];
    form_descriptions: FormDescrioptions[];
    forms_switchable: boolean;
    gender_rate: number;
    genera: Genera[];
    generation: NameUrl;
    growth_rate: NameUrl;
    habitat: null;
    has_gender_differences: boolean;
    hatch_counter: number;
    id: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    name: string;
    names: Names[];
    order: number;
    pal_park_encounters: [];
    pokedex_numbers: PokedexNumbers[];
    shape: NameUrl;
    varieties: Varieties[];
};

export interface NameUrl {
    name: string;
    url: string;
};

export interface FlavorTextEntries {
    flavor_text: string;
    language: NameUrl;
    version: NameUrl;
};

export interface FormDescrioptions {
    description: string;
    language: NameUrl;
};

export interface Genera {
    genus: string;
    language: NameUrl;
};

export interface Names {
    name: string;
    language: NameUrl;
};

export interface PokedexNumbers {
    entry_number: number;
    pokedex: NameUrl;
};

export interface Varieties {
    is_default: boolean;
    pokemon: NameUrl;
};