import mysqlDb from "../dbConfig.js";

class CharacterModel {
  async createCharacter(characterData) {
    try {
      if (
        !characterData.nombre ||
        !characterData.altura ||
        !characterData.masa
      ) {
        throw new Error("Datos incompletos del personaje");
      }

      console.log("Datos recibidos:", characterData);
      const result = await mysqlDb.query(
        "INSERT INTO personajes SET ?",
        characterData
      );
      return { id: result.insertId, ...characterData };
    } catch (error) {
      console.error("Error al insertar personaje:", error);
      throw new Error("No se pudo crear el personaje");
    }
  }

  async getAllCharacters() {
    try {
      const results = await mysqlDb.query("SELECT * FROM personajes");
      return results;
    } catch (error) {
      console.error("Error al obtener personajes:", error.message);
      throw new Error("No se pudieron obtener los personajes");
    }
  }

  async getCharacterById(id) {
    try {
      const results = await mysqlDb.query(
        "SELECT * FROM personajes WHERE id = ?",
        [id]
      );
      if (results.length === 0) {
        throw new Error("Personaje no encontrado");
      }
      return results[0];
    } catch (error) {
      console.error("Error al obtener personaje:", error.message);
      throw new Error("No se pudo obtener el personaje");
    }
  }

  async closeConnection() {
    await mysqlDb.end();
  }
}

export default CharacterModel;
