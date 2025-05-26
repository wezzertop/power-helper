import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext'; // Para el toggle de tema si lo incluimos
import { Sun, Moon, Trash2, AlertTriangle } from 'lucide-react';

// Props que necesitaríamos de App.jsx si queremos resetear estados globales
// Por ahora, nos enfocaremos en localStorage y el tema.
const SettingsSection = ({ onResetFavorites, onResetChecklistStates }) => {
  const { theme, toggleTheme } = useTheme();
  const [showConfirmFavorites, setShowConfirmFavorites] = useState(false);
  const [showConfirmChecklists, setShowConfirmChecklists] = useState(false);

  const handleResetFavorites = () => {
    // Lógica para limpiar localStorage de favoritos
    localStorage.removeItem('favoriteFunctionIds');
    // Si se pasa una función para resetear el estado en App.jsx, llamarla
    if (onResetFavorites) {
      onResetFavorites(); 
    }
    setShowConfirmFavorites(false);
    // Podríamos añadir una notificación de éxito aquí
    alert("Favoritos reseteados. Refresca la página para ver los cambios si el estado no se actualiza dinámicamente desde App.jsx.");
  };

  const handleResetChecklists = () => {
    // Lógica para limpiar localStorage de estados de checklists
    // Esto es un poco más complejo porque cada item tiene su propia clave.
    // Necesitaríamos iterar sobre las claves conocidas o usar un prefijo.
    // Por simplicidad, si todos los items de checklist usan un prefijo común:
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('checklistItem_')) {
        localStorage.removeItem(key);
      }
    });
    if (onResetChecklistStates) {
        onResetChecklistStates(); // Si hay una función para resetear estado en App.jsx
    }
    setShowConfirmChecklists(false);
    alert("Estados de checklists reseteados. Los cambios se verán al recargar la sección o la página.");
  };
  
  // Componente de Modal de Confirmación Genérico
  const ConfirmationModal = ({ title, message, onConfirm, onCancel, show }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-xl max-w-sm w-full">
          <div className="flex items-center mb-4">
            <AlertTriangle size={24} className="text-red-500 mr-3" />
            <h3 className="text-lg font-semibold text-neutral-gray-dark dark:text-dark-text-primary">{title}</h3>
          </div>
          <p className="text-sm text-neutral-gray dark:text-dark-text-secondary mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm rounded-md bg-neutral-gray-light hover:bg-neutral-gray text-neutral-gray-darker dark:bg-dark-border dark:hover:bg-neutral-gray-dark transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors"
            >
              Confirmar Borrado
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-gray-dark dark:text-dark-text-primary mb-8 text-center">
        Configuración de Power Helper
      </h2>
      
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Sección de Tema */}
        <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-primary-blue dark:text-primary-blue-light mb-4">Tema de la Aplicación</h3>
          <div className="flex items-center justify-between">
            <span className="text-neutral-gray dark:text-dark-text-secondary">Modo Oscuro</span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-darker focus:outline-none focus:ring-2 focus:ring-primary-blue"
              aria-label={theme === 'dark' ? "Activar modo claro" : "Activar modo oscuro"}
            >
              {theme === 'dark' ? (
                <Sun size={22} className="text-yellow-400" />
              ) : (
                <Moon size={22} className="text-neutral-gray-dark" />
              )}
            </button>
          </div>
          <p className="text-xs text-neutral-gray-light dark:text-dark-text-secondary mt-2">
            Selecciona tu preferencia visual para la interfaz.
          </p>
        </div>

        {/* Sección de Datos Locales */}
        <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-primary-blue dark:text-primary-blue-light mb-4">Gestión de Datos Locales</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-neutral-gray dark:text-dark-text-secondary">Resetear Funciones Favoritas</p>
                <button 
                  onClick={() => setShowConfirmFavorites(true)}
                  className="flex items-center text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
                >
                  <Trash2 size={16} className="mr-2" /> Resetear
                </button>
              </div>
              <p className="text-xs text-neutral-gray-light dark:text-dark-text-secondary mt-1">
                Esto eliminará todas las funciones que hayas marcado como favoritas. Esta acción no se puede deshacer.
              </p>
            </div>
            
            <div>
              <div className="flex items-center justify-between">
                <p className="text-neutral-gray dark:text-dark-text-secondary">Resetear Estados de Checklists</p>
                <button 
                  onClick={() => setShowConfirmChecklists(true)}
                  className="flex items-center text-sm bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
                >
                  <Trash2 size={16} className="mr-2" /> Resetear
                </button>
              </div>
              <p className="text-xs text-neutral-gray-light dark:text-dark-text-secondary mt-1">
                Esto desmarcará todos los ítems en todas las checklists. Esta acción no se puede deshacer.
              </p>
            </div>
          </div>
        </div>
        
        {/* Sección Futura para Supabase */}
        <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-md opacity-60">
          <h3 className="text-xl font-medium text-primary-blue dark:text-primary-blue-light mb-4">Sincronización con la Nube (Próximamente)</h3>
           <p className="text-sm text-neutral-gray dark:text-dark-text-secondary">
            Aquí podrás gestionar tu cuenta y la sincronización de tus snippets y configuraciones con Supabase.
          </p>
        </div>

      </div>

      {/* Modales de Confirmación */}
      <ConfirmationModal
        show={showConfirmFavorites}
        title="Confirmar Reseteo de Favoritos"
        message="¿Estás seguro de que quieres eliminar todas tus funciones favoritas? Esta acción no se puede deshacer."
        onConfirm={handleResetFavorites}
        onCancel={() => setShowConfirmFavorites(false)}
      />
      <ConfirmationModal
        show={showConfirmChecklists}
        title="Confirmar Reseteo de Checklists"
        message="¿Estás seguro de que quieres resetear el estado de todos los ítems de las checklists? Esta acción no se puede deshacer."
        onConfirm={handleResetChecklists}
        onCancel={() => setShowConfirmChecklists(false)}
      />

    </div>
  );
};

export default SettingsSection;