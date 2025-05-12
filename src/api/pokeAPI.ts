import { RawPokemonEvolution } from "../types/raw/evolution";
import { RawPokemonGeneration, RawPokemonGenerations } from "../types/raw/generation";
import { RawPokemonLocation } from "../types/raw/location";
import { RawPokemonMove } from "../types/raw/move";
import { RawPokeomnInfo } from "../types/raw/pokemon";
import { RawPokemonSpecies } from "../types/raw/species";
import { RawPokemonType } from "../types/raw/type";

export class PokeAPIClient {
  private POKEAPI = "https://pokeapi.co/api/v2/";

  private cache: Map<string, { data: unknown; timestamp: number }> = new Map();
  private cacheTTL = 5 * 60 * 1000; // Cache Time-To-Live: 5 minutes

  private async fetchData<T>(endpoint: string): Promise<T> {
    // Use Generics in fetchData
    const currentTime = Date.now();

    if (this.cache.has(endpoint)) {
      const { data, timestamp } = this.cache.get(endpoint)!;
      if (currentTime - timestamp < this.cacheTTL) return data as T;
      else this.cache.delete(endpoint);
    }

    const res = await fetch(endpoint);
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error fetching data from ${endpoint}: ${errorText}`);
      throw new Error(
        `Error fetching data from ${endpoint}: ${res.status} - ${res.statusText}`
      );
    }

    const data: T = await res.json();
    this.cache.set(endpoint, { data, timestamp: currentTime });

    return data;
  }

  async getPokemon(name: string | number): Promise<RawPokeomnInfo> {
    const endpoint = `pokemon/${name}`;
    return this.fetchData(`${this.POKEAPI}${endpoint}`);
  }

  async getPokemonType(typeName: string | number): Promise<RawPokemonType> {
    const endpoint = `type/${typeName}`;
    return this.fetchData(`${this.POKEAPI}${endpoint}`);
  }

  async getPokemonSpecies(name: string | number): Promise<RawPokemonSpecies> {
    const endpoint = `pokemon-species/${name}`;
    return this.fetchData(`${this.POKEAPI}${endpoint}`);
  }

  async getPokemonLocation(name: string | number): Promise<RawPokemonLocation[]> {
    const endpoint = `pokemon/${name}/encounters/`;
    return this.fetchData(`${this.POKEAPI}${endpoint}`);
  }

  async getPokemonEvolutionChain(id: number | string): Promise<RawPokemonEvolution> {
    const endpoint = `evolution-chain/${id}`;
    return this.fetchData(`${this.POKEAPI}${endpoint}`);
  }

  async getAllPokemonGenerations(): Promise<RawPokemonGenerations> {
    const endpoint = `generation`;
    return this.fetchData(`${this.POKEAPI}${endpoint}`);
  }

  async getPokemonGeneration(id?: string | number): Promise<RawPokemonGeneration> {
    const endpoint = `generation/${id === "1" ? `${id}/` : id}`;
    return this.fetchData(`${this.POKEAPI}${endpoint}`);
  }

  async getPokemonMove(id?: string | number): Promise<RawPokemonMove> {
    const endpoint = `move/${id}`;
    return this.fetchData(`${this.POKEAPI}${endpoint}`);
  }
}