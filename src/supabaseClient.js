import { createClient } from '@supabase/supabase-js'

// Obtén estas variables de tu proyecto Supabase (Settings > API)
// Para producción, usa variables de entorno.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Pequeña validación para asegurar que las variables están presentes
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Make sure to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file or environment variables.");
  // Podrías lanzar un error o manejar esto de una forma más robusta
  // throw new Error("Supabase URL or Anon Key is missing.");
}

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Ejemplo de cómo crear un archivo .env.local en la raíz de tu proyecto (NO LO SUBAS A GIT):
/*
VITE_SUPABASE_URL=TU_URL_DE_SUPABASE
VITE_SUPABASE_ANON_KEY=TU_CLAVE_ANON_DE_SUPABASE
*/

// Asegúrate de que .env.local esté en tu archivo .gitignore