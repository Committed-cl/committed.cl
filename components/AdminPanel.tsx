
import React, { useState } from 'react';
import { SectionContent } from '../types';
import { generateContent } from '../services/geminiService';
import { Icons, Logo } from '../constants';

interface AdminPanelProps {
  content: SectionContent;
  onSave: (newContent: SectionContent) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ content, onSave, onClose }) => {
  const [editedContent, setEditedContent] = useState<SectionContent>({ ...content });
  const [loading, setLoading] = useState(false);

  const handleAIImprove = async (section: string, field: string, currentText: string) => {
    setLoading(true);
    const improved = await generateContent(`Mejora este texto de forma que suene más lujoso, profesional y persuasivo para el sector inmobiliario de alto nivel: "${currentText}"`, section);
    setEditedContent(prev => {
      const next = { ...prev };
      if (section === 'hero') (next.hero as any)[field] = improved;
      if (section === 'about') (next.about as any)[field] = improved;
      if (section === 'contact') (next.contact as any)[field] = improved;
      return next;
    });
    setLoading(false);
  };

  const handleSave = () => {
    onSave(editedContent);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-end">
      <div className="bg-white w-full max-w-2xl h-full shadow-2xl overflow-y-auto flex flex-col">
        <div className="bg-black p-8 text-white flex justify-between items-center sticky top-0 z-10">
          <div className="flex flex-col gap-1">
            <Logo className="h-8" />
            <h2 className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 ml-1">Editor de Contenido</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">✕</button>
        </div>

        <div className="p-8 space-y-12 flex-1">
          {/* HERO */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-black">
              <div className="w-1 h-6 bg-yellow-500"></div>
              <h3 className="text-sm font-bold uppercase tracking-widest">Sección Principal</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Título</label>
                <div className="relative">
                  <textarea 
                    rows={2}
                    value={editedContent.hero.title}
                    onChange={(e) => setEditedContent({...editedContent, hero: {...editedContent.hero, title: e.target.value}})}
                    className="w-full p-4 border border-slate-200 rounded-xl focus:border-yellow-500 outline-none font-bold transition-all"
                  />
                  <button onClick={() => handleAIImprove('hero', 'title', editedContent.hero.title)} className="absolute right-3 bottom-3 p-2 text-slate-400 hover:text-yellow-500">
                    <Icons.Sparkles className={loading ? 'animate-spin' : ''} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT SECTION EDIT */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-black">
              <div className="w-1 h-6 bg-yellow-500"></div>
              <h3 className="text-sm font-bold uppercase tracking-widest">Contacto y Formulario</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Título de Contacto</label>
                <div className="relative">
                  <input 
                    type="text"
                    value={editedContent.contact.title}
                    onChange={(e) => setEditedContent({...editedContent, contact: {...editedContent.contact, title: e.target.value}})}
                    className="w-full p-4 border border-slate-200 rounded-xl focus:border-yellow-500 outline-none transition-all"
                  />
                  <button onClick={() => handleAIImprove('contact', 'title', editedContent.contact.title)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-yellow-500">
                    <Icons.Sparkles className={loading ? 'animate-spin' : ''} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Frase CTA (Call to Action)</label>
                <input 
                  type="text"
                  value={editedContent.contact.ctaTitle}
                  onChange={(e) => setEditedContent({...editedContent, contact: {...editedContent.contact, ctaTitle: e.target.value}})}
                  className="w-full p-4 border border-slate-200 rounded-xl focus:border-yellow-500 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</label>
                  <input 
                    type="text"
                    value={editedContent.contact.email}
                    onChange={(e) => setEditedContent({...editedContent, contact: {...editedContent.contact, email: e.target.value}})}
                    className="w-full p-4 border border-slate-200 rounded-xl focus:border-yellow-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Teléfono</label>
                  <input 
                    type="text"
                    value={editedContent.contact.phone}
                    onChange={(e) => setEditedContent({...editedContent, contact: {...editedContent.contact, phone: e.target.value}})}
                    className="w-full p-4 border border-slate-200 rounded-xl focus:border-yellow-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="p-8 bg-slate-50 border-t flex gap-4">
          <button 
            onClick={handleSave}
            disabled={loading}
            className="flex-1 bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-yellow-500 hover:text-black transition-all disabled:opacity-50"
          >
            {loading ? 'Mejorando con IA...' : 'Guardar y Publicar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
