import mysql from "serverless-mysql";
import dotenv from "dotenv";

dotenv.config();

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectTimeout: 10000,
  },
});

async function testConnection() {
  try {
    const result = await db.query("SELECT 1;", { timeout: 30000 });
    console.log("Conexión exitosa:", result);
  } catch (error) {
    console.error("Error en la conexión:", error.message);
  } finally {
    await db.end();
    console.log("Conexión cerrada.");
  }
}

testConnection();
