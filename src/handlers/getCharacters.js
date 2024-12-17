import CharacterService from "../services/characterService.js";

const characterService = new CharacterService();

export const getInternalCharacters = async (req, res) => {
  try {
    const characters = await characterService.getCharactersFromDB();
    res.status(200).json(characters);
  } catch (error) {
    console.error("Error al obtener personajes de la base de datos:", error);
    res.status(500).json({
      message:
        "Error interno del servidor al obtener personajes de la base de datos",
      error: error.message,
    });
  }
};

export const getExternalCharacters = async (req, res) => {
  try {
    const characters = await characterService.getCharactersFromAPI();
    res.status(200).json(characters);
  } catch (error) {
    console.error("Error al obtener personajes de la API de Star Wars:", error);
    res.status(500).json({
      message:
        "Error interno del servidor al obtener personajes de la API de Star Wars",
      error: error.message,
    });
  }
};

export const getInternalCharacterById = async (req, res) => {
  const { id } = req.params;
  try {
    const character = await characterService.getCharacterByIdFromDB(id);
    if (!character) {
      return res
        .status(404)
        .json({ message: "Personaje no encontrado en la base de datos" });
    }
    res.status(200).json(character);
  } catch (error) {
    console.error(
      `Error al obtener el personaje con ID ${id} de la base de datos:`,
      error
    );
    res.status(500).json({
      message:
        "Error interno del servidor al obtener el personaje de la base de datos",
      error: error.message,
    });
  }
};

export const getExternalCharacterById = async (req, res) => {
  const { id } = req.params;
  try {
    const character = await characterService.getCharacterByIdFromAPI(id);
    if (!character) {
      return res
        .status(404)
        .json({ message: "Personaje no encontrado en la API de Star Wars" });
    }
    res.status(200).json(character);
  } catch (error) {
    console.error(
      `Error al obtener el personaje con ID ${id} de la API de Star Wars:`,
      error
    );
    res.status(500).json({
      message:
        "Error interno del servidor al obtener el personaje de la API de Star Wars",
      error: error.message,
    });
  }
};
