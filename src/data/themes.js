// src/data/themes.js
// Contiene paletas de colores base y la lógica para generar variables de tema para Power Apps.

// --- Funciones Helper para Manipulación de Colores (sin cambios, omitidas por brevedad) ---
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
    return rgbToHex(r, g, b);
};
export const generateNamedColorScale = (baseColor, stepPercent = 12, count = 11) => {
    if (!baseColor || typeof baseColor !== 'string' || !baseColor.startsWith('#')) {
        console.error("generateNamedColorScale: baseColor es inválido o no es un HEX:", baseColor);
        const defaultScale = { Base: "#000000" }; const midPointFallback = Math.floor(count / 2);
        for (let i = 1; i <= midPointFallback; i++) { defaultScale[`L${i}`] = "#111111"; defaultScale[`D${i}`] = "#222222"; } return defaultScale;
    }
    const scale = { Base: baseColor.toUpperCase() }; const midPoint = Math.floor(count / 2);
    for (let i = 1; i <= midPoint; i++) { scale[`L${i}`] = lightenDarkenColor(baseColor, i * stepPercent).toUpperCase(); scale[`D${i}`] = lightenDarkenColor(baseColor, -i * stepPercent).toUpperCase(); }
    return scale;
};
const generateGrayScaleVariables = (baseGray, isDark = false) => {
    if (!baseGray || typeof baseGray !== 'string') baseGray = "#808080"; 
    if (isDark) {
        return { txtPrimary: lightenDarkenColor(baseGray, 85), txtSecondary: lightenDarkenColor(baseGray, 60), txtDisabled: lightenDarkenColor(baseGray, 25), bgPrimary: lightenDarkenColor(baseGray, -80), bgSecondary: lightenDarkenColor(baseGray, -70), bgSurface: lightenDarkenColor(baseGray, -55), borderDefault: lightenDarkenColor(baseGray, -40), borderStrong: lightenDarkenColor(baseGray, -20), };
    }
    return { txtPrimary: lightenDarkenColor(baseGray, -85), txtSecondary: lightenDarkenColor(baseGray, -60), txtDisabled: lightenDarkenColor(baseGray, -25), bgPrimary: lightenDarkenColor(baseGray, 95), bgSecondary: lightenDarkenColor(baseGray, 85), bgSurface: "#FFFFFF", borderDefault: lightenDarkenColor(baseGray, 60), borderStrong: lightenDarkenColor(baseGray, 30), };
};
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
export const generateThemeModeColors = (brandColor, grayBase, isDarkMode) => {
  const grays = generateGrayScaleVariables(grayBase, isDarkMode);
  const safeBrandColor = (typeof brandColor === 'string' && brandColor.startsWith('#')) ? brandColor : "#0078D4";
  const safeGrayBase = (typeof grayBase === 'string' && grayBase.startsWith('#')) ? grayBase : "#808080";
  const brandColorScale = generateNamedColorScale(safeBrandColor, 12, 11); 
  const grayColorScale = generateNamedColorScale(safeGrayBase, 10, 11);    
  let baseSemanticError = "#D32F2F"; let baseSemanticSuccess = "#388E3C"; let baseSemanticWarning = "#FFA000"; let baseSemanticInfo = "#1976D2";    
  const semanticLightness = isDarkMode ? 25 : -10; const semanticSaturation = -15; 
  const theme = {
    ...grays, 
    txtOnAccent: lightenDarkenColor(safeBrandColor, (hexToRgb(safeBrandColor).r * 0.299 + hexToRgb(safeBrandColor).g * 0.587 + hexToRgb(safeBrandColor).b * 0.114) > 128 ? -80 : 80),
    txtAccent: safeBrandColor, txtAccentMuted: isDarkMode ? brandColorScale.L3 : brandColorScale.D3, txtAccentStrong: isDarkMode ? brandColorScale.L1 : brandColorScale.D1,
    bgAccent: safeBrandColor, bgAccentMuted: isDarkMode ? brandColorScale.D4 : brandColorScale.L4, bgAccentStrong: isDarkMode ? brandColorScale.L2 : brandColorScale.D2,
    bgSurfaceHover: isDarkMode ? lightenDarkenColor(grays.bgSurface, 5) : lightenDarkenColor(grays.bgSurface, -3), bgSurfacePressed: isDarkMode ? lightenDarkenColor(grays.bgSurface, 10) : lightenDarkenColor(grays.bgSurface, -6),
    bgSubtle: isDarkMode ? grays.bgSecondary : lightenDarkenColor(grays.bgPrimary, -2), borderFocus: safeBrandColor, borderAccent: safeBrandColor,
    accentDefault: safeBrandColor, accentPrimary: safeBrandColor, accentPrimaryHover: lightenDarkenColor(safeBrandColor, isDarkMode ? 10 : -10), accentPrimaryPressed: lightenDarkenColor(safeBrandColor, isDarkMode ? 15 : -15),
    accentSecondary: isDarkMode ? brandColorScale.L2 : brandColorScale.D2, accentSecondaryHover: lightenDarkenColor(isDarkMode ? brandColorScale.L2 : brandColorScale.D2, isDarkMode ? 10 : -10),
    accentSecondaryPressed: lightenDarkenColor(isDarkMode ? brandColorScale.L2 : brandColorScale.D2, isDarkMode ? 15 : -15), accentMuted: isDarkMode ? brandColorScale.D2 : brandColorScale.L2, accentStrong: isDarkMode ? brandColorScale.L1 : brandColorScale.D1,
    bgError: saturateDesaturateColor(lightenDarkenColor(baseSemanticError, semanticLightness), semanticSaturation), txtOnError: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(baseSemanticError, semanticLightness), semanticSaturation), (hexToRgb(saturateDesaturateColor(lightenDarkenColor(baseSemanticError, semanticLightness), semanticSaturation)).r * 0.299 + hexToRgb(saturateDesaturateColor(lightenDarkenColor(baseSemanticError, semanticLightness), semanticSaturation)).g * 0.587 + hexToRgb(saturateDesaturateColor(lightenDarkenColor(baseSemanticError, semanticLightness), semanticSaturation)).b * 0.114) > 128 ? -80 : 80),
    borderError: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(baseSemanticError, semanticLightness), semanticSaturation), -10), bgErrorMuted: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(baseSemanticError, semanticLightness), semanticSaturation), isDarkMode ? -25 : 60), txtErrorStrong: lightenDarkenColor(baseSemanticError, isDarkMode ? 10 : -20),
    bgSuccess: saturateDesaturateColor(lightenDarkenColor(baseSemanticSuccess, semanticLightness), semanticSaturation), txtOnSuccess: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(baseSemanticSuccess, semanticLightness), semanticSaturation), (hexToRgb(saturateDesaturateColor(lightenDarkenColor(baseSemanticSuccess, semanticLightness), semanticSaturation)).r * 0.299 + hexToRgb(saturateDesaturateColor(lightenDarkenColor(baseSemanticSuccess, semanticLightness), semanticSaturation)).g * 0.587 + hexToRgb(saturateDesaturateColor(lightenDarkenColor(baseSemanticSuccess, semanticLightness), semanticSaturation)).b * 0.114) > 128 ? -80 : 80),
    borderSuccess: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(baseSemanticSuccess, semanticLightness), semanticSaturation), -10), bgSuccessMuted: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(baseSemanticSuccess, semanticLightness), semanticSaturation), isDarkMode ? -25 : 60), txtSuccessStrong: lightenDarkenColor(baseSemanticSuccess, isDarkMode ? 10 : -20),
    bgWarning: saturateDesaturateColor(lightenDarkenColor(baseSemanticWarning, semanticLightness + (isDarkMode ? 10 : -5)), semanticSaturation -5), txtOnWarning: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(baseSemanticWarning, semanticLightness + (isDarkMode ? 10 : -5)), semanticSaturation -5), (hexToRgb(saturateDesaturateColor(lightenDarkenColor(baseSemanticWarning, semanticLightness + (isDarkMode ? 10 : -5)), semanticSaturation -5)).r * 0.299 + hexToRgb(saturateDesaturateColor(lightenDarkenColor(baseSemanticWarning, semanticLightness + (isDarkMode ? 10 : -5)), semanticSaturation -5)).g * 0.587 + hexToRgb(saturateDesaturateColor(lightenDarkenColor(baseSemanticWarning, semanticLightness + (isDarkMode ? 10 : -5)), semanticSaturation -5)).b * 0.114) > 100 ? -80 : 70),
    borderWarning: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(baseSemanticWarning, semanticLightness + (isDarkMode ? 10 : -5)), semanticSaturation -5), -10), bgWarningMuted: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(baseSemanticWarning, semanticLightness + (isDarkMode ? 10 : -5)), semanticSaturation -5), isDarkMode ? -25 : 60), txtWarningStrong: lightenDarkenColor(baseSemanticWarning, isDarkMode ? 0 : -25),
    bgInfo: saturateDesaturateColor(lightenDarkenColor(baseSemanticInfo, semanticLightness), semanticSaturation), txtOnInfo: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(baseSemanticInfo, semanticLightness), semanticSaturation), (hexToRgb(saturateDesaturateColor(lightenDarkenColor(baseSemanticInfo, semanticLightness), semanticSaturation)).r * 0.299 + hexToRgb(saturateDesaturateColor(lightenDarkenColor(baseSemanticInfo, semanticLightness), semanticSaturation)).g * 0.587 + hexToRgb(saturateDesaturateColor(lightenDarkenColor(baseSemanticInfo, semanticLightness), semanticSaturation)).b * 0.114) > 128 ? -80 : 80),
    borderInfo: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(baseSemanticInfo, semanticLightness), semanticSaturation), -10), bgInfoMuted: lightenDarkenColor(saturateDesaturateColor(lightenDarkenColor(baseSemanticInfo, semanticLightness), semanticSaturation), isDarkMode ? -25 : 60), txtInfoStrong: lightenDarkenColor(baseSemanticInfo, isDarkMode ? 10 : -20),
    brandScale: brandColorScale, grayScale: grayColorScale,
  };
  return theme;
};

// MODIFICACIÓN: Añadido powerFxSeparator como argumento
export const getPowerAppsThemeCode = (brandColor, grayBase, selectedFont, lightPaletteName, darkPaletteName, powerFxSeparator = ',') => {
  const lightTheme = generateThemeModeColors(brandColor, grayBase, false);
  const darkTheme = generateThemeModeColors(brandColor, grayBase, true);
  const s = powerFxSeparator; // Alias para el separador

  const generateFxRecord = (themeObject) => {
    let fxString = `{\n`;
    const keys = Object.keys(themeObject).sort();

    for (const key of keys) {
      if (key === 'brandScale' || key === 'grayScale') {
        fxString += `            ${key}: {\n`;
        const scaleObject = themeObject[key];
        const orderedScaleKeys = ['L5','L4','L3','L2','L1','Base','D1','D2','D3','D4','D5'].filter(k => scaleObject.hasOwnProperty(k));
        for (const scaleKey of orderedScaleKeys) {
          const colorValue = typeof scaleObject[scaleKey] === 'string' && scaleObject[scaleKey].startsWith('#') ? scaleObject[scaleKey] : '#000000';
          fxString += `                ${scaleKey}: ColorValue("${colorValue}")${orderedScaleKeys.indexOf(scaleKey) < orderedScaleKeys.length - 1 ? s : ""}\n`; // Usar 's'
        }
        fxString += `            }${keys.indexOf(key) < keys.length - 1 ? s : ""}\n`; // Usar 's'
      } else {
        const colorValue = typeof themeObject[key] === 'string' && themeObject[key].startsWith('#') ? themeObject[key] : '#000000';
        fxString += `            ${key}: ColorValue("${colorValue}")${keys.indexOf(key) < keys.length - 1 ? s : ""}\n`; // Usar 's'
      }
    }
    fxString += `        }`;
    return fxString;
  };
  
  return `
// ========================================================================
// Power Helper - Theme Variables V5.1 (Generated with Detailed Variations)
// ========================================================================
// Brand Color: ${brandColor} | Gray Base: ${grayBase} | Font: ${selectedFont}
// Light Palette Ref: ${lightPaletteName || "Personalizado"}
// Dark Palette Ref: ${darkPaletteName || "Personalizado"}
// Argument Separator: ${s}
// ------------------------------------------------------------------------
// INSTRUCCIONES DE USO:
// 1. Copia TODO este código.
// 2. En tu Power App, ve a la propiedad "App.OnStart".
// 3. Pega este código al final de tu fórmula OnStart existente.
// 4. Crea una variable global booleana llamada 'gblIsDarkMode'.
//    Puedes controlarla con un Toggle: Set(gblIsDarkMode${s} ToggleDarkMode.Value)
// 5. ¡Aplica los colores y la fuente del tema a tus controles!
//    Ejemplos:
//      Label.Font:        gblTheme.FontFamily
//      Label.Color:       gblTheme.txtPrimary
//      Button.Fill:       gblTheme.accentDefault
//      Button.HoverFill:  gblTheme.accentPrimaryHover 
//      Button.PressedFill: gblTheme.accentPrimaryPressed
//      Screen.Fill:       gblTheme.bgPrimary
// ------------------------------------------------------------------------

ClearCollect(
    colAppThemePalette${s}
    {
        FontFamily: "${selectedFont}"${s} 
        Light: ${generateFxRecord(lightTheme)}${s}
        Dark: ${generateFxRecord(darkTheme)}
    }
);

Set(
    gblThemeBase${s} 
    First(colAppThemePalette)
);

Set(
    gblTheme${s}
    If(
        Coalesce(gblIsDarkMode${s} false)${s} 
        Table(gblThemeBase.Dark${s} {FontFamily: gblThemeBase.FontFamily})${s} 
        Table(gblThemeBase.Light${s} {FontFamily: gblThemeBase.FontFamily})  
    )
);

// ========================================================================
// Variables de Tema Disponibles (accede a ellas con gblTheme.nombreVariable):
// (Lista de variables omitida por brevedad, es la misma que antes)
// ========================================================================
`;
};