/**
 * Evita "Unexpected token '<'" cuando fetch recibe HTML (502, login, página de error).
 * @param {Response} res
 * @returns {Promise<any>}
 */
export async function parseJsonResponse(res) {
  const raw = await res.text();
  const text = raw.replace(/^\uFEFF/, "").trim();
  if (!text) return null;
  if (text.charAt(0) === "<") {
    const err = new Error(
      "El servidor devolvió HTML en lugar de datos (sesión, error o backend no disponible)."
    );
    err.isHtmlResponse = true;
    err.status = res.status;
    throw err;
  }
  try {
    return JSON.parse(raw.replace(/^\uFEFF/, ""));
  } catch {
    throw new Error("La respuesta del servidor no es JSON válido.");
  }
}
