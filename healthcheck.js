const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

const dataDir = path.resolve(__dirname, "database_storage");

function checkDataDir() {
  if (!fs.existsSync(dataDir)) {
    console.error(
      `ERROR: La carpeta de datos no existe: ${dataDir}. ` +
        "Inicia el contenedor para que se cree con el bind mount."
    );
    return false;
  }

  const entries = fs.readdirSync(dataDir);
  console.log(
    `OK: Carpeta de datos encontrada (${entries.length} archivos/carpetas).`
  );
  return true;
}

async function checkDbConnection() {
  const client = new Client({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 5432),
    user: process.env.DB_USER || "medicamentos",
    password: process.env.DB_PASSWORD || "medicamentos_secret",
    database: process.env.DB_NAME || "medicamentos",
  });

  try {
    await client.connect();
    const result = await client.query("SELECT 1 AS ok");
    if (result.rows[0]?.ok === 1) {
      console.log("OK: Conexión a PostgreSQL verificada.");
      return true;
    }
    console.error("ERROR: Respuesta inesperada de PostgreSQL.");
    return false;
  } catch (error) {
    console.error("ERROR: No se pudo conectar a PostgreSQL.");
    console.error(error.message);
    return false;
  } finally {
    try {
      await client.end();
    } catch {
      // Ignorar errores de cierre
    }
  }
}

async function run() {
  const dataOk = checkDataDir();
  const dbOk = await checkDbConnection();

  if (!dataOk || !dbOk) {
    process.exitCode = 1;
  }
}

run();
