import { NameUrl } from "../raw/pokemon";

export interface ProcessedPokemonMoves {
    name: string;
    accuracy: number | null;
    power: number | null;
    pp: number | null;
    type: NameUrl;
    generation: NameUrl;
    damage_class: NameUrl;
};