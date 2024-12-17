import CharacterModel from "../models/characterModel.js";
import StarWarsAdapter from "../adapters/starWarsAdapter.js";
import validateCharacterFields from "../validators/starWarsValidator.js";

class CharacterService {
  constructor() {
    this.characterModel = new CharacterModel();
    this.starWarsAdapter = new StarWarsAdapter();
  }

  async createCharacter(characterData) {
    try {
      validateCharacterFields(characterData);
      return await this.characterModel.createCharacter(characterData);
    } catch (error) {
      console.error("Error al crear el personaje:", error);
      throw new Error("No se pudo crear el personaje");
    }
  }

  async getCharactersFromDB() {
    try {
      return await this.characterModel.getAllCharacters();
    } catch (error) {
      console.error("Error al obtener personajes de la base de datos:", error);
      throw new Error(
        "No se pudieron obtener los personajes de la base de datos"
      );
    }
  }

  async getCharactersFromAPI() {
    try {
      const characters = await this.starWarsAdapter.getAllStarWarsCharacters();
      return characters;
    } catch (error) {
      console.error(
        "Error al obtener personajes de la API de Star Wars:",
        error
      );
      throw new Error(
        "No se pudieron obtener los personajes de la API de Star Wars"
      );
    }
  }

  async getCharacterByIdFromDB(id) {
    try {
      const result = await this.characterModel.getCharacterById(id);
      return result;
    } catch (error) {
      console.error(
        `Error al obtener el personaje con ID ${id} de la base de datos:`,
        error
      );
      throw new Error("No se pudo obtener el personaje de la base de datos");
    }
  }

  async getCharacterByIdFromAPI(id) {
    try {
      const character = await this.starWarsAdapter.getCharacterById(id);
      return character; // Devuelve el personaje obtenido desde la API
    } catch (error) {
      console.error(
        `Error al obtener el personaje con ID ${id} de la API de Star Wars:`,
        error
      );
      throw new Error("No se pudo obtener el personaje de la API de Star Wars");
    }
  }
}

export default CharacterService;
