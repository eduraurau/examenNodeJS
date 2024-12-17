import mysql from "serverless-mysql";
import dotenv from "dotenv";

dotenv.config();

const mysqlDb = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000,
    timeout: 30000,
  },
});

export default mysqlDb;
