// src/App.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ContentArea from './components/ContentArea';
import Auth from './components/Auth';
import { useTheme } from './context/ThemeContext';
import { powerFxFunctions } from './data/functions';
import { supabase } from './supabaseClient';

function App() {
  const [activeSection, setActiveSection] = useState('powerfx');
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [userSnippets, setUserSnippets] = useState([]);
  const [loadingSnippets, setLoadingSnippets] = useState(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  // Estado para el separador de argumentos de Power Fx
  const [powerFxSeparator, setPowerFxSeparator] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedSeparator = localStorage.getItem('powerFxSeparator');
      return savedSeparator || ','; // Default to comma
    }
    return ',';
  });

  // Guardar el separador en localStorage cuando cambie
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('powerFxSeparator', powerFxSeparator);
    }
  }, [powerFxSeparator]);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoadingAuth(false);
    };
    getSession();

    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoadingAuth(false);
      }
    );

    return () => {
      authSubscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchUserSnippets = async () => {
      if (user) {
        setLoadingSnippets(true);
        try {
          const { data, error } = await supabase
            .from('snippets')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Error fetching snippets:', error);
          } else {
            setUserSnippets(data || []);
          }
        } catch (error) {
          console.error('Error in fetchUserSnippets:', error);
        } finally {
          setLoadingSnippets(false);
        }
      } else {
        setUserSnippets([]);
      }
    };

    fetchUserSnippets();
  }, [user]);

  const [favoriteFunctionIds, setFavoriteFunctionIds] = useState(() => {
    if (typeof window !== 'undefined') {
        const savedFavorites = localStorage.getItem('favoriteFunctionIds');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('favoriteFunctionIds', JSON.stringify(favoriteFunctionIds));
    }
  }, [favoriteFunctionIds]);

  const toggleFavoriteFunction = (functionId) => {
    setFavoriteFunctionIds(prevFavorites => {
      if (prevFavorites.includes(functionId)) {
        return prevFavorites.filter(id => id !== functionId);
      } else {
        return [...prevFavorites, functionId];
      }
    });
  };

  const resetFavoriteFunctionsState = () => {
    setFavoriteFunctionIds([]);
    if (typeof window !== 'undefined') {
        localStorage.removeItem('favoriteFunctionIds');
    }
  };

  const toggleSidebarOverlay = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    if (isSidebarOpen && !isSidebarCollapsed) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!theme || loadingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-gray-lighter dark:bg-dark-bg">
        <p className="text-neutral-gray dark:text-dark-text-primary">Cargando aplicación...</p>
      </div>
    );
  }

  const favoriteFunctionsList = powerFxFunctions.filter(func => favoriteFunctionIds.includes(func.id));
  const mainContentMarginLeft = window.innerWidth < 1024 ? 'ml-0' : (isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64');

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="flex h-screen font-sans bg-neutral-gray-lighter dark:bg-dark-bg">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={(section) => {
          setActiveSection(section);
          if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
          }
        }}
        isSidebarOpen={isSidebarOpen}
        toggleSidebarOverlay={toggleSidebarOverlay}
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={toggleSidebarCollapse}
        user={user}
      />

      {isSidebarOpen && window.innerWidth < 1024 && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebarOverlay}
        ></div>
      )}

      <div className={`flex flex-col flex-1 ${mainContentMarginLeft} transition-all duration-300 ease-in-out`}>
        <Header
          onToggleSidebar={window.innerWidth < 1024 ? toggleSidebarOverlay : toggleSidebarCollapse}
          isSidebarCollapsed={isSidebarCollapsed}
          user={user}
          onSearchChange={setGlobalSearchTerm}
        />
        <ContentArea
          activeSection={activeSection}
          favoriteFunctionIds={favoriteFunctionIds}
          onToggleFavoriteFunction={toggleFavoriteFunction}
          favoriteFunctionsList={favoriteFunctionsList}
          onResetFavorites={resetFavoriteFunctionsState}
          user={user}
          userSnippets={userSnippets}
          setUserSnippets={setUserSnippets} // Esta prop es para SnippetsSection
          loadingSnippets={loadingSnippets}
          searchTerm={globalSearchTerm}
          powerFxSeparator={powerFxSeparator}
          setPowerFxSeparator={setPowerFxSeparator} // Asegúrate que esta es la función setter del estado
        />
      </div>
    </div>
  );
}

export default App;