import { NamedApiResource } from "../types/pokemon";
import extractIdFromUrl from "../utils/extractIdFromUrl";
import { ProcessedPokemon } from "../types/processed/pokemon";
import { ProcessedPokemonSpecies } from "../types/processed/species";
import { ProcessedPokemonType } from "../types/processed/type";
import { FlavorTextEntries } from "../types/raw/species";
import { PokeAPIClient } from "./pokeAPI";
import { ProcessedPokemonLocation } from "../types/processed/location";
import { PokemonEvolutionSteps, ProcessedPokemonEvolution } from "../types/processed/evolution";
import { EvolutionDetails, EvolvesTo } from "../types/raw/evolution";
import { ProcessedAllPokemonGenerations, ProcessedPokemonGeneration } from "../types/processed/generation";
import { ProcessedPokemonMoves } from "../types/processed/move";


export class PokemonService {
  private apiClient: PokeAPIClient;

  constructor() {
    this.apiClient = new PokeAPIClient();
  }

  async getPokemonInfo(name: string | number): Promise<ProcessedPokemon> {
    try {
      const pokemonData = await this.apiClient.getPokemon(name);
        // console.log("Get Pokemon:",pokemonData)
      return {
        id: pokemonData.id,
        name: pokemonData.name,
        height: pokemonData.height,
        weight: pokemonData.weight,
        types: pokemonData.types,
        sprites: pokemonData.sprites,
        stats: pokemonData.stats,
        order: pokemonData.order,
        moves: pokemonData.moves,
        species: pokemonData.species,
      };
    } catch (error) {
      console.error("Error fetching Pokemon info:", error);
      throw new Error("Failed to fetch Pokemon info.");
    }
  }

  async getTypeInfo(typeName: string | number): Promise<ProcessedPokemonType> {
    try {
      const typeData = await this.apiClient.getPokemonType(typeName);
      return {
        name: typeData.name,
        doubleDamageFrom: typeData.damage_relations.double_damage_from.map(
          (ddf: NamedApiResource) => ddf.name
        ),
        halfDamageFrom: typeData.damage_relations.half_damage_from.map(
          (hdf: NamedApiResource) => hdf.name
        ),
        noDamageFrom: typeData.damage_relations.no_damage_from.map(
          (ndf: NamedApiResource) => ndf.name
        ),
        doubleDamageTo: typeData.damage_relations.double_damage_to.map(
          (ddt: NamedApiResource) => ddt.name
        ),
        halfDamageTo: typeData.damage_relations.half_damage_to.map(
          (hdt: NamedApiResource) => hdt.name
        ),
        noDamageTo: typeData.damage_relations.no_damage_to.map(
          (ndt: NamedApiResource) => ndt.name
        ),
      };
    } catch (error) {
      console.error("Error fetching Type info:", error);
      throw new Error("Failed to fetch Type info.");
    }
  }

  async getSpeciesInfo(name: string | number): Promise<ProcessedPokemonSpecies> {
    try {
      const speciesData = await this.apiClient.getPokemonSpecies(name);

      const enFlaverText = speciesData.flavor_text_entries.filter(
        (entry: FlavorTextEntries) => entry.language.name === "en"
      )[0].flavor_text;

      const evolutionsId = extractIdFromUrl(speciesData.evolution_chain.url);

      return {
        // flavorTextEntries: speciesData.flavor_text_entries[0].flavor_text,
        flavorTextEntries: enFlaverText,
        evolutionChainId: evolutionsId,
        varieties: speciesData.varieties.map((v) => v),
      };
    } catch (error) {
      console.error("Error fetching Species info:", error);
      throw new Error("Failed to fetch Species info.");
    }
  }

  async getLocationInfo(name: number): Promise<ProcessedPokemonLocation> {
    try {
      const locationData = await this.apiClient.getPokemonLocation(name);
      // console.log("Get Location:", locationData);
      return {
        encounters: locationData,
        // encounters:  locationData.map((location: any) => location.location_area.name)
      };
    } catch (error) {
      console.error("Error fetching Location info:", error);
      throw new Error("Failed to fetch Location info.");
    }
  }

  async getEvolutionChain(id: number | string): Promise<ProcessedPokemonEvolution> {
    try {
      const evolutionChainData = await this.apiClient.getPokemonEvolutionChain(
        id
      );

      const chains = new Map<string, PokemonEvolutionSteps>();

      const addEvolutions = (evolution: EvolvesTo) => {
        const pokeId = extractIdFromUrl(evolution.species.url);
        const pokeName = evolution.species.name;

        if (evolution.evolution_details.length === 0) {
          chains.set(pokeId.toString(), {
            id: pokeId,
            name: pokeName,
            minLevel: null,
            trigger: null,
          });
        }

        evolution.evolution_details.forEach((ed: EvolutionDetails) => {
          chains.set(pokeId.toString(), {
            id: pokeId,
            name: pokeName,
            minLevel: ed.min_level,
            trigger: ed.trigger.name,
          });
        });

        evolution.evolves_to.forEach(addEvolutions);
      };

      addEvolutions(evolutionChainData.chain);
      
      return {
        chain: Array.from(chains.values()),
      };
    } catch (error) {
      console.error("Error fetching Evolution chain:", error);
      throw new Error("Failed to fetch Evolution chain.");
    }
  }

  async getGenerations(): Promise<ProcessedAllPokemonGenerations> {
    try {
      const generationData = await this.apiClient.getAllPokemonGenerations();

      return {
        count: generationData.count,
        results: generationData.results,
      };
    } catch (error) {
      console.error("Error fetching All Generations info:", error);
      throw new Error("Failed to fetch Generation info.");
    }
  }

  async getGeneration(id?: string | number): Promise<ProcessedPokemonGeneration> {
    try {
      const generationData = await this.apiClient.getPokemonGeneration(id);
      
      return {
        main_region: generationData.main_region,
        pokemon_species: generationData.pokemon_species,
      };
    } catch (error) {
      console.error("Error fetching Generation info:", error);
      throw new Error("Failed to fetch Generation info.");
    }
  }

  async getMoves(id?: string | number): Promise<ProcessedPokemonMoves> {
    try {
      const movesData = await this.apiClient.getPokemonMove(id);
      // console.log("Get Moves:",movesData);
      return {
        name: movesData.name,
        accuracy: movesData.accuracy,
        power: movesData.power,
        pp: movesData.pp,
        type: movesData.type,
        generation: movesData.generation,
        damage_class: movesData.damage_class,
      };
    } catch (error) {
      console.error("Error fetching Moves info:", error);
      throw new Error("Failed to fetch Moves info.");
    }
  }
}