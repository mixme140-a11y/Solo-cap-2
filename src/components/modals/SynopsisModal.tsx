import React from 'react';
import { X, BookOpen, AlertTriangle } from 'lucide-react';
import { audioService } from '../../services/audioService';
import { GothicReaderFrame } from '../GothicReaderFrame';
import { useAdminData } from '../../services/adminStore';

interface SynopsisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartReading: () => void;
}

export const SynopsisModal: React.FC<SynopsisModalProps> = ({
  isOpen,
  onClose,
  onStartReading,
}) => {
  const { adminData } = useAdminData();
  const { synopsis, carouselSlides } = adminData;

  if (!isOpen) return null;

  const heroImage = carouselSlides[0]?.image || '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#08070a] border border-[#523d29]/60 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Minimal Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#3d2c1d]/40 bg-[#060507]">
          <div className="flex items-center gap-2">
            <span className="font-fraktur text-lg text-amber-500">†</span>
            <span className="font-gothic text-xs font-bold text-[#e6d5be] tracking-wider">
              Sinopsis Canónica Oficial
            </span>
          </div>

          <button
            id="btn-synopsis-close"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Parchment Area */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 bg-[#050406]">
          <GothicReaderFrame
            badge={synopsis.genre || "Sinopsis & Prólogo Canónico"}
            title={synopsis.title || "Cap 2 † SOLO"}
            subtitle={synopsis.subtitle || "La Crónica del Convento Santa Vita"}
            showCover={true}
            coverImage={heroImage}
          >
            {/* Meta details */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-amber-400/80 mb-4 pb-2 border-b border-[#3d2c1d]/40">
              <span>Autor: {synopsis.author}</span>
              <span>•</span>
              <span>Extensión: {synopsis.pageCount}</span>
            </div>

            {/* Lore Synopsis Text */}
            <div className="space-y-4 font-quote text-base sm:text-lg text-[#ded0be] leading-relaxed text-justify italic whitespace-pre-line">
              {synopsis.synopsis}
            </div>

            {/* In-lore quote */}
            <blockquote className="my-6 p-4 bg-black/70 border-l-2 border-amber-500/70 rounded-r font-quote text-sm sm:text-base text-[#c4b199] italic">
              {synopsis.mainQuote}
            </blockquote>

            {/* Trigger warnings if any */}
            {synopsis.triggerWarnings && synopsis.triggerWarnings.length > 0 && (
              <div className="mb-4 p-3 bg-red-950/30 border border-red-500/30 rounded text-xs text-red-300">
                <span className="font-bold flex items-center gap-1 mb-1 text-red-400 font-gothic">
                  <AlertTriangle className="w-3.5 h-3.5" /> Advertencias de lectura:
                </span>
                <p className="font-sans-ui text-[11px] text-red-300/80">
                  {synopsis.triggerWarnings.join(' • ')}
                </p>
              </div>
            )}

            {/* Start Reading Action Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  audioService.playBell(330);
                  onClose();
                  onStartReading();
                }}
                className="w-full py-3 bg-gradient-to-r from-[#5a1818] via-[#751f1f] to-[#451010] hover:from-[#751f1f] hover:to-[#5a1818] border border-[#a43b3b]/60 text-white font-gothic text-xs uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:shadow-[0_0_15px_rgba(200,50,50,0.4)]"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                Comenzar Lectura de Capítulo 2
              </button>
            </div>
          </GothicReaderFrame>
        </div>

      </div>
    </div>
  );
};
