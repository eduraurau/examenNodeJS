import CharacterService from "../services/characterService.js";
import validateCharacterFields from "../validators/starWarsValidator.js";

const characterService = new CharacterService();

export const handler = async (event) => {
  try {
    const characterData = JSON.parse(event.body);

    validateCharacterFields(characterData);

    const createdCharacter = await characterService.createCharacter(
      characterData
    );
    return {
      statusCode: 200,
      body: JSON.stringify(createdCharacter),
    };
  } catch (error) {
    console.error("Error al crear personaje:", error);

    const statusCode = error.message.includes("Faltan campos obligatorios")
      ? 400
      : 500;

    return {
      statusCode,
      body: JSON.stringify({
        message: error.message || "No se pudo crear el personaje",
      }),
    };
  }
};
