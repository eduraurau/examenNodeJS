import PlanetService from "../services/planetService.js";

const planetService = new PlanetService();

export const getInternalPlanets = async (req, res) => {
  try {
    const planets = await planetService.getPlanetsFromDB();
    res.status(200).json(planets);
  } catch (error) {
    console.error("Error al obtener planetas de la base de datos:", error);
    res.status(500).json({
      message:
        "Error interno del servidor al obtener planetas de la base de datos",
      error: error.message,
    });
  }
};

export const getExternalPlanets = async (req, res) => {
  try {
    const planets = await planetService.getPlanetsFromAPI();
    res.status(200).json(planets);
  } catch (error) {
    console.error("Error al obtener planetas de la API de Star Wars:", error);
    res.status(500).json({
      message:
        "Error interno del servidor al obtener planetas de la API de Star Wars",
      error: error.message,
    });
  }
};

export const getInternalPlanetById = async (req, res) => {
  const { id } = req.params;
  try {
    const planet = await planetService.getPlanetByIdFromDB(id);
    if (!planet) {
      return res
        .status(404)
        .json({ message: "Planeta no encontrado en la base de datos" });
    }
    res.status(200).json(planet);
  } catch (error) {
    console.error(
      `Error al obtener el planeta con ID ${id} de la base de datos:`,
      error
    );
    res.status(500).json({
      message:
        "Error interno del servidor al obtener el planeta de la base de datos",
      error: error.message,
    });
  }
};

export const getExternalPlanetById = async (req, res) => {
  const { id } = req.params;
  try {
    const planet = await planetService.getPlanetByIdFromAPI(id);
    if (!planet) {
      return res
        .status(404)
        .json({ message: "Planeta no encontrado en la API de Star Wars" });
    }
    res.status(200).json(planet);
  } catch (error) {
    console.error(
      `Error al obtener el planeta con ID ${id} de la API de Star Wars:`,
      error
    );
    res.status(500).json({
      message:
        "Error interno del servidor al obtener el planeta de la API de Star Wars",
      error: error.message,
    });
  }
};
