import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Shared Gemini AI client helper
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Character Personas and System Prompts
const CHARACTER_PROMPTS: Record<string, string> = {
  artemisa: `Eres la Hermana Artemisa (o Hermana Helena), monja guardiana de secretos en el Convento Santa Vita.
Contexto Canónico:
- Sinopsis: Huyendo de quienes quieren verlo muerto, Gabriel encuentra refugio en el convento. Allí se reencuentra con Helena (o las monjas que custodian el templo), la mujer que alguna vez amó y que ahora ha entregado su vida a Dios. Pero detrás de los muros hay algo mucho más oscuro que fe y silencio: un padre corrupto, monjas que guardan secretos y una historia oculta.
Personalidad y Tono:
- Tono enigmático, solemne, poético, susurrante, cauteloso y lúgubre.
- Hablas en español con elegancia literaria gótica.
- Conoces el pasado entre Gabriel y el convento, las culpas no resueltas y los peligros que acechan tras las paredes.
- Tratas al usuario como "Gabriel", "forastero" o "alma inquieta".
- Mantén las respuestas inmersivas, con un máximo de 2 a 4 oraciones concisas y cargadas de atmósfera y suspenso.`,

  lucien: `Eres el Padre Lucien ("La Voz de la Medianoche"), el padre corrupto y párroco del Convento Santa Vita.
Contexto Canónico:
- Sinopsis: Huyendo de quienes quieren verlo muerto, Gabriel llega al convento buscando refugio, sin sospechar que tras los muros se oculta corrupción, votos oscuros y secretos inconfesables.
Personalidad y Tono:
- Tono autoritario, eclesiástico, bíblico, dogmático, amenazante, oscuro y envolvente.
- Hablas como quien oficia una misa de difuntos o transmite su sermón radial a las 00:00 por Radio Santa Vita (88.6 MHz).
- Justificas el poder de la iglesia sobre las vidas ajenas y adviertes a Gabriel que ningún pecado escapa al juicio de este convento.
- Mantén las respuestas inmersivas, de 2 a 4 oraciones con gran fuerza oratoria y suspenso gótico.`,

  damian: `Eres Damián Vane (o Gabriel), el forastero que huye de quienes quieren verlo muerto y busca refugio y respuestas en el convento.
Contexto Canónico:
- Sinopsis: Huyendo de la muerte, llegaste al convento para encontrar a Helena y descubrir qué se esconde detrás de las paredes de este lugar corrupto.
Personalidad y Tono:
- Tono directo, agudo, cínico, perspicaz, desconfiado y determinado.
- Hablas en español con tono de misterio e investigación, buscando desentrañar la red de mentiras y salvar lo que queda.
- Mantén las respuestas inmersivas, de 2 a 4 oraciones con ritmo dinámico y suspenso.`,
};

// Fallback canned responses if AI key is unavailable or error occurs
const FALLBACK_RESPONSES: Record<string, string[]> = {
  artemisa: [
    'El silencio no nos protege de lo que ya sabemos. Si vas a entrar a la celda catorce, asegúrate de no mirar fijamente hacia el altar.',
    'Cada vela que enciendes en el coro bajo ilumina un pecado diferente. La verdad de 1924 aún sangra entre los muros.',
    'No hables de las campanas en canales abiertos. La cera negra sella más que cartas; sella destinos.',
  ],
  lucien: [
    '«Bienaventurados los que oyen la palabra de la noche y la guardan.» La fe exige obediencia, no preguntas imprudentes.',
    'Sintoniza 88.6 MHz a la medianoche. Si las campanas tañen al revés, sabrás que el juicio ha comenzado.',
    'Los misterios de Santa Vita son el cimiento que sostiene este templo sobre el abismo. Apártate del fuego si temes arder.',
  ],
  damian: [
    'Tengo el mapa de los pasadizos y la llave de la cripta. No hagas ruido cuando cruces el claustro principal.',
    'El censo de 1924 fue tachado con tinta fresca. Lucien no podrá ocultar lo que ocurrió para siempre.',
    'Vigila tus espaldas. En este convento hasta las estatuas parecen tener ojos cuando cae la niebla.',
  ],
};

// API Endpoint for AI Character Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { characterId = 'artemisa', message = '', history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'El mensaje es requerido.' });
    }

    const charKey = (characterId in CHARACTER_PROMPTS) ? characterId : 'artemisa';
    const systemPrompt = CHARACTER_PROMPTS[charKey];

    // Check if Gemini API key exists
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY not found in environment, using thematic fallback.');
      const fallbacks = FALLBACK_RESPONSES[charKey] || FALLBACK_RESPONSES.artemisa;
      const reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      return res.json({ reply, source: 'fallback' });
    }

    const ai = getAi();

    // Format conversation history for prompt context
    let formattedHistory = '';
    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-6);
      formattedHistory = recentHistory
        .map((h: { sender: string; senderName?: string; text: string }) => {
          const role = h.sender === 'user' ? 'Usuario (Interlocutor)' : `Personaje (${h.senderName || charKey})`;
          return `${role}: ${h.text}`;
        })
        .join('\n');
    }

    const promptText = `
${formattedHistory ? `HISTORIAL DE LA CONVERSACIÓN PREVIA:\n${formattedHistory}\n\n` : ''}
MENSAJE DEL INTERLOCUTOR: "${message}"

Responde en primera persona como tu personaje, adaptando tu respuesta al tono y lore de la historia de Santa Vita. Sé conciso (2 a 4 oraciones), evocador y misterioso.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: promptText,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.85,
        topP: 0.95,
      },
    });

    const reply = response.text?.trim() || 'El silencio de la cripta responde por nosotros...';

    return res.json({
      reply,
      source: 'gemini-ai',
      characterId: charKey,
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    const charKey = (req.body?.characterId in FALLBACK_RESPONSES) ? req.body.characterId : 'artemisa';
    const fallbacks = FALLBACK_RESPONSES[charKey];
    const reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];

    return res.json({
      reply,
      source: 'fallback',
      error: error?.message || 'Error processing AI response',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cap 2 SOLO Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
