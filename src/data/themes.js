// src/data/themes.js

// --- Funciones Helper para Manipulación de Colores ---
export const hexToRgb = (hex) => {
  if (!hex || typeof hex !== 'string') return { r: 0, g: 0, b: 0 };
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
};
const rgbToHex = (r, g, b) => {
  r = Math.max(0, Math.min(255, Math.round(r))); g = Math.max(0, Math.min(255, Math.round(g))); b = Math.max(0, Math.min(255, Math.round(b)));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};
export const lightenDarkenColor = (hex, percent) => {
    if (!hex || typeof hex !== 'string') return "#000000";
    let { r, g, b } = hexToRgb(hex); const amount = Math.round(2.55 * percent);
    r = Math.max(0, Math.min(255, r + amount)); g = Math.max(0, Math.min(255, g + amount)); b = Math.max(0, Math.min(255, b + amount));
    return rgbToHex(r, g, b);
};
const saturateDesaturateColor = (hex, percent) => {
    if (!hex || typeof hex !== 'string') return "#808080";
    let { r, g, b } = hexToRgb(hex); const L = 0.2126 * r + 0.7152 * g + 0.0722 * b; const grayVal = L; const p = percent / 100;
    if (p < 0) { const desatAmount = Math.abs(p); r = Math.round(r * (1 - desatAmount) + grayVal * desatAmount); g = Math.round(g * (1 - desatAmount) + grayVal * desatAmount); b = Math.round(b * (1 - desatAmount) + grayVal * desatAmount);
    } else if (p > 0) { r = Math.round(r * (1 + p) - grayVal * p); g = Math.round(g * (1 + p) - grayVal * p); b = Math.round(b * (1 + p) - grayVal * p); }
    r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
    return rgbToHex(r, g, b);
};
export const generateNamedColorScale = (baseColor, stepPercent = 12, count = 11) => {
    if (!baseColor || typeof baseColor !== 'string' || !baseColor.startsWith('#')) {
        const defaultScale = { Base: "#000000" }; const midPointFallback = Math.floor(count / 2);
        for (let i = 1; i <= midPointFallback; i++) { defaultScale[`MasClaro${i}`] = "#111111"; defaultScale[`MasOscuro${i}`] = "#222222"; } return defaultScale;
    }
    const scale = { Base: baseColor.toUpperCase() }; const midPoint = Math.floor(count / 2);
    for (let i = 1; i <= midPoint; i++) { scale[`MasClaro${i}`] = lightenDarkenColor(baseColor, i * stepPercent).toUpperCase(); scale[`MasOscuro${i}`] = lightenDarkenColor(baseColor, -i * stepPercent).toUpperCase(); }
    return scale;
};

// Lista completa de paletas base restaurada
export const basePalettes = [
  { name: "Azul Power Helper", brandColor: "#0078D4", grayBase: "#8A8886" }, { name: "Azul Cielo", brandColor: "#3B82F6", grayBase: "#9CA3AF" }, { name: "Azul Marino Profundo", brandColor: "#1E3A8A", grayBase: "#6B7280" }, { name: "Azul Pizarra", brandColor: "#475569", grayBase: "#94A3B8" }, { name: "Azul Glaciar", brandColor: "#A0D2DB", grayBase: "#B0B0B0" },
  { name: "Verde Esmeralda", brandColor: "#059669", grayBase: "#6B7280" }, { name: "Verde Bosque", brandColor: "#166534", grayBase: "#71717A" }, { name: "Verde Lima Fresco", brandColor: "#84CC16", grayBase: "#A1A1AA" }, { name: "Verde Menta Suave", brandColor: "#6EE7B7", grayBase: "#A3A3A3" }, { name: "Verde Jade", brandColor: "#00A86B", grayBase: "#888B8D" },
  { name: "Rojo Carmesí", brandColor: "#DC2626", grayBase: "#737373" }, { name: "Naranja Vibrante", brandColor: "#F97316", grayBase: "#808080" }, { name: "Terracota Cálido", brandColor: "#E85D04", grayBase: "#8A8A8A" }, { name: "Rojo Rubí", brandColor: "#E11D48", grayBase: "#78716C" }, { name: "Coral Vivo", brandColor: "#FF7F50", grayBase: "#909090" },
  { name: "Púrpura Real", brandColor: "#7E22CE", grayBase: "#7C7A7C" }, { name: "Lavanda Suave", brandColor: "#A78BFA", grayBase: "#9CA3AF" }, { name: "Rosa Intenso", brandColor: "#DB2777", grayBase: "#888888" }, { name: "Magenta Eléctrico", brandColor: "#C026D3", grayBase: "#A0A0A0" },  { name: "Orquídea Radiante", brandColor: "#DA70D6", grayBase: "#939393" },
  { name: "Amarillo Solar", brandColor: "#FACC15", grayBase: "#7D7D7D" }, { name: "Dorado Lujoso", brandColor: "#F59E0B", grayBase: "#858585" }, { name: "Marrón Chocolate", brandColor: "#78350F", grayBase: "#A1A1AA" }, { name: "Beige Arena", brandColor: "#F5E8C7", grayBase: "#A3A3A3" }, { name: "Ocre Terroso", brandColor: "#CC7722", grayBase: "#8B8B8B" },
  { name: "Turquesa Veraniego", brandColor: "#0D9488", grayBase: "#828282" }, { name: "Cian Brillante", brandColor: "#06B6D4", grayBase: "#71717A" }, { name: "Aguamarina", brandColor: "#7FFFD4", grayBase: "#969696" },
  { name: "Gris Carbón", brandColor: "#374151", grayBase: "#9CA3AF" }, { name: "Gris Plata", brandColor: "#B0BEC5", grayBase: "#78909C" },
  { name: "Índigo Profundo", brandColor: "#4338CA", grayBase: "#A1A1AA" }, { name: "Verde Oliva", brandColor: "#556B2F", grayBase: "#8FBC8F" }, { name: "Azul Acero", brandColor: "#4682B4", grayBase: "#778899" }, { name: "Violeta Amatista", brandColor: "#9966CC", grayBase: "#BDB76B" }, { name: "Bronce Antiguo", brandColor: "#CD7F32", grayBase: "#8B4513" },
  { name: "Verde Mar Profundo", brandColor: "#2E8B57", grayBase: "#8FBC8F" }, { name: "Fucsia Brillante", brandColor: "#FF00FF", grayBase: "#A9A9A9" }, { name: "Dorado Pálido", brandColor: "#EEE8AA", grayBase: "#BDB76B" }, { name: "Azul Pato", brandColor: "#008080", grayBase: "#708090" }, { name: "Rojo Ladrillo", brandColor: "#B22222", grayBase: "#8B4513" },
];

export const fontFamilies = [ "Segoe UI", "Arial", "Helvetica", "Verdana", "Tahoma", "Trebuchet MS", "Georgia", "Times New Roman", "Courier New", "Inter", "Roboto", "Lato", "Open Sans"];

const generateGrayScaleVariablesSpanish = (baseGray, isDark = false) => {
    if (!baseGray || typeof baseGray !== 'string') baseGray = "#808080";
    if (isDark) {
        return {
            TextoPrincipal: lightenDarkenColor(baseGray, 85),
            TextoSecundario: lightenDarkenColor(baseGray, 60),
            TextoDeshabilitado: lightenDarkenColor(baseGray, 25),
            FondoPrincipal: lightenDarkenColor(baseGray, -80),
            FondoSecundario: lightenDarkenColor(baseGray, -70),
            FondoSuperficie: lightenDarkenColor(baseGray, -55),
            BordePredeterminado: lightenDarkenColor(baseGray, -40),
            BordeResaltado: lightenDarkenColor(baseGray, -20),
        };
    }
    return {
        TextoPrincipal: lightenDarkenColor(baseGray, -85),
        TextoSecundario: lightenDarkenColor(baseGray, -60),
        TextoDeshabilitado: lightenDarkenColor(baseGray, -25),
        FondoPrincipal: lightenDarkenColor(baseGray, 95),
        FondoSecundario: lightenDarkenColor(baseGray, 85),
        FondoSuperficie: "#FFFFFF",
        BordePredeterminado: lightenDarkenColor(baseGray, 60),
        BordeResaltado: lightenDarkenColor(baseGray, 30),
    };
};

export const generateThemeModeColors = (brandColor, grayBase, isDarkMode) => {
  const grises = generateGrayScaleVariablesSpanish(grayBase, isDarkMode);
  const colorMarcaSeguro = (typeof brandColor === 'string' && brandColor.startsWith('#')) ? brandColor : "#0078D4";
  const grisBaseSeguro = (typeof grayBase === 'string' && grayBase.startsWith('#')) ? grayBase : "#808080";

  const escalaColorMarca = generateNamedColorScale(colorMarcaSeguro, 12, 11);
  const escalaColorGris = generateNamedColorScale(grisBaseSeguro, 10, 11);

  let colorBaseError = "#D32F2F";
  let colorBaseExito = "#388E3C";
  let colorBaseAdvertencia = "#FFA000";
  let colorBaseInformacion = "#1976D2";

  const claridadSemantica = isDarkMode ? 25 : -10;
  const saturacionSemantica = -15;

  const tema = {
    ...grises,
    TextoSobreAcento: lightenDarkenColor(colorMarcaSeguro, (hexToRgb(colorMarcaSeguro).r * 0.299 + hexToRgb(colorMarcaSeguro).g * 0.587 + hexToRgb(colorMarcaSeguro).b * 0.114) > 128 ? -80 : 80),
    TextoAcento: colorMarcaSeguro,
    TextoAcentoSuave: isDarkMode ? escalaColorMarca.MasClaro3 : escalaColorMarca.MasOscuro3,
    TextoAcentoFuerte: isDarkMode ? escalaColorMarca.MasClaro1 : escalaColorMarca.MasOscuro1,

    FondoAcento: colorMarcaSeguro,
    FondoAcentoSuave: isDarkMode ? escalaColorMarca.MasOscuro4 : escalaColorMarca.MasClaro4,
    FondoAcentoFuerte: isDarkMode ? escalaColorMarca.MasClaro2 : escalaColorMarca.MasOscuro2,
    FondoSuperficieHover: isDarkMode ? lightenDarkenColor(grises.FondoSuperficie, 5) : lightenDarkenColor(grises.FondoSuperficie, -3),
    FondoSuperficiePresionado: isDarkMode ? lightenDarkenColor(grises.FondoSuperficie, 10) : lightenDarkenColor(grises.FondoSuperficie, -6),
    FondoDiscreto: isDarkMode ? grises.FondoSecundario : lightenDarkenColor(grises.FondoPrincipal, -2),

    BordeEnfoque: colorMarcaSeguro,
    BordeAcento: colorMarcaSeguro,

    AcentoPrincipal: colorMarcaSeguro,
    AcentoPrincipalHover: lightenDarkenColor(colorMarcaSeguro, isDarkMode ? 10 : -10),
    AcentoPrincipalPresionado: lightenDarkenColor(colorMarcaSeguro, isDarkMode ? 15 : -15),
    AcentoSecundario: isDarkMode ? escalaColorMarca.MasClaro2 : escalaColorMarca.MasOscuro2,
    AcentoSecundarioHover: lightenDarkenColor(isDarkMode ? escalaColorMarca.MasClaro2 : escalaColorMarca.MasOscuro2, isDarkMode ? 10 : -10),
    AcentoSecundarioPresionado: lightenDarkenColor(isDarkMode ? escalaColorMarca.MasClaro2 : escalaColorMarca.MasOscuro2, isDarkMode ? 15 : -15),
    AcentoSuave: isDarkMode ? escalaColorMarca.MasOscuro2 : escalaColorMarca.MasClaro2,
    AcentoFuerte: isDarkMode ? escalaColorMarca.MasClaro1 : escalaColorMarca.MasOscuro1,

    FondoError: saturateDesaturateColor(lightenDarkenColor(colorBaseError, claridadSemantica), saturacionSemantica),
    TextoSobreError: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(colorBaseError, claridadSemantica), saturacionSemantica), (hexToRgb(saturateDesaturateColor(lightenDarkenColor(colorBaseError, claridadSemantica), saturacionSemantica)).r * 0.299 + hexToRgb(saturateDesaturateColor(lightenDarkenColor(colorBaseError, claridadSemantica), saturacionSemantica)).g * 0.587 + hexToRgb(saturateDesaturateColor(lightenDarkenColor(colorBaseError, claridadSemantica), saturacionSemantica)).b * 0.114) > 128 ? -80 : 80),
    BordeError: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(colorBaseError, claridadSemantica), saturacionSemantica), -10),
    FondoErrorSuave: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(colorBaseError, claridadSemantica), saturacionSemantica), isDarkMode ? -25 : 60),
    TextoErrorFuerte: lightenDarkenColor(colorBaseError, isDarkMode ? 10 : -20),

    FondoExito: saturateDesaturateColor(lightenDarkenColor(colorBaseExito, claridadSemantica), saturacionSemantica),
    TextoSobreExito: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(colorBaseExito, claridadSemantica), saturacionSemantica), (hexToRgb(saturateDesaturateColor(lightenDarkenColor(colorBaseExito, claridadSemantica), saturacionSemantica)).r * 0.299 + hexToRgb(saturateDesaturateColor(lightenDarkenColor(colorBaseExito, claridadSemantica), saturacionSemantica)).g * 0.587 + hexToRgb(saturateDesaturateColor(lightenDarkenColor(colorBaseExito, claridadSemantica), saturacionSemantica)).b * 0.114) > 128 ? -80 : 80),
    BordeExito: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(colorBaseExito, claridadSemantica), saturacionSemantica), -10),
    FondoExitoSuave: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(colorBaseExito, claridadSemantica), saturacionSemantica), isDarkMode ? -25 : 60),
    TextoExitoFuerte: lightenDarkenColor(colorBaseExito, isDarkMode ? 10 : -20),

    FondoAdvertencia: saturateDesaturateColor(lightenDarkenColor(colorBaseAdvertencia, claridadSemantica + (isDarkMode ? 10 : -5)), saturacionSemantica -5),
    TextoSobreAdvertencia: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(colorBaseAdvertencia, claridadSemantica + (isDarkMode ? 10 : -5)), saturacionSemantica -5), (hexToRgb(saturateDesaturateColor(lightenDarkenColor(colorBaseAdvertencia, claridadSemantica + (isDarkMode ? 10 : -5)), saturacionSemantica -5)).r * 0.299 + hexToRgb(saturateDesaturateColor(lightenDarkenColor(colorBaseAdvertencia, claridadSemantica + (isDarkMode ? 10 : -5)), saturacionSemantica -5)).g * 0.587 + hexToRgb(saturateDesaturateColor(lightenDarkenColor(colorBaseAdvertencia, claridadSemantica + (isDarkMode ? 10 : -5)), saturacionSemantica -5)).b * 0.114) > 100 ? -80 : 70),
    BordeAdvertencia: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(colorBaseAdvertencia, claridadSemantica + (isDarkMode ? 10 : -5)), saturacionSemantica -5), -10),
    FondoAdvertenciaSuave: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(colorBaseAdvertencia, claridadSemantica + (isDarkMode ? 10 : -5)), saturacionSemantica -5), isDarkMode ? -25 : 60),
    TextoAdvertenciaFuerte: lightenDarkenColor(colorBaseAdvertencia, isDarkMode ? 0 : -25),

    FondoInformacion: saturateDesaturateColor(lightenDarkenColor(colorBaseInformacion, claridadSemantica), saturacionSemantica),
    TextoSobreInformacion: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(colorBaseInformacion, claridadSemantica), saturacionSemantica), (hexToRgb(saturateDesaturateColor(lightenDarkenColor(colorBaseInformacion, claridadSemantica), saturacionSemantica)).r * 0.299 + hexToRgb(saturateDesaturateColor(lightenDarkenColor(colorBaseInformacion, claridadSemantica), saturacionSemantica)).g * 0.587 + hexToRgb(saturateDesaturateColor(lightenDarkenColor(colorBaseInformacion, claridadSemantica), saturacionSemantica)).b * 0.114) > 128 ? -80 : 80),
    BordeInformacion: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(colorBaseInformacion, claridadSemantica), saturacionSemantica), -10),
    FondoInformacionSuave: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(colorBaseInformacion, claridadSemantica), saturacionSemantica), isDarkMode ? -25 : 60),
    TextoInformacionFuerte: lightenDarkenColor(colorBaseInformacion, isDarkMode ? 10 : -20),

    EscalaColorMarca: escalaColorMarca,
    EscalaColorGris: escalaColorGris,
  };
  return tema;
};

export const getPowerAppsThemeCode = (brandColor, grayBase, selectedFont, lightPaletteName, darkPaletteName, powerFxSeparator = ',') => {
  const temaClaro = generateThemeModeColors(brandColor, grayBase, false);
  const temaOscuro = generateThemeModeColors(brandColor, grayBase, true);
  const s = powerFxSeparator;

  const generarRegistroFx = (objetoTema) => {
    let cadenaFx = `{\n`;
    const claves = Object.keys(objetoTema).sort();

    for (const clave of claves) {
      if (clave === 'EscalaColorMarca' || clave === 'EscalaColorGris') {
        cadenaFx += `            ${clave}: {\n`;
        const objetoEscala = objetoTema[clave];
        const clavesEscalaOrdenadas = ['MasClaro5','MasClaro4','MasClaro3','MasClaro2','MasClaro1','Base','MasOscuro1','MasOscuro2','MasOscuro3','MasOscuro4','MasOscuro5'].filter(k => objetoEscala.hasOwnProperty(k));
        for (const claveEscala of clavesEscalaOrdenadas) {
          const valorColor = typeof objetoEscala[claveEscala] === 'string' && objetoEscala[claveEscala].startsWith('#') ? objetoEscala[claveEscala] : '#000000';
          cadenaFx += `                ${claveEscala}: ColorValue("${valorColor}")${clavesEscalaOrdenadas.indexOf(claveEscala) < clavesEscalaOrdenadas.length - 1 ? s : ""}\n`;
        }
        cadenaFx += `            }${claves.indexOf(clave) < claves.length - 1 ? s : ""}\n`;
      } else {
        const valorColor = typeof objetoTema[clave] === 'string' && objetoTema[clave].startsWith('#') ? objetoTema[clave] : '#000000';
        cadenaFx += `            ${clave}: ColorValue("${valorColor}")${claves.indexOf(clave) < claves.length - 1 ? s : ""}\n`;
      }
    }
    cadenaFx += `        }`;
    return cadenaFx;
  };

  return `
// ========================================================================
// Power Helper - Variables de Tema V6.0 (Nombres en Español)
// ========================================================================
// Color de Marca: ${brandColor} | Base de Gris: ${grayBase} | Fuente: ${selectedFont}
// Paleta Clara Ref: ${lightPaletteName || "Personalizado"}
// Paleta Oscura Ref: ${darkPaletteName || "Personalizado"}
// Separador de Argumentos: ${s}
// ------------------------------------------------------------------------
// INSTRUCCIONES DE USO:
// 1. Copia TODO este código.
// 2. En tu Power App, ve a la propiedad "App.OnStart".
// 3. Pega este código al final de tu fórmula OnStart existente.
// 4. Crea una variable global booleana llamada 'gblModoOscuro'.
//    Puedes controlarla con un Toggle: Set(gblModoOscuro${s} ToggleDarkMode.Value)
// 5. ¡Aplica los colores y la fuente del tema a tus controles!
//    Ejemplos:
//      Label.Font:        gblTema.FuenteFamilia
//      Label.Color:       gblTema.TextoPrincipal
//      Button.Fill:       gblTema.AcentoPrincipal
//      Button.HoverFill:  gblTema.AcentoPrincipalHover
//      Button.PressedFill: gblTema.AcentoPrincipalPresionado
//      Screen.Fill:       gblTema.FondoPrincipal
// ------------------------------------------------------------------------

ClearCollect(
    colPaletaTemaApp${s}
    {
        FuenteFamilia: "${selectedFont}"${s}
        Claro: ${generarRegistroFx(temaClaro)}${s}
        Oscuro: ${generarRegistroFx(temaOscuro)}
    }
);

Set(
    gblTemaBase${s}
    First(colPaletaTemaApp)
);

Set(
    gblTema${s}
    If(
        Coalesce(gblModoOscuro${s} false)${s}
        Table(gblTemaBase.Oscuro${s} {FuenteFamilia: gblTemaBase.FuenteFamilia})${s}
        Table(gblTemaBase.Claro${s} {FuenteFamilia: gblTemaBase.FuenteFamilia})
    )
);

// ========================================================================
// Variables de Tema Disponibles (accede a ellas con gblTema.NombreVariable):
// ========================================================================
// Fuente: FuenteFamilia
//
// Textos: TextoPrincipal, TextoSecundario, TextoDeshabilitado, TextoSobreAcento, TextoAcento,
//         TextoAcentoSuave, TextoAcentoFuerte,
//         TextoSobreError, TextoErrorFuerte, TextoSobreExito, TextoExitoFuerte, etc.
//
// Fondos: FondoPrincipal, FondoSecundario, FondoSuperficie, FondoSuperficieHover, FondoSuperficiePresionado,
//         FondoDiscreto, FondoAcento, FondoAcentoSuave, FondoAcentoFuerte,
//         FondoError, FondoExito, FondoAdvertencia, FondoInformacion, y sus variantes Suave.
//
// Bordes: BordePredeterminado, BordeResaltado, BordeEnfoque, BordeAcento,
//         BordeError, BordeExito, BordeAdvertencia, BordeInformacion.
//
// Acentos (Botones/Interacciones): AcentoPrincipal, AcentoPrincipalHover, AcentoPrincipalPresionado,
//         AcentoSecundario, AcentoSecundarioHover, AcentoSecundarioPresionado,
//         AcentoSuave, AcentoFuerte.
//
// Escalas (11 tonos: MasClaro5, ..., Base, ..., MasOscuro5):
//   EscalaColorMarca.MasClaro1 ... .Base ... .MasOscuro5
//   EscalaColorGris.MasClaro1 ... .Base ... .MasOscuro5
// ========================================================================
`;
};