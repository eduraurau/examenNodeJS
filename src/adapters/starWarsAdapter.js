import axios from "axios";

class StarWarsAdapter {
  constructor() {
    this.baseUrl = "https://swapi.py4e.com/api";
  }

  _translateCharacterData(character) {
    return {
      nombre: character.name,
      altura: character.height,
      masa: character.mass,
      colorCabello: character.hair_color,
      colorPiel: character.skin_color,
      colorOjos: character.eye_color,
      añoNacimiento: character.birth_year, // Ajustado aquí
      genero: character.gender,
    };
  }

  _translatePlanetData(planet) {
    return {
      nombre: planet.name,
      periodoRotacion: planet.rotation_period,
      periodoOrbital: planet.orbital_period,
      diametro: planet.diameter,
      clima: planet.climate,
      gravedad: planet.gravity,
      terreno: planet.terrain,
      superficieAgua: planet.surface_water,
      poblacion: planet.population,
    };
  }

  async getAllStarWarsCharacters() {
    try {
      const response = await axios.get(`${this.baseUrl}/people`);
      // Traducir cada personaje
      return response.data.results.map(this._translateCharacterData);
    } catch (error) {
      console.error("Error al obtener personajes de Star Wars:", error);
      throw new Error("No se pudieron obtener los personajes.");
    }
  }

  async getCharacterById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/people/${id}`);
      // Traducir el personaje
      return this._translateCharacterData(response.data);
    } catch (error) {
      console.error(`Error al obtener el personaje con ID ${id}:`, error);
      throw new Error("No se pudo obtener el personaje.");
    }
  }

  // Obtener todos los planetas
  async getAllStarWarsPlanets() {
    try {
      const response = await axios.get(`${this.baseUrl}/planets`);
      // Traducir cada planeta
      return response.data.results.map(this._translatePlanetData);
    } catch (error) {
      console.error("Error al obtener planetas de Star Wars:", error);
      throw new Error("No se pudieron obtener los planetas.");
    }
  }

  // Obtener un planeta por ID
  async getPlanetById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/planets/${id}`);
      // Traducir el planeta
      return this._translatePlanetData(response.data);
    } catch (error) {
      console.error(`Error al obtener el planeta con ID ${id}:`, error);
      throw new Error("No se pudo obtener el planeta.");
    }
  }
}

export default StarWarsAdapter;
