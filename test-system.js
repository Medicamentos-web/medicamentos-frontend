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
  if (entries.length === 0) {
    console.error("ERROR: La carpeta de datos existe, pero está vacía.");
    return false;
  }

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
    if (result.rows[0]?.ok !== 1) {
      console.error("ERROR: Respuesta inesperada de PostgreSQL.");
      return { ok: false, client };
    }
    console.log("OK: Conexión a PostgreSQL verificada.");
    return { ok: true, client };
  } catch (error) {
    console.error("ERROR: No se pudo conectar a PostgreSQL.");
    console.error(error.message);
    return { ok: false, client: null };
  }
}

async function insertTestData(client) {
  try {
    const familyResult = await client.query(
      "INSERT INTO families (name) VALUES ($1) RETURNING id",
      ["Familia Test"]
    );
    const familyId = familyResult.rows[0].id;

    await client.query(
      `INSERT INTO medicines (family_id, name, dosage, current_stock, expiration_date)
       VALUES ($1, $2, $3, $4, $5)`,
      [familyId, "Paracetamol", "500mg", 20, null]
    );

    console.log("OK: Insert de familia y medicamento de prueba completado.");
    return true;
  } catch (error) {
    console.error("ERROR: No se pudo insertar data de prueba.");
    console.error(error.message);
    return false;
  }
}

async function run() {
  const dataOk = checkDataDir();
  const { ok: dbOk, client } = await checkDbConnection();
  let insertOk = false;

  if (dbOk && client) {
    insertOk = await insertTestData(client);
  }

  if (client) {
    try {
      await client.end();
    } catch {
      // Ignorar errores de cierre
    }
  }

  if (!dataOk || !dbOk || !insertOk) {
    process.exitCode = 1;
  }
}

run();
