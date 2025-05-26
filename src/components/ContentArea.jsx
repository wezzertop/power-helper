// src/components/ContentArea.jsx
import React from 'react'; // Eliminado useState, useEffect si no se usan directamente aquí para checklistStates
import PowerFxFunctions from './PowerFxFunctions';
import GuiaDeVariables from './GuiaDeVariables';
import SnippetsSection from './SnippetsSection';
import PatronesSection from './PatronesSection';
import ChecklistsSection from './ChecklistsSection';
import SettingsSection from './SettingsSection';
import ThemeGenerator from './ThemeGenerator';

const ContentArea = ({
  activeSection,
  favoriteFunctionIds,
  onToggleFavoriteFunction,
  favoriteFunctionsList,
  onResetFavorites,
  user,
  userSnippets,
  setUserSnippets, // Para que SnippetsSection pueda actualizar la lista
  loadingSnippets,
  searchTerm, // Nueva prop para el término de búsqueda
  // onResetChecklistStates (si se centraliza, vendría de App.jsx)
}) => {

  // La lógica de checklistStates y resetAllChecklistStates se puede mover a App.jsx
  // si se quiere un manejo más centralizado, o mantenerla aquí si SettingsSection
  // es el único lugar donde se resetean. Por simplicidad, la dejo aquí por ahora,
  // pero considera moverla a App.jsx para mayor consistencia si otros componentes la necesitan.
  const [checklistStates, setChecklistStates] = React.useState(() => { // Usar React.useState
    if (typeof window !== 'undefined') {
        const saved = {};
        try {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('checklistItem_')) {
                    saved[key] = localStorage.getItem(key) === 'true';
                }
            });
        } catch (error) {
            console.error("Error accessing localStorage for checklist states:", error);
        }
        return saved;
    }
    return {};
  });

  const resetAllChecklistStates = () => {
    if (typeof window !== 'undefined') {
        try {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('checklistItem_')) {
                    localStorage.removeItem(key);
                }
            });
            setChecklistStates({});
            alert("Estados de checklists reseteados. Los cambios se verán al recargar la sección o la página.");
        } catch (error) {
            console.error("Error resetting checklist states from localStorage:", error);
            alert("Error al resetear los estados de las checklists.");
        }
    }
  };


  const renderSection = () => {
    switch (activeSection) {
      case 'powerfx':
        return (
          <PowerFxFunctions
            favoriteFunctionIds={favoriteFunctionIds}
            onToggleFavorite={onToggleFavoriteFunction}
            listTitle="Funciones Fx"
            searchTerm={searchTerm} // Pasar searchTerm
          />
        );
      case 'variables':
        return <GuiaDeVariables />; // Búsqueda no implementada aquí aún
      case 'snippets':
        return <SnippetsSection 
                  user={user} 
                  userSnippets={userSnippets} 
                  setUserSnippets={setUserSnippets} 
                  loadingSnippets={loadingSnippets}
                  searchTerm={searchTerm} // Pasar searchTerm
               />;
      case 'patterns':
        return <PatronesSection />; // Búsqueda no implementada aquí aún
      case 'themes':
        return <ThemeGenerator />;
      case 'checklists':
        return <ChecklistsSection />; // Búsqueda no implementada aquí aún
      case 'favorites':
        return (
          <PowerFxFunctions
            favoriteFunctionIds={favoriteFunctionIds}
            onToggleFavorite={onToggleFavoriteFunction}
            functionsList={favoriteFunctionsList}
            listTitle="Mis Funciones Favoritas"
            initialSelectedId={favoriteFunctionsList[0]?.id || null}
            searchTerm={searchTerm} // Pasar searchTerm
          />
        );
      case 'settings':
        return <SettingsSection
                  onResetFavorites={onResetFavorites}
                  onResetChecklistStates={resetAllChecklistStates}
               />;
      default:
        return (
          <PowerFxFunctions
            favoriteFunctionIds={favoriteFunctionIds}
            onToggleFavorite={onToggleFavoriteFunction}
            listTitle="Funciones Fx"
            searchTerm={searchTerm} // Pasar searchTerm
          />
        );
    }
  };

  return (
    <main className="flex-1 bg-neutral-gray-lighter dark:bg-dark-bg pt-16 overflow-hidden">
      <div className="h-full overflow-y-auto">
        {renderSection()}
      </div>
    </main>
  );
};

export default ContentArea;