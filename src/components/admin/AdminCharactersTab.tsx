import React, { useState, useRef } from 'react';
import { 
  Users, 
  Plus, 
  Trash2, 
  Upload, 
  Volume2, 
  Play, 
  Pause, 
  Image as ImageIcon, 
  FolderOpen, 
  Shield, 
  Lock, 
  Sparkles, 
  Heart, 
  FileText,
  Eye,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import { Character, CharacterPhoto } from '../../types';
import { audioService } from '../../services/audioService';

interface AdminCharactersTabProps {
  characters: Character[];
  onChange: (updatedCharacters: Character[]) => void;
  onAutoSave?: () => void;
}

export const AdminCharactersTab: React.FC<AdminCharactersTabProps> = ({
  characters = [],
  onChange,
}) => {
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>(
    characters[0]?.id || ''
  );
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const currentCharacter = characters.find((c) => c.id === selectedCharacterId) || characters[0];

  // Helper to update the currently selected character
  const updateCurrentCharacter = (updates: Partial<Character>) => {
    if (!currentCharacter) return;
    const updatedList = characters.map((c) =>
      c.id === currentCharacter.id ? { ...c, ...updates } : c
    );
    onChange(updatedList);
  };

  // Helper to add a new character
  const handleAddNewCharacter = () => {
    audioService.playClick(500);
    const newId = `char-${Date.now().toString().slice(-4)}`;
    const newChar: Character = {
      id: newId,
      name: 'Nuevo Personaje de Santa Vita',
      role: 'Novicio / Residente',
      alias: 'El Testigo Oculto',
      quote: '«Las sombras no confiesan lo que la luz nunca vio.»',
      description: 'Expediente en proceso de redacción en los archivos eclesiásticos.',
      background: 'Ingresó recientemente al entorno del convento con motivos desconocidos.',
      secrets: [
        'Guarda un objeto no registrado entre sus pertenencias.'
      ],
      confessions: [
        '«He escuchado murmullos en el claustro tras el toque de queda.»'
      ],
      affinity: 50,
      trustQuote: 'Has ganado su gratitud y un voto de lealtad.',
      image: '',
      photoGallery: [],
      status: 'Activo'
    };
    const updated = [...characters, newChar];
    onChange(updated);
    setSelectedCharacterId(newId);
  };

  // Helper to delete a character
  const handleDeleteCharacter = (charId: string) => {
    if (characters.length <= 1) {
      alert('Debe existir al menos un personaje en la congregación.');
      return;
    }
    const target = characters.find((c) => c.id === charId);
    if (window.confirm(`¿Estás seguro de eliminar el personaje "${target?.name || charId}"?`)) {
      audioService.playBell(300);
      const updated = characters.filter((c) => c.id !== charId);
      onChange(updated);
      if (selectedCharacterId === charId) {
        setSelectedCharacterId(updated[0]?.id || '');
      }
    }
  };

  // Upload Character Portrait Image
  const handlePortraitUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updateCurrentCharacter({ image: reader.result });
          audioService.playClick(520);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload Character Voice Audio File
  const handleVoiceAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          updateCurrentCharacter({ voiceAudioUrl: reader.result });
          audioService.playBell(440);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Test Voice Audio Playback
  const toggleVoicePlayback = (url?: string) => {
    if (!url) {
      audioService.playBell(330);
      return;
    }
    if (playingVoiceId === currentCharacter?.id) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
      setPlayingVoiceId(null);
    } else {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      try {
        audioPlayerRef.current = new Audio(url);
        audioPlayerRef.current.onended = () => setPlayingVoiceId(null);
        audioPlayerRef.current.play();
        setPlayingVoiceId(currentCharacter?.id || null);
      } catch (e) {
        console.error('Error playing audio', e);
        audioService.playBell(330);
      }
    }
  };

  // Add Photo to Gallery
  const handleGalleryPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const currentPhotos = currentCharacter?.photoGallery || [];
          const newPhoto: CharacterPhoto = {
            id: `photo-${Date.now().toString().slice(-4)}`,
            url: reader.result,
            caption: 'Registro fotográfico confidencial',
            date: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })
          };
          updateCurrentCharacter({ photoGallery: [...currentPhotos, newPhoto] });
          audioService.playClick(480);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove Photo from Gallery
  const handleRemovePhoto = (photoId: string) => {
    const currentPhotos = currentCharacter?.photoGallery || [];
    updateCurrentCharacter({
      photoGallery: currentPhotos.filter((p) => p.id !== photoId)
    });
  };

  // Update Photo Caption/Date
  const handleUpdatePhoto = (photoId: string, updates: Partial<CharacterPhoto>) => {
    const currentPhotos = currentCharacter?.photoGallery || [];
    updateCurrentCharacter({
      photoGallery: currentPhotos.map((p) => (p.id === photoId ? { ...p, ...updates } : p))
    });
  };

  // Secret Items Helpers
  const handleAddSecret = () => {
    const currentSecrets = currentCharacter?.secrets || [];
    updateCurrentCharacter({
      secrets: [...currentSecrets, 'Nuevo secreto documentado en los archivos...']
    });
  };

  const handleUpdateSecret = (index: number, value: string) => {
    const currentSecrets = [...(currentCharacter?.secrets || [])];
    currentSecrets[index] = value;
    updateCurrentCharacter({ secrets: currentSecrets });
  };

  const handleRemoveSecret = (index: number) => {
    const currentSecrets = (currentCharacter?.secrets || []).filter((_, idx) => idx !== index);
    updateCurrentCharacter({ secrets: currentSecrets });
  };

  // Confession Items Helpers
  const handleAddConfession = () => {
    const currentConfessions = currentCharacter?.confessions || [];
    updateCurrentCharacter({
      confessions: [...currentConfessions, '«Nueva confesión bajo juramento de silencio...»']
    });
  };

  const handleUpdateConfession = (index: number, value: string) => {
    const currentConfessions = [...(currentCharacter?.confessions || [])];
    currentConfessions[index] = value;
    updateCurrentCharacter({ confessions: currentConfessions });
  };

  const handleRemoveConfession = (index: number) => {
    const currentConfessions = (currentCharacter?.confessions || []).filter((_, idx) => idx !== index);
    updateCurrentCharacter({ confessions: currentConfessions });
  };

  return (
    <div className="space-y-6">
      
      {/* Tab Top Explanation & Action */}
      <div className="bg-[#120e18] border border-red-500/30 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-gothic text-base sm:text-lg font-bold text-red-200 flex items-center gap-2">
            <Users className="w-5 h-5 text-red-400" />
            <span>Gestión & Edición de Personajes</span>
          </h3>
          <p className="text-xs text-neutral-400 font-sans-ui mt-1">
            Modifica retratos, audios de voz, biografías, antecedentes, confesiones bajo voto, secretos y galerías de fotos. Los lectores verán estos datos en la app.
          </p>
        </div>

        <button
          onClick={handleAddNewCharacter}
          className="px-4 py-2 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 border border-red-500/60 text-white rounded-lg text-xs font-gothic uppercase tracking-wider flex items-center gap-2 cursor-pointer font-bold shadow-lg hover:scale-105 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nuevo Personaje</span>
        </button>
      </div>

      {/* Main Two-Column Layout (Left: Character Selection & Status; Right: Detailed Editor) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Character List Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold px-1 flex items-center justify-between">
            <span>Expedientes ({characters.length})</span>
            <span className="text-[10px] text-red-400">Seleccionar para editar</span>
          </div>

          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {characters.map((char) => {
              const isSelected = char.id === selectedCharacterId;
              return (
                <div
                  key={char.id}
                  onClick={() => {
                    audioService.playClick(440);
                    setSelectedCharacterId(char.id);
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-red-950/80 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                      : 'bg-[#100d16] border-white/10 text-neutral-300 hover:bg-[#181320] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-12 h-14 rounded-lg bg-black/80 border border-white/15 overflow-hidden flex-shrink-0 relative">
                      {char.image ? (
                        <img
                          src={char.image}
                          alt={char.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-red-400 font-gothic text-sm font-bold bg-red-950/40">
                          †
                        </div>
                      )}
                      {char.voiceAudioUrl && (
                        <span className="absolute bottom-0.5 right-0.5 p-0.5 bg-black/80 text-red-400 rounded">
                          <Volume2 className="w-2 h-2" />
                        </span>
                      )}
                    </div>

                    <div className="overflow-hidden">
                      <div className="font-gothic text-xs font-bold truncate">
                        {char.name}
                      </div>
                      <div className="font-sans-ui text-[10px] text-neutral-400 truncate">
                        {char.role}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[8px] font-mono px-1 py-0.2 rounded border ${
                          char.status === 'Bajo Sospecha' 
                            ? 'bg-red-950 text-red-300 border-red-500/30'
                            : 'bg-black/60 text-neutral-400 border-white/10'
                        }`}>
                          {char.status}
                        </span>
                        {char.photoGallery && char.photoGallery.length > 0 && (
                          <span className="text-[8px] font-mono text-amber-400 flex items-center gap-0.5">
                            <ImageIcon className="w-2 h-2" />
                            {char.photoGallery.length} fotos
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {characters.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCharacter(char.id);
                      }}
                      className="p-1.5 text-neutral-500 hover:text-red-400 rounded-lg hover:bg-black/40 transition-colors"
                      title="Eliminar personaje"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Character Detailed Editor (8 cols) */}
        {currentCharacter ? (
          <div className="lg:col-span-8 bg-[#0f0c15] border border-red-950/90 rounded-xl p-4 sm:p-6 space-y-6 shadow-xl">
            
            {/* Header of Active Editor */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest block font-bold">
                  Editando Expediente de Personaje
                </span>
                <h4 className="font-gothic text-lg sm:text-xl font-bold text-neutral-100">
                  {currentCharacter.name}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-400 bg-black/60 px-2.5 py-1 rounded border border-white/10">
                  ID: {currentCharacter.id}
                </span>
              </div>
            </div>

            {/* Section 1: Basic Identity & Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-gothic uppercase tracking-wider text-neutral-300 mb-1">
                  Nombre Completo del Personaje *
                </label>
                <input
                  type="text"
                  value={currentCharacter.name}
                  onChange={(e) => updateCurrentCharacter({ name: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none"
                  placeholder="Ej: Hermana Artemisa"
                />
              </div>

              {/* Role / Ocupation */}
              <div>
                <label className="block text-xs font-gothic uppercase tracking-wider text-neutral-300 mb-1">
                  Rol / Cargo Eclesiástico *
                </label>
                <input
                  type="text"
                  value={currentCharacter.role}
                  onChange={(e) => updateCurrentCharacter({ role: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none"
                  placeholder="Ej: Guardiana de Secretos & Archivera"
                />
              </div>

              {/* Alias */}
              <div>
                <label className="block text-xs font-gothic uppercase tracking-wider text-neutral-300 mb-1">
                  Alias o Título Clandestino
                </label>
                <input
                  type="text"
                  value={currentCharacter.alias}
                  onChange={(e) => updateCurrentCharacter({ alias: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none"
                  placeholder="Ej: La Dama de la Cera Negra"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-gothic uppercase tracking-wider text-neutral-300 mb-1">
                  Estado Canónico del Personaje
                </label>
                <select
                  value={currentCharacter.status}
                  onChange={(e) => updateCurrentCharacter({ status: e.target.value as Character['status'] })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-lg text-sm text-white focus:border-red-500 focus:outline-none"
                >
                  <option value="Activo">Activo</option>
                  <option value="Bajo Sospecha">Bajo Sospecha</option>
                  <option value="Desaparecido">Desaparecido</option>
                  <option value="Fallecido">Fallecido</option>
                </select>
              </div>
            </div>

            {/* Section 2: Portrait Image & Voice Audio Uploads */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
              
              {/* Portrait Upload */}
              <div className="bg-[#14101c] p-3.5 rounded-xl border border-white/10 space-y-2.5">
                <label className="block text-xs font-gothic uppercase tracking-wider text-neutral-200 font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-amber-400" />
                    <span>Retrato / Foto Principal</span>
                  </span>
                  {currentCharacter.image && <span className="text-[10px] text-emerald-400 font-mono">Cargado</span>}
                </label>

                <div className="flex items-center gap-3">
                  <div className="w-16 h-20 rounded-lg bg-black/80 border border-white/15 overflow-hidden flex-shrink-0">
                    {currentCharacter.image ? (
                      <img
                        src={currentCharacter.image}
                        alt="Retrato"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs">
                        Sin foto
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 flex-1">
                    <label className="px-3 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-200 text-xs font-mono uppercase tracking-wider rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1.5 font-bold shadow">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Subir Retrato</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePortraitUpload}
                      />
                    </label>

                    <input
                      type="text"
                      value={currentCharacter.image || ''}
                      onChange={(e) => updateCurrentCharacter({ image: e.target.value })}
                      placeholder="O pegar URL de imagen..."
                      className="w-full px-2.5 py-1 bg-black/60 border border-white/10 rounded text-[11px] text-neutral-300 focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Voice Audio Upload & Test */}
              <div className="bg-[#14101c] p-3.5 rounded-xl border border-white/10 space-y-2.5">
                <label className="block text-xs font-gothic uppercase tracking-wider text-neutral-200 font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-red-400" />
                    <span>Audio de la Voz del Personaje</span>
                  </span>
                  {currentCharacter.voiceAudioUrl ? (
                    <span className="text-[10px] text-emerald-400 font-mono">Audio Activo</span>
                  ) : (
                    <span className="text-[10px] text-neutral-500 font-mono">Sin audio</span>
                  )}
                </label>

                <div className="space-y-2">
                  <div className="flex gap-2">
                    <label className="flex-1 px-3 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-200 text-xs font-mono uppercase tracking-wider rounded-lg cursor-pointer transition-all flex items-center justify-center gap-1.5 font-bold shadow">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Subir Audio (MP3/WAV)</span>
                      <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={handleVoiceAudioUpload}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => toggleVoicePlayback(currentCharacter.voiceAudioUrl)}
                      className={`px-3 py-1.5 border rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer font-bold ${
                        playingVoiceId === currentCharacter.id
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                          : 'bg-black/60 border-white/15 text-neutral-300 hover:text-white'
                      }`}
                      title="Probar reproducción"
                    >
                      {playingVoiceId === currentCharacter.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{playingVoiceId === currentCharacter.id ? 'Pausar' : 'Probar'}</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    value={currentCharacter.voiceAudioUrl || ''}
                    onChange={(e) => updateCurrentCharacter({ voiceAudioUrl: e.target.value })}
                    placeholder="O pegar URL de audio (MP3/WAV/AAC)..."
                    className="w-full px-2.5 py-1 bg-black/60 border border-white/10 rounded text-[11px] text-neutral-300 focus:border-red-500 focus:outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Section 3: Quotes & Trust Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
              {/* Canonical Quote */}
              <div>
                <label className="block text-xs font-gothic uppercase tracking-wider text-neutral-300 mb-1">
                  Cita Canónica Principal *
                </label>
                <textarea
                  rows={2}
                  value={currentCharacter.quote}
                  onChange={(e) => updateCurrentCharacter({ quote: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-lg text-xs font-quote italic text-white focus:border-red-500 focus:outline-none"
                  placeholder="Ej: «El silencio no es la ausencia de sonido; es el grito que nadie se atreve a pronunciar.»"
                />
              </div>

              {/* Trust Quote / Ofrecer Confianza */}
              <div>
                <label className="block text-xs font-gothic uppercase tracking-wider text-neutral-300 mb-1">
                  Frase al "Ofrecer Confianza"
                </label>
                <textarea
                  rows={2}
                  value={currentCharacter.trustQuote || ''}
                  onChange={(e) => updateCurrentCharacter({ trustQuote: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-lg text-xs font-quote italic text-white focus:border-red-500 focus:outline-none"
                  placeholder="Ej: «Has ganado la gratitud de la Hermana Artemisa. Te revelará un secreto más adelante.»"
                />
              </div>
            </div>

            {/* Section 4: Biography & Background */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div>
                <label className="block text-xs font-gothic uppercase tracking-wider text-neutral-300 mb-1 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-red-400" />
                  <span>Biografía del Personaje *</span>
                </label>
                <textarea
                  rows={3}
                  value={currentCharacter.description}
                  onChange={(e) => updateCurrentCharacter({ description: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-lg text-xs font-quote text-white focus:border-red-500 focus:outline-none"
                  placeholder="Descripción de su historia, personalidad y presencia en Santa Vita..."
                />
              </div>

              <div>
                <label className="block text-xs font-gothic uppercase tracking-wider text-neutral-300 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Antecedentes & Expediente Eclesiástico</span>
                </label>
                <textarea
                  rows={3}
                  value={currentCharacter.background || ''}
                  onChange={(e) => updateCurrentCharacter({ background: e.target.value })}
                  className="w-full px-3 py-2 bg-black/60 border border-white/15 rounded-lg text-xs font-quote text-white focus:border-red-500 focus:outline-none"
                  placeholder="Documentos sobre su llegada al convento, registros antiguos, lazos familiares o deudas..."
                />
              </div>
            </div>

            {/* Section 5: Documented Secrets Editor */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-gothic uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
                  <Lock className="w-4 h-4" />
                  <span>Secretos Documentados ({currentCharacter.secrets?.length || 0})</span>
                </label>
                <button
                  type="button"
                  onClick={handleAddSecret}
                  className="px-2 py-1 bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-200 text-[10px] font-mono uppercase tracking-wider rounded cursor-pointer transition-all flex items-center gap-1 font-bold"
                >
                  <Plus className="w-3 h-3" />
                  <span>+ Agregar Secreto</span>
                </button>
              </div>

              <div className="space-y-2">
                {(currentCharacter.secrets || []).map((sec, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-black/40 p-2 rounded-lg border border-white/10">
                    <span className="font-mono text-xs text-red-500 font-bold">#{idx + 1}</span>
                    <input
                      type="text"
                      value={sec}
                      onChange={(e) => handleUpdateSecret(idx, e.target.value)}
                      className="flex-1 px-2.5 py-1 bg-black/60 border border-white/10 rounded text-xs text-white focus:border-red-500 focus:outline-none font-sans-ui"
                      placeholder="Escribe el secreto documentado..."
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSecret(idx)}
                      className="p-1 text-neutral-500 hover:text-red-400 rounded hover:bg-red-950/40 transition-colors"
                      title="Eliminar secreto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6: Confessions Under Vow Editor */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-gothic uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Confesiones Bajo Voto ({currentCharacter.confessions?.length || 0})</span>
                </label>
                <button
                  type="button"
                  onClick={handleAddConfession}
                  className="px-2 py-1 bg-amber-950/60 hover:bg-amber-900 border border-amber-500/40 text-amber-200 text-[10px] font-mono uppercase tracking-wider rounded cursor-pointer transition-all flex items-center gap-1 font-bold"
                >
                  <Plus className="w-3 h-3" />
                  <span>+ Agregar Confesión</span>
                </button>
              </div>

              <div className="space-y-2">
                {(currentCharacter.confessions || []).map((conf, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-black/40 p-2 rounded-lg border border-white/10">
                    <span className="font-mono text-xs text-amber-500 font-bold mt-1">#{idx + 1}</span>
                    <textarea
                      rows={2}
                      value={conf}
                      onChange={(e) => handleUpdateConfession(idx, e.target.value)}
                      className="flex-1 px-2.5 py-1 bg-black/60 border border-white/10 rounded text-xs font-quote italic text-neutral-200 focus:border-amber-500 focus:outline-none"
                      placeholder="«Confesión bajo juramento eclesiástico...»"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveConfession(idx)}
                      className="p-1 text-neutral-500 hover:text-red-400 rounded hover:bg-red-950/40 transition-colors mt-1"
                      title="Eliminar confesión"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 7: Photo Archive / Carpeta de Fotos */}
            <div className="pt-2 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-gothic uppercase tracking-wider text-neutral-200 font-bold flex items-center gap-1.5">
                    <FolderOpen className="w-4 h-4 text-amber-400" />
                    <span>Archivo & Carpeta de Fotos de Evidencia ({currentCharacter.photoGallery?.length || 0})</span>
                  </label>
                  <p className="text-[10px] text-neutral-400 font-sans-ui mt-0.5">
                    Sube múltiples fotos de registros, pistas y escenas relacionadas a este personaje para que los lectores las exploren.
                  </p>
                </div>

                <label className="px-3 py-1.5 bg-gradient-to-r from-amber-950 to-red-950 hover:from-amber-900 hover:to-red-900 border border-amber-500/50 text-amber-200 text-xs font-mono uppercase tracking-wider rounded-lg cursor-pointer transition-all flex items-center gap-1.5 font-bold shadow shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>+ Subir Foto a Carpeta</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleGalleryPhotoUpload}
                  />
                </label>
              </div>

              {/* Photo Gallery Grid in Admin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {(currentCharacter.photoGallery || []).map((photo) => (
                  <div
                    key={photo.id}
                    className="bg-[#120e17] border border-white/15 rounded-xl overflow-hidden p-2 space-y-2 relative group shadow-md"
                  >
                    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden relative">
                      <img
                        src={photo.url}
                        alt={photo.caption || 'Foto'}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="absolute top-1.5 right-1.5 p-1 bg-red-950/90 text-red-200 rounded-md hover:bg-red-800 border border-red-500/50 transition-colors cursor-pointer shadow"
                        title="Eliminar foto de la carpeta"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <input
                        type="text"
                        value={photo.caption || ''}
                        onChange={(e) => handleUpdatePhoto(photo.id, { caption: e.target.value })}
                        placeholder="Leyenda / Título de la foto..."
                        className="w-full px-2 py-1 bg-black/60 border border-white/10 rounded text-[10px] text-white focus:border-amber-500 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={photo.date || ''}
                        onChange={(e) => handleUpdatePhoto(photo.id, { date: e.target.value })}
                        placeholder="Fecha / Época..."
                        className="w-full px-2 py-1 bg-black/60 border border-white/10 rounded text-[9px] font-mono text-neutral-400 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="lg:col-span-8 bg-[#0f0c15] border border-white/10 rounded-xl p-8 text-center text-neutral-400">
            Selecciona un personaje de la lista izquierda o crea uno nuevo.
          </div>
        )}

      </div>

    </div>
  );
};
