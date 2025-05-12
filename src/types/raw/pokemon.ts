export interface RawPokeomnInfo {
    abilities: Abilities[];
    base_experience: number;
    cries: Cries;
    forms: NameUrl[];
    game_indices: GameIndices[];
    height: number;
    held_items: HeldItems[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Moves[];
    name: string;
    order: number;
    past_abilities: PastAbilities[];
    past_types: [];
    species: NameUrl;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
    weight: number;
};

export interface NameUrl {
    name: string;
    url: string;
};

export interface Abilities {
    ability: NameUrl;
    is_hidden: boolean;
    slot: number;
};

export interface Cries {
    latest: string;
    legacy: string;
};

export interface GameIndices {
    game_idex: number;
    version: NameUrl;
};

export interface HeldItems {
    item: NameUrl;
    version_details: VersionDetails[];
};

export interface VersionDetails {
    rarity: number;
    version: NameUrl;
};

export interface Moves {
    move: NameUrl;
    version_group_details: VersionGroupDetails[];
};

export interface VersionGroupDetails {
    level_learned_at: number;
    move_learn_method: NameUrl;
    order: null;
    version_group: NameUrl;
};

export interface PastAbilities {
    abilities: Abilities[];
    generation: NameUrl;
};

export interface Sprites {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
    other: Other;
    versions: Versions;
};

export interface Other {
    dream_world: DreamWorld;
    home: Home;
    ["official-artwork"]: OfficialArtwork;
    showdown: Showdown;
};

export interface DreamWorld {
    front_default: string;
    front_female: string | null;
};

export interface Home {
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
};

export interface OfficialArtwork {
    front_default: string;
    front_shiny: string;
};

export interface Showdown {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
};

export interface Versions {
    "generation-i": GenerationI;
    "generation-ii": GenerationIi;
    "generation-iii": GenerationIii;
    "generation-Iv": GenerationIv;
    "generation-v": GenerationV;
    "generation-vi": GenerationVi;
    "generation-vii": GenerationVii;
    "generation-viii": GenerationViii;
};

export interface GenerationI {
    "red-blue": RedBlue;
    yellow: Yellow;
};

export interface RedBlue {
    back_default: string;
    back_gray: string;
    back_transparent: string;
    front_default: string;
    front_gray: string;
    front_transparent: string;
};

export interface Yellow {
    back_default: string;
    back_gray: string;
    back_transparent: string;
    front_default: string;
    front_gray: string;
    front_transparent: string;
};

export interface GenerationIi {
    crystal: Crystal;
    gold: Gold;
    silver: Silver;
};

export interface Crystal {
    back_default: string;
    back_shiny: string;
    back_shiny_transparent: string;
    back_transparent: string;
    front_default: string;
    front_shiny: string;
    front_shiny_transparent: string;
    front_transparent: string;
};

export interface Gold {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    front_transparent: string;
};

export interface Silver {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    fron_stansparent: string;
};

export interface GenerationIii {
    emerald: Emerald;
    "firered-leafgreen": FireredLeafgreen;
    "ruby-sapphire": RubySapphire;
};

export interface Emerald {
    front_default: string;
    front_shiny: string;
};

export interface FireredLeafgreen {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
};

export interface RubySapphire {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
};

export interface GenerationIv {
    "diamond-pearl": DiamondPearl;
    "heartgold-soulsilver": HeartgoldSoulsilver;
    platinum: Platinum;
}

export interface DiamondPearl {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
};

export interface HeartgoldSoulsilver {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
};

export interface Platinum {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
};

export interface GenerationV {
    "black-white": BlackWhite;
};

export interface BlackWhite {
    animated: Animated;
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string;
};

export interface Animated {
    back_default: string;
    back_female: string | null;
    back_shiny: string;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
};

export interface GenerationVi {
    "omegaruby-alphasapphire": OmegarubyAlphasapphire;
    "x-y": XY;
};
  
export interface OmegarubyAlphasapphire {
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
};
  
export interface XY {
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
};

export interface GenerationVii {
    icons: Icons;
    "ultra-sun-ultra-moon": UltraSunUltraMoon;
};
  
export interface Icons {
    front_default: string;
    front_female: string | null;
};
  
export interface UltraSunUltraMoon {
    front_default: string;
    front_female: string| null;
    front_shiny: string;
    front_shiny_female: string| null;
};

export interface GenerationViii {
    icons: Icons;
};
  
export interface Stat {
    base_stat: number
    effort: number;
    stat: NameUrl;
};

export interface Type {
    slot: number;
    type: NameUrl;
};