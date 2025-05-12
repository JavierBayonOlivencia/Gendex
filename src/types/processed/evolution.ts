export interface ProcessedPokemonEvolution {
    chain: {
        id: number;
        name: string;
        minLevel: number | null;
        trigger: string | null;
    }[];
};

export interface PokemonEvolutionSteps {
    id: number;
    name: string;
    minLevel: number | null;
    trigger: string | null;
};