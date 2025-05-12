export interface RawPokemonMove {
    accuracy: null;
    contest_combos: null;
    contest_effect: { url: string };
    contest_type: NameUrl;
    damage_class: NameUrl;
    effect_chance: null;
    effect_changes: [];
    effect_entries: EffectEntries[];
    flavor_text_entries: FlavorTextEntries[];
    generation: NameUrl;
    id: number;
    learned_by_pokemon: NameUrl[];
    machines: [];
    meta: Meta;
    name: string;
    names: Names[];
    past_values: [];
    power: number | null;
    pp: number | null;
    priority: number | null;
    stat_changes: [];
    super_contest_effect: { url: string };
    target: NameUrl;
    type: NameUrl;
};

interface NameUrl {
    name: string;
    url: string;
};

interface EffectEntries {
    effect: string;
    language: NameUrl;
    short_effect: string;
};

interface FlavorTextEntries {
    flavor_text: string;
    language: NameUrl;
    version_group: NameUrl;
};

interface Meta {
    ailment: NameUrl;
    ailment_chance: number;
    category: NameUrl;
    crit_rate: number;
    drain: number;
    flinch_chance: number;
    healing: number;
    max_hits: null;
    max_turns: null;
    min_hits: null;
    min_turns: null;
    stat_chance: number;
};

interface Names {
    name: string;
    language: NameUrl;
};