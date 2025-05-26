import React from 'react';
import { Zap, ListChecks, Puzzle, FileText, Star, Settings, Code2, BookOpen, X, ChevronsLeft, ChevronsRight, Palette } from 'lucide-react'; // Añadido Palette

const Sidebar = ({ 
    activeSection, 
    setActiveSection, 
    isSidebarOpen, 
    toggleSidebarOverlay,
    isCollapsed,
    toggleCollapse 
}) => {
  const navItems = [
    { id: 'powerfx', name: 'Funciones Power Fx', icon: Zap },
    { id: 'variables', name: 'Guía de Variables', icon: BookOpen },
    { id: 'snippets', name: 'Mis Snippets', icon: Code2 },
    { id: 'patterns', name: 'Patrones', icon: Puzzle },
    { id: 'themes', name: 'Generador de Temas', icon: Palette }, // <-- Nueva Sección
    { id: 'checklists', name: 'Checklists', icon: ListChecks },
    { id: 'favorites', name: 'Favoritos', icon: Star },
    { id: 'settings', name: 'Configuración', icon: Settings },
  ];

  const baseAsideClasses = "fixed top-0 left-0 h-screen bg-white dark:bg-dark-surface shadow-sidebar flex flex-col z-40 transition-all duration-300 ease-in-out pt-5";
  const mobileOverlayClasses = isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-64";
  const desktopBehaviorClasses = `lg:translate-x-0 ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}`;

  return (
    <aside
      className={`${baseAsideClasses} ${mobileOverlayClasses} ${desktopBehaviorClasses}`}
    >
      <div className={`flex items-center mb-8 ${isCollapsed ? 'justify-center px-1 flex-col space-y-2' : 'justify-between px-6'}`}>
        <div className={`flex items-center ${isCollapsed ? 'flex-col' : 'space-x-2'}`}>
          <img 
            src="/Icon_power-helper-app.png" 
            alt="Power Helper Icon" 
            className={`${isCollapsed ? 'w-10 h-10' : 'w-8 h-8'} transition-all duration-300`}
            onError={(e) => { e.target.style.display = 'none'; console.error("Error loading app icon"); }}
          />
          {!isCollapsed && (
            <h1 className="text-2xl font-bold text-primary-blue dark:text-primary-blue-light truncate">
              Power Helper
            </h1>
          )}
        </div>
        {isSidebarOpen && !isCollapsed && (
             <button
                onClick={toggleSidebarOverlay}
                className="lg:hidden p-1 rounded-md text-neutral-gray dark:text-dark-text-secondary hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-darker"
                aria-label="Cerrar menú"
            >
                <X size={24} />
            </button>
        )}
      </div>

      <nav className="flex-grow overflow-y-auto overflow-x-hidden">
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className={`${isCollapsed ? 'px-2' : 'px-3'} mb-1`}>
              <button
                onClick={() => setActiveSection(item.id)}
                title={isCollapsed ? item.name : undefined}
                className={`w-full flex items-center space-x-3 py-3 rounded-md transition-all duration-150 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-opacity-50
                  ${isCollapsed ? 'justify-center px-2' : 'px-3'}
                  ${activeSection === item.id
                    ? `bg-primary-blue text-white dark:bg-primary-blue-light dark:text-neutral-gray-darker ${!isCollapsed ? 'shadow-md scale-105' : ''}`
                    : 'text-neutral-gray dark:text-dark-text-secondary hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-darker hover:text-primary-blue dark:hover:text-primary-blue-light'
                  }`}
              >
                <item.icon size={isCollapsed ? 24 : 20} />
                {!isCollapsed && <span>{item.name}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className={`p-3 border-t border-neutral-gray-light dark:border-dark-border mt-auto ${isCollapsed ? 'flex justify-center' : 'flex justify-between items-center'}`}>
        {!isCollapsed && (
            <p className="text-xs text-neutral-gray-light dark:text-dark-text-secondary truncate">
            &copy; {new Date().getFullYear()} PH
            </p>
        )}
        <button 
            onClick={toggleCollapse}
            className="hidden lg:block p-2 rounded-md hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-darker text-neutral-gray dark:text-dark-text-secondary focus:outline-none"
            title={isCollapsed ? "Expandir menú" : "Colapsar menú"}
        >
            {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;