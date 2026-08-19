import React, { useState, useEffect } from 'react';
import { 
  X, 
  Volume2, 
  VolumeX, 
  BookMarked, 
  ChevronLeft, 
  ChevronRight, 
  Type, 
  Check, 
  Radio, 
  Play, 
  Pause, 
  Flame, 
  Bookmark, 
  Sparkles, 
  Music, 
  CheckCircle2, 
  Clock,
  RadioTower,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Chapter } from '../../types';
import { useAdminData } from '../../services/adminStore';
import { HERO_ASSETS } from '../../data/loreData';
import { audioService } from '../../services/audioService';
import { GothicReaderFrame } from '../GothicReaderFrame';
import { GothicRadioPlayer } from '../GothicRadioPlayer';

interface NovelReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialChapterId?: string;
  onUpdateChapterProgress?: (chapterId: string) => void;
  isRadioPlayingGlobal?: boolean;
  onToggleRadioGlobal?: () => void;
}

export const NovelReaderModal: React.FC<NovelReaderModalProps> = ({
  isOpen,
  onClose,
  initialChapterId = 'cap-0',
  onUpdateChapterProgress,
}) => {
  const { adminData } = useAdminData();
  const chapters = adminData.chapters;

  const [selectedChapterId, setSelectedChapterId] = useState<string>(initialChapterId);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [showTopRadio, setShowTopRadio] = useState<boolean>(true);
  const [completedChapters, setCompletedChapters] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('santa_vita_completed_chapters');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // When opened with a different chapterId
  useEffect(() => {
    if (isOpen && initialChapterId) {
      setSelectedChapterId(initialChapterId);
    }
  }, [initialChapterId, isOpen]);

  const handleSelectChapter = (chapterId: string) => {
    setSelectedChapterId(chapterId);
    try {
      localStorage.setItem('santa_vita_last_chapter', chapterId);
      localStorage.setItem('santa_vita_has_started', 'true');
    } catch {
      // ignore
    }
    if (onUpdateChapterProgress) {
      onUpdateChapterProgress(chapterId);
    }
  };

  if (!isOpen) return null;

  const currentChapter = chapters.find((c) => c.id === selectedChapterId) || chapters[0] || {
    id: 'cap-0',
    number: 0,
    title: 'Capítulo no disponible',
    subtitle: '',
    content: 'Texto en revisión...',
  };
  const currentIndex = chapters.findIndex((c) => c.id === selectedChapterId);

  const handleClose = () => {
    onClose();
  };

  const handleToggleCompleteChapter = (chapterId: string) => {
    audioService.playUnlock();
    setCompletedChapters((prev) => {
      const next = prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId];
      localStorage.setItem('santa_vita_completed_chapters', JSON.stringify(next));
      return next;
    });
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg sm:text-xl leading-relaxed';
      case 'xlarge':
        return 'text-xl sm:text-2xl leading-loose';
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  const isCompleted = completedChapters.includes(currentChapter.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#09080b] border-2 border-[#523d29]/70 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[96vh]">
        
        {/* Top App Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#3d2c1d]/60 bg-[#060507]">
          <div className="flex items-center gap-2">
            <span className="font-fraktur text-xl text-amber-500">†</span>
            <div>
              <span className="font-gothic text-xs font-bold text-[#e6d5be] tracking-wider block">
                Lector Canónico • Santa Vita
              </span>
              <span className="font-sans-ui text-[10px] text-[#9e8b75]">
                {currentChapter.subtitle || currentChapter.title}
              </span>
            </div>
          </div>

          {/* Reader Controls */}
          <div className="flex items-center gap-1.5">
            {/* Toggle Top Radio Bar */}
            <button
              onClick={() => setShowTopRadio(!showTopRadio)}
              title={showTopRadio ? 'Ocultar Radio Superior' : 'Mostrar Radio Superior'}
              className={`px-2.5 py-1 rounded-lg text-xs font-gothic tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer ${
                showTopRadio 
                  ? 'bg-amber-950/70 border border-amber-500/50 text-amber-300' 
                  : 'bg-black/40 border border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[10px] hidden sm:inline">Radio</span>
              {showTopRadio ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>

            {/* Font size toggle */}
            <button
              id="btn-reader-font-size"
              onClick={() => {
                audioService.playClick(440);
                setFontSize((prev) => (prev === 'normal' ? 'large' : prev === 'large' ? 'xlarge' : 'normal'));
              }}
              title="Cambiar tamaño de fuente"
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono"
            >
              <Type className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold text-amber-500/90">{fontSize}</span>
            </button>

            {/* Close */}
            <button
              id="btn-reader-close"
              onClick={handleClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chapter Selection Horizontal Strip */}
        <div className="px-4 py-2 bg-[#0c0a0e] border-b border-[#3d2c1d]/50 flex gap-2 overflow-x-auto shrink-0">
          {chapters.map((chap, idx) => {
            const isSelected = selectedChapterId === chap.id;
            const hasFinished = completedChapters.includes(chap.id);
            return (
              <button
                key={chap.id || idx}
                onClick={() => {
                  audioService.playClick(440);
                  handleSelectChapter(chap.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-gothic tracking-wider uppercase transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#5c1c1c] to-[#3a0d0d] border border-[#a43b3b]/70 text-white font-bold shadow-md'
                    : 'bg-black/40 border border-white/5 text-neutral-400 hover:text-white'
                }`}
              >
                {hasFinished ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Bookmark className="w-3 h-3 text-amber-500/70" />
                )}
                <span>
                  {chap.number === 0 ? 'Prólogo' : `Cap ${chap.number}`}
                </span>
                {chap.audioUrl && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="Audio narrado disponible" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-5 bg-[#050406] space-y-6">
          
          {/* ========================================================
              TOP GOTHIC RADIO PLAYER (Appears above the chapter)
             ======================================================== */}
          {showTopRadio && (
            <div className="w-full transition-all">
              <GothicRadioPlayer 
                currentChapter={currentChapter} 
                onSelectChapter={(id) => handleSelectChapter(id)}
              />
            </div>
          )}

          {/* ========================================================
              MANUSCRIPT FRAME & CHAPTER TEXT
             ======================================================== */}
          <GothicReaderFrame
            badge={currentChapter.number === 0 ? "Prólogo Canónico" : `Capítulo ${currentChapter.number}`}
            title={currentChapter.title}
            subtitle={currentChapter.subtitle}
            showCover={currentChapter.number === 0}
            coverImage={HERO_ASSETS.hero}
          >
            {/* Chapter Text */}
            <div className={`font-serif text-[#ded0be] ${getFontSizeClass()} text-justify space-y-4 leading-relaxed pt-2`}>
              {Array.isArray(currentChapter.content) ? (
                currentChapter.content.map((para, idx) => (
                  <p key={idx} className="whitespace-pre-line">
                    {para}
                  </p>
                ))
              ) : (
                <p className="whitespace-pre-line">{currentChapter.content}</p>
              )}
            </div>

            {/* In-lore Decorative Cross Divider */}
            <div className="my-8 flex items-center justify-center gap-3 text-amber-500/40">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/40" />
              <span className="font-fraktur text-lg text-amber-500">† † †</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/40" />
            </div>

            {/* Actions: Mark as Read & Pagination */}
            <div className="pt-4 space-y-4 border-t border-[#3d2c1d]/40">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <button
                  onClick={() => handleToggleCompleteChapter(currentChapter.id)}
                  className={`px-3.5 py-2 rounded text-xs font-gothic uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
                      : 'bg-black/60 border border-white/15 text-neutral-300 hover:text-white'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isCompleted ? 'Capítulo Marcado como Leído' : 'Marcar Capítulo como Leído'}</span>
                </button>

                <span className="text-[11px] font-mono text-neutral-500">
                  {currentIndex + 1} de {chapters.length} entregas
                </span>
              </div>

              {/* Prev / Next chapter navigation buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  disabled={currentIndex <= 0}
                  onClick={() => {
                    if (currentIndex > 0) {
                      audioService.playClick(380);
                      handleSelectChapter(chapters[currentIndex - 1].id);
                    }
                  }}
                  className={`py-2.5 px-3 rounded text-xs font-gothic uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
                    currentIndex > 0
                      ? 'bg-[#18151c] hover:bg-[#251f2b] border border-white/10 text-neutral-200 cursor-pointer'
                      : 'bg-black/30 border border-white/5 text-neutral-600 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                <button
                  disabled={currentIndex >= chapters.length - 1}
                  onClick={() => {
                    if (currentIndex < chapters.length - 1) {
                      audioService.playClick(440);
                      handleSelectChapter(chapters[currentIndex + 1].id);
                    }
                  }}
                  className={`py-2.5 px-3 rounded text-xs font-gothic uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
                    currentIndex < chapters.length - 1
                      ? 'bg-[#18151c] hover:bg-[#251f2b] border border-white/10 text-neutral-200 cursor-pointer'
                      : 'bg-black/30 border border-white/5 text-neutral-600 cursor-not-allowed'
                  }`}
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </GothicReaderFrame>
        </div>

      </div>
    </div>
  );
};
