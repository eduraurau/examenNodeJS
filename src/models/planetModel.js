import mysqlDb from "../dbConfig.js";

class PlanetModel {
  async createPlanet(planetData) {
    try {
      if (!planetData.nombre || !planetData.clima || !planetData.terreno) {
        throw new Error("Datos incompletos del planeta");
      }

      console.log("Datos recibidos:", planetData);
      const result = await mysqlDb.query(
        "INSERT INTO planetas SET ?",
        planetData
      );
      return { id: result.insertId, ...planetData };
    } catch (error) {
      console.error("Error al insertar planeta:", error);
      throw new Error("No se pudo crear el planeta");
    }
  }

  async getAllPlanets() {
    try {
      const results = await mysqlDb.query("SELECT * FROM planetas");
      return results;
    } catch (error) {
      console.error("Error al obtener planetas:", error.message);
      throw new Error("No se pudieron obtener los planetas");
    }
  }

  async getPlanetById(id) {
    try {
      const results = await mysqlDb.query(
        "SELECT * FROM planetas WHERE id = ?",
        [id]
      );
      if (results.length === 0) {
        throw new Error("Planeta no encontrado");
      }
      return results[0];
    } catch (error) {
      console.error("Error al obtener planeta:", error.message);
      throw new Error("No se pudo obtener el planeta");
    }
  }

  async closeConnection() {
    await mysqlDb.end();
  }
}

export default PlanetModel;
