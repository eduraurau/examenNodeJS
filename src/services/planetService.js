import PlanetModel from "../models/planetModel.js";
import StarWarsAdapter from "../adapters/starWarsAdapter.js";
import validatePlanetFields from "../validators/starWarsValidator.js";

class PlanetService {
  constructor() {
    this.planetModel = new PlanetModel();
    this.starWarsAdapter = new StarWarsAdapter();
  }

  async createPlanet(planetData) {
    try {
      validatePlanetFields(planetData);
      return await this.planetModel.createPlanet(planetData);
    } catch (error) {
      console.error("Error al crear el planeta:", error);
      throw new Error("No se pudo crear el planeta");
    }
  }

  async getPlanetsFromDB() {
    try {
      return await this.planetModel.getAllPlanets();
    } catch (error) {
      console.error("Error al obtener planetas de la base de datos:", error);
      throw new Error(
        "No se pudieron obtener los planetas de la base de datos"
      );
    }
  }

  async getPlanetsFromAPI() {
    try {
      const planets = await this.starWarsAdapter.getAllStarWarsPlanets();
      return planets;
    } catch (error) {
      console.error("Error al obtener planetas de la API de Star Wars:", error);
      throw new Error(
        "No se pudieron obtener los planetas de la API de Star Wars"
      );
    }
  }

  async getPlanetByIdFromDB(id) {
    try {
      const result = await this.planetModel.getPlanetById(id);
      return result;
    } catch (error) {
      console.error(
        `Error al obtener el planeta con ID ${id} de la base de datos:`,
        error
      );
      throw new Error("No se pudo obtener el planeta de la base de datos");
    }
  }

  async getPlanetByIdFromAPI(id) {
    try {
      const planet = await this.starWarsAdapter.getPlanetById(id);
      return planet;
    } catch (error) {
      console.error(
        `Error al obtener el planeta con ID ${id} de la API de Star Wars:`,
        error
      );
      throw new Error("No se pudo obtener el planeta de la API de Star Wars");
    }
  }
}

export default PlanetService;
