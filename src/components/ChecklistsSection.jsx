import React, { useState, useEffect } from 'react';
// Importar checklistsData desde su nuevo archivo
import { checklistsData } from '../data/checklists'; 
import { ChevronDown, ChevronRight, CheckSquare, Square, AlertTriangle, Info } from 'lucide-react';

const ChecklistItemRow = ({ item, level = 0 }) => {
  const [isChecked, setIsChecked] = useState(item.defaultChecked || false);
  const storageKey = `checklistItem_${item.id}`;

  useEffect(() => {
    const savedState = localStorage.getItem(storageKey);
    if (savedState !== null) {
      setIsChecked(JSON.parse(savedState));
    }
  }, [storageKey]);

  const handleToggleCheck = () => {
    setIsChecked(prevState => {
      const newState = !prevState;
      localStorage.setItem(storageKey, JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <div 
      className={`py-2 px-3 flex items-start hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-darker rounded-md transition-colors duration-150`}
      style={{ marginLeft: `${level * 20}px` }}
    >
      <button 
        onClick={handleToggleCheck} 
        className="mr-3 mt-1 focus:outline-none flex-shrink-0"
        aria-label={isChecked ? "Desmarcar ítem" : "Marcar ítem"}
      >
        {isChecked ? (
          <CheckSquare size={20} className="text-green-500 dark:text-green-400" />
        ) : (
          <Square size={20} className="text-neutral-gray-light dark:text-dark-text-secondary" />
        )}
      </button>
      <div className="flex-grow">
        <span className={`text-sm ${isChecked ? 'line-through text-neutral-gray-light dark:text-dark-text-secondary' : 'text-neutral-gray-dark dark:text-dark-text-primary'}`}>
          {item.text}
        </span>
        {item.details && (
          <p className={`text-xs mt-0.5 ${isChecked ? 'text-neutral-gray-light dark:text-dark-text-secondary' : 'text-neutral-gray dark:text-dark-text-secondary'}`}>
            {item.details}
          </p>
        )}
        {item.tip && (
           <div className="mt-1 flex items-start text-xs text-blue-600 dark:text-blue-400">
             <Info size={14} className="mr-1.5 mt-0.5 flex-shrink-0" /> 
             <span>{item.tip}</span>
           </div>
        )}
         {item.warning && (
           <div className="mt-1 flex items-start text-xs text-yellow-600 dark:text-yellow-500">
             <AlertTriangle size={14} className="mr-1.5 mt-0.5 flex-shrink-0" /> 
             <span>{item.warning}</span>
           </div>
        )}
      </div>
    </div>
  );
};

const ChecklistGroup = ({ checklist }) => {
  const [isExpanded, setIsExpanded] = useState(checklist.defaultExpanded || false);

  const renderChecklistItems = (items, level = 0) => {
    return items.map(item => (
      <React.Fragment key={item.id}>
        <ChecklistItemRow item={item} level={level} />
        {item.subItems && item.subItems.length > 0 && (
          renderChecklistItems(item.subItems, level + 1)
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="bg-white dark:bg-dark-surface p-4 sm:p-6 rounded-lg shadow-md mb-6">
      <button
        className="w-full flex justify-between items-center text-left text-xl font-semibold text-primary-blue dark:text-primary-blue-light mb-3 focus:outline-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{checklist.title}</span>
        {isExpanded ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
      </button>

      {isExpanded && (
        <div className="space-y-1">
          {checklist.description && <p className="text-sm text-neutral-gray dark:text-dark-text-secondary mb-4">{checklist.description}</p>}
          {renderChecklistItems(checklist.items)}
        </div>
      )}
    </div>
  );
};

const ChecklistsSection = () => {
  if (!checklistsData || checklistsData.length === 0) {
    return <div className="p-4 sm:p-6 lg:p-8 text-lg text-center text-neutral-gray dark:text-dark-text-secondary">No hay checklists disponibles.</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-gray-dark dark:text-dark-text-primary mb-8 text-center">
        Checklists para Desarrollo en Power Apps
      </h2>
      <div className="max-w-3xl mx-auto">
        {checklistsData.map(checklist => (
          <ChecklistGroup key={checklist.id} checklist={checklist} />
        ))}
      </div>
    </div>
  );
};

export default ChecklistsSection;