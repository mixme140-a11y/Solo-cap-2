import React from 'react';
import { 
  BookOpen, 
  Cross, 
  Radio, 
  Newspaper, 
  Sparkles, 
  Scroll, 
  Flame, 
  ShieldAlert,
  Feather,
  Eye,
  Volume2
} from 'lucide-react';
import { audioService } from '../services/audioService';

interface FeaturedContentProps {
  onOpenChapterSummary: () => void;
  onOpenArtemisaProfile: () => void;
  onListenRadio: () => void;
  onOpenNewspaper: () => void;
  isRadioPlaying?: boolean;
  currentChapterTitle?: string;
  currentChapterNumber?: number;
  currentChapterPart?: number;
}

export const FeaturedContent: React.FC<FeaturedContentProps> = ({
  onOpenChapterSummary,
  onOpenArtemisaProfile,
  onListenRadio,
  onOpenNewspaper,
  isRadioPlaying = false,
  currentChapterTitle = 'Ecos del Pasado',
  currentChapterNumber = 2,
  currentChapterPart = 4,
}) => {
  return (
    <section className="w-full px-4 py-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="mb-4">
        <h3 className="font-gothic text-xs font-semibold tracking-widest text-neutral-400 uppercase flex items-center gap-2">
          <span>Contenido Destacado</span>
          <span className="text-red-500 text-[10px]">†</span>
        </h3>
        <div className="w-full h-px bg-white/10 mt-1.5" />
      </div>

      {/* 4 Cards Grid - on mobile 2x2 or 4 scrollable cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        
        {/* Card 1: Capítulos (Repositorio de Capítulos) */}
        <div className="flex flex-col justify-between bg-gradient-to-b from-[#141018] to-[#0c0910] border border-red-950/80 hover:border-red-500/40 rounded-lg p-3 hover:shadow-[0_0_15px_rgba(220,38,38,0.15)] transition-all group">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="block font-gothic text-[9px] tracking-widest text-red-400 font-bold uppercase">
                Capítulos
              </span>
              <span className="text-[8px] font-mono bg-red-950/90 border border-red-500/40 text-red-300 px-1 py-0.2 rounded font-bold">
                Cap. {currentChapterNumber}
              </span>
            </div>

            {/* Gothic Thematic Icon Emblem */}
            <div className="w-full h-20 sm:h-24 rounded-lg bg-gradient-to-b from-red-950/40 via-black to-[#130d17] mb-2.5 border border-red-500/20 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-red-500/50 transition-all">
              <div className="absolute inset-0 bg-[radial-gradient(#2d1522_1px,transparent_1px)] [background-size:8px_8px] opacity-30" />
              <div className="w-10 h-10 rounded-full bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.25)] group-hover:scale-110 group-hover:text-red-200 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-gothic text-[8px] uppercase tracking-widest text-red-300/70 mt-1">
                Crónicas Sagradas
              </span>
            </div>

            <h4 className="font-gothic text-xs font-bold text-neutral-200 line-clamp-1 group-hover:text-red-200 transition-colors">
              {currentChapterTitle}
            </h4>
            <p className="font-sans-ui text-[10px] text-neutral-400 mb-3">
              Capítulo {currentChapterNumber} {currentChapterPart > 1 ? `- Parte ${currentChapterPart}` : ''}
            </p>
          </div>

          <button
            id="btn-featured-chapter"
            onClick={() => {
              audioService.playClick(400);
              onOpenChapterSummary();
            }}
            className="w-full py-1.5 px-2 bg-[#17131e] hover:bg-red-950/70 border border-red-900/40 hover:border-red-500/50 text-red-200 hover:text-white font-gothic text-[9px] tracking-wider uppercase rounded transition-all text-center cursor-pointer font-bold shadow"
          >
            Ver Capítulos
          </button>
        </div>

        {/* Card 2: Personaje Destacado (Hermana Artemisa) */}
        <div className="flex flex-col justify-between bg-gradient-to-b from-[#141018] to-[#0c0910] border border-red-950/80 hover:border-amber-500/40 rounded-lg p-3 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all group">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="block font-gothic text-[9px] tracking-widest text-neutral-400 uppercase font-bold">
                Personaje
              </span>
              <span className="text-[8px] font-mono bg-neutral-900 border border-white/10 text-neutral-400 px-1 py-0.2 rounded">
                Clausura
              </span>
            </div>

            {/* Gothic Thematic Icon Emblem */}
            <div className="w-full h-20 sm:h-24 rounded-lg bg-gradient-to-b from-amber-950/30 via-black to-[#130d17] mb-2.5 border border-amber-500/20 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-amber-500/50 transition-all">
              <div className="absolute inset-0 bg-[radial-gradient(#261d15_1px,transparent_1px)] [background-size:8px_8px] opacity-30" />
              <div className="w-10 h-10 rounded-full bg-amber-950/70 border border-amber-500/40 flex items-center justify-center text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)] group-hover:scale-110 group-hover:text-amber-200 transition-transform">
                <Cross className="w-5 h-5" />
              </div>
              <span className="font-gothic text-[8px] uppercase tracking-widest text-amber-300/70 mt-1">
                Voto de Silencio
              </span>
            </div>

            <h4 className="font-gothic text-xs font-bold text-neutral-200 line-clamp-1 group-hover:text-amber-200 transition-colors">
              Hermana Artemisa
            </h4>
            <p className="font-sans-ui text-[10px] text-neutral-400 mb-3 line-clamp-1">
              Confesiones y secretos.
            </p>
          </div>

          <button
            id="btn-featured-character"
            onClick={() => {
              audioService.playClick(440);
              onOpenArtemisaProfile();
            }}
            className="w-full py-1.5 px-2 bg-[#17131e] hover:bg-amber-950/60 border border-amber-900/40 hover:border-amber-500/50 text-amber-200 hover:text-white font-gothic text-[9px] tracking-wider uppercase rounded transition-all text-center cursor-pointer font-bold shadow"
          >
            Ver Perfil
          </button>
        </div>

        {/* Card 3: Radio Santa Vita (En Vivo) */}
        <div className="flex flex-col justify-between bg-gradient-to-b from-[#141018] to-[#0c0910] border border-red-950/80 hover:border-red-500/40 rounded-lg p-3 hover:shadow-[0_0_15px_rgba(220,38,38,0.15)] transition-all group">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="block font-gothic text-[9px] tracking-widest text-neutral-400 uppercase font-bold">
                Radio Santa Vita
              </span>
              {/* En Vivo Badge */}
              <div className="flex items-center gap-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600"></span>
                </span>
                <span className="font-mono text-[8px] font-bold text-red-400 uppercase tracking-wider">
                  En Vivo
                </span>
              </div>
            </div>

            {/* Gothic Thematic Icon / Waveform Emblem */}
            <div className="w-full h-20 sm:h-24 rounded-lg bg-gradient-to-b from-red-950/30 via-black to-[#130d17] mb-2.5 border border-red-500/20 p-2 flex flex-col justify-between relative overflow-hidden group-hover:border-red-500/50 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-red-300">
                  <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                  <span className="font-mono text-[9px] font-bold">98.4 FM</span>
                </div>
                <Volume2 className="w-3.5 h-3.5 text-neutral-400" />
              </div>

              {/* Audio Waveform visualization */}
              <div className="flex items-end justify-between gap-0.5 h-6 px-1 my-auto">
                {[6, 14, 8, 18, 10, 20, 7, 16, 9, 19, 8, 13].map((height, i) => (
                  <div
                    key={i}
                    style={{
                      height: isRadioPlaying ? `${height}px` : '4px',
                      animation: isRadioPlaying ? `subtlePulse ${0.35 + (i % 4) * 0.15}s infinite alternate` : 'none'
                    }}
                    className="w-1 bg-red-500/85 rounded-full transition-all duration-200"
                  />
                ))}
              </div>

              <span className="font-gothic text-[8px] text-center text-neutral-400 uppercase tracking-widest block truncate">
                Misa de Medianoche
              </span>
            </div>

            <h4 className="font-gothic text-xs font-bold text-neutral-200 line-clamp-1 group-hover:text-red-200 transition-colors">
              Misa de Medianoche
            </h4>
            <p className="font-sans-ui text-[10px] text-neutral-400 mb-3">
              Padre Lucien
            </p>
          </div>

          <button
            id="btn-featured-radio"
            onClick={() => {
              audioService.playClick(480);
              onListenRadio();
            }}
            className="w-full py-1.5 px-2 bg-[#17131e] hover:bg-red-950/70 border border-red-900/40 hover:border-red-500/50 text-red-200 hover:text-white font-gothic text-[9px] tracking-wider uppercase rounded transition-all text-center cursor-pointer font-bold shadow"
          >
            {isRadioPlaying ? 'Pausar Radio' : 'Escuchar'}
          </button>
        </div>

        {/* Card 4: Periódico: La Verdad */}
        <div className="flex flex-col justify-between bg-gradient-to-b from-[#141018] to-[#0c0910] border border-red-950/80 hover:border-emerald-500/40 rounded-lg p-3 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all group">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="block font-gothic text-[9px] tracking-widest text-neutral-400 uppercase font-bold">
                Periódico
              </span>
              <span className="text-[8px] font-mono bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 px-1 py-0.2 rounded font-bold">
                La Verdad
              </span>
            </div>

            {/* Gothic Thematic Icon Emblem */}
            <div className="w-full h-20 sm:h-24 rounded-lg bg-gradient-to-b from-emerald-950/30 via-black to-[#130d17] mb-2.5 border border-emerald-500/20 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-emerald-500/50 transition-all">
              <div className="absolute inset-0 bg-[radial-gradient(#15241b_1px,transparent_1px)] [background-size:8px_8px] opacity-30" />
              <div className="w-10 h-10 rounded-full bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)] group-hover:scale-110 group-hover:text-emerald-200 transition-transform">
                <Newspaper className="w-5 h-5" />
              </div>
              <span className="font-gothic text-[8px] uppercase tracking-widest text-emerald-300/70 mt-1">
                Edición de Medianoche
              </span>
            </div>

            <h4 className="font-gothic text-[11px] font-bold text-neutral-200 line-clamp-1 group-hover:text-emerald-200 transition-colors">
              Convento Santa Vita
            </h4>
            <p className="font-sans-ui text-[9px] text-neutral-400 mb-3 line-clamp-1">
              niega rumores sobre actividades
            </p>
          </div>

          <button
            id="btn-featured-newspaper"
            onClick={() => {
              audioService.playClick(420);
              onOpenNewspaper();
            }}
            className="w-full py-1.5 px-2 bg-[#17131e] hover:bg-emerald-950/60 border border-emerald-900/40 hover:border-emerald-500/50 text-emerald-200 hover:text-white font-gothic text-[9px] tracking-wider uppercase rounded transition-all text-center cursor-pointer font-bold shadow"
          >
            Leer Periódico
          </button>
        </div>

      </div>
    </section>
  );
};
