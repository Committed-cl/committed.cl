
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateContent = async (prompt: string, context: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: Eres un consultor estratégico senior de 'Committed', una consultora boutique inmobiliaria de alto nivel. 
      No somos una empresa masiva, somos especialistas en activos institucionales y estrategia financiera.
      Contexto de la sección: ${context}. 
      Instrucción: ${prompt}. 
      Responde SOLO con el texto generado, con un tono sofisticado, sobrio y altamente profesional. Sin explicaciones.`,
    });
    return response.text || "No se pudo generar el contenido.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error al conectar con la IA. Verifica tu API key.";
  }
};
