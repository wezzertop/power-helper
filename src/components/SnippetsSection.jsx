// src/components/SnippetsSection.jsx
import React, { useState, useEffect, useMemo } from 'react'; // Agregado useMemo
import CodeBlock from './CodeBlock';
import { supabase } from '../supabaseClient';
import { Edit2, Copy, Check, Trash2, PlusCircle, AlertTriangle, Info, Loader2, Save, XCircle } from 'lucide-react';

const SnippetFormModal = ({ isOpen, onClose, onSave, currentSnippet, userId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('powerfx');
  const [tags, setTags] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (currentSnippet) {
      setTitle(currentSnippet.title || '');
      setDescription(currentSnippet.description || '');
      setCode(currentSnippet.code || '');
      setLanguage(currentSnippet.language || 'powerfx');
      setTags(Array.isArray(currentSnippet.tags) ? currentSnippet.tags.join(', ') : (currentSnippet.tags || ''));
    } else {
      setTitle('');
      setDescription('');
      setCode('');
      setLanguage('powerfx');
      setTags('');
    }
    setFormError('');
  }, [currentSnippet, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!title.trim() || !code.trim()) {
      setFormError('El título y el código del snippet son obligatorios.');
      return;
    }
    const snippetData = {
      user_id: userId,
      title: title.trim(),
      description: description.trim(),
      code: code.trim(),
      language: language.trim() || 'powerfx',
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };
    await onSave(snippetData, currentSnippet?.id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-primary-blue dark:text-primary-blue-light">
            {currentSnippet ? 'Editar Snippet' : 'Añadir Nuevo Snippet'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-neutral-gray-lighter dark:hover:bg-neutral-gray-dark">
            <XCircle size={24} className="text-neutral-gray dark:text-dark-text-secondary" />
          </button>
        </div>
        {formError && (
          <div className="mb-3 p-2 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-500 text-red-700 dark:text-red-300 rounded-md text-xs">
            <AlertTriangle size={14} className="inline mr-1" /> {formError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-2">
          <div>
            <label htmlFor="snippetTitle" className="block text-sm font-medium text-neutral-gray dark:text-dark-text-secondary mb-1">Título</label>
            <input type="text" id="snippetTitle" value={title} onChange={(e) => setTitle(e.target.value)} required
                   className="w-full p-2 border border-neutral-gray-light dark:border-dark-border rounded-md focus:ring-primary-blue focus:border-primary-blue dark:bg-neutral-gray-darker dark:text-dark-text-primary text-sm" />
          </div>
          <div>
            <label htmlFor="snippetDescription" className="block text-sm font-medium text-neutral-gray dark:text-dark-text-secondary mb-1">Descripción</label>
            <textarea id="snippetDescription" value={description} onChange={(e) => setDescription(e.target.value)} rows="2"
                      className="w-full p-2 border border-neutral-gray-light dark:border-dark-border rounded-md focus:ring-primary-blue focus:border-primary-blue dark:bg-neutral-gray-darker dark:text-dark-text-primary text-sm"></textarea>
          </div>
          <div>
            <label htmlFor="snippetCode" className="block text-sm font-medium text-neutral-gray dark:text-dark-text-secondary mb-1">Código</label>
            <textarea id="snippetCode" value={code} onChange={(e) => setCode(e.target.value)} rows="5" required
                      className="w-full p-2 border border-neutral-gray-light dark:border-dark-border rounded-md focus:ring-primary-blue focus:border-primary-blue font-mono text-xs dark:bg-neutral-gray-darker dark:text-dark-text-primary"></textarea>
          </div>
          <div>
            <label htmlFor="snippetLanguage" className="block text-sm font-medium text-neutral-gray dark:text-dark-text-secondary mb-1">Lenguaje</label>
            <input type="text" id="snippetLanguage" value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="powerfx, javascript, etc."
                   className="w-full p-2 border border-neutral-gray-light dark:border-dark-border rounded-md focus:ring-primary-blue focus:border-primary-blue dark:bg-neutral-gray-darker dark:text-dark-text-primary text-sm" />
          </div>
          <div>
            <label htmlFor="snippetTags" className="block text-sm font-medium text-neutral-gray dark:text-dark-text-secondary mb-1">Etiquetas (separadas por coma)</label>
            <input type="text" id="snippetTags" value={tags} onChange={(e) => setTags(e.target.value)}
                   className="w-full p-2 border border-neutral-gray-light dark:border-dark-border rounded-md focus:ring-primary-blue focus:border-primary-blue dark:bg-neutral-gray-darker dark:text-dark-text-primary text-sm" />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={onClose}
                    className="px-4 py-2 text-sm rounded-md bg-neutral-gray-light hover:bg-neutral-gray text-neutral-gray-darker dark:bg-dark-border dark:hover:bg-neutral-gray-dark transition-colors">
              Cancelar
            </button>
            <button type="submit"
                    className="px-4 py-2 text-sm rounded-md bg-primary-blue hover:bg-primary-blue-hover text-white transition-colors flex items-center">
              <Save size={16} className="mr-2" /> Guardar Snippet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// MODIFICACIÓN: Añadida la prop searchTerm
const SnippetsSection = ({ user, userSnippets, setUserSnippets, loadingSnippets, searchTerm = '' }) => {
  const [copiedStatus, setCopiedStatus] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // MODIFICACIÓN: Filtrar snippets basado en searchTerm
  const filteredUserSnippets = useMemo(() => {
    if (!searchTerm) return userSnippets;
    return userSnippets.filter(snippet =>
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (snippet.description && snippet.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (snippet.language && snippet.language.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (snippet.tags && snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }, [userSnippets, searchTerm]);


  const handleSnippetCopy = (snippetCode, snippetId) => {
    navigator.clipboard.writeText(snippetCode)
      .then(() => {
        setCopiedStatus(prev => ({ ...prev, [snippetId]: true }));
        setTimeout(() => setCopiedStatus(prev => ({ ...prev, [snippetId]: false })), 2000);
      })
      .catch(err => {
        console.error('Error al copiar snippet:', err);
        alert('Error al copiar el código.');
      });
  };

  const handleSaveSnippet = async (snippetData, snippetIdToUpdate) => {
    if (!user) {
      alert("Debes estar logueado para guardar snippets.");
      return;
    }
    try {
      if (snippetIdToUpdate) {
        const { data, error } = await supabase
          .from('snippets')
          .update(snippetData)
          .eq('id', snippetIdToUpdate)
          .eq('user_id', user.id)
          .select()
          .single();
        if (error) throw error;
        setUserSnippets(prevSnippets =>
          prevSnippets.map(s => s.id === snippetIdToUpdate ? data : s)
        );
        alert('Snippet actualizado correctamente.');
      } else {
        const { data, error } = await supabase
          .from('snippets')
          .insert([snippetData])
          .select()
          .single();
        if (error) throw error;
        setUserSnippets(prevSnippets => [data, ...prevSnippets]);
        alert('Snippet creado correctamente.');
      }
      setIsModalOpen(false);
      setEditingSnippet(null);
    } catch (error) {
      console.error('Error guardando snippet:', error);
      alert(`Error al guardar el snippet: ${error.message}`);
    }
  };

  const openEditModal = (snippet) => {
    setEditingSnippet(snippet);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingSnippet(null);
    setIsModalOpen(true);
  };

  const handleDeleteSnippet = async (snippetId) => {
    if (!user || !snippetId) return;
    try {
      const { error } = await supabase
        .from('snippets')
        .delete()
        .eq('id', snippetId)
        .eq('user_id', user.id);
      if (error) throw error;
      setUserSnippets(prevSnippets => prevSnippets.filter(s => s.id !== snippetId));
      alert('Snippet eliminado correctamente.');
    } catch (error) {
      console.error('Error eliminando snippet:', error);
      alert(`Error al eliminar el snippet: ${error.message}`);
    }
    setShowDeleteConfirm(null);
  };

  const ConfirmationModal = ({ title, message, onConfirm, onCancel, show }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
        <div className="bg-white dark:bg-dark-surface p-6 rounded-lg shadow-xl max-w-sm w-full">
          <div className="flex items-center mb-4">
            <AlertTriangle size={24} className="text-red-500 mr-3" />
            <h3 className="text-lg font-semibold text-neutral-gray-dark dark:text-dark-text-primary">{title}</h3>
          </div>
          <p className="text-sm text-neutral-gray dark:text-dark-text-secondary mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            <button onClick={onCancel} className="px-4 py-2 text-sm rounded-md bg-neutral-gray-light hover:bg-neutral-gray text-neutral-gray-darker dark:bg-dark-border dark:hover:bg-neutral-gray-dark transition-colors">Cancelar</button>
            <button onClick={onConfirm} className="px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors">Confirmar Borrado</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-gray-dark dark:text-dark-text-primary mb-4 sm:mb-0">
          Mis Snippets
        </h2>
        <button
          onClick={openAddModal}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
        >
          <PlusCircle size={20} className="mr-2" /> Añadir Nuevo Snippet
        </button>
      </div>

      {loadingSnippets && (
        <div className="flex justify-center items-center h-40">
          <Loader2 size={32} className="animate-spin text-primary-blue" />
          <p className="ml-3 text-neutral-gray dark:text-dark-text-secondary">Cargando tus snippets...</p>
        </div>
      )}

      {!loadingSnippets && filteredUserSnippets && filteredUserSnippets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredUserSnippets.map(snippet => (
            <div key={snippet.id} className="bg-white dark:bg-dark-surface p-5 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col">
              <h3 className="text-lg font-medium text-primary-blue dark:text-primary-blue-light mb-1.5">{snippet.title}</h3>
              <p className="text-xs text-neutral-gray-light dark:text-dark-text-secondary mb-1">
                Lenguaje: {snippet.language || 'No especificado'}
              </p>
              <p className="text-sm text-neutral-gray dark:text-dark-text-secondary mb-3 flex-grow min-h-[40px]">
                {snippet.description || "Sin descripción."}
              </p>
              <div className="mb-3 max-h-48 overflow-y-auto">
                <CodeBlock codeString={snippet.code} language={snippet.language || 'powerfx'} />
              </div>
              <div className="mt-auto">
                {snippet.tags && snippet.tags.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {snippet.tags.map(tag => (
                      <span key={tag} className="text-xs bg-neutral-gray-lighter dark:bg-neutral-gray-darker text-neutral-gray dark:text-dark-text-secondary px-2 py-0.5 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex space-x-2 pt-2 border-t border-neutral-gray-lighter dark:border-dark-border">
                  <button onClick={() => handleSnippetCopy(snippet.code, snippet.id)}
                          className={`flex items-center justify-center text-xs text-white py-1.5 px-2.5 rounded-md transition-all duration-150 flex-1
                                      ${copiedStatus[snippet.id] ? 'bg-green-500 hover:bg-green-600' : 'bg-primary-blue hover:bg-primary-blue-hover'}`}>
                    {copiedStatus[snippet.id] ? <Check size={14} className="mr-1.5" /> : <Copy size={14} className="mr-1.5" />}
                    {copiedStatus[snippet.id] ? 'Copiado' : 'Copiar'}
                  </button>
                  <button onClick={() => openEditModal(snippet)}
                          className="flex items-center justify-center text-xs bg-neutral-gray-light hover:bg-neutral-gray text-neutral-gray-darker dark:bg-dark-border dark:hover:bg-neutral-gray-dark py-1.5 px-2.5 rounded-md transition-colors flex-1">
                    <Edit2 size={14} className="mr-1.5" /> Editar
                  </button>
                   <button onClick={() => setShowDeleteConfirm(snippet.id)}
                          className="flex items-center justify-center text-xs bg-red-500 hover:bg-red-600 text-white py-1.5 px-2.5 rounded-md transition-colors flex-1">
                    <Trash2 size={14} className="mr-1.5" /> Borrar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loadingSnippets && (
            <div className="text-center py-10 px-6 bg-white dark:bg-dark-surface rounded-lg shadow">
                <Info size={40} className="text-primary-blue dark:text-primary-blue-light mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-gray-dark dark:text-dark-text-primary mb-2">
                    {searchTerm ? "No hay snippets que coincidan con tu búsqueda" : "No hay snippets todavía"}
                </h3>
                <p className="text-sm text-neutral-gray dark:text-dark-text-secondary mb-6">
                    {searchTerm ? "Intenta con otros términos de búsqueda o limpia la búsqueda para ver todos tus snippets." : "Parece que aún no has guardado ningún snippet. ¡Empieza añadiendo tus fragmentos de código más útiles!"}
                </p>
                {!searchTerm && (
                  <button
                      onClick={openAddModal}
                      className="flex items-center justify-center mx-auto bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                  >
                      <PlusCircle size={20} className="mr-2" /> Añadir mi Primer Snippet
                  </button>
                )}
            </div>
        )
      )}

      <SnippetFormModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingSnippet(null); }}
        onSave={handleSaveSnippet}
        currentSnippet={editingSnippet}
        userId={user?.id}
      />
      <ConfirmationModal
        show={!!showDeleteConfirm}
        title="Confirmar Eliminación de Snippet"
        message="¿Estás seguro de que quieres eliminar este snippet? Esta acción no se puede deshacer."
        onConfirm={() => handleDeleteSnippet(showDeleteConfirm)}
        onCancel={() => setShowDeleteConfirm(null)}
      />
    </div>
  );
};

export default SnippetsSection;