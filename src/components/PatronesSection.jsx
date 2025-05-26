import React, { useState } from 'react';
// Importar patronesData desde su nuevo archivo
import { patronesData } from '../data/patrones'; 
import CodeBlock from './CodeBlock';
import { ChevronDown, ChevronRight, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

const PatronItem = ({ patron }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-dark-surface p-4 sm:p-6 rounded-lg shadow-md mb-6">
      <button
        className="w-full flex justify-between items-center text-left text-xl font-semibold text-primary-blue dark:text-primary-blue-light mb-2 focus:outline-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{patron.name}</span>
        {isExpanded ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
      </button>

      {isExpanded && (
        <div className="space-y-4 mt-3">
          <p className="text-neutral-gray dark:text-dark-text-secondary leading-relaxed italic">{patron.problem}</p>
          
          <div>
            <h4 className="text-lg font-medium text-neutral-gray-dark dark:text-dark-text-primary mb-1">Descripción y Solución:</h4>
            <p className="text-neutral-gray dark:text-dark-text-secondary leading-relaxed whitespace-pre-line">{patron.solution}</p>
          </div>
          
          {patron.useCases && patron.useCases.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-neutral-gray-dark dark:text-dark-text-primary mb-1">Casos de Uso Comunes:</h4>
              <ul className="list-disc list-inside text-neutral-gray dark:text-dark-text-secondary space-y-1 pl-4">
                {patron.useCases.map((uc, index) => <li key={index}>{uc}</li>)}
              </ul>
            </div>
          )}

          {patron.implementationSteps && patron.implementationSteps.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-neutral-gray-dark dark:text-dark-text-primary mb-2">Pasos de Implementación:</h4>
              {patron.implementationSteps.map((step, index) => (
                <div key={index} className="mb-3 pl-2 border-l-2 border-neutral-gray-lighter dark:border-dark-border">
                  <p className="font-semibold text-neutral-gray dark:text-dark-text-primary">{index + 1}. {step.title}</p>
                  {step.details && <p className="text-sm text-neutral-gray dark:text-dark-text-secondary mt-1 mb-2 whitespace-pre-line">{step.details}</p>}
                  {step.code && <CodeBlock codeString={step.code} language={step.language || 'powerfx'} />}
                </div>
              ))}
            </div>
          )}

          {patron.benefits && patron.benefits.length > 0 && (
             <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-md border-l-4 border-green-400 dark:border-green-500">
              <div className="flex items-start">
                <CheckCircle size={20} className="text-green-500 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-700 dark:text-green-300 mb-1">Beneficios:</h4>
                  <ul className="list-disc list-inside text-sm text-green-600 dark:text-green-200 space-y-1">
                    {patron.benefits.map((benefit, index) => <li key={index}>{benefit}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {patron.considerations && patron.considerations.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-md border-l-4 border-yellow-400 dark:border-yellow-500">
               <div className="flex items-start">
                <AlertTriangle size={20} className="text-yellow-500 dark:text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-700 dark:text-yellow-300 mb-1">Consideraciones Importantes:</h4>
                  <ul className="list-disc list-inside text-sm text-yellow-600 dark:text-yellow-200 space-y-1">
                    {patron.considerations.map((con, index) => <li key={index}>{con}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {patron.relatedFunctions && patron.relatedFunctions.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md border-l-4 border-blue-400 dark:border-blue-500">
              <div className="flex items-start">
                <Zap size={20} className="text-blue-500 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-1">Funciones Power Fx Relacionadas:</h4>
                  <p className="text-sm text-blue-600 dark:text-blue-200">
                    {patron.relatedFunctions.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

const PatronesSection = () => {
  if (!patronesData || patronesData.length === 0) {
    return <div className="p-4 sm:p-6 lg:p-8 text-lg text-center text-neutral-gray dark:text-dark-text-secondary">No hay patrones disponibles.</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-gray-dark dark:text-dark-text-primary mb-8 text-center">
        Patrones Comunes en Power Apps
      </h2>
      <div className="max-w-4xl mx-auto">
        {patronesData.map(patron => (
          <PatronItem key={patron.id} patron={patron} />
        ))}
      </div>
    </div>
  );
};

export default PatronesSection;
