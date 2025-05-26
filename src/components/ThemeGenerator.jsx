import React, { useState, useEffect, useMemo } from 'react';
import { basePalettes, getPowerAppsThemeCode, generateNamedColorScale, generateThemeModeColors, fontFamilies, lightenDarkenColor, hexToRgb } from '../data/themes'; 
import CodeBlock from './CodeBlock';
import { Sun, Moon, Shuffle, Clipboard, Palette as PaletteIcon, Check, AlertTriangle, Info, Type, Square, Droplets, Columns, Rows, Text, Minus, Plus, ExternalLink, Pilcrow, MousePointer as MousePointerIcon } from 'lucide-react';

// --- Subcomponentes de Vista Previa ---

const ColorRampDisplay = ({ title, scaleObject, isDarkTheme }) => {
    const orderedScaleKeys = ['L5','L4','L3','L2','L1','Base','D1','D2','D3','D4','D5'].filter(k => scaleObject && scaleObject.hasOwnProperty(k));

    if (!scaleObject || orderedScaleKeys.length === 0) {
        return <div className="mb-6"><h5 className={`text-sm font-semibold mb-2 ${isDarkTheme ? 'text-dark-text-secondary' : 'text-neutral-gray'}`}>{title} (No data)</h5></div>;
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
    const themeColors = generateThemeModeColors(brandColor, grayBase, isDark);
    
    return (
        <div className={`p-4 rounded-lg mb-6 border ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-neutral-gray-light'}`} style={{fontFamily: selectedFont}}>
            <h4 className="text-md font-semibold mb-4" style={{color: themeColors.txtPrimary}}>
                {isDark ? "Escalas de Color Generadas (Modo Oscuro)" : "Escalas de Color Generadas (Modo Claro)"}
            </h4>
            <ColorRampDisplay title={`Brand Color Scale (${brandColor})`} scaleObject={themeColors.brandScale} isDarkTheme={isDark} />
            <ColorRampDisplay title={`Gray Scale (${grayBase})`} scaleObject={themeColors.grayScale} isDarkTheme={isDark} />
        </div>
    );
};

const TypographyPreview = ({ themeColors, isDark, selectedFont }) => {
    const textStyles = [
        { name: "Display", size: "text-3xl", weight: "font-bold", colorKey: "txtPrimary" },
        { name: "Title Large", size: "text-xl", weight: "font-semibold", colorKey: "txtPrimary" },
        { name: "Title Medium", size: "text-lg", weight: "font-medium", colorKey: "txtPrimary" },
        { name: "Body Large", size: "text-base", weight: "font-normal", colorKey: "txtPrimary" },
        { name: "Body Medium (Secundario)", size: "text-sm", weight: "font-normal", colorKey: "txtSecondary" },
        { name: "Label Small (Deshabilitado)", size: "text-xs", weight: "font-medium", colorKey: "txtDisabled" },
    ];

    return (
        <div className={`p-4 rounded-lg mt-6 ${isDark ? 'bg-dark-surface' : 'bg-white'}`} style={{border: `1px solid ${themeColors.borderDefault}`, fontFamily: selectedFont}}>
            <h4 className="text-lg font-semibold mb-3" style={{color: themeColors.txtPrimary}}>Muestra de Tipografía ({selectedFont})</h4>
            {textStyles.map(style => (
                <p key={style.name} className={`${style.size} ${style.weight} mb-1 truncate`} style={{color: themeColors[style.colorKey]}}>
                    {style.name} - Aa Bb Cc
                </p>
            ))}
             <p className="mt-3 text-sm" style={{color: themeColors.txtAccent}}>Texto de Acento (txtAccent)</p>
             <div className="p-1 rounded inline-block mt-1" style={{backgroundColor: themeColors.accentDefault}}>
                <p style={{color: themeColors.txtOnAccent}}>Texto Sobre Acento (txtOnAccent)</p>
            </div>
        </div>
    );
};

const ColorSwatch = ({ varName, colorValue, textColor, isDark, hasBorder = false }) => (
    <div className={`p-2 rounded mb-1 flex items-center justify-between ${isDark ? 'hover:bg-neutral-700' : 'hover:bg-neutral-100'}`} title={`${varName}: ${colorValue}`}>
        <div className="flex items-center">
            <div 
                className={`w-5 h-5 rounded-sm mr-2 flex-shrink-0 ${hasBorder ? (isDark ? 'border border-neutral-600' : 'border border-neutral-300') : ''}`} 
                style={{ backgroundColor: colorValue }}
            ></div>
            <span className={`text-xs font-mono ${isDark ? 'text-dark-text-secondary' : 'text-neutral-gray-dark'}`}>{varName}</span>
        </div>
        <span className={`text-xs font-mono ${isDark ? 'text-dark-text-primary' : 'text-neutral-black'}`}>{colorValue}</span>
    </div>
);

const UIComponentsPreview = ({ themeColors, isDark, selectedFont }) => {
    const tc = themeColors; 
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const sectionBaseStyle = `mb-6 p-4 rounded-lg border ${isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-neutral-gray-light'}`;
    const sectionHeaderStyle = `text-lg font-semibold mb-3 flex items-center`;

    return (
        <div className={`p-4 rounded-lg mt-6 ${isDark ? 'bg-dark-bg' : 'bg-neutral-gray-lighter'}`} style={{fontFamily: selectedFont}}>
            <h4 className="text-xl font-bold mb-6" style={{color: tc.txtPrimary}}>Vista Previa Detallada de Componentes UI</h4>

            <div className={sectionBaseStyle}>
                <h5 className={sectionHeaderStyle} style={{color: tc.txtPrimary}}><Rows className="mr-2 w-5 h-5 text-current" />Fondos (Backgrounds)</h5>
                <ColorSwatch varName="bgPrimary" colorValue={tc.bgPrimary} textColor={tc.txtSecondary} isDark={isDark} />
                <ColorSwatch varName="bgSecondary" colorValue={tc.bgSecondary} textColor={tc.txtSecondary} isDark={isDark} />
                <ColorSwatch varName="bgSurface" colorValue={tc.bgSurface} textColor={tc.txtSecondary} isDark={isDark} hasBorder={true}/>
                <ColorSwatch varName="bgSurfaceHover" colorValue={tc.bgSurfaceHover} textColor={tc.txtSecondary} isDark={isDark} hasBorder={true}/>
                <ColorSwatch varName="bgSurfacePressed" colorValue={tc.bgSurfacePressed} textColor={tc.txtSecondary} isDark={isDark} hasBorder={true}/>
                <ColorSwatch varName="bgSubtle" colorValue={tc.bgSubtle} textColor={tc.txtSecondary} isDark={isDark} />
                <ColorSwatch varName="bgAccent" colorValue={tc.bgAccent} textColor={tc.txtOnAccent} isDark={isDark} />
                <ColorSwatch varName="bgAccentMuted" colorValue={tc.bgAccentMuted} textColor={tc.txtPrimary} isDark={isDark} hasBorder={true}/>
                <ColorSwatch varName="bgAccentStrong" colorValue={tc.bgAccentStrong} textColor={tc.txtOnAccent} isDark={isDark} />
            </div>
            
             <div className={sectionBaseStyle}>
                <h5 className={sectionHeaderStyle} style={{color: tc.txtPrimary}}><Pilcrow className="mr-2 w-5 h-5 text-current" />Textos</h5>
                <ColorSwatch varName="txtPrimary" colorValue={tc.txtPrimary} bgColor={tc.bgSurface} textColor={tc.txtPrimary} isDark={isDark}/>
                <ColorSwatch varName="txtSecondary" colorValue={tc.txtSecondary} bgColor={tc.bgSurface} textColor={tc.txtSecondary} isDark={isDark}/>
                <ColorSwatch varName="txtDisabled" colorValue={tc.txtDisabled} bgColor={tc.bgSurface} textColor={tc.txtDisabled} isDark={isDark}/>
                <ColorSwatch varName="txtAccent" colorValue={tc.txtAccent} bgColor={tc.bgSurface} textColor={tc.txtAccent} isDark={isDark}/>
                <ColorSwatch varName="txtOnAccent" colorValue={tc.txtOnAccent} bgColor={tc.accentDefault} textColor={tc.txtOnAccent} isDark={isDark}/>
                <ColorSwatch varName="txtAccentMuted" colorValue={tc.txtAccentMuted} bgColor={tc.bgSurface} textColor={tc.txtAccentMuted} isDark={isDark}/>
                <ColorSwatch varName="txtAccentStrong" colorValue={tc.txtAccentStrong} bgColor={tc.bgSurface} textColor={tc.txtAccentStrong} isDark={isDark}/>
            </div>

            <div className={sectionBaseStyle}>
                <h5 className={sectionHeaderStyle} style={{color: tc.txtPrimary}}><Square className="mr-2 w-5 h-5 text-current" />Bordes (Borders)</h5>
                <ColorSwatch varName="borderDefault" colorValue={tc.borderDefault} bgColor={tc.bgSurface} textColor={tc.txtSecondary} borderColor={tc.borderDefault} className="p-2 rounded border-2"/>
                <ColorSwatch varName="borderMuted" colorValue={tc.borderMuted} bgColor={tc.bgSurface} textColor={tc.txtSecondary} borderColor={tc.borderMuted} className="p-2 rounded border"/>
                <ColorSwatch varName="borderStrong" colorValue={tc.borderStrong} bgColor={tc.bgSurface} textColor={tc.txtSecondary} borderColor={tc.borderStrong} className="p-2 rounded border-2"/>
                <ColorSwatch varName="borderFocus" colorValue={tc.borderFocus} bgColor={tc.bgSurface} textColor={tc.txtSecondary} borderColor={tc.borderFocus} className="p-2 rounded border-2"/>
                <ColorSwatch varName="borderAccent" colorValue={tc.borderAccent} bgColor={tc.bgSurface} textColor={tc.txtSecondary} borderColor={tc.borderAccent} className="p-2 rounded border-2"/>
            </div>

            <div className={sectionBaseStyle}>
                <h5 className={sectionHeaderStyle} style={{color: tc.txtPrimary}}><PaletteIcon className="mr-2 w-5 h-5 text-current" />Acentos y Botones</h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                    <ColorSwatch label="accentDefault" colorValue={tc.accentDefault} bgColor={tc.accentDefault} textColor={tc.txtOnAccent} />
                    <ColorSwatch label="accentHover" colorValue={tc.accentHover} bgColor={tc.accentHover} textColor={tc.txtOnAccent} />
                    <ColorSwatch label="accentPressed" colorValue={tc.accentPressed} bgColor={tc.accentPressed} textColor={tc.txtOnAccent} />
                    <ColorSwatch label="accentMuted" colorValue={tc.accentMuted} bgColor={tc.accentMuted} textColor={tc.txtPrimary} borderColor={tc.borderDefault}/>
                    <ColorSwatch label="accentStrong" colorValue={tc.accentStrong} bgColor={tc.accentStrong} textColor={tc.txtOnAccent} />
                    <ColorSwatch label="accentSecondary" colorValue={tc.accentSecondary} bgColor={tc.accentSecondary} textColor={tc.txtPrimary} borderColor={tc.borderDefault}/>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                    <button 
                        className="px-4 py-2 text-sm rounded font-medium transition-colors" 
                        style={{ backgroundColor: isPressed ? tc.accentPressed : (isHovered ? tc.accentHover : tc.accentDefault), color: tc.txtOnAccent }}
                        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => { setIsHovered(false); setIsPressed(false);}}
                        onMouseDown={() => setIsPressed(true)} onMouseUp={() => setIsPressed(false)}
                    > Botón Primario </button>
                    <button className="px-4 py-2 text-sm rounded font-medium" style={{border: `1px solid ${tc.accentSecondary}`, color: tc.accentSecondary, backgroundColor: tc.bgSurface}}>Botón Secundario</button>
                    <button className="px-4 py-2 text-sm rounded font-medium" style={{backgroundColor: tc.bgSurface, color: tc.txtDisabled, border: `1px solid ${tc.borderDefault}`, cursor: 'not-allowed'}}>Deshabilitado</button>
                </div>
                 <div className="mt-4">
                    <input type="text" placeholder="Input con borde de foco" className="p-2 text-sm rounded w-full sm:w-2/3" style={{backgroundColor: tc.bgSurface, color: tc.txtPrimary, border: `1px solid ${tc.borderDefault}`}} onFocus={(e) => e.target.style.borderColor = tc.borderFocus} onBlur={(e) => e.target.style.borderColor = tc.borderDefault} />
                </div>
            </div>
            
             <div className={sectionBaseStyle}>
                <h5 className={sectionHeaderStyle} style={{color: tc.txtPrimary}}><Droplets className="mr-2 w-5 h-5 text-current" />Colores Semánticos (Decorate)</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                    <ColorSwatch label="bgSuccess" colorValue={tc.bgSuccess} bgColor={tc.bgSuccess} textColor={tc.txtOnSuccess} />
                    <ColorSwatch label="txtSuccessStrong" colorValue={tc.txtSuccessStrong} bgColor={tc.bgSurface} textColor={tc.txtSuccessStrong} isDark={isDark}/>
                    <ColorSwatch label="bgSuccessMuted" colorValue={tc.bgSuccessMuted} bgColor={tc.bgSuccessMuted} textColor={tc.txtSuccessStrong} borderColor={tc.borderSuccess} />
                    <ColorSwatch label="borderSuccess" colorValue={tc.borderSuccess} bgColor={tc.bgSurface} textColor={tc.txtSecondary} borderColor={tc.borderSuccess} className="p-2 rounded border-2"/>
                    
                    <ColorSwatch label="bgError" colorValue={tc.bgError} bgColor={tc.bgError} textColor={tc.txtOnError} />
                    <ColorSwatch label="txtErrorStrong" colorValue={tc.txtErrorStrong} bgColor={tc.bgSurface} textColor={tc.txtErrorStrong} isDark={isDark}/>
                    <ColorSwatch label="bgErrorMuted" colorValue={tc.bgErrorMuted} bgColor={tc.bgErrorMuted} textColor={tc.txtErrorStrong} borderColor={tc.borderError} />
                    <ColorSwatch label="borderError" colorValue={tc.borderError} bgColor={tc.bgSurface} textColor={tc.txtSecondary} borderColor={tc.borderError} className="p-2 rounded border-2"/>

                    <ColorSwatch label="bgWarning" colorValue={tc.bgWarning} bgColor={tc.bgWarning} textColor={tc.txtOnWarning} />
                    <ColorSwatch label="txtWarningStrong" colorValue={tc.txtWarningStrong} bgColor={tc.bgSurface} textColor={tc.txtWarningStrong} isDark={isDark}/>
                    <ColorSwatch label="bgWarningMuted" colorValue={tc.bgWarningMuted} bgColor={tc.bgWarningMuted} textColor={tc.txtWarningStrong} borderColor={tc.borderWarning} />
                    <ColorSwatch label="borderWarning" colorValue={tc.borderWarning} bgColor={tc.bgSurface} textColor={tc.txtSecondary} borderColor={tc.borderWarning} className="p-2 rounded border-2"/>

                    <ColorSwatch label="bgInfo" colorValue={tc.bgInfo} bgColor={tc.bgInfo} textColor={tc.txtOnInfo} />
                    <ColorSwatch label="txtInfoStrong" colorValue={tc.txtInfoStrong} bgColor={tc.bgSurface} textColor={tc.txtInfoStrong} isDark={isDark}/>
                    <ColorSwatch label="bgInfoMuted" colorValue={tc.bgInfoMuted} bgColor={tc.bgInfoMuted} textColor={tc.txtInfoStrong} borderColor={tc.borderInfo} />
                    <ColorSwatch label="borderInfo" colorValue={tc.borderInfo} bgColor={tc.bgSurface} textColor={tc.txtSecondary} borderColor={tc.borderInfo} className="p-2 rounded border-2"/>
                </div>
            </div>
        </div>
    );
};

const ThemeGenerator = () => {
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
        
        const code = getPowerAppsThemeCode(brandColor, grayBase, selectedFont, paletteName, paletteName);
        setGeneratedCode(code);
    }, [brandColor, grayBase, selectedFont, selectedPaletteName]);

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
                        <select 
                            id="predefinedPalette" 
                            value={basePalettes.findIndex(p => p.name === selectedPaletteName)}
                            onChange={(e) => handlePredefinedPaletteChange(Number(e.target.value))}
                            className="w-full p-2.5 rounded-md border border-neutral-gray-light dark:border-dark-border bg-neutral-gray-lighter dark:bg-neutral-gray-darker text-sm focus:outline-none focus:ring-1 focus:ring-primary-blue"
                        >
                            {basePalettes.map((p, i) => <option key={`base-${i}`} value={i}>{p.name}</option>)}
                             {selectedPaletteName === "Personalizado" && !basePalettes.find(p => p.brandColor === brandColor && p.grayBase === grayBase) && (
                                <option value={-1} disabled>Personalizado</option>
                             )}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="brandColor" className="block text-sm font-medium text-neutral-gray dark:text-dark-text-secondary mb-1">Brand Color: <span className="font-mono text-xs">{brandColor}</span></label>
                            <input 
                                type="color" 
                                id="brandColor" 
                                value={brandColor} 
                                onChange={(e) => setBrandColor(e.target.value)}
                                className="w-full h-10 p-1 rounded-md border border-neutral-gray-light dark:border-dark-border cursor-pointer"
                            />
                        </div>
                        <div>
                            <label htmlFor="grayBase" className="block text-sm font-medium text-neutral-gray dark:text-dark-text-secondary mb-1">Gray Scale Base: <span className="font-mono text-xs">{grayBase}</span></label>
                            <input 
                                type="color" 
                                id="grayBase" 
                                value={grayBase} 
                                onChange={(e) => setGrayBase(e.target.value)}
                                className="w-full h-10 p-1 rounded-md border border-neutral-gray-light dark:border-dark-border cursor-pointer"
                            />
                        </div>
                    </div>
                     <div className="mb-4">
                        <label htmlFor="fontFamily" className="block text-sm font-medium text-neutral-gray dark:text-dark-text-secondary mb-1">Fuente Principal</label>
                        <select 
                            id="fontFamily" 
                            value={selectedFont} 
                            onChange={(e) => setSelectedFont(e.target.value)}
                            className="w-full p-2.5 rounded-md border border-neutral-gray-light dark:border-dark-border bg-neutral-gray-lighter dark:bg-neutral-gray-darker text-sm focus:outline-none focus:ring-1 focus:ring-primary-blue"
                        >
                            {fontFamilies.map((font) => <option key={font} value={font}>{font}</option>)}
                        </select>
                    </div>

                    <button
                        onClick={handleRandomPalette}
                        className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-md transition-colors mb-6 text-sm"
                    >
                        <Shuffle size={18} className="mr-2" /> Tema Aleatorio (Colores)
                    </button>

                    <h3 className="text-lg font-medium text-neutral-gray-dark dark:text-dark-text-primary mb-2">Código <code className="text-sm bg-neutral-gray-lighter dark:bg-neutral-gray-darker p-1 rounded">App.OnStart</code></h3>
                     <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md mb-3 text-xs text-blue-700 dark:text-blue-300">
                        <Info size={16} className="inline mr-1 mb-0.5 flex-shrink-0" />
                        <span>
                        Copia y pega el siguiente código en la propiedad <code className="font-semibold">App.OnStart</code> de tu Power App. Define una variable global booleana <code className="font-semibold">gblIsDarkMode</code> para alternar. Usa <code className="font-semibold">gblTheme.nombreVariable</code> (ej. <code className="font-semibold">gblTheme.txtPrimary</code>, <code className="font-semibold">gblTheme.FontFamily</code>) para aplicar el tema. Revisa la sección "Variables de Tema Disponibles" en el código generado.
                        </span>
                    </div>
                </div>
                <div className="relative flex-grow min-h-[250px] lg:min-h-0">
                   <CodeBlock codeString={generatedCode} language="powerfx" />
                   <button
                       onClick={copyToClipboard}
                       className="absolute top-2 right-2 p-1.5 rounded-md bg-white/80 dark:bg-black/80 hover:bg-white dark:hover:bg-black text-neutral-gray dark:text-dark-text-secondary focus:outline-none focus:ring-1 focus:ring-primary-blue"
                       title="Copiar Código"
                   >
                       {copied ? <Check size={16} className="text-green-500" /> : <Clipboard size={16} />}
                   </button>
                </div>
            </div>

            <div className="w-full lg:flex-1 overflow-y-auto h-auto lg:h-[calc(100vh-4rem)] p-4 sm:p-6" style={{backgroundColor: currentThemeForPreview.bgSecondary }}>
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-medium" style={{color: currentThemeForPreview.txtPrimary}}>Vista Previa del Tema</h3>
                    <div className="flex items-center space-x-1 bg-white dark:bg-dark-surface p-1 rounded-full shadow-md">
                       <button 
                           onClick={() => setIsPreviewDark(false)}
                           className={`p-2 rounded-full transition-colors ${!isPreviewDark ? 'bg-primary-blue text-white shadow-sm' : 'text-neutral-gray dark:text-dark-text-secondary hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-darker'}`}
                           title="Ver Tema Claro"
                        >
                           <Sun size={18} />
                       </button>
                       <button 
                           onClick={() => setIsPreviewDark(true)}
                           className={`p-2 rounded-full transition-colors ${isPreviewDark ? 'bg-primary-blue text-white shadow-sm' : 'text-neutral-gray dark:text-dark-text-secondary hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-darker'}`}
                           title="Ver Tema Oscuro"
                        >
                           <Moon size={18} />
                       </button>
                    </div>
                </div>
                <div className="p-4 sm:p-6 rounded-lg" style={{backgroundColor: currentThemeForPreview.bgPrimary, border: `1px solid ${currentThemeForPreview.borderDefault}`, fontFamily: selectedFont}}>
                    <KeyPalettesPreview brandColor={brandColor} grayBase={grayBase} isDark={isPreviewDark} selectedFont={selectedFont} />
                    <TypographyPreview themeColors={currentThemeForPreview} isDark={isPreviewDark} selectedFont={selectedFont}/>
                    <UIComponentsPreview themeColors={currentThemeForPreview} isDark={isPreviewDark} selectedFont={selectedFont}/>
                </div>
            </div>
        </div>
    );
};

export default ThemeGenerator;