import React from 'react';
import { Logo } from '../constants';

interface ArticlePreview {
  slug: string;
  title: string;
  date: string;
  description: string;
  author: string;
  image: string;
  tags: string[];
}

interface BlogListProps {
  articles: ArticlePreview[];
  onNavigate: (path: string, e?: React.MouseEvent) => void;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' });
}

const BlogList: React.FC<BlogListProps> = ({ articles, onNavigate }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <nav className="bg-black py-6">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="/" onClick={(e) => onNavigate('/', e)} className="cursor-pointer">
            <Logo className="h-8 lg:h-10" />
          </a>
          <div className="hidden lg:flex gap-12 font-bold tracking-[0.2em] text-[10px] uppercase text-white/60">
            <a href="/" onClick={(e) => onNavigate('/', e)} className="hover:text-yellow-500 transition-colors cursor-pointer">Inicio</a>
            <span className="text-yellow-500">Blog</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <span className="text-yellow-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Nuestro Blog</span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">Ideas y Perspectivas</h1>
            <p className="text-xl text-white/40 font-light max-w-2xl">
              Artículos sobre gestión por compromisos, liderazgo y productividad organizacional.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <a
                key={article.slug}
                href={`/blog/${article.slug}`}
                onClick={(e) => onNavigate(`/blog/${article.slug}`, e)}
                className="group cursor-pointer block"
              >
                <article>
                  <div className="aspect-[16/10] overflow-hidden mb-6">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-600">{formatDate(article.date)}</span>
                    </div>
                    <h2 className="text-xl font-bold text-black group-hover:text-yellow-600 transition-colors leading-tight">
                      {article.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                      {article.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {article.tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
            <a href="/" onClick={(e) => onNavigate('/', e)} className="cursor-pointer">
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

export default BlogList;
