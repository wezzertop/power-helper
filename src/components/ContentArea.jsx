// src/components/ContentArea.jsx
import React from 'react';
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
  setUserSnippets,
  loadingSnippets,
  searchTerm,
  powerFxSeparator,
  setPowerFxSeparator // Esta es la prop que viene de App.jsx
}) => {

  // La lógica de checklistStates y resetAllChecklistStates se mantiene aquí por ahora.
  // Considera moverla a App.jsx si necesitas un control más centralizado.
  const [checklistStates, setChecklistStates] = React.useState(() => {
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
            searchTerm={searchTerm}
            powerFxSeparator={powerFxSeparator}
          />
        );
      case 'variables':
        return <GuiaDeVariables powerFxSeparator={powerFxSeparator} />;
      case 'snippets':
        return <SnippetsSection
                  user={user}
                  userSnippets={userSnippets}
                  setUserSnippets={setUserSnippets}
                  loadingSnippets={loadingSnippets}
                  searchTerm={searchTerm}
                  powerFxSeparator={powerFxSeparator}
               />;
      case 'patterns':
        return <PatronesSection powerFxSeparator={powerFxSeparator} />;
      case 'themes':
        return <ThemeGenerator powerFxSeparator={powerFxSeparator} />;
      case 'checklists':
        return <ChecklistsSection />;
      case 'favorites':
        return (
          <PowerFxFunctions
            favoriteFunctionIds={favoriteFunctionIds}
            onToggleFavorite={onToggleFavoriteFunction}
            functionsList={favoriteFunctionsList}
            listTitle="Mis Funciones Favoritas"
            initialSelectedId={favoriteFunctionsList[0]?.id || null}
            searchTerm={searchTerm}
            powerFxSeparator={powerFxSeparator}
          />
        );
      case 'settings':
        return <SettingsSection
                  onResetFavorites={onResetFavorites}
                  onResetChecklistStates={resetAllChecklistStates}
                  powerFxSeparator={powerFxSeparator}
                  setPowerFxSeparator={setPowerFxSeparator} // Asegúrate de pasar la función correcta aquí
               />;
      default:
        return (
          <PowerFxFunctions
            favoriteFunctionIds={favoriteFunctionIds}
            onToggleFavorite={onToggleFavoriteFunction}
            listTitle="Funciones Fx"
            searchTerm={searchTerm}
            powerFxSeparator={powerFxSeparator}
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