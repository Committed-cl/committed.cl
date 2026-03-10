
import React from 'react';
import { SectionContent } from './types';

export const INITIAL_CONTENT: SectionContent = {
  hero: {
    title: "Expertos en coordinación de equipos y formación de líderes",
    subtitle: "A través de la Gestión por Compromisos, aumenta la productividad de tu equipo y potencia la forma en que se coordinan.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1920"
  },
  about: {
    title: "El Poder de la Coordinación",
    content: "En Committed potenciamos a los líderes y formamos a nuevos referentes. Recuperamos la esencia de los acuerdos y la confianza para movilizar la toma de acción. \n\nHemos trabajado por años apoyando a nuestros clientes a mejorar su coordinación, su desempeño y así su productividad, basándonos en la metodología de Gestión por Compromisos."
  },
  services: [
    {
      id: "1",
      title: "Gestión por Compromisos",
      description: "Metodología diseñada para aumentar la productividad mediante la claridad en los acuerdos y la responsabilidad compartida.",
      icon: "Shield"
    },
    {
      id: "2",
      title: "Formación de Líderes",
      description: "Desarrollamos las habilidades necesarias para que los líderes inspiren confianza y movilicen a sus equipos hacia resultados extraordinarios.",
      icon: "TrendingUp"
    },
    {
      id: "3",
      title: "Coordinación de Equipos",
      description: "Intervenciones estratégicas para eliminar silos, mejorar la comunicación y optimizar el flujo de trabajo colectivo.",
      icon: "Sparkles"
    },
    {
      id: "4",
      title: "Productividad y Desempeño",
      description: "Análisis y mejora de los procesos de coordinación para alcanzar niveles superiores de ejecución y cumplimiento.",
      icon: "Home"
    }
  ],
  contact: {
    title: "Potencia tu equipo hoy",
    description: "Contáctanos para descubrir cómo la Gestión por Compromisos puede transformar la cultura y los resultados de tu organización.",
    email: "rmartinez@committed.cl",
    phone: "+56 9 9733 2036",
    address: "Las Condes, Santiago, Chile",
    ctaTitle: "Moviliza la acción en tu organización"
  }
};

export const Logo = ({ className = "h-12" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="h-full aspect-square overflow-hidden flex-shrink-0">
      <img
        src="/logo-committed.png"
        alt="Committed Logo"
        className="h-[145%] w-auto object-contain object-top"
      />
    </div>
    <span className="text-white font-bold tracking-wider text-[0.6em] leading-none whitespace-nowrap">COMMITTED</span>
  </div>
);

export const Icons = {
  TrendingUp: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
  ),
  Home: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
  ),
  Shield: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
  ),
  Edit: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
  ),
  Sparkles: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path><path d="M5 3v4"></path><path d="M19 17v4"></path><path d="M3 5h4"></path><path d="M17 19h4"></path></svg>
  ),
  Mail: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path><rect width="20" height="16" x="2" y="4" rx="2"></rect></svg>
  ),
  Phone: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
  ),
  MapPin: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
  ),
  Check: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
  )
};
