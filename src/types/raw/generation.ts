export interface RawPokemonGenerations {
    count: number;
    next: null;
    previous: null;
    results: NameUrl[];
};

export interface RawPokemonGeneration {
    abilities: [];
    id: number;
    main_region: NameUrl;
    moves: NameUrl[];
    name: string;
    names: Names[];
    pokemon_species: NameUrl[];
    types: NameUrl[];
    version_groups: NameUrl[];
};

export interface NameUrl {
    name: string;
    url: string;
};

export interface Names {
    language: NameUrl;
    name: string;
};