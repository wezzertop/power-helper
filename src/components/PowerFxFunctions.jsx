// src/components/PowerFxFunctions.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { powerFxFunctions as defaultFunctions } from '../data/functions'; // Renombrar para evitar conflicto
import CodeBlock from './CodeBlock';
import {
    AlertTriangle, Info, Search, Star,
    ChevronDown, ChevronRight, Database, Table, SearchCode,
    Sigma, Brain, Pilcrow, CalendarDays,
    Percent, Repeat, Users, Navigation, MousePointer,
    Variable, Palette, FileText, Zap,
    PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, Columns
} from 'lucide-react';

const categoryIcons = {
  'Modificación de Datos': Database,
  'Manipulación de Tablas': Table,
  'Búsqueda de Datos': SearchCode,
  'Agregación': Sigma,
  'Lógica': Brain,
  'Lógica y Errores': AlertTriangle,
  'Texto': Pilcrow,
  'Fechas y Horas': CalendarDays,
  'Matemáticas': Percent,
  'Generación de Tablas': Repeat,
  'Contexto': Users,
  'Navegación y Comportamiento': Navigation,
  'Comportamiento': MousePointer,
  'Variables': Variable,
  'Información de Datos': FileText,
  'Color y UI': Palette,
  'Default': Zap
};

const FunctionDetails = ({ func }) => {
  if (!func) {
    return <div className="p-6 text-center text-neutral-gray dark:text-dark-text-secondary">Selecciona una función de la lista para ver sus detalles.</div>;
  }
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex justify-between items-start">
        <h2 className="text-3xl font-semibold text-neutral-gray-dark dark:text-dark-text-primary">
          {func.name}
        </h2>
      </div>
      <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow">
        <h3 className="text-xl font-medium text-primary-blue dark:text-primary-blue-light mb-2">Descripción</h3>
        <p className="text-neutral-gray dark:text-dark-text-secondary leading-relaxed">
          {func.description}
        </p>
      </div>
      <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow">
        <h3 className="text-xl font-medium text-primary-blue dark:text-primary-blue-light mb-2">Sintaxis</h3>
        <pre className="bg-neutral-gray-lighter dark:bg-neutral-gray-darker p-4 rounded-md text-sm font-mono text-neutral-gray-dark dark:text-dark-text-primary overflow-x-auto">
          <code>{func.syntax}</code>
        </pre>
      </div>
      {func.delegationNotes && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 dark:border-yellow-500 p-4 rounded-md shadow">
          <div className="flex items-start">
            <AlertTriangle size={20} className="text-yellow-500 dark:text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-md font-semibold text-yellow-700 dark:text-yellow-300 mb-1">Notas de Delegación</h4>
              <p className="text-sm text-yellow-600 dark:text-yellow-200">
                {func.delegationNotes}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow">
        <h3 className="text-xl font-medium text-primary-blue dark:text-primary-blue-light mb-3">Ejemplos</h3>
        {func.examples.map((example, index) => (
          <div key={index} className="mb-6 last:mb-0">
            <h4 className="text-lg font-normal text-neutral-gray-dark dark:text-dark-text-primary mb-1">{example.title}</h4>
            {example.explanation && (
                 <p className="text-sm text-neutral-gray dark:text-dark-text-secondary mb-2 italic">{example.explanation}</p>
            )}
            <CodeBlock codeString={example.code} language="powerfx" />
          </div>
        ))}
      </div>
      {func.relatedFunctions && func.relatedFunctions.length > 0 && (
         <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 dark:border-blue-500 p-4 rounded-md shadow">
          <div className="flex items-start">
            <Info size={20} className="text-blue-500 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-md font-semibold text-blue-700 dark:text-blue-300 mb-1">Funciones Relacionadas</h4>
              <p className="text-sm text-blue-600 dark:text-blue-200">
                {func.relatedFunctions.join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// MODIFICACIÓN: Añadida la prop searchTerm
const PowerFxFunctions = ({ favoriteFunctionIds, onToggleFavorite, functionsList, listTitle = "Funciones Fx", initialSelectedId = null, searchTerm = '' }) => {
  // MODIFICACIÓN: El estado local de searchTerm se elimina, se usa la prop.
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isListPanelOpen, setIsListPanelOpen] = useState(true);
  const [isDetailsPanelOpen, setIsDetailsPanelOpen] = useState(true);

  // Usar functionsList si se provee (para favoritos), sino usar la lista por defecto.
  const availableFunctions = functionsList || defaultFunctions;

  const [selectedFunctionId, setSelectedFunctionId] = useState(() => {
    if (initialSelectedId && availableFunctions.some(f => f.id === initialSelectedId)) {
      return initialSelectedId;
    }
    // Si no hay initialSelectedId o no es válido, intenta seleccionar el primero de la lista disponible.
    return availableFunctions.length > 0 ? availableFunctions[0].id : null;
  });
  
  // Asegurar que selectedFunctionId sea válido cuando availableFunctions cambie (ej. al cambiar de lista principal a favoritos)
  useEffect(() => {
    if (availableFunctions.length > 0) {
        if (!availableFunctions.some(func => func.id === selectedFunctionId)) {
            // Si el ID seleccionado actual no está en la nueva lista, selecciona el primero de la nueva lista
            setSelectedFunctionId(availableFunctions[0].id);
        }
        // Si el ID seleccionado actual SÍ está en la nueva lista, no hagas nada para mantener la selección.
    } else {
        // Si la nueva lista está vacía, no hay nada que seleccionar.
        setSelectedFunctionId(null);
    }
  }, [availableFunctions, selectedFunctionId]); // No incluir initialSelectedId aquí para evitar reseteos no deseados

  // MODIFICACIÓN: El filtrado ahora usa la prop searchTerm
  const filteredFunctions = useMemo(() =>
    availableFunctions.filter(func =>
      func.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (func.description && func.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (func.category && func.category.toLowerCase().includes(searchTerm.toLowerCase()))
  ), [availableFunctions, searchTerm]);

  const groupedFunctions = useMemo(() => {
    return filteredFunctions.reduce((acc, func) => {
      const category = func.category || 'Sin Categoría';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(func);
      return acc;
    }, {});
  }, [filteredFunctions]);

  useEffect(() => {
    if (searchTerm) {
      const newExpandedState = {};
      Object.keys(groupedFunctions).forEach(catName => {
        newExpandedState[catName] = groupedFunctions[catName]?.length > 0;
      });
      setExpandedCategories(newExpandedState);
    } else if (listTitle === "Mis Funciones Favoritas") {
      const allFavoriteCategories = {};
      Object.keys(groupedFunctions).forEach(category => {
        allFavoriteCategories[category] = true;
      });
      setExpandedCategories(allFavoriteCategories);
    }
  }, [searchTerm, groupedFunctions, listTitle]);


  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const toggleListPanel = () => {
    const newListPanelOpenState = !isListPanelOpen;
    setIsListPanelOpen(newListPanelOpenState);
    if (!newListPanelOpenState && !isDetailsPanelOpen) {
      setIsDetailsPanelOpen(true);
    }
  };
  const toggleDetailsPanel = () => {
    const newDetailsPanelOpenState = !isDetailsPanelOpen;
    setIsDetailsPanelOpen(newDetailsPanelOpenState);
    if (!newDetailsPanelOpenState && !isListPanelOpen) {
      setIsListPanelOpen(true);
    }
  };

  const selectedFunction = availableFunctions.find(func => func.id === selectedFunctionId);

  let listPanelContainerClasses = "transition-all duration-300 ease-in-out flex flex-col h-[calc(100vh-4rem)] bg-white dark:bg-dark-surface relative";
  let detailsPanelContainerClasses = "transition-all duration-300 ease-in-out flex flex-col h-[calc(100vh-4rem)] bg-white dark:bg-dark-surface relative";

  if (isListPanelOpen && isDetailsPanelOpen) {
    listPanelContainerClasses += " w-full md:w-1/3 md:min-w-[280px] md:max-w-[400px] border-r border-neutral-gray-light dark:border-dark-border";
    detailsPanelContainerClasses += " flex-1";
  } else if (isListPanelOpen && !isDetailsPanelOpen) {
    listPanelContainerClasses += " w-full md:w-1/3 md:min-w-[280px] md:max-w-[400px]";
    detailsPanelContainerClasses += " w-16 flex-shrink-0 border-l dark:border-dark-border";
  } else if (!isListPanelOpen && isDetailsPanelOpen) {
    listPanelContainerClasses += " w-16 flex-shrink-0 border-r dark:border-dark-border";
    detailsPanelContainerClasses += " flex-1";
  } else {
    listPanelContainerClasses += " w-full md:w-1/3 md:min-w-[280px] md:max-w-[400px] border-r border-neutral-gray-light dark:border-dark-border";
    detailsPanelContainerClasses += " flex-1";
    if (!isListPanelOpen) setIsListPanelOpen(true);
    if (!isDetailsPanelOpen) setIsDetailsPanelOpen(true);
  }

  return (
    <div className="flex h-full">
      <div className={listPanelContainerClasses}>
        {isListPanelOpen ? (
          <>
            <div className="p-4 border-b border-neutral-gray-light dark:border-dark-border sticky top-0 bg-white dark:bg-dark-surface z-20 flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-neutral-gray-dark dark:text-dark-text-primary flex-grow truncate pr-2">{listTitle}</h3>
                <button
                  onClick={toggleListPanel}
                  className="p-1.5 rounded-md hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-darker text-neutral-gray-dark dark:text-dark-text-primary focus:outline-none ml-2 flex-shrink-0"
                  title="Colapsar panel de lista"
                >
                  <PanelLeftClose size={20} />
                </button>
              </div>
              {/* El input de búsqueda se maneja globalmente desde el Header, no se necesita aquí */}
            </div>
            <ul className="flex-1 overflow-y-auto p-2 space-y-1">
              {Object.entries(groupedFunctions).length > 0 ? (
                Object.entries(groupedFunctions).sort(([catA], [catB]) => catA.localeCompare(catB)).map(([category, funcs]) => {
                  const IconComponent = categoryIcons[category] || categoryIcons['Default'];
                  return (
                    <li key={category}>
                      <button
                        onClick={() => toggleCategory(category)}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-darker text-neutral-gray-dark dark:text-dark-text-primary focus:outline-none"
                      >
                        <span className="flex items-center font-medium text-sm">
                          <IconComponent size={18} className="mr-2 text-primary-blue dark:text-primary-blue-light" />
                          {category} ({funcs.length})
                        </span>
                        {expandedCategories[category] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                      {expandedCategories[category] && (
                        <ul className="pl-4 mt-1 space-y-1 border-l border-neutral-gray-lighter dark:border-dark-border ml-2.5">
                          {funcs.map(func => (
                            <li key={func.id}>
                              <button
                                onClick={() => {setSelectedFunctionId(func.id); if(!isDetailsPanelOpen) setIsDetailsPanelOpen(true);}}
                                className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-100 text-xs flex justify-between items-center ${selectedFunctionId === func.id ? 'bg-primary-blue text-white dark:bg-primary-blue-light dark:text-neutral-gray-darker font-medium' : 'text-neutral-gray dark:text-dark-text-secondary hover:bg-neutral-gray-light dark:hover:bg-neutral-gray-darker/50'}`}
                              >
                                <span>{func.name}</span>
                                {favoriteFunctionIds && favoriteFunctionIds.includes(func.id) && (
                                  <Star size={14} className="fill-yellow-400 text-yellow-500 ml-2 flex-shrink-0" />
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })
              ) : (
                 <li className="px-3 py-2 text-sm text-neutral-gray-light dark:text-dark-text-secondary text-center">
                    {searchTerm ? "No se encontraron funciones." : (listTitle === "Mis Funciones Favoritas" ? "Aún no tienes funciones favoritas." : "No hay funciones para mostrar.")}
                 </li>
              )}
            </ul>
          </>
        ) : (
            <div className="flex items-center justify-center h-full w-full p-1">
                <button onClick={toggleListPanel} className="p-2 rounded-md hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-darker text-neutral-gray-dark dark:text-dark-text-primary focus:outline-none" title="Expandir panel de lista">
                    <Columns size={24} />
                </button>
            </div>
        )}
      </div>

      <div className={detailsPanelContainerClasses}>
        {isDetailsPanelOpen ? (
          <>
            <div className="p-4 border-b border-neutral-gray-light dark:border-dark-border sticky top-0 bg-white dark:bg-dark-surface z-20 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center flex-grow min-w-0">
                {selectedFunction && onToggleFavorite && ( // Asegurarse que onToggleFavorite exista (no en la lista de favoritos)
                    <button
                        onClick={() => onToggleFavorite(selectedFunction.id)}
                        className={`p-2 rounded-full hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-darker transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-blue mr-2 flex-shrink-0`}
                        aria-label={favoriteFunctionIds && favoriteFunctionIds.includes(selectedFunction.id) ? "Quitar de favoritos" : "Añadir a favoritos"}
                    >
                        <Star size={22} className={favoriteFunctionIds && favoriteFunctionIds.includes(selectedFunction.id) ? "fill-yellow-400 text-yellow-500" : "text-neutral-gray-light dark:text-dark-text-secondary"} />
                    </button>
                )}
                 <h3 className="text-lg font-semibold text-neutral-gray-dark dark:text-dark-text-primary truncate">
                    {selectedFunction ? `Detalles: ${selectedFunction.name}` : "Detalles de Función"}
                 </h3>
              </div>
              <button
                onClick={toggleDetailsPanel}
                className="p-1.5 rounded-md hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-darker text-neutral-gray-dark dark:text-dark-text-primary focus:outline-none ml-2 flex-shrink-0"
                title="Colapsar panel de detalles"
              >
                <PanelRightClose size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {selectedFunction ? (
                <FunctionDetails func={selectedFunction} />
              ) : (
                <div className="p-6 text-center text-neutral-gray dark:text-dark-text-secondary">
                  {!isListPanelOpen ? "Expande el panel de lista para seleccionar una función." : (filteredFunctions.length > 0 ? "Selecciona una función de la lista." : (searchTerm ? "No hay funciones que coincidan con tu búsqueda." : "No hay funciones disponibles en esta lista."))}
                </div>
              )}
            </div>
          </>
        ) : (
            <div className="flex items-center justify-center h-full w-full p-1">
                <button onClick={toggleDetailsPanel} className="p-2 rounded-md hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-darker text-neutral-gray-dark dark:text-dark-text-primary focus:outline-none" title="Expandir panel de detalles">
                    <PanelLeftOpen size={24} />
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default PowerFxFunctions;