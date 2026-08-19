import React, { useState, useEffect, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward, 
  Heart, 
  List, 
  Radio,
  BookOpen,
  Music,
  Sparkles,
  Volume1,
  X
} from 'lucide-react';
import { audioService, AudioTrackInfo } from '../services/audioService';
import { HERO_ASSETS } from '../data/loreData';
import { useAdminData } from '../services/adminStore';
import { Chapter } from '../types';

interface GothicRadioPlayerProps {
  currentChapter?: Chapter;
  onSelectChapter?: (chapterId: string) => void;
  standalone?: boolean;
  className?: string;
}

export const GothicRadioPlayer: React.FC<GothicRadioPlayerProps> = ({
  currentChapter,
  onSelectChapter,
  standalone = false,
  className = '',
}) => {
  const { adminData } = useAdminData();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(() => audioService.getVolume());
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);
  const [playlistFilter, setPlaylistFilter] = useState<'all' | 'general' | 'chapters'>('all');
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);

  // Build unified playlist combining chapter tracks and radio broadcasts
  const playlist: AudioTrackInfo[] = useMemo(() => {
    const list: AudioTrackInfo[] = [];

    // In standalone mode (global radio), put general radio stations first
    if (standalone) {
      // Add radio frequencies
      adminData.radioTracks.forEach((rad, rIdx) => {
        const nextRad = adminData.radioTracks[rIdx + 1] || adminData.radioTracks[0];
        list.push({
          id: rad.id,
          title: rad.name,
          author: `Frecuencia ${rad.frequency}`,
          audioUrl: rad.audioUrl,
          theme: rad.type,
          nextProgram: nextRad ? nextRad.name : 'Confesiones al Amanecer',
          nextAuthor: nextRad ? nextRad.frequency : 'Hermana Artemisa',
          broadcastNote: rad.description || 'Bienvenido a Radio Santa Vita, la voz del Convento. Aquí, la fe y la verdad se escuchan en cada palabra.',
        });
      });

      // Add chapters
      adminData.chapters.forEach((chap, idx) => {
        const nextChap = adminData.chapters[idx + 1] || adminData.chapters[0];
        list.push({
          id: chap.id,
          title: chap.audioTitle || (chap.number === 0 ? 'Sinopsis: Condena y Refugio' : chap.title),
          author: chap.audioAuthor || (chap.number === 0 ? 'Narración Canónica' : `Narración • Capítulo ${chap.number}`),
          audioUrl: chap.audioUrl,
          theme: chap.audioTheme || (idx % 2 === 0 ? 'organ' : 'chant'),
          nextProgram: chap.nextProgram || nextChap.title,
          nextAuthor: chap.nextHost || (nextChap.number === 0 ? 'Narración Canónica' : `Capítulo ${nextChap.number}`),
          broadcastNote: chap.broadcastNote || (chap.synopsis ? chap.synopsis.slice(0, 140) + '...' : 'Bienvenido a Radio Santa Vita, la voz del Convento. Aquí, la fe y la verdad se escuchan en cada palabra.'),
        });
      });
    } else {
      // In chapter reader mode, put chapters first
      adminData.chapters.forEach((chap, idx) => {
        const nextChap = adminData.chapters[idx + 1] || adminData.chapters[0];
        list.push({
          id: chap.id,
          title: chap.audioTitle || (chap.number === 0 ? 'Sinopsis: Condena y Refugio' : chap.title),
          author: chap.audioAuthor || (chap.number === 0 ? 'Narración Canónica' : `Narración • Capítulo ${chap.number}`),
          audioUrl: chap.audioUrl,
          theme: chap.audioTheme || (idx % 2 === 0 ? 'organ' : 'chant'),
          nextProgram: chap.nextProgram || nextChap.title,
          nextAuthor: chap.nextHost || (nextChap.number === 0 ? 'Narración Canónica' : `Capítulo ${nextChap.number}`),
          broadcastNote: chap.broadcastNote || (chap.synopsis ? chap.synopsis.slice(0, 140) + '...' : 'Bienvenido a Radio Santa Vita, la voz del Convento. Aquí, la fe y la verdad se escuchan en cada palabra.'),
        });
      });

      adminData.radioTracks.forEach((rad, rIdx) => {
        const nextRad = adminData.radioTracks[rIdx + 1] || adminData.radioTracks[0];
        list.push({
          id: rad.id,
          title: rad.name,
          author: `Frecuencia ${rad.frequency}`,
          audioUrl: rad.audioUrl,
          theme: rad.type,
          nextProgram: nextRad ? nextRad.name : 'Confesiones al Amanecer',
          nextAuthor: nextRad ? nextRad.frequency : 'Hermana Artemisa',
          broadcastNote: rad.description || 'Bienvenido a Radio Santa Vita, la voz del Convento. Aquí, la fe y la verdad se escuchan en cada palabra.',
        });
      });
    }

    return list;
  }, [adminData.chapters, adminData.radioTracks, standalone]);

  // If a currentChapter is passed, sync the active track to this chapter
  useEffect(() => {
    if (currentChapter) {
      const idx = playlist.findIndex((t) => t.id === currentChapter.id);
      if (idx !== -1) {
        setActiveTrackIndex(idx);
      }
    }
  }, [currentChapter, playlist]);

  // Subscribe to audio engine updates
  useEffect(() => {
    const unsubscribe = audioService.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setVolume(state.volume);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const activeTrack = playlist[activeTrackIndex] || playlist[0] || {
    id: 'default',
    title: 'Misa de Medianoche',
    author: 'Padre Lucien',
    theme: 'organ' as const,
    nextProgram: 'Confesiones al Amanecer',
    nextAuthor: 'Hermana Artemisa',
    broadcastNote: 'Bienvenido a Radio Santa Vita, la voz del Convento. Aquí, la fe y la verdad se escuchan en cada palabra.',
  };

  const handleTogglePlay = () => {
    audioService.playClick(500);
    audioService.togglePlay(activeTrack);
  };

  const handleNextTrack = () => {
    audioService.playClick(560);
    const nextIdx = (activeTrackIndex + 1) % playlist.length;
    setActiveTrackIndex(nextIdx);
    const nextTr = playlist[nextIdx];
    
    // If the next track corresponds to a chapter and callback provided
    if (onSelectChapter && nextTr.id.startsWith('cap-')) {
      onSelectChapter(nextTr.id);
    }
    if (isPlaying) {
      audioService.playTrack(nextTr);
    }
  };

  const handlePrevTrack = () => {
    audioService.playClick(440);
    const prevIdx = (activeTrackIndex - 1 + playlist.length) % playlist.length;
    setActiveTrackIndex(prevIdx);
    const prevTr = playlist[prevIdx];
    
    if (onSelectChapter && prevTr.id.startsWith('cap-')) {
      onSelectChapter(prevTr.id);
    }
    if (isPlaying) {
      audioService.playTrack(prevTr);
    }
  };

  const handleSelectTrack = (idx: number) => {
    audioService.playClick(520);
    setActiveTrackIndex(idx);
    const target = playlist[idx];
    if (onSelectChapter && target.id.startsWith('cap-')) {
      onSelectChapter(target.id);
    }
    audioService.playTrack(target);
    setShowPlaylist(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioService.setVolume(val);
  };

  const toggleMute = () => {
    audioService.playClick(400);
    if (volume > 0) {
      audioService.setVolume(0);
      setVolume(0);
    } else {
      audioService.setVolume(0.8);
      setVolume(0.8);
    }
  };

  return (
    <div className={`relative w-full select-none ${className}`}>
      {/* Ornate Outer Gothic Frame */}
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#0e0c12] via-[#09080c] to-[#040406] border-2 border-[#3d332a] shadow-[0_15px_45px_rgba(0,0,0,0.95),inset_0_1px_2px_rgba(255,255,255,0.1)] p-3 sm:p-5 md:p-6 overflow-hidden">
        
        {/* Ornate Corner Brackets (Baroque Carved Trim) */}
        <div className="absolute top-1.5 left-1.5 w-6 h-6 border-t-2 border-l-2 border-[#947c52] rounded-tl pointer-events-none opacity-80" />
        <div className="absolute top-1.5 right-1.5 w-6 h-6 border-t-2 border-r-2 border-[#947c52] rounded-tr pointer-events-none opacity-80" />
        <div className="absolute bottom-1.5 left-1.5 w-6 h-6 border-b-2 border-l-2 border-[#947c52] rounded-bl pointer-events-none opacity-80" />
        <div className="absolute bottom-1.5 right-1.5 w-6 h-6 border-b-2 border-r-2 border-[#947c52] rounded-br pointer-events-none opacity-80" />

        {/* Vintage Top Rim Inset Highlight */}
        <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#b89758]/50 to-transparent" />

        {/* ========================================================
            HEADER SECTION (Gothic Logo: SANT✞ VITA & Subtitle)
           ======================================================== */}
        <div className="text-center pb-4 sm:pb-5 pt-1 relative">
          <div className="flex items-center justify-center gap-2 text-[#a89060] text-[11px] sm:text-xs font-serif tracking-[0.3em] uppercase">
            <span className="text-amber-500">☩</span>
            <span className="font-gothic font-bold">RADIO</span>
            <span className="text-amber-500">☩</span>
          </div>

          <h2 className="font-gothic text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-[0.18em] text-[#d6c7a1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] my-0.5 sm:my-1 flex items-center justify-center gap-1.5">
            <span>SANT</span>
            <span className="text-amber-500 font-serif inline-block transform -translate-y-0.5 scale-110">✞</span>
            <span>VITA</span>
          </h2>

          <p className="font-serif text-[9px] sm:text-[11px] tracking-[0.28em] text-[#8e816a] uppercase font-medium">
            LA VERDAD NUNCA DESCANSA.
          </p>
        </div>

        {/* ========================================================
            MAIN BODY (3 Columns Layout: Left Info | Center Disc | Right Note)
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center my-2 sm:my-4">
          
          {/* LEFT COLUMN: Track Info, Equalizer, Next Up */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-3 sm:space-y-4 text-left order-2 lg:order-1 px-1">
            
            {/* Live Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-xs animate-pulse">☩</span>
              <span className="font-gothic text-[11px] sm:text-xs tracking-[0.2em] font-bold text-red-400 uppercase">
                {isPlaying ? 'EN VIVO' : 'SINTONÍA DISPONIBLE'}
              </span>
              <span className="text-red-500 text-xs animate-pulse">☩</span>
            </div>

            {/* Current Track / Chapter Title */}
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#e6ded0] tracking-wide line-clamp-1">
                {activeTrack.title}
              </h3>
              <p className="font-serif italic text-xs sm:text-sm text-[#9c917f] mt-0.5">
                {activeTrack.author}
              </p>
            </div>

            {/* Audio Waveform Equalizer Display */}
            <div className="w-full py-1">
              <div className="flex items-center justify-between gap-1 h-8 sm:h-9 px-1">
                {[12, 22, 38, 18, 48, 28, 60, 32, 75, 42, 90, 50, 70, 34, 55, 24, 68, 30, 45, 20, 35, 15, 28, 12].map((height, i) => {
                  const animatedHeight = isPlaying
                    ? Math.max(8, Math.min(36, (height / 100) * 36 * (0.5 + Math.sin((i + Date.now() / 200)) * 0.4 + 0.3)))
                    : 4;

                  return (
                    <div
                      key={i}
                      style={{
                        height: `${animatedHeight}px`,
                        transition: 'height 0.12s ease-in-out',
                      }}
                      className={`flex-1 rounded-full ${
                        isPlaying 
                          ? 'bg-gradient-to-t from-[#6e5836] via-[#c4a265] to-[#f3e1a9] shadow-[0_0_6px_rgba(218,177,98,0.4)]'
                          : 'bg-[#2b2620]'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Ornate Divider with cross */}
            <div className="relative flex items-center justify-center py-1">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#5c4a30] to-transparent" />
              <span className="absolute bg-[#09080c] px-2 text-[#947c52] text-[10px]">☩</span>
            </div>

            {/* Next Track Preview */}
            <div className="space-y-0.5">
              <span className="font-serif text-[10px] text-[#7a6e5b] tracking-widest uppercase flex items-center gap-1.5">
                <span className="text-amber-600">☩</span> A CONTINUACIÓN
              </span>
              <p className="font-serif text-xs font-semibold text-[#c7baa6] truncate">
                {activeTrack.nextProgram || 'Confesiones al Amanecer'}
              </p>
              <p className="font-serif italic text-[11px] text-[#807565]">
                {activeTrack.nextAuthor || 'Hermana Artemisa'}
              </p>
            </div>
          </div>

          {/* CENTER COLUMN: Medallion Portal with Cathedral Moon Artwork */}
          <div className="lg:col-span-4 flex items-center justify-center order-1 lg:order-2 my-2 lg:my-0">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
              
              {/* Outer Cross Arms (North, South, East, West) */}
              <div className="absolute -top-3 w-1.5 h-4 bg-gradient-to-b from-[#b89758] to-transparent rounded-full shadow-[0_0_8px_rgba(184,151,88,0.5)]" />
              <div className="absolute -bottom-3 w-1.5 h-4 bg-gradient-to-t from-[#b89758] to-transparent rounded-full shadow-[0_0_8px_rgba(184,151,88,0.5)]" />
              <div className="absolute -left-3 h-1.5 w-4 bg-gradient-to-r from-[#b89758] to-transparent rounded-full shadow-[0_0_8px_rgba(184,151,88,0.5)]" />
              <div className="absolute -right-3 h-1.5 w-4 bg-gradient-to-l from-[#b89758] to-transparent rounded-full shadow-[0_0_8px_rgba(184,151,88,0.5)]" />

              {/* Ornate Outer Compass Dial */}
              <div className="absolute inset-0 rounded-full border border-[#78613c]/60 shadow-[0_0_20px_rgba(0,0,0,0.8)]" />
              
              {/* Spinning/Pulsing Vinyl Ring with Gothic Medallion Border */}
              <div className={`relative w-40 h-40 sm:w-52 sm:h-52 rounded-full p-1.5 bg-gradient-to-br from-[#473b28] via-[#1a1610] to-[#0d0b08] border-2 border-[#947c52] shadow-[0_0_25px_rgba(0,0,0,0.9),inset_0_0_15px_rgba(0,0,0,0.9)] overflow-hidden flex items-center justify-center ${isPlaying ? 'ring-2 ring-[#c4a265]/40' : ''}`}>
                
                {/* Vinyl Texture Lines */}
                <div className="absolute inset-2 rounded-full border border-black/40 pointer-events-none" />
                <div className="absolute inset-4 rounded-full border border-[#947c52]/10 pointer-events-none" />

                {/* Cathedral Artwork Image */}
                <img
                  src={HERO_ASSETS.radioDisc || HERO_ASSETS.hero}
                  alt="Santa Vita Cathedral"
                  className={`w-full h-full object-cover rounded-full filter contrast-125 brightness-95 ${
                    isPlaying ? 'animate-[spin_40s_linear_infinite]' : ''
                  }`}
                />

                {/* Ambient Center Glow */}
                <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none rounded-full" />
                
                {/* Center Spindle Eye */}
                <div className="absolute w-5 h-5 rounded-full bg-[#12100d] border border-[#a89060] shadow-[0_0_8px_rgba(0,0,0,0.9)] flex items-center justify-center pointer-events-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#c4a265]" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sintonizando La Verdad & Volume Control */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4 text-center lg:text-right order-3 px-1">
            
            {/* Header: Sintonizando la Verdad */}
            <div>
              <h4 className="font-serif text-[11px] sm:text-xs tracking-[0.25em] text-[#a89060] font-bold uppercase">
                SINTONIZANDO LA VERDAD
              </h4>
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-[#5c4a30] lg:ml-auto mx-auto mt-1" />
            </div>

            {/* Sunken Parchment/Stone Inscription Box */}
            <div className="bg-[#0b0a0e] border border-[#2a241e] rounded-lg p-3 sm:p-4 text-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">
              <p className="font-serif italic text-xs sm:text-sm text-[#baa98e] leading-relaxed">
                “{activeTrack.broadcastNote || 'Bienvenido a Radio Santa Vita, la voz del Convento. Aquí, la fe y la verdad se escuchan en cada palabra.'}”
              </p>
            </div>

            {/* Volume Slider Section */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-center lg:justify-end gap-1.5 text-[10px] sm:text-[11px] font-serif text-[#9c8f7a] tracking-widest uppercase">
                <span>VOLÚMEN</span>
                <span className="font-mono text-[#c4a265] text-[10px]">({Math.round(volume * 100)}%)</span>
              </div>

              <div className="flex items-center justify-center lg:justify-end gap-2.5">
                <button
                  onClick={toggleMute}
                  className="text-[#947c52] hover:text-[#e8d5b5] transition-colors p-1 cursor-pointer"
                  title={volume === 0 ? 'Activar sonido' : 'Silenciar'}
                >
                  {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <div className="relative w-32 sm:w-36 flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1.5 bg-[#1f1b15] rounded-lg appearance-none cursor-pointer accent-[#b89758] focus:outline-none"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================
            BOTTOM CONTROL BAR (Gothic Buttons & Main Disc Player)
           ======================================================== */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 pt-3 sm:pt-4 border-t border-[#382e22]/80 mt-3 relative">
          
          {/* Favorite / Heart Plate */}
          <button
            onClick={() => {
              audioService.playClick(600);
              setIsLiked(!isLiked);
            }}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-b from-[#1c1813] to-[#0d0b08] border border-[#524330] shadow-[0_4px_10px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] flex items-center justify-center transition-transform active:scale-95 cursor-pointer hover:border-[#8f7547] ${
              isLiked ? 'text-red-500' : 'text-[#877864] hover:text-[#d6c7a1]'
            }`}
            title="Guardar en favoritos"
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </button>

          {/* Previous Track Button */}
          <button
            onClick={handlePrevTrack}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-b from-[#1c1813] to-[#0a0907] border border-[#5c4a30] text-[#baa98e] hover:text-[#f0e6d2] hover:border-[#a89060] shadow-[0_4px_10px_rgba(0,0,0,0.8)] flex items-center justify-center transition-all active:scale-90 cursor-pointer"
            title="Pista anterior"
          >
            <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* CENTRAL MASTER PLAY / PAUSE BUTTON */}
          <button
            onClick={handleTogglePlay}
            id="btn-gothic-radio-play"
            className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-b from-[#4a3c28] via-[#221c13] to-[#080705] border-2 border-[#a89060] shadow-[0_0_25px_rgba(184,151,88,0.3),0_8px_20px_rgba(0,0,0,0.9)] flex items-center justify-center transition-transform active:scale-95 cursor-pointer hover:border-[#d6c7a1]"
            title={isPlaying ? 'Pausar emisión' : 'Sintonizar emisión'}
          >
            {/* Inner Metallic Bevel Ring */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1c1813] to-[#0d0b08] border border-[#78613c] flex items-center justify-center group-hover:bg-[#252019] transition-colors">
              {isPlaying ? (
                <Pause className="w-6 h-6 sm:w-8 sm:h-8 text-[#e8d5b5] fill-[#e8d5b5]" />
              ) : (
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-[#e8d5b5] fill-[#e8d5b5] ml-1" />
              )}
            </div>

            {/* Cross Accent Flares on button */}
            <div className="absolute -top-1 w-1 h-2 bg-[#d6c7a1] rounded-full" />
            <div className="absolute -bottom-1 w-1 h-2 bg-[#d6c7a1] rounded-full" />
          </button>

          {/* Next Track Button */}
          <button
            onClick={handleNextTrack}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-b from-[#1c1813] to-[#0a0907] border border-[#5c4a30] text-[#baa98e] hover:text-[#f0e6d2] hover:border-[#a89060] shadow-[0_4px_10px_rgba(0,0,0,0.8)] flex items-center justify-center transition-all active:scale-90 cursor-pointer"
            title="Siguiente pista"
          >
            <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Playlist / Frequency List Toggle Plate */}
          <button
            onClick={() => {
              audioService.playClick(480);
              setShowPlaylist(!showPlaylist);
            }}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-b from-[#1c1813] to-[#0d0b08] border border-[#524330] shadow-[0_4px_10px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] flex items-center justify-center transition-transform active:scale-95 cursor-pointer hover:border-[#8f7547] ${
              showPlaylist ? 'border-[#c4a265] text-[#f3e1a9]' : 'text-[#877864] hover:text-[#d6c7a1]'
            }`}
            title="Lista de sintonías y capítulos"
          >
            <List className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* ========================================================
            PLAYLIST / CHAPTERS SELECTION OVERLAY DRAWER
           ======================================================== */}
        {showPlaylist && (
          <div className="mt-4 p-3 bg-[#0a090d] border border-[#423626] rounded-xl shadow-2xl space-y-2.5 animate-fadeIn max-h-72 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#2e261a] pb-2 px-1">
              <span className="font-gothic text-xs font-bold text-[#d6c7a1] tracking-wider uppercase flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-[#c4a265]" />
                Lista de Emisiones & Sintonías
              </span>
              <button
                onClick={() => setShowPlaylist(false)}
                className="text-[#807565] hover:text-[#e8d5b5] p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Category Filters inside the Drawer */}
            <div className="flex items-center gap-1.5 border-b border-white/5 pb-2">
              <button
                onClick={() => setPlaylistFilter('all')}
                className={`px-2.5 py-1 rounded text-[10px] font-gothic uppercase tracking-wider cursor-pointer ${
                  playlistFilter === 'all'
                    ? 'bg-[#3d3120] text-[#f3e1a9] font-bold border border-[#a89060]/50'
                    : 'bg-black/40 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Todas ({playlist.length})
              </button>
              <button
                onClick={() => setPlaylistFilter('general')}
                className={`px-2.5 py-1 rounded text-[10px] font-gothic uppercase tracking-wider cursor-pointer flex items-center gap-1 ${
                  playlistFilter === 'general'
                    ? 'bg-[#3d3120] text-[#f3e1a9] font-bold border border-[#a89060]/50'
                    : 'bg-black/40 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Radio className="w-2.5 h-2.5 text-amber-400" />
                <span>Radio General</span>
              </button>
              <button
                onClick={() => setPlaylistFilter('chapters')}
                className={`px-2.5 py-1 rounded text-[10px] font-gothic uppercase tracking-wider cursor-pointer flex items-center gap-1 ${
                  playlistFilter === 'chapters'
                    ? 'bg-[#3d3120] text-[#f3e1a9] font-bold border border-[#a89060]/50'
                    : 'bg-black/40 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <BookOpen className="w-2.5 h-2.5 text-red-400" />
                <span>Capítulos</span>
              </button>
            </div>

            <div className="space-y-1">
              {playlist
                .map((track, originalIdx) => ({ track, originalIdx }))
                .filter(({ track }) => {
                  if (playlistFilter === 'general') {
                    return adminData.radioTracks.some((r) => r.id === track.id);
                  }
                  if (playlistFilter === 'chapters') {
                    return adminData.chapters.some((c) => c.id === track.id);
                  }
                  return true;
                })
                .map(({ track, originalIdx }) => (
                  <button
                    key={track.id || originalIdx}
                    onClick={() => handleSelectTrack(originalIdx)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between text-xs font-serif transition-colors cursor-pointer ${
                      activeTrackIndex === originalIdx
                        ? 'bg-[#2b2317] border border-[#a89060]/60 text-[#f3e1a9] font-bold'
                        : 'bg-[#121015]/60 hover:bg-[#1c1822] text-[#9c8f7a] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-amber-500/80 text-[10px]">
                        {activeTrackIndex === originalIdx ? '▶' : '☩'}
                      </span>
                      <span className="truncate">{track.title}</span>
                    </div>
                    <span className="text-[10px] font-sans-ui text-[#6e6353] ml-2 shrink-0">
                      {track.author}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
