import React, { useEffect } from 'react';
import { Logo } from '../constants';

interface Article {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  image: string;
  tags: string[];
  html: string;
}

interface BlogPostProps {
  article: Article;
  onBackClick: () => void;
  onHomeClick: () => void;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' });
}

const BlogPost: React.FC<BlogPostProps> = ({ article, onBackClick, onHomeClick }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${article.title} | Committed`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', article.description);

    return () => {
      document.title = 'Committed | Coordinación de Equipos y Liderazgo';
    };
  }, [article]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="bg-black py-6">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a onClick={onHomeClick} className="cursor-pointer">
            <Logo className="h-8 lg:h-10" />
          </a>
          <div className="hidden lg:flex gap-12 font-bold tracking-[0.2em] text-[10px] uppercase text-white/60">
            <a onClick={onHomeClick} className="hover:text-yellow-500 transition-colors cursor-pointer">Inicio</a>
            <a onClick={onBackClick} className="hover:text-yellow-500 transition-colors cursor-pointer">Blog</a>
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-[50vh] overflow-hidden bg-black">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.3em]">{formatDate(article.date)}</span>
                <span className="text-white/30">·</span>
                <span className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">{article.author}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                {article.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-12">
              {article.tags.map((tag) => (
                <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>

            <div
              className="prose prose-lg max-w-none
                prose-headings:font-black prose-headings:tracking-tight prose-headings:text-black
                prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6
                prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
                prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-light
                prose-strong:text-black prose-strong:font-bold
                prose-ul:text-slate-600 prose-ol:text-slate-600
                prose-li:leading-relaxed prose-li:font-light
                prose-a:text-yellow-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />

            <div className="mt-20 pt-12 border-t border-slate-100">
              <button
                onClick={onBackClick}
                className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-black hover:text-yellow-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Volver al Blog
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-black py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
            <a onClick={onHomeClick} className="cursor-pointer">
              <Logo className="h-8" />
            </a>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
              Expertos en Coordinación y Liderazgo
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5">
            <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.4em]">
              © {new Date().getFullYear()} Committed. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
