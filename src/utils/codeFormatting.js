// src/utils/codeFormatting.js

/**
 * Adapta una cadena de código Power Fx para usar el separador de argumentos preferido.
 * Intenta ser un poco más inteligente que un reemplazo global simple para evitar
 * cambiar comas dentro de cadenas de texto literales.
 *
 * IMPORTANTE: Esta es una heurística y puede no cubrir todos los casos complejos
 * de Power Fx. Para una transformación perfecta se necesitaría un parser completo.
 * Asume que el código original usa ',' como separador.
 *
 * @param {string} codeString El código Power Fx original (se asume que usa ',').
 * @param {string} preferredSeparator El separador preferido (',' o ';').
 * @returns {string} El código con el separador ajustado.
 */
export const adaptPowerFxCodeSeparator = (codeString, preferredSeparator) => {
  if (preferredSeparator === ',' || !codeString) {
    return codeString; // No se necesita cambio o no hay código
  }

  // Si el separador preferido es ';', reemplazamos las comas que probablemente son separadores de argumentos.
  // Esta regex intenta reemplazar ", " (coma seguida de espacio) o solo ","
  // si no está dentro de comillas dobles.
  // Es una simplificación y puede tener falsos positivos/negativos en código complejo.
  // Específicamente, reemplazaremos ", " por "; " y "," por ";"
  // cuando no estén dentro de comillas.

  let result = '';
  let inString = false;
  for (let i = 0; i < codeString.length; i++) {
    const char = codeString[i];
    if (char === '"') {
      inString = !inString;
      result += char;
      continue;
    }

    if (!inString && char === ',') {
      if (i + 1 < codeString.length && codeString[i + 1] === ' ') {
        result += preferredSeparator + ' '; // Reemplaza ", "
        i++; // Avanza el índice para saltar el espacio
      } else {
        result += preferredSeparator; // Reemplaza ","
      }
    } else {
      result += char;
    }
  }
  return result;
};