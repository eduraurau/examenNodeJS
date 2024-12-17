import PlanetService from "../services/planetService.js";
import validatePlanetFields from "../validators/starWarsValidator.js";

const planetService = new PlanetService();

export const handler = async (event) => {
  try {
    const planetData = JSON.parse(event.body);

    validatePlanetFields(planetData);

    const newPlanet = await planetService.createPlanet(planetData);
    return {
      statusCode: 201,
      body: JSON.stringify(newPlanet),
    };
  } catch (error) {
    console.error("Error al crear planeta:", error);

    const statusCode = error.message.includes("Faltan campos obligatorios")
      ? 400
      : 500;

    return {
      statusCode,
      body: JSON.stringify({
        message: error.message || "No se pudo crear el planeta",
        error: error.stack || null,
      }),
    };
  }
};
