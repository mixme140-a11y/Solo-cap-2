import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Heart, 
  Shield, 
  Lock, 
  MessageCircle, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  Sparkles, 
  Image as ImageIcon,
  FolderOpen,
  Eye,
  Calendar,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { Character, CharacterPhoto } from '../../types';
import { useAdminData } from '../../services/adminStore';
import { audioService } from '../../services/audioService';

interface CharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCharacterId?: string;
  onOpenChatWithCharacter?: (charId: string) => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({
  isOpen,
  onClose,
  initialCharacterId = 'artemisa',
  onOpenChatWithCharacter,
}) => {
  const { adminData, updateAdminData } = useAdminData();
  const characters = adminData.characters || [];

  const [selectedId, setSelectedId] = useState<string>(initialCharacterId);
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);
  const [voiceProgress, setVoiceProgress] = useState<number>(0);
  const [voiceDuration, setVoiceDuration] = useState<number>(0);
  const [activePhoto, setActivePhoto] = useState<CharacterPhoto | null>(null);
  const [trustMessage, setTrustMessage] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (initialCharacterId) {
      setSelectedId(initialCharacterId);
    }
  }, [initialCharacterId]);

  // Clean up audio on close or character switch
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlayingVoice(false);
    setVoiceProgress(0);
    setTrustMessage(null);
  }, [selectedId, isOpen]);

  if (!isOpen) return null;

  const character = characters.find((c) => c.id === selectedId) || characters[0] || {
    id: 'unknown',
    name: 'Personaje no encontrado',
    role: 'Desconocido',
    alias: 'Sombra',
    quote: '...',
    description: 'Expediente no disponible.',
    secrets: [],
    confessions: [],
    affinity: 50,
    image: '',
    status: 'Bajo Sospecha'
  };

  const handleIncreaseAffinity = () => {
    audioService.playBell(520);
    const newAffinity = Math.min(100, (character.affinity || 50) + 5);
    
    // Update persisted character state
    const updated = characters.map((c) => 
      c.id === character.id ? { ...c, affinity: newAffinity } : c
    );
    updateAdminData((prev) => ({ ...prev, characters: updated }));

    // Show trust quote confirmation
    const phrase = character.trustQuote || `Has ganado la confianza de ${character.name}. (+5% de afinidad)`;
    setTrustMessage(phrase);
    setTimeout(() => setTrustMessage(null), 4500);
  };

  const handleToggleVoiceAudio = () => {
    if (isPlayingVoice) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlayingVoice(false);
      return;
    }

    if (character.voiceAudioUrl) {
      try {
        if (!audioRef.current || audioRef.current.src !== character.voiceAudioUrl) {
          audioRef.current = new Audio(character.voiceAudioUrl);
          audioRef.current.ontimeupdate = () => {
            if (audioRef.current && audioRef.current.duration) {
              setVoiceProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
              setVoiceDuration(audioRef.current.duration);
            }
          };
          audioRef.current.onended = () => {
            setIsPlayingVoice(false);
            setVoiceProgress(0);
          };
        }
        audioRef.current.play();
        setIsPlayingVoice(true);
      } catch (err) {
        console.error('Error playing character voice audio', err);
        // Fallback to bell sound
        audioService.playBell(330);
        setIsPlayingVoice(true);
        setTimeout(() => setIsPlayingVoice(false), 3000);
      }
    } else {
      // Fallback synthesizer voice echo
      audioService.playBell(330);
      setIsPlayingVoice(true);
      setTimeout(() => setIsPlayingVoice(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0b090f] border border-red-950/90 rounded-xl shadow-[0_0_50px_rgba(220,38,38,0.3)] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-red-950/80 bg-[#070509] shrink-0">
          <div>
            <span className="font-gothic text-xs font-bold text-red-200 tracking-wider block flex items-center gap-1.5">
              <span>Dossier Confidencial</span>
              <span className="text-red-500">†</span>
            </span>
            <span className="font-sans-ui text-[10px] text-neutral-400">
              Archivos Secretos del Convento Santa Vita
            </span>
          </div>

          <button
            id="btn-character-close"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Character Tab Selector */}
        <div className="px-3 py-2 bg-[#09070d] border-b border-white/5 flex gap-2 overflow-x-auto shrink-0 no-scrollbar">
          {characters.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                audioService.playClick(440);
                setSelectedId(c.id);
              }}
              className={`px-3 py-1.5 rounded-md text-[10px] sm:text-xs font-gothic tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                selectedId === c.id
                  ? 'bg-red-950 border border-red-500 text-white font-bold shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                  : 'bg-[#120e17] border border-white/10 text-neutral-400 hover:text-white hover:bg-[#1b1522]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${selectedId === c.id ? 'bg-red-400' : 'bg-neutral-600'}`} />
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* Character Card Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5">
          
          {/* Portrait & Core Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-[#100d16] p-4 rounded-xl border border-white/10 shadow-lg">
            <div className="w-28 h-36 rounded-lg overflow-hidden bg-black/90 border-2 border-red-950/80 relative flex-shrink-0 shadow-[0_0_15px_rgba(0,0,0,0.8)] group">
              {character.image ? (
                <img
                  src={character.image}
                  alt={character.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top brightness-95"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-red-950/40 text-red-400 font-gothic text-2xl font-bold">
                  †
                </div>
              )}
              <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-black/85 rounded text-[8px] font-mono text-red-400 border border-red-500/40 font-bold">
                {character.status}
              </div>
            </div>

            <div className="text-center sm:text-left space-y-1 flex-1">
              <span className="font-gothic text-[10px] text-red-400 uppercase tracking-widest block font-bold">
                {character.role}
              </span>
              <h2 className="font-gothic text-xl sm:text-2xl font-bold text-neutral-100">
                {character.name}
              </h2>
              <p className="font-quote italic text-xs sm:text-sm text-neutral-300">
                Alias: «{character.alias}»
              </p>

              {/* Affinity Meter */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[10px] text-neutral-400 font-sans-ui mb-1">
                  <span>Nivel de Afinidad & Confianza:</span>
                  <span className="font-bold text-amber-400">{character.affinity || 50}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-white/10 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 via-red-500 to-amber-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                    style={{ width: `${character.affinity || 50}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Trust feedback flash banner */}
          {trustMessage && (
            <div className="p-3 bg-red-950/90 border border-red-500/80 rounded-lg text-red-200 text-xs font-quote italic shadow-lg animate-fadeIn flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-400 fill-red-400 shrink-0 animate-bounce" />
              <span>«{trustMessage}»</span>
            </div>
          )}

          {/* Canonical Quote */}
          <blockquote className="p-3.5 bg-[#120e17] border-l-4 border-red-500 rounded-r-lg font-quote text-xs sm:text-sm italic text-neutral-200 shadow-md">
            “{character.quote}”
          </blockquote>

          {/* Voice Audio & Trust Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleToggleVoiceAudio}
              className={`flex-1 py-2.5 px-3 border rounded-lg text-xs font-gothic uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer font-bold shadow ${
                isPlayingVoice 
                  ? 'bg-red-950 border-red-500 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                  : 'bg-[#15111c] hover:bg-[#201a2b] border-white/15 text-neutral-200 hover:text-white'
              }`}
            >
              {isPlayingVoice ? (
                <>
                  <Pause className="w-4 h-4 text-red-400 animate-pulse" />
                  <span>Pausar Voz</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-neutral-400" />
                  <span>Escuchar Voz</span>
                </>
              )}
            </button>

            <button
              onClick={handleIncreaseAffinity}
              className="flex-1 py-2.5 px-3 bg-gradient-to-r from-red-950/80 to-amber-950/80 hover:from-red-900 hover:to-amber-900 border border-red-500/40 text-red-200 text-xs font-gothic uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-bold shadow hover:scale-[1.02]"
            >
              <Heart className="w-4 h-4 text-red-400 fill-red-400/40" />
              <span>Ofrecer Confianza (+5%)</span>
            </button>
          </div>

          {/* Voice Audio Playback Bar if Playing */}
          {isPlayingVoice && character.voiceAudioUrl && (
            <div className="p-2.5 bg-black/60 border border-red-500/40 rounded-lg space-y-1">
              <div className="flex items-center justify-between text-[10px] font-mono text-red-300">
                <span>Reproduciendo archivo de voz del personaje...</span>
                <span>{voiceDuration ? `${Math.round(voiceDuration)}s` : 'En vivo'}</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 transition-all duration-100" 
                  style={{ width: `${voiceProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Biography & Background */}
          <div className="space-y-3 bg-[#0e0c14] p-4 rounded-xl border border-white/5">
            <div>
              <h4 className="font-gothic text-xs font-bold uppercase tracking-wider text-red-400 mb-1.5 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-red-400" />
                Biografía
              </h4>
              <p className="font-quote text-xs sm:text-sm text-neutral-300 leading-relaxed text-justify">
                {character.description}
              </p>
            </div>

            {character.background && (
              <div className="pt-2 border-t border-white/5">
                <h4 className="font-gothic text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  Antecedentes & Expediente Eclesiástico
                </h4>
                <p className="font-quote text-xs sm:text-sm text-neutral-300 leading-relaxed text-justify italic">
                  {character.background}
                </p>
              </div>
            )}
          </div>

          {/* Documented Secrets & Confessions */}
          <div className="space-y-3.5">
            {/* Secrets */}
            {character.secrets && character.secrets.length > 0 && (
              <div>
                <h4 className="font-gothic text-xs font-bold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-red-400" />
                  Secretos Documentados
                </h4>
                <ul className="space-y-1.5 text-xs text-neutral-300 font-sans-ui">
                  {character.secrets.map((sec, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-[#120e17] p-2.5 rounded-lg border border-red-950/80">
                      <span className="text-red-500 font-bold">•</span>
                      <span>{sec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Confessions under vow */}
            {character.confessions && character.confessions.length > 0 && (
              <div>
                <h4 className="font-gothic text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Confesiones Bajo Voto
                </h4>
                <div className="space-y-2 font-quote text-xs sm:text-sm italic text-neutral-200">
                  {character.confessions.map((conf, idx) => (
                    <p key={idx} className="bg-[#120e17] p-3 rounded-lg border border-amber-500/20 text-neutral-200">
                      {conf}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Photo Archive / Evidence Gallery */}
          {character.photoGallery && character.photoGallery.length > 0 && (
            <div className="bg-[#0e0c14] p-4 rounded-xl border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="font-gothic text-xs font-bold uppercase tracking-wider text-neutral-200 flex items-center gap-1.5">
                  <FolderOpen className="w-4 h-4 text-amber-400" />
                  <span>Archivo Fotográfico & Galería de Evidencias</span>
                </h4>
                <span className="text-[10px] font-mono text-neutral-400">
                  {character.photoGallery.length} Fotografías
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {character.photoGallery.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => {
                      audioService.playClick(460);
                      setActivePhoto(photo);
                    }}
                    className="relative aspect-square rounded-lg overflow-hidden border border-white/15 bg-black cursor-pointer group hover:border-red-500 transition-all"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || 'Foto de evidencia'}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <span className="text-[9px] font-mono text-white truncate">
                        {photo.caption || 'Ver fotografía'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action to chat */}
          {onOpenChatWithCharacter && (
            <button
              onClick={() => {
                onClose();
                onOpenChatWithCharacter(character.id);
              }}
              className="w-full py-2.5 bg-gradient-to-r from-red-900 to-red-950 hover:from-red-800 hover:to-red-900 border border-red-500/40 text-white font-gothic text-xs uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer font-bold hover:scale-[1.01]"
            >
              <MessageCircle className="w-4 h-4" />
              Abrir Canal Cifrado con {character.name}
            </button>
          )}

        </div>

      </div>

      {/* Expanded Photo Lightbox Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-3 animate-fadeIn"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="relative max-w-2xl w-full bg-[#0d0a12] border border-red-950/80 rounded-xl overflow-hidden shadow-2xl p-3 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-2 right-2 p-1.5 bg-black/80 text-white rounded-full hover:bg-red-900 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={activePhoto.url}
              alt={activePhoto.caption || 'Foto'}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto object-contain rounded-lg border border-white/10"
            />

            <div className="w-full mt-3 p-3 bg-black/60 rounded-lg border border-white/5 text-center">
              <p className="font-gothic text-sm text-neutral-200 font-bold">
                {activePhoto.caption || 'Fotografía de Archivo'}
              </p>
              {activePhoto.date && (
                <span className="font-mono text-xs text-neutral-400 block mt-1">
                  Fecha del Registro: {activePhoto.date}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
