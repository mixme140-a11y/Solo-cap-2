import React, { useState, useEffect } from 'react';
import { X, Send, Shield, Lock, Sparkles, Trash2, Bot, Radio, Flame, RefreshCw } from 'lucide-react';
import { HERO_ASSETS } from '../../data/loreData';
import { ChatMessage } from '../../types';
import { audioService } from '../../services/audioService';
import { useAdminData } from '../../services/adminStore';

interface ChatSeguroModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedContactId?: string;
}

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  artemisa: [
    {
      id: 'm1',
      sender: 'character',
      characterId: 'artemisa',
      senderName: 'Hermana Artemisa',
      text: '¿Por qué insistes en buscar respuestas donde solo quedan cenizas, forastero?',
      timestamp: '00:12',
    },
  ],
  lucien: [
    {
      id: 'l1',
      sender: 'character',
      characterId: 'lucien',
      senderName: 'Padre Lucien',
      text: '«Bienaventurados los que oyen la palabra de la noche y la guardan.» ¿Vienes a confesarte o a espiar?',
      timestamp: '23:58',
    },
  ],
  gabriel: [
    {
      id: 'g1',
      sender: 'character',
      characterId: 'gabriel',
      senderName: 'Gabriel (Padre Sebastián)',
      text: 'Baja la voz... si el Padre Fermín o las hermanas nos escuchan, sabrán que no soy el verdadero Sebastián. ¿Qué necesitas saber?',
      timestamp: '01:05',
    },
  ],
};

const CHARACTER_PROMPTS_MAP: Record<string, string[]> = {
  artemisa: [
    '¿Qué ocurrió en 1924?',
    '¿Qué escondes en la Celda 14?',
    '¿Quién selló la carta con cera negra?',
    '¿Por qué temes al Padre Lucien?',
  ],
  lucien: [
    '¿Por qué emites la misa a las 00:00?',
    '¿Qué secreto oculta el órgano de la iglesia?',
    '¿Dónde están los registros de defunción?',
    '¿Qué significa el voto de silencio?',
  ],
  gabriel: [
    '¿Cómo lograste engañar al Padre Fermín?',
    '¿Qué descubriste en la biblioteca sobre Sebastián?',
    '¿Por qué Elena te obligó a entrar al convento?',
    '¿Qué harás si los cobradores llegan a Santa Vita?',
  ],
};

export const ChatSeguroModal: React.FC<ChatSeguroModalProps> = ({
  isOpen,
  onClose,
  selectedContactId = 'artemisa',
}) => {
  const [activeContactId, setActiveContactId] = useState<string>(selectedContactId);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isAiActive, setIsAiActive] = useState<boolean>(true);

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(() => {
    try {
      const saved = localStorage.getItem('santa_vita_ai_chats');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_MESSAGES;
  });

  // Sync selected contact when changed from outside
  useEffect(() => {
    if (selectedContactId) {
      setActiveContactId(selectedContactId);
    }
  }, [selectedContactId]);

  // Persist messages
  useEffect(() => {
    try {
      localStorage.setItem('santa_vita_ai_chats', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  const { adminData } = useAdminData();
  const characters = adminData.characters || [];

  if (!isOpen) return null;

  const currentContact = characters.find((c) => c.id === activeContactId) || characters[0];
  const activeConversation = messages[activeContactId] || [];
  const quickPrompts = CHARACTER_PROMPTS_MAP[activeContactId] || CHARACTER_PROMPTS_MAP.artemisa;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isTyping) return;

    audioService.playClick(500);

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      senderName: 'Tú',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const currentHistory = [...(messages[activeContactId] || []), userMsg];

    setMessages((prev) => ({
      ...prev,
      [activeContactId]: currentHistory,
    }));

    setInputText('');
    setIsTyping(true);

    try {
      // Call Server-Side Gemini API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          characterId: activeContactId,
          message: text.trim(),
          history: currentHistory.map((m) => ({
            sender: m.sender,
            senderName: m.senderName,
            text: m.text,
          })),
        }),
      });

      let replyText = '';
      if (response.ok) {
        const data = await response.json();
        replyText = data.reply;
      } else {
        throw new Error('Respuesta no válida del servidor');
      }

      audioService.playBell(440);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'character',
        characterId: activeContactId,
        senderName: currentContact.name,
        text: replyText || 'Las sombras guardan silencio en este instante...',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => ({
        ...prev,
        [activeContactId]: [...(prev[activeContactId] || []), botMsg],
      }));
    } catch (error) {
      console.error('Error al contactar al personaje:', error);
      // Graceful fallback
      audioService.playBell(330);
      const fallbackReplies: Record<string, string> = {
        artemisa: 'El voto de silencio no nos protege de lo que ya sabemos. Revisa el devocionario antes de que caiga la medianoche.',
        lucien: '«Bienaventurados los que oyen la palabra de la noche y la guardan.» No busques revelaciones donde solo hay penitencia.',
        damian: 'Tengo las llaves de la cripta. Mantén la radio en 88.6 MHz para coordinar el ingreso.',
      };

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'character',
        characterId: activeContactId,
        senderName: currentContact.name,
        text: fallbackReplies[activeContactId] || 'Las sombras del convento responden con un eco lejano...',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => ({
        ...prev,
        [activeContactId]: [...(prev[activeContactId] || []), botMsg],
      }));
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearHistory = () => {
    audioService.playClick(320);
    const initialForContact = INITIAL_MESSAGES[activeContactId] || [];
    setMessages((prev) => ({
      ...prev,
      [activeContactId]: initialForContact,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0d0d11] border border-white/15 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[620px] max-h-[94vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#08080a]">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={currentContact.image}
                alt={currentContact.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-red-500/50 shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#08080a] animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-gothic text-xs font-bold text-neutral-200 tracking-wider">
                  {currentContact.name}
                </span>
                <span className="text-[9px] text-amber-400 font-mono px-1.5 py-0.2 bg-amber-950/60 rounded border border-amber-500/30 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" /> IA Activa
                </span>
              </div>
              <span className="font-sans-ui text-[10px] text-neutral-400 block">
                {currentContact.role}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* Clear conversation */}
            <button
              id="btn-chat-clear"
              onClick={handleClearHistory}
              title="Reiniciar conversación con este personaje"
              className="p-1.5 text-neutral-500 hover:text-neutral-300 rounded hover:bg-white/5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Close modal */}
            <button
              id="btn-chat-close"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contact Switcher Bar */}
        <div className="px-3 py-2 bg-[#121217] border-b border-white/5 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex gap-1.5 overflow-x-auto">
            {characters.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  audioService.playClick(440);
                  setActiveContactId(c.id);
                }}
                className={`px-3 py-1 rounded text-[10px] font-gothic tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeContactId === c.id
                    ? 'bg-red-950 border border-red-500/60 text-white font-bold shadow-md'
                    : 'bg-black/40 border border-white/10 text-neutral-400 hover:text-white hover:border-white/25'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {c.name}
              </button>
            ))}
          </div>

          <span className="text-[9px] font-mono text-emerald-400/90 hidden sm:inline-flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded border border-white/5">
            <Shield className="w-2.5 h-2.5 text-emerald-400" /> SHA-256
          </span>
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#0a0a0e]">
          <div className="text-center py-1">
            <span className="font-mono text-[9px] text-neutral-500 bg-black/60 px-3 py-1 rounded-full border border-white/5 uppercase inline-flex items-center gap-1">
              <Lock className="w-2.5 h-2.5 text-red-400" /> Conversación confidencial en vivo con IA • Personalidad y lore canónico
            </span>
          </div>

          {activeConversation.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} transition-all`}
              >
                <div className="flex items-center gap-1 mb-1 text-[9px] font-mono text-neutral-500">
                  <span>{msg.senderName}</span>
                  <span>• {msg.timestamp}</span>
                </div>

                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-lg text-xs sm:text-sm font-quote italic leading-relaxed shadow-md ${
                    isUser
                      ? 'bg-red-950/80 border border-red-500/40 text-neutral-100 rounded-tr-none'
                      : 'bg-[#161620] border border-white/15 text-neutral-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-[10px] text-red-300 font-mono italic pl-2 bg-red-950/30 border border-red-500/20 py-1.5 px-3 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-bounce [animation-delay:0.4s]" />
              <span>{currentContact.name} está respondiendo con IA...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-3 py-2 bg-[#101015] border-t border-white/5 flex gap-1.5 overflow-x-auto">
          <span className="text-[9px] font-gothic text-neutral-500 uppercase tracking-wider flex items-center flex-shrink-0">
            Sugerencias:
          </span>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              disabled={isTyping}
              className="px-2.5 py-1 bg-black/50 hover:bg-[#20202c] border border-white/10 text-[10px] font-sans-ui text-neutral-300 hover:text-white rounded whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-[#0c0c10] border-t border-white/10 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
            placeholder={`Escribe un mensaje a ${currentContact.name}...`}
            className="flex-1 bg-[#16161e] border border-white/15 rounded-md px-3 py-2 text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-red-500 disabled:opacity-60"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="p-2 bg-red-950 hover:bg-red-900 disabled:opacity-40 border border-red-500/50 text-white rounded-md transition-colors cursor-pointer flex items-center justify-center min-w-[36px]"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
