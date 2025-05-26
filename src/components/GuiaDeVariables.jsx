import React, { useState } from 'react';
// Importar variablesData desde su nuevo archivo
import { variablesData } from '../data/variables'; 
import CodeBlock from './CodeBlock';
import { ChevronDown, ChevronRight, Info, AlertTriangle } from 'lucide-react';

const VariableItem = ({ variable }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-dark-surface p-4 sm:p-6 rounded-lg shadow-md mb-6">
      <button
        className="w-full flex justify-between items-center text-left text-xl font-semibold text-primary-blue dark:text-primary-blue-light mb-2 focus:outline-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{variable.name}</span>
        {isExpanded ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
      </button>

      {isExpanded && (
        <div className="space-y-4 mt-3">
          <p className="text-neutral-gray dark:text-dark-text-secondary leading-relaxed">{variable.description}</p>
          
          {variable.scope && (
            <div className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md border-l-4 border-blue-400 dark:border-blue-500">
              <Info size={20} className="text-blue-500 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-700 dark:text-blue-300">Ámbito (Scope):</h4>
                <p className="text-sm text-blue-600 dark:text-blue-200">{variable.scope}</p>
              </div>
            </div>
          )}

          <div>
            <h4 className="text-lg font-medium text-neutral-gray-dark dark:text-dark-text-primary mb-1">Sintaxis Clave:</h4>
            {variable.syntax.map((syn, index) => (
              <div key={index} className="mb-2">
                <p className="text-sm font-semibold text-neutral-gray dark:text-dark-text-secondary">{syn.operation}:</p>
                <CodeBlock codeString={syn.code} language="powerfx" />
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-lg font-medium text-neutral-gray-dark dark:text-dark-text-primary mb-1">Ejemplos Prácticos:</h4>
            {variable.examples.map((ex, index) => (
              <div key={index} className="mb-4 p-3 bg-neutral-gray-lighter dark:bg-neutral-gray-darker rounded-md">
                <p className="text-sm font-semibold text-neutral-gray dark:text-dark-text-secondary mb-1">{ex.title}</p>
                {ex.explanation && <p className="text-xs italic text-neutral-gray dark:text-dark-text-secondary mb-1">{ex.explanation}</p>}
                <CodeBlock codeString={ex.code} language="powerfx" />
              </div>
            ))}
          </div>

          {variable.bestPractices && variable.bestPractices.length > 0 && (
             <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-md border-l-4 border-green-400 dark:border-green-500">
              <h4 className="font-medium text-green-700 dark:text-green-300 mb-1">Mejores Prácticas:</h4>
              <ul className="list-disc list-inside text-sm text-green-600 dark:text-green-200 space-y-1">
                {variable.bestPractices.map((bp, index) => <li key={index}>{bp}</li>)}
              </ul>
            </div>
          )}

          {variable.commonPitfalls && variable.commonPitfalls.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 rounded-md border-l-4 border-red-400 dark:border-red-500">
               <div className="flex items-start">
                <AlertTriangle size={20} className="text-red-500 dark:text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-700 dark:text-red-300 mb-1">Errores Comunes / Consideraciones:</h4>
                  <ul className="list-disc list-inside text-sm text-red-600 dark:text-red-200 space-y-1">
                    {variable.commonPitfalls.map((cp, index) => <li key={index}>{cp}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const GuiaDeVariables = () => {
  if (!variablesData || variablesData.length === 0) {
    return <div className="p-4 sm:p-6 lg:p-8 text-lg text-center text-neutral-gray dark:text-dark-text-secondary">No hay datos de variables disponibles.</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-gray-dark dark:text-dark-text-primary mb-8 text-center">
        Guía de Variables en Power Apps
      </h2>
      <div className="max-w-4xl mx-auto">
        {variablesData.map(variable => (
          <VariableItem key={variable.id} variable={variable} />
        ))}
      </div>
    </div>
  );
};

export default GuiaDeVariables;