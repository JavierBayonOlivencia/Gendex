export interface RawPokemonType {
    damage_relations: DamageRelations;
    game_indices: GameIndices[];
    generation: NameUrl;
    id: number;
    move_damage_class: NameUrl;
    moves: NameUrl[];
    name: string;
    names: Names[];
    past_damage_relatios: [];
    pokemon: Pokemon[];
    sprites: Sprites;
};

interface NameUrl {
    name: string;
    url: string;
};

interface DamageRelations {
    double_damage_from: NameUrl[];
    double_damage_to: NameUrl[];
    half_damage_from: NameUrl[];
    half_damage_to: NameUrl[];
    no_damage_from: NameUrl[];
    no_damage_to: NameUrl[]
};

interface GameIndices {
    game_index: number;
    generation: NameUrl;
};

interface Names {
    language: NameUrl;
    name: string;
};

interface Pokemon {
    pokemon: NameUrl;
    slot: number;
};

interface Sprites {
    "generation-iii": GeneratiomIii;
    "generation-iv": GenerationIv;
    "generation-v": GenerationV;
    "generation-Vi": GenerationVi;
    "generation-Vii": GenerationVii;
    "generation-viii": GenerationViii;
    "generation-ix": GenerationIx;
};

interface GeneratiomIii {
    colosseum: NameIcon;
    emerald: NameIcon;
    "firered-leafgreen": NameIcon;
    "ruby-saphire": NameIcon;
    xd: NameIcon;
};

interface GenerationIv {
    "diamond-pearl": NameIcon;
    "heartgold-soulsilver": NameIcon;
    platinu: NameIcon;
};

interface GenerationV {
    "black-2-white-2": NameIcon;
    "black-white": NameIcon;
};

interface GenerationVi {
    "omega-ruby-alpha-saphire": NameIcon;
    "x-y": NameIcon;
};

interface GenerationVii {
    "lets-go-pikachu-lets-go-eevee": NameIcon;
    "sun-moon": NameIcon;
    "ultra-sun-ultra-moon": NameIcon;
};

interface GenerationViii {
    "brilliant-diamon-and-shining-pearl": NameIcon;
    "legends-arceus": NameIcon;
    "sword-shield": NameIcon;
};

interface GenerationIx {
    "scarlet-violet": NameIcon;
};

interface NameIcon {
    name_icon: string
};