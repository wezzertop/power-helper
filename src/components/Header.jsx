// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react'; // Agregado useState, useEffect, useRef
import { Search, Menu, ChevronsRight, ChevronsLeft, LogOut, UserCircle } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import { supabase } from '../supabaseClient';

// MODIFICACIÓN: Añadida la prop onSearchChange
const Header = ({ onToggleSidebar, isSidebarCollapsed, user, onSearchChange }) => {
  const isMobileView = typeof window !== 'undefined' && window.innerWidth < 1024;
  const [searchTermInput, setSearchTermInput] = useState(''); // Estado local para el input de búsqueda
  // Nuevo estado para controlar la visibilidad del dropdown del usuario
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null); // Ref para el dropdown

  const handleLogout = async () => {
    setIsUserDropdownOpen(false); // Cerrar dropdown al hacer logout
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // MODIFICACIÓN: Manejador para el cambio en el input de búsqueda
  const handleSearchInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTermInput(newSearchTerm);
    if (onSearchChange) {
      onSearchChange(newSearchTerm); // Llama a la función pasada por App.jsx
    }
  };

  // Efecto para cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const MenuToggleButton = () => (
    <button
      onClick={onToggleSidebar}
      className="p-2 rounded-md text-neutral-gray dark:text-dark-text-primary hover:bg-neutral-gray-light dark:hover:bg-neutral-gray-dark focus:outline-none transition-colors duration-150"
      aria-label={isMobileView ? "Abrir menú lateral" : (isSidebarCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral")}
    >
      {isMobileView ? (
        <Menu size={24} />
      ) : isSidebarCollapsed ? (
        <ChevronsRight size={24} />
      ) : (
        <ChevronsLeft size={24} />
      )}
    </button>
  );

  return (
    <header className="bg-neutral-gray-lighter dark:bg-dark-surface h-16 flex items-center justify-between px-4 sm:px-6 shadow-header sticky top-0 z-30 w-full">
      <div>
        <MenuToggleButton />
      </div>

      <div className="relative flex-grow max-w-xl mx-2 sm:mx-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={20} className="text-neutral-gray-light dark:text-dark-text-secondary" />
        </div>
        <input
          type="search"
          placeholder="Buscar funciones, snippets..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-gray-light dark:border-dark-border bg-white dark:bg-neutral-gray-darker text-neutral-gray-dark dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent text-sm"
          value={searchTermInput} // MODIFICACIÓN: Conectar al estado local
          onChange={handleSearchInputChange} // MODIFICACIÓN: Manejar cambio
        />
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
        <DarkModeToggle />
        {user ? (
          // MODIFICACIÓN: Contenedor del dropdown con ref y manejo de clic
          <div className="relative" ref={userDropdownRef}>
            <button 
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} // MODIFICACIÓN: Alternar con clic
              className="p-2 rounded-full hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-dark focus:outline-none"
            >
              {user.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-7 h-7 rounded-full"
                     onError={(e) => { e.target.onerror = null; e.target.replaceWith(<UserCircle size={22} className="text-neutral-gray dark:text-dark-text-primary" />)}}
                />
              ) : (
                <UserCircle size={22} className="text-neutral-gray dark:text-dark-text-primary" />
              )}
            </button>
            {/* MODIFICACIÓN: Mostrar dropdown basado en estado */}
            {isUserDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-surface rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5 dark:ring-dark-border"
              >
                <div className="px-4 py-3">
                  <p className="text-sm text-neutral-gray-dark dark:text-dark-text-primary">
                    Conectado como
                  </p>
                  <p className="text-sm font-medium text-neutral-gray-dark dark:text-dark-text-primary truncate" title={user.email}>
                    {user.email}
                  </p>
                </div>
                <div className="border-t border-neutral-gray-lighter dark:border-dark-border"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                >
                  <LogOut size={16} className="inline mr-2 mb-0.5" />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <span className="text-sm text-neutral-gray dark:text-dark-text-secondary">No Conectado</span>
        )}
      </div>
    </header>
  );
};

export default Header;