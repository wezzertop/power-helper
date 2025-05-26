import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Estilos para modo oscuro y claro
import { Copy, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const CodeBlock = ({ codeString, language = 'powerfx' }) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Resetear el ícono después de 2 segundos
      })
      .catch(err => console.error('Error al copiar:', err));
  };

  // Ajusta el lenguaje para react-syntax-highlighter si es necesario
  // Power Fx no tiene un alias directo, 'javascript' o 'clike' pueden servir.
  const highlighterLanguage = language === 'powerfx' ? 'javascript' : language;

  return (
    <div className="relative group bg-neutral-gray-darker dark:bg-neutral-gray-darker rounded-lg my-2">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 bg-neutral-gray-light dark:bg-dark-border text-neutral-gray-darker dark:text-dark-text-primary rounded opacity-50 group-hover:opacity-100 transition-opacity"
        aria-label="Copiar código"
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
      </button>
      <SyntaxHighlighter
        language={highlighterLanguage}
        style={theme === 'dark' ? vscDarkPlus : vs}
        customStyle={{
          margin: 0,
          padding: '1rem',
          borderRadius: '0.5rem', // Tailwind 'rounded-lg'
          fontSize: '0.875rem', // Tailwind 'text-sm'
          backgroundColor: theme === 'dark' ? '#1E1E1E' /* Un gris oscuro */ : '#F3F2F1' /* Un gris claro */
        }}
        showLineNumbers={false} // Puedes habilitar esto si lo deseas
        wrapLines={true}
        lineNumberStyle={{ color: theme === 'dark' ? '#6a6a6a' : '#999' }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;