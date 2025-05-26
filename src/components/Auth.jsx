// src/components/Auth.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Lock, Mail, User, Eye, EyeOff, Github, Gitlab, ExternalLink } from 'lucide-react'; // Agregado Github, Gitlab

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Para alternar entre Login y Sign Up
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authMessage, setAuthMessage] = useState('');


  const handleAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    setAuthError(null);
    setAuthMessage('');

    const credentials = { email, password };

    try {
      let response;
      if (isSignUp) {
        response = await supabase.auth.signUp(credentials);
        if (response.error) throw response.error;
        // Para signUp, Supabase envía un correo de confirmación si está habilitado.
        // El usuario no estará logueado hasta que confirme.
        setAuthMessage('¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.');
      } else {
        response = await supabase.auth.signInWithPassword(credentials);
        if (response.error) throw response.error;
        // Si el login es exitoso, el listener en App.jsx se encargará de actualizar el estado.
        // No es necesario hacer nada más aquí para el login exitoso.
      }
    } catch (error) {
      console.error('Error en autenticación:', error);
      setAuthError(error.message || 'Ocurrió un error durante la autenticación.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    setLoading(true);
    setAuthError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        // Puedes especificar redirectTo si es necesario, por defecto usa la URL del sitio.
        // redirectTo: window.location.origin
      }
    });
    if (error) {
      console.error(`Error con OAuth (${provider}):`, error);
      setAuthError(error.message || `Error al intentar iniciar sesión con ${provider}.`);
      setLoading(false);
    }
    // La redirección se maneja por Supabase, el loading se quitará al volver a la app.
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-gray-lighter dark:bg-dark-bg p-4 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-dark-surface p-8 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/Icon_power-helper-app.png" 
            alt="Power Helper Icono" 
            className="w-20 h-20 mb-4"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <h1 className="text-3xl font-bold text-primary-blue dark:text-primary-blue-light">
            Power Helper
          </h1>
          <p className="text-neutral-gray dark:text-dark-text-secondary mt-1">
            {isSignUp ? 'Crea tu cuenta para empezar' : 'Inicia sesión para continuar'}
          </p>
        </div>

        {authError && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-300 rounded-md text-sm">
            {authError}
          </div>
        )}
        {authMessage && !authError && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-500 text-green-700 dark:text-green-300 rounded-md text-sm">
            {authMessage}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-gray dark:text-dark-text-secondary mb-1">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-neutral-gray-light dark:text-dark-border" />
              </div>
              <input
                id="email"
                className="w-full pl-10 pr-3 py-2.5 border border-neutral-gray-light dark:border-dark-border rounded-lg focus:ring-primary-blue focus:border-primary-blue dark:bg-neutral-gray-darker dark:text-dark-text-primary text-sm"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-gray dark:text-dark-text-secondary mb-1"
            >
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-neutral-gray-light dark:text-dark-border" />
              </div>
              <input
                id="password"
                className="w-full pl-10 pr-10 py-2.5 border border-neutral-gray-light dark:border-dark-border rounded-lg focus:ring-primary-blue focus:border-primary-blue dark:bg-neutral-gray-darker dark:text-dark-text-primary text-sm"
                type={showPassword ? 'text' : 'password'}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-gray-light dark:text-dark-border hover:text-primary-blue dark:hover:text-primary-blue-light"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-blue hover:bg-primary-blue-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue-light disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión')}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-gray-light dark:border-dark-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-dark-surface text-neutral-gray dark:text-dark-text-secondary">
                O continúa con
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3"> {/* Cambiado a 1 columna para mejor responsividad inicial */}
            <button
              onClick={() => handleOAuthLogin('github')}
              disabled={loading}
              className="w-full inline-flex justify-center py-2.5 px-4 border border-neutral-gray-light dark:border-dark-border rounded-lg shadow-sm bg-white dark:bg-neutral-gray-darker hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-dark text-sm font-medium text-neutral-gray-dark dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue transition-colors disabled:opacity-70"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </button>
            {/* Puedes añadir más proveedores OAuth aquí, como Google, GitLab, etc. */}
            {/* Ejemplo GitLab (requiere configuración en Supabase)
            <button
              onClick={() => handleOAuthLogin('gitlab')}
              disabled={loading}
              className="w-full inline-flex justify-center py-2.5 px-4 border border-neutral-gray-light dark:border-dark-border rounded-lg shadow-sm bg-white dark:bg-neutral-gray-darker hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-dark text-sm font-medium text-neutral-gray-dark dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue transition-colors disabled:opacity-70"
            >
              <Gitlab className="w-5 h-5 mr-2" />
              GitLab
            </button>
            */}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setAuthError(null);
              setAuthMessage('');
            }}
            className="text-sm text-primary-blue hover:text-primary-blue-hover dark:text-primary-blue-light dark:hover:text-primary-blue focus:outline-none"
          >
            {isSignUp
              ? '¿Ya tienes una cuenta? Inicia Sesión'
              : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-neutral-gray-light dark:text-dark-text-secondary">
        Al continuar, aceptas nuestros <a href="#" className="underline hover:text-primary-blue">Términos de Servicio</a> y <a href="#" className="underline hover:text-primary-blue">Política de Privacidad</a>.
      </p>
    </div>
  );
};

export default Auth;