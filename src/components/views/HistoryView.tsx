import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Lock, ArrowRight, Disc, Crosshair, CheckCircle2, Bookmark } from 'lucide-react';
import { HERO_ASSETS } from '../../data/loreData';
import { audioService } from '../../services/audioService';
import { useAdminData } from '../../services/adminStore';

interface HistoryViewProps {
  onOpenReader: (chapterId?: string) => void;
  onOpenTimeline: () => void;
  onOpenSynopsis: () => void;
  savedChapterId?: string;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  onOpenReader,
  onOpenTimeline,
  onOpenSynopsis,
  savedChapterId = 'cap-0',
}) => {
  const { adminData } = useAdminData();
  const chapters = adminData.chapters;
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('santa_vita_completed_chapters');
      if (saved) {
        setCompletedChapters(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="w-full px-4 py-6 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto space-y-6 pb-24">
      
      {/* View Header */}
      <div className="border-b border-white/10 pb-3">
        <span className="font-gothic text-xs text-red-400 uppercase tracking-widest block">
          Crónicas de Santa Vita
        </span>
        <h2 className="font-gothic text-2xl font-bold text-neutral-100">
          Capítulos & Manuscritos
        </h2>
        <p className="font-sans-ui text-xs text-neutral-400 mt-1">
          Todos los capítulos y textos del universo de Santa Vita guardados cronológicamente.
        </p>
      </div>

      {/* Quick Action Badges */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            audioService.playClick(440);
            onOpenSynopsis();
          }}
          className="p-3 bg-[#121217] border border-white/10 hover:border-white/25 rounded flex items-center gap-2.5 text-left cursor-pointer transition-all"
        >
          <Crosshair className="w-4 h-4 text-red-400" />
          <div>
            <span className="font-gothic text-xs font-bold text-neutral-200 block">Sinopsis</span>
            <span className="font-sans-ui text-[9px] text-neutral-500">Trama y antecedentes</span>
          </div>
        </button>

        <button
          onClick={() => {
            audioService.playClick(460);
            onOpenTimeline();
          }}
          className="p-3 bg-[#121217] border border-white/10 hover:border-white/25 rounded flex items-center gap-2.5 text-left cursor-pointer transition-all"
        >
          <Disc className="w-4 h-4 text-amber-400" />
          <div>
            <span className="font-gothic text-xs font-bold text-neutral-200 block">Línea de Tiempo</span>
            <span className="font-sans-ui text-[9px] text-neutral-500">1892 - Presente</span>
          </div>
        </button>
      </div>

      {/* Chapters List (Repositorio) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-gothic text-xs uppercase tracking-widest text-neutral-400">
            Archivo Canónico de Capítulos
          </h3>
          <span className="text-[10px] font-mono text-neutral-500">
            {chapters.length} Capítulos Registrados
          </span>
        </div>

        {chapters.map((ch) => {
          const isCompleted = completedChapters.includes(ch.id);
          const isCurrent = savedChapterId === ch.id;

          return (
            <div
              key={ch.id}
              className={`p-4 rounded-md border transition-all relative overflow-hidden ${
                isCurrent
                  ? 'bg-[#15151e] border-red-500/40 shadow-lg'
                  : ch.isUnlocked
                  ? 'bg-[#121218] border-white/10 hover:border-white/25'
                  : 'bg-black/30 border-white/5 opacity-60'
              }`}
            >
              {/* Highlight ribbon if current */}
              {isCurrent && (
                <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-red-900/90 border-b border-l border-red-500/50 text-[9px] font-mono text-red-200 tracking-wider">
                  Último Leído
                </div>
              )}

              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-fraktur text-lg text-red-500">
                    {ch.number === 0 ? 'Cap. 0 (Sinopsis)' : `Cap. ${ch.number}`}
                  </span>
                  {ch.part > 1 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-red-950/60 border border-red-500/30 text-red-300 rounded">
                      Parte {ch.part}
                    </span>
                  )}
                  {isCompleted && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> Leído
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[10px] font-sans-ui text-neutral-500">
                  <Clock className="w-3 h-3" />
                  {ch.estimatedReadTime}
                </div>
              </div>

              <h4 className="font-gothic text-base font-bold text-neutral-100 mb-1">
                {ch.title}
              </h4>

              <p className="font-quote text-sm text-neutral-400 italic mb-4 leading-relaxed">
                {ch.synopsis}
              </p>

              {ch.isUnlocked ? (
                <button
                  onClick={() => {
                    audioService.playBell(330);
                    onOpenReader(ch.id);
                  }}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 border font-gothic text-xs uppercase tracking-wider rounded transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-red-950 hover:bg-red-900 border-red-500/60 text-white font-bold'
                      : 'bg-[#1a1a24] hover:bg-red-950/60 border-white/15 text-neutral-200 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-red-400" />
                  {isCurrent ? 'Continuar Lectura' : 'Leer Capítulo'}
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
                  <Lock className="w-3.5 h-3.5" />
                  Próximamente disponible
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
