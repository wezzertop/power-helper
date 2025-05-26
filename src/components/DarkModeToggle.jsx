import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-darker focus:outline-none focus:ring-2 focus:ring-primary-blue"
      aria-label={theme === 'dark' ? "Activar modo claro" : "Activar modo oscuro"}
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-neutral-gray-dark" />
      )}
    </button>
  );
};

export default DarkModeToggle;