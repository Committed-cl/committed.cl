
import React, { useState, useEffect, useRef } from 'react';
import { SectionContent } from './types';
import { INITIAL_CONTENT, Icons, Logo } from './constants';
import AdminPanel from './components/AdminPanel';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import { articles } from 'virtual:blog-articles';

type Route =
  | { page: 'home' }
  | { page: 'blog' }
  | { page: 'article'; slug: string };

function getRouteFromHash(): Route {
  const hash = window.location.hash;
  if (hash.startsWith('#blog/')) {
    return { page: 'article', slug: hash.slice(6) };
  }
  if (hash === '#blog') {
    return { page: 'blog' };
  }
  return { page: 'home' };
}

const App: React.FC = () => {
  const [content, setContent] = useState<SectionContent>(INITIAL_CONTENT);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [route, setRoute] = useState<Route>(getRouteFromHash);

  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('committed-content');
    if (saved) {
      try {
        setContent(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved content");
      }
    }

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const handleHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleSave = (newContent: SectionContent) => {
    setContent(newContent);
    localStorage.setItem('committed-content', JSON.stringify(newContent));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigateTo = (hash: string) => {
    window.location.hash = hash;
  };

  // Blog routes
  if (route.page === 'blog') {
    return (
      <BlogList
        articles={articles}
        onArticleClick={(slug) => navigateTo(`blog/${slug}`)}
        onHomeClick={() => navigateTo('home')}
      />
    );
  }

  if (route.page === 'article') {
    const article = articles.find(a => a.slug === route.slug);
    if (article) {
      return (
        <BlogPost
          article={article}
          onBackClick={() => navigateTo('blog')}
          onHomeClick={() => navigateTo('home')}
        />
      );
    }
    navigateTo('blog');
    return null;
  }

  return (
    <div className="min-h-screen selection:bg-yellow-500/30">
      {/* Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Logo className="h-8 lg:h-10 transition-all duration-500" />

          <div className="hidden lg:flex gap-12 font-bold tracking-[0.2em] text-[10px] uppercase text-white/60">
            <a href="#home" className="hover:text-yellow-500 transition-colors">Inicio</a>
            <a href="#services" className="hover:text-yellow-500 transition-colors">Servicios</a>
            <a href="#about" className="hover:text-yellow-500 transition-colors">Propuesta</a>
            <a href="#blog" className="hover:text-yellow-500 transition-colors">Blog</a>
            <a href="#contact" className="hover:text-yellow-500 transition-colors">Contacto</a>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToContact}
              className="px-8 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-yellow-500 transition-all"
            >
              Agendar Sesión
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img src={content.hero.image} alt="Team Coordination" className="w-full h-full object-cover opacity-40 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 text-white max-w-6xl">
          <div className="mb-6 flex items-center gap-4 animate-fade-in-up">
            <div className="w-12 h-px bg-yellow-500"></div>
            <span className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.5em]">Expertos en Coordinación y Liderazgo</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-10 leading-[0.9] tracking-tighter animate-fade-in-up">
            {content.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/50 mb-14 leading-relaxed font-light max-w-2xl animate-fade-in-up delay-100">
            {content.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-200">
            <button
              onClick={scrollToContact}
              className="px-14 py-6 bg-yellow-500 text-black font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl"
            >
              Solicitar Reunión
            </button>
            <a href="#services" className="px-14 py-6 border border-white/20 text-white font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all text-center">
              Nuestra Metodología
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
            <div className="max-w-2xl">
              <span className="text-yellow-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Nuestra Metodología</span>
              <h2 className="text-5xl md:text-6xl font-black text-black leading-tight">Gestión por Compromisos y Liderazgo</h2>
            </div>
            <div className="lg:w-1/3 text-slate-400 font-light leading-relaxed">
              Enfoque en resultados: Aumentamos la productividad potenciando la forma en que los equipos se coordinan.
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1">
            {content.services.map((service) => {
              const IconComp = (Icons as any)[service.icon] || Icons.Home;
              return (
                <div key={service.id} className="group p-14 bg-slate-50 hover:bg-black transition-all duration-700 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-slate-100 group-hover:text-white/5 transition-colors">
                    <IconComp className="w-32 h-32" />
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center mb-12 text-yellow-500 relative z-10">
                    <IconComp className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-bold mb-6 text-black group-hover:text-white uppercase tracking-widest relative z-10">{service.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed group-hover:text-white/40 relative z-10">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div>
                <span className="text-yellow-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Nuestra Propuesta</span>
                <h2 className="text-5xl md:text-6xl font-black text-black mb-10 leading-tight">{content.about.title}</h2>
                <div className="w-20 h-1 bg-yellow-500 mb-10"></div>
              </div>
              <div className="text-xl text-slate-600 leading-relaxed font-light whitespace-pre-line">
                {content.about.content}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 bg-yellow-500">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-4xl md:text-6xl font-black text-black mb-12 max-w-4xl mx-auto leading-tight">
            {content.contact.ctaTitle}
          </h3>
          <button
            onClick={scrollToContact}
            className="px-16 py-8 bg-black text-white font-black text-xs uppercase tracking-[0.4em] hover:scale-105 transition-transform"
          >
            Iniciar Transformación
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-40 bg-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-900/30 -skew-x-12 translate-x-1/2"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-start">

            <div className="space-y-16">
              <div>
                <span className="text-yellow-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Contacto Directo</span>
                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9]">{content.contact.title}</h2>
                <p className="text-xl text-white/40 font-light max-w-md leading-relaxed">
                  {content.contact.description}
                </p>
              </div>

              <div className="space-y-10 border-l border-white/10 pl-10">
                <div className="group flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-all">
                    <Icons.MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Ubicación</p>
                    <p className="text-white font-medium text-lg">{content.contact.address}</p>
                  </div>
                </div>

                <div className="group flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-all">
                    <Icons.Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Correo Electrónico</p>
                    <p className="text-white font-medium text-lg">{content.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 lg:p-16 shadow-2xl relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-yellow-500"></div>

              {isSuccess ? (
                <div className="h-[500px] flex flex-col items-center justify-center text-center space-y-6 animate-fade-in-up">
                  <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center">
                    <Icons.Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black text-black">Solicitud Recibida</h3>
                  <p className="text-slate-500 max-w-xs">Nos pondremos en contacto para coordinar una reunión inicial.</p>
                  <button onClick={() => setIsSuccess(false)} className="text-black font-bold uppercase tracking-widest text-[10px] underline">Volver al formulario</button>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={handleFormSubmit}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Nombre / Firma</label>
                      <input required type="text" className="w-full py-4 border-b-2 border-slate-100 focus:border-yellow-500 outline-none transition-all text-black font-medium" placeholder="Su nombre o razón social" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Correo Corporativo</label>
                      <input required type="email" className="w-full py-4 border-b-2 border-slate-100 focus:border-yellow-500 outline-none transition-all text-black font-medium" placeholder="email@corporativo.cl" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Área de Interés</label>
                    <select className="w-full py-4 border-b-2 border-slate-100 focus:border-yellow-500 outline-none transition-all text-black font-medium bg-transparent">
                      <option>Gestión por Compromisos</option>
                      <option>Formación de Líderes</option>
                      <option>Coordinación de Equipos</option>
                      <option>Productividad Organizacional</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Descripción del Requerimiento</label>
                    <textarea required rows={4} className="w-full py-4 border-b-2 border-slate-100 focus:border-yellow-500 outline-none transition-all resize-none text-black font-medium" placeholder="Describa brevemente el alcance de la consultoría requerida..."></textarea>
                  </div>

                  <button
                    disabled={isSubmitting}
                    className="w-full py-8 bg-black text-white font-black uppercase tracking-[0.4em] text-[11px] hover:bg-yellow-500 hover:text-black transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Procesando Solicitud..." : "Solicitar Información"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-20">
            <Logo className="h-8" />
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

      {isAdminOpen && (
        <AdminPanel
          content={content}
          onSave={handleSave}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
