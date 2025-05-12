export interface RawPokemonLocation {
    location_area: NameUrl;
    version_details: VersionDetails[];
};

interface NameUrl {
    name: string;
    url: string;
};

interface VersionDetails {
    encounter_details: EncounterDetails[];
    max_chance: number;
    version: NameUrl;
};

interface EncounterDetails {
    chance: number;
    condition_values: NameUrl[];
    max_level: number;
    method: NameUrl;
    min_level: number;
};