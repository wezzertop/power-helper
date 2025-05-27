// src/components/ThemeGenerator.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { basePalettes, getPowerAppsThemeCode, generateNamedColorScale, generateThemeModeColors, fontFamilies, lightenDarkenColor, hexToRgb } from '../data/themes';
import CodeBlock from './CodeBlock';
import { Sun, Moon, Shuffle, Clipboard, Palette as PaletteIcon, Check, AlertTriangle, Info, Type, Square, Droplets, Columns, Rows, Text, Minus, Plus, ExternalLink, Pilcrow, MousePointer as MousePointerIcon } from 'lucide-react';

// --- Subcomponentes de Vista Previa (Actualizados para usar nombres en Español) ---

const ColorRampDisplay = ({ title, scaleObject, isDarkTheme }) => {
    // Las claves de la escala ya están en español (MasClaro, MasOscuro, Base)
    const orderedScaleKeys = ['MasClaro5','MasClaro4','MasClaro3','MasClaro2','MasClaro1','Base','MasOscuro1','MasOscuro2','MasOscuro3','MasOscuro4','MasOscuro5'].filter(k => scaleObject && scaleObject.hasOwnProperty(k));

    if (!scaleObject || orderedScaleKeys.length === 0) {
        return <div className="mb-6"><h5 className={`text-sm font-semibold mb-2 ${isDarkTheme ? 'text-dark-text-secondary' : 'text-neutral-gray'}`}>{title} (Sin datos)</h5></div>;
    }

    return (
        <div className="mb-6">
            <h5 className={`text-sm font-semibold mb-2 ${isDarkTheme ? 'text-dark-text-secondary' : 'text-neutral-gray'}`}>{title}</h5>
            <div className="flex w-full h-16 rounded-md overflow-hidden border border-neutral-300 dark:border-neutral-700 shadow-sm">
                {orderedScaleKeys.map((key) => (
                    <div
                        key={key}
                        className="flex-1 flex flex-col items-center justify-center text-center p-0.5"
                        style={{ backgroundColor: scaleObject[key] }}
                        title={`${key}: ${scaleObject[key]}`}
                    >
                        <span
                            className="text-[9px] leading-tight font-mono break-all"
                            style={{ color: lightenDarkenColor(scaleObject[key], (hexToRgb(scaleObject[key])?.r * 0.299 + hexToRgb(scaleObject[key])?.g * 0.587 + hexToRgb(scaleObject[key])?.b * 0.114) > 128 ? -80 : 80) }}
                        >
                            {key}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const KeyPalettesPreview = ({ brandColor, grayBase, isDark, selectedFont }) => {
    const themeColors = generateThemeModeColors(brandColor, grayBase, isDark); // Esto ya devuelve nombres en español

    return (
        <div className={`p-4 rounded-lg mb-6 border ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-neutral-gray-light'}`} style={{fontFamily: selectedFont}}>
            <h4 className="text-md font-semibold mb-4" style={{color: themeColors.TextoPrincipal}}>
                {isDark ? "Escalas de Color Generadas (Modo Oscuro)" : "Escalas de Color Generadas (Modo Claro)"}
            </h4>
            {/* Usar los nombres en español para las escalas */}
            <ColorRampDisplay title={`Escala Color Marca (${brandColor})`} scaleObject={themeColors.EscalaColorMarca} isDarkTheme={isDark} />
            <ColorRampDisplay title={`Escala Color Gris (${grayBase})`} scaleObject={themeColors.EscalaColorGris} isDarkTheme={isDark} />
        </div>
    );
};

const TypographyPreview = ({ themeColors, isDark, selectedFont }) => {
    const textStyles = [
        { name: "Display", size: "text-3xl", weight: "font-bold", colorKey: "TextoPrincipal" },
        { name: "Title Large", size: "text-xl", weight: "font-semibold", colorKey: "TextoPrincipal" },
        { name: "Title Medium", size: "text-lg", weight: "font-medium", colorKey: "TextoPrincipal" },
        { name: "Body Large", size: "text-base", weight: "font-normal", colorKey: "TextoPrincipal" },
        { name: "Body Medium (Secundario)", size: "text-sm", weight: "font-normal", colorKey: "TextoSecundario" },
        { name: "Label Small (Deshabilitado)", size: "text-xs", weight: "font-medium", colorKey: "TextoDeshabilitado" },
    ];

    return (
        <div className={`p-4 rounded-lg mt-6 ${isDark ? 'bg-dark-surface' : 'bg-white'}`} style={{border: `1px solid ${themeColors.BordePredeterminado}`, fontFamily: selectedFont}}>
            <h4 className="text-lg font-semibold mb-3" style={{color: themeColors.TextoPrincipal}}>Muestra de Tipografía ({selectedFont})</h4>
            {textStyles.map(style => (
                <p key={style.name} className={`${style.size} ${style.weight} mb-1 truncate`} style={{color: themeColors[style.colorKey]}}>
                    {style.name} - Aa Bb Cc
                </p>
            ))}
             <p className="mt-3 text-sm" style={{color: themeColors.TextoAcento}}>Texto de Acento</p>
             <div className="p-1 rounded inline-block mt-1" style={{backgroundColor: themeColors.AcentoPrincipal}}>
                <p style={{color: themeColors.TextoSobreAcento}}>Texto Sobre Acento</p>
            </div>
        </div>
    );
};

const ColorSwatch = ({ varName, colorValue, textColor, isDark, hasBorder = false, label, bgColor, borderColor, className }) => (
    <div className={`p-2 rounded mb-1 flex items-center justify-between ${isDark ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'} ${className || ''}`} title={`${label || varName}: ${colorValue}`} style={{backgroundColor: bgColor}}>
        <div className="flex items-center">
            <div
                className={`w-5 h-5 rounded-sm mr-2 flex-shrink-0 ${hasBorder || borderColor ? (isDark ? 'border border-neutral-600' : 'border border-neutral-300') : ''}`}
                style={{ backgroundColor: colorValue, borderColor: borderColor ? borderColor : 'transparent' , borderWidth: borderColor ? '1px' : '0px'}}
            ></div>
            <span className={`text-xs font-mono ${isDark ? 'text-dark-text-secondary' : 'text-neutral-gray-dark'}`}>{label || varName}</span>
        </div>
        <span className={`text-xs font-mono ${textColor ? '' : (isDark ? 'text-dark-text-primary' : 'text-neutral-black')}`} style={{color: textColor}}>{colorValue}</span>
    </div>
);

const UIComponentsPreview = ({ themeColors, isDark, selectedFont }) => {
    const tc = themeColors; // tc ahora tiene nombres en español
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const sectionBaseStyle = `mb-6 p-4 rounded-lg border ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-neutral-gray-light'}`;
    const sectionHeaderStyle = `text-lg font-semibold mb-3 flex items-center`;

    return (
        <div className={`p-4 rounded-lg mt-6 ${isDark ? 'bg-dark-bg' : 'bg-neutral-gray-lighter'}`} style={{fontFamily: selectedFont}}>
            <h4 className="text-xl font-bold mb-6" style={{color: tc.TextoPrincipal}}>Vista Previa Detallada de Componentes UI</h4>

            <div className={sectionBaseStyle}>
                <h5 className={sectionHeaderStyle} style={{color: tc.TextoPrincipal}}><Rows className="mr-2 w-5 h-5 text-current" />Fondos</h5>
                <ColorSwatch varName="FondoPrincipal" colorValue={tc.FondoPrincipal} textColor={tc.TextoSecundario} isDark={isDark} />
                <ColorSwatch varName="FondoSecundario" colorValue={tc.FondoSecundario} textColor={tc.TextoSecundario} isDark={isDark} />
                <ColorSwatch varName="FondoSuperficie" colorValue={tc.FondoSuperficie} textColor={tc.TextoSecundario} isDark={isDark} hasBorder={true}/>
                <ColorSwatch varName="FondoSuperficieHover" colorValue={tc.FondoSuperficieHover} textColor={tc.TextoSecundario} isDark={isDark} hasBorder={true}/>
                <ColorSwatch varName="FondoSuperficiePresionado" colorValue={tc.FondoSuperficiePresionado} textColor={tc.TextoSecundario} isDark={isDark} hasBorder={true}/>
                <ColorSwatch varName="FondoDiscreto" colorValue={tc.FondoDiscreto} textColor={tc.TextoSecundario} isDark={isDark} />
                <ColorSwatch varName="FondoAcento" colorValue={tc.FondoAcento} textColor={tc.TextoSobreAcento} isDark={isDark} />
                <ColorSwatch varName="FondoAcentoSuave" colorValue={tc.FondoAcentoSuave} textColor={tc.TextoPrincipal} isDark={isDark} hasBorder={true}/>
                <ColorSwatch varName="FondoAcentoFuerte" colorValue={tc.FondoAcentoFuerte} textColor={tc.TextoSobreAcento} isDark={isDark} />
            </div>

             <div className={sectionBaseStyle}>
                <h5 className={sectionHeaderStyle} style={{color: tc.TextoPrincipal}}><Pilcrow className="mr-2 w-5 h-5 text-current" />Textos</h5>
                <ColorSwatch varName="TextoPrincipal" colorValue={tc.TextoPrincipal} bgColor={tc.FondoSuperficie} textColor={tc.TextoPrincipal} isDark={isDark}/>
                <ColorSwatch varName="TextoSecundario" colorValue={tc.TextoSecundario} bgColor={tc.FondoSuperficie} textColor={tc.TextoSecundario} isDark={isDark}/>
                <ColorSwatch varName="TextoDeshabilitado" colorValue={tc.TextoDeshabilitado} bgColor={tc.FondoSuperficie} textColor={tc.TextoDeshabilitado} isDark={isDark}/>
                <ColorSwatch varName="TextoAcento" colorValue={tc.TextoAcento} bgColor={tc.FondoSuperficie} textColor={tc.TextoAcento} isDark={isDark}/>
                <ColorSwatch varName="TextoSobreAcento" colorValue={tc.TextoSobreAcento} bgColor={tc.AcentoPrincipal} textColor={tc.TextoSobreAcento} isDark={isDark}/>
                <ColorSwatch varName="TextoAcentoSuave" colorValue={tc.TextoAcentoSuave} bgColor={tc.FondoSuperficie} textColor={tc.TextoAcentoSuave} isDark={isDark}/>
                <ColorSwatch varName="TextoAcentoFuerte" colorValue={tc.TextoAcentoFuerte} bgColor={tc.FondoSuperficie} textColor={tc.TextoAcentoFuerte} isDark={isDark}/>
            </div>

            <div className={sectionBaseStyle}>
                <h5 className={sectionHeaderStyle} style={{color: tc.TextoPrincipal}}><Square className="mr-2 w-5 h-5 text-current" />Bordes</h5>
                <ColorSwatch label="BordePredeterminado" colorValue={tc.BordePredeterminado} bgColor={tc.FondoSuperficie} textColor={tc.TextoSecundario} borderColor={tc.BordePredeterminado} className="p-2 rounded border-2"/>
                <ColorSwatch label="BordeResaltado" colorValue={tc.BordeResaltado} bgColor={tc.FondoSuperficie} textColor={tc.TextoSecundario} borderColor={tc.BordeResaltado} className="p-2 rounded border-2"/>
                <ColorSwatch label="BordeEnfoque" colorValue={tc.BordeEnfoque} bgColor={tc.FondoSuperficie} textColor={tc.TextoSecundario} borderColor={tc.BordeEnfoque} className="p-2 rounded border-2"/>
                <ColorSwatch label="BordeAcento" colorValue={tc.BordeAcento} bgColor={tc.FondoSuperficie} textColor={tc.TextoSecundario} borderColor={tc.BordeAcento} className="p-2 rounded border-2"/>
            </div>

            <div className={sectionBaseStyle}>
                <h5 className={sectionHeaderStyle} style={{color: tc.TextoPrincipal}}><PaletteIcon className="mr-2 w-5 h-5 text-current" />Acentos y Botones</h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                    <ColorSwatch label="AcentoPrincipal" colorValue={tc.AcentoPrincipal} bgColor={tc.AcentoPrincipal} textColor={tc.TextoSobreAcento} />
                    <ColorSwatch label="AcentoPrincipalHover" colorValue={tc.AcentoPrincipalHover} bgColor={tc.AcentoPrincipalHover} textColor={tc.TextoSobreAcento} />
                    <ColorSwatch label="AcentoPrincipalPresionado" colorValue={tc.AcentoPrincipalPresionado} bgColor={tc.AcentoPrincipalPresionado} textColor={tc.TextoSobreAcento} />
                    <ColorSwatch label="AcentoSuave" colorValue={tc.AcentoSuave} bgColor={tc.AcentoSuave} textColor={tc.TextoPrincipal} borderColor={tc.BordePredeterminado}/>
                    <ColorSwatch label="AcentoFuerte" colorValue={tc.AcentoFuerte} bgColor={tc.AcentoFuerte} textColor={tc.TextoSobreAcento} />
                    <ColorSwatch label="AcentoSecundario" colorValue={tc.AcentoSecundario} bgColor={tc.AcentoSecundario} textColor={tc.TextoPrincipal} borderColor={tc.BordePredeterminado}/>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                    <button
                        className="px-4 py-2 text-sm rounded font-medium transition-colors"
                        style={{ backgroundColor: isPressed ? tc.AcentoPrincipalPresionado : (isHovered ? tc.AcentoPrincipalHover : tc.AcentoPrincipal), color: tc.TextoSobreAcento }}
                        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => { setIsHovered(false); setIsPressed(false);}}
                        onMouseDown={() => setIsPressed(true)} onMouseUp={() => setIsPressed(false)}
                    > Botón Primario </button>
                    <button className="px-4 py-2 text-sm rounded font-medium" style={{border: `1px solid ${tc.AcentoSecundario}`, color: tc.AcentoSecundario, backgroundColor: tc.FondoSuperficie}}>Botón Secundario</button>
                    <button className="px-4 py-2 text-sm rounded font-medium" style={{backgroundColor: tc.FondoSuperficie, color: tc.TextoDeshabilitado, border: `1px solid ${tc.BordePredeterminado}`, cursor: 'not-allowed'}}>Deshabilitado</button>
                </div>
                 <div className="mt-4">
                    <input type="text" placeholder="Input con borde de foco" className="p-2 text-sm rounded w-full sm:w-2/3" style={{backgroundColor: tc.FondoSuperficie, color: tc.TextoPrincipal, border: `1px solid ${tc.BordePredeterminado}`}} onFocus={(e) => e.target.style.borderColor = tc.BordeEnfoque} onBlur={(e) => e.target.style.borderColor = tc.BordePredeterminado} />
                </div>
            </div>

             <div className={sectionBaseStyle}>
                <h5 className={sectionHeaderStyle} style={{color: tc.TextoPrincipal}}><Droplets className="mr-2 w-5 h-5 text-current" />Colores Semánticos</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    <ColorSwatch label="FondoExito" colorValue={tc.FondoExito} bgColor={tc.FondoExito} textColor={tc.TextoSobreExito} />
                    <ColorSwatch label="TextoExitoFuerte" colorValue={tc.TextoExitoFuerte} bgColor={tc.FondoSuperficie} textColor={tc.TextoExitoFuerte} isDark={isDark}/>
                    <ColorSwatch label="FondoExitoSuave" colorValue={tc.FondoExitoSuave} bgColor={tc.FondoExitoSuave} textColor={tc.TextoExitoFuerte} borderColor={tc.BordeExito} />
                    <ColorSwatch label="BordeExito" colorValue={tc.BordeExito} bgColor={tc.FondoSuperficie} textColor={tc.TextoSecundario} borderColor={tc.BordeExito} className="p-2 rounded border-2"/>

                    <ColorSwatch label="FondoError" colorValue={tc.FondoError} bgColor={tc.FondoError} textColor={tc.TextoSobreError} />
                    <ColorSwatch label="TextoErrorFuerte" colorValue={tc.TextoErrorFuerte} bgColor={tc.FondoSuperficie} textColor={tc.TextoErrorFuerte} isDark={isDark}/>
                    <ColorSwatch label="FondoErrorSuave" colorValue={tc.FondoErrorSuave} bgColor={tc.FondoErrorSuave} textColor={tc.TextoErrorFuerte} borderColor={tc.BordeError} />
                    <ColorSwatch label="BordeError" colorValue={tc.BordeError} bgColor={tc.FondoSuperficie} textColor={tc.TextoSecundario} borderColor={tc.BordeError} className="p-2 rounded border-2"/>

                    <ColorSwatch label="FondoAdvertencia" colorValue={tc.FondoAdvertencia} bgColor={tc.FondoAdvertencia} textColor={tc.TextoSobreAdvertencia} />
                    <ColorSwatch label="TextoAdvertenciaFuerte" colorValue={tc.TextoAdvertenciaFuerte} bgColor={tc.FondoSuperficie} textColor={tc.TextoAdvertenciaFuerte} isDark={isDark}/>
                    <ColorSwatch label="FondoAdvertenciaSuave" colorValue={tc.FondoAdvertenciaSuave} bgColor={tc.FondoAdvertenciaSuave} textColor={tc.TextoAdvertenciaFuerte} borderColor={tc.BordeAdvertencia} />
                    <ColorSwatch label="BordeAdvertencia" colorValue={tc.BordeAdvertencia} bgColor={tc.FondoSuperficie} textColor={tc.TextoSecundario} borderColor={tc.BordeAdvertencia} className="p-2 rounded border-2"/>

                    <ColorSwatch label="FondoInformacion" colorValue={tc.FondoInformacion} bgColor={tc.FondoInformacion} textColor={tc.TextoSobreInformacion} />
                    <ColorSwatch label="TextoInformacionFuerte" colorValue={tc.TextoInformacionFuerte} bgColor={tc.FondoSuperficie} textColor={tc.TextoInformacionFuerte} isDark={isDark}/>
                    <ColorSwatch label="FondoInformacionSuave" colorValue={tc.FondoInformacionSuave} bgColor={tc.FondoInformacionSuave} textColor={tc.TextoInformacionFuerte} borderColor={tc.BordeInformacion} />
                    <ColorSwatch label="BordeInformacion" colorValue={tc.BordeInformacion} bgColor={tc.FondoSuperficie} textColor={tc.TextoSecundario} borderColor={tc.BordeInformacion} className="p-2 rounded border-2"/>
                </div>
            </div>
        </div>
    );
};

const ThemeGenerator = ({ powerFxSeparator }) => {
    const [brandColor, setBrandColor] = useState(basePalettes[0].brandColor);
    const [grayBase, setGrayBase] = useState(basePalettes[0].grayBase);
    const [selectedFont, setSelectedFont] = useState(fontFamilies[0]);
    const [selectedPaletteName, setSelectedPaletteName] = useState(basePalettes[0].name);

    const [isPreviewDark, setIsPreviewDark] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const currentPalette = basePalettes.find(p => p.brandColor === brandColor && p.grayBase === grayBase);
        const paletteName = currentPalette ? currentPalette.name : "Personalizado";
        if (selectedPaletteName !== paletteName && currentPalette) {
             setSelectedPaletteName(paletteName);
        } else if (!currentPalette && selectedPaletteName !== "Personalizado"){
             setSelectedPaletteName("Personalizado");
        }

        const code = getPowerAppsThemeCode(brandColor, grayBase, selectedFont, paletteName, paletteName, powerFxSeparator);
        setGeneratedCode(code);
    }, [brandColor, grayBase, selectedFont, selectedPaletteName, powerFxSeparator]);

    const currentThemeForPreview = useMemo(() => {
        return generateThemeModeColors(brandColor, grayBase, isPreviewDark);
    }, [brandColor, grayBase, isPreviewDark]);

    const handleRandomPalette = () => {
        const randomIndex = Math.floor(Math.random() * basePalettes.length);
        const randomPalette = basePalettes[randomIndex];
        setBrandColor(randomPalette.brandColor);
        setGrayBase(randomPalette.grayBase);
        setSelectedPaletteName(randomPalette.name);
    };

    const handlePredefinedPaletteChange = (index) => {
        if (index >= 0 && index < basePalettes.length) {
            const palette = basePalettes[index];
            setBrandColor(palette.brandColor);
            setGrayBase(palette.grayBase);
            setSelectedPaletteName(palette.name);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedCode).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }).catch(err => {
            console.error('Error al copiar el código:', err);
            alert('Error al copiar el código.');
        });
    };

    return (
        <div className="flex flex-col lg:flex-row h-full">
            <div className="w-full lg:w-2/5 lg:min-w-[400px] lg:max-w-[550px] bg-white dark:bg-dark-surface border-r border-neutral-gray-light dark:border-dark-border flex flex-col h-auto lg:h-[calc(100vh-4rem)] p-4 sm:p-6">
                <div className="flex-shrink-0">
                    <h2 className="text-2xl font-semibold text-neutral-gray-dark dark:text-dark-text-primary mb-6">Generador de Temas</h2>
                    <div className="mb-4">
                        <label htmlFor="predefinedPalette" className="block text-sm font-medium text-neutral-gray dark:text-dark-text-secondary mb-1">Paletas Predefinidas ({selectedPaletteName})</label>
                        <select id="predefinedPalette" value={basePalettes.findIndex(p => p.name === selectedPaletteName)} onChange={(e) => handlePredefinedPaletteChange(Number(e.target.value))}
                            className="w-full p-2.5 rounded-md border border-neutral-gray-light dark:border-dark-border bg-neutral-gray-lighter dark:bg-neutral-gray-darker text-sm focus:outline-none focus:ring-1 focus:ring-primary-blue">
                            {basePalettes.map((p, i) => <option key={`base-${i}`} value={i}>{p.name}</option>)}
                            {selectedPaletteName === "Personalizado" && !basePalettes.find(p => p.brandColor === brandColor && p.grayBase === grayBase) && (<option value={-1} disabled>Personalizado</option>)}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="brandColor" className="block text-sm font-medium text-neutral-gray dark:text-dark-text-secondary mb-1">Color de Marca: <span className="font-mono text-xs">{brandColor}</span></label>
                            <input type="color" id="brandColor" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="w-full h-10 p-1 rounded-md border border-neutral-gray-light dark:border-dark-border cursor-pointer"/>
                        </div>
                        <div>
                            <label htmlFor="grayBase" className="block text-sm font-medium text-neutral-gray dark:text-dark-text-secondary mb-1">Base Escala Grises: <span className="font-mono text-xs">{grayBase}</span></label>
                            <input type="color" id="grayBase" value={grayBase} onChange={(e) => setGrayBase(e.target.value)} className="w-full h-10 p-1 rounded-md border border-neutral-gray-light dark:border-dark-border cursor-pointer"/>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="fontFamily" className="block text-sm font-medium text-neutral-gray dark:text-dark-text-secondary mb-1">Fuente Principal</label>
                        <select id="fontFamily" value={selectedFont} onChange={(e) => setSelectedFont(e.target.value)}
                            className="w-full p-2.5 rounded-md border border-neutral-gray-light dark:border-dark-border bg-neutral-gray-lighter dark:bg-neutral-gray-darker text-sm focus:outline-none focus:ring-1 focus:ring-primary-blue">
                            {fontFamilies.map((font) => <option key={font} value={font}>{font}</option>)}
                        </select>
                    </div>
                    <button onClick={handleRandomPalette} className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-md transition-colors mb-6 text-sm">
                        <Shuffle size={18} className="mr-2" /> Tema Aleatorio (Colores)
                    </button>
                    <h3 className="text-lg font-medium text-neutral-gray-dark dark:text-dark-text-primary mb-2">Código <code className="text-sm bg-neutral-gray-lighter dark:bg-neutral-gray-darker p-1 rounded">App.OnStart</code></h3>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md mb-3 text-xs text-blue-700 dark:text-blue-300">
                        <Info size={16} className="inline mr-1 mb-0.5 flex-shrink-0" />
                        <span>Copia y pega el siguiente código en la propiedad <code className="font-semibold">App.OnStart</code> de tu Power App. Define una variable global booleana <code className="font-semibold">gblModoOscuro</code> para alternar. Usa <code className="font-semibold">gblTema.NombreVariable</code> (ej. <code className="font-semibold">gblTema.TextoPrincipal</code>, <code className="font-semibold">gblTema.FuenteFamilia</code>) para aplicar el tema. Revisa la sección "Variables de Tema Disponibles" en el código generado. El separador de argumentos (<code>{powerFxSeparator}</code>) se aplicará según tu configuración.</span>
                    </div>
                </div>
                <div className="relative flex-grow min-h-[250px] lg:min-h-0">
                   <CodeBlock codeString={generatedCode} language="powerfx" />
                   <button onClick={copyToClipboard} className="absolute top-2 right-2 p-1.5 rounded-md bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black text-neutral-gray dark:text-dark-text-secondary focus:outline-none focus:ring-1 focus:ring-primary-blue" title="Copiar Código">
                       {copied ? <Check size={16} className="text-green-500" /> : <Clipboard size={16} />}
                   </button>
                </div>
            </div>
            <div className="w-full lg:flex-1 overflow-y-auto h-auto lg:h-[calc(100vh-4rem)] p-4 sm:p-6" style={{backgroundColor: currentThemeForPreview.FondoSecundario }}>
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium" style={{color: currentThemeForPreview.TextoPrincipal}}>Vista Previa del Tema</h3>
                    <div className="flex items-center space-x-1 bg-white dark:bg-dark-surface p-1 rounded-full shadow-md">
                       <button onClick={() => setIsPreviewDark(false)} className={`p-2 rounded-full transition-colors ${!isPreviewDark ? 'bg-primary-blue text-white shadow-sm' : 'text-neutral-gray dark:text-dark-text-secondary hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-darker'}`} title="Ver Tema Claro"><Sun size={18} /></button>
                       <button onClick={() => setIsPreviewDark(true)} className={`p-2 rounded-full transition-colors ${isPreviewDark ? 'bg-primary-blue text-white shadow-sm' : 'text-neutral-gray dark:text-dark-text-secondary hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-darker'}`} title="Ver Tema Oscuro"><Moon size={18} /></button>
                    </div>
                </div>
                <div className="p-4 sm:p-6 rounded-lg" style={{backgroundColor: currentThemeForPreview.FondoPrincipal, border: `1px solid ${currentThemeForPreview.BordePredeterminado}`, fontFamily: selectedFont}}>
                    <KeyPalettesPreview brandColor={brandColor} grayBase={grayBase} isDark={isPreviewDark} selectedFont={selectedFont} />
                    <TypographyPreview themeColors={currentThemeForPreview} isDark={isPreviewDark} selectedFont={selectedFont}/>
                    <UIComponentsPreview themeColors={currentThemeForPreview} isDark={isPreviewDark} selectedFont={selectedFont}/>
                </div>
            </div>
        </div>
    );
};

export default ThemeGenerator;