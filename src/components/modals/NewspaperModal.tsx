import React from 'react';
import { X, Newspaper, Printer, ShieldAlert } from 'lucide-react';
import { NEWSPAPER_DATA, HERO_ASSETS } from '../../data/loreData';
import { audioService } from '../../services/audioService';

interface NewspaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewspaperModal: React.FC<NewspaperModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#141416] border border-amber-900/30 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-amber-900/20 bg-[#0c0c0e]">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-amber-500" />
            <div>
              <span className="font-gothic text-xs font-bold text-neutral-200 tracking-wider block">
                Archivo Periodístico • {NEWSPAPER_DATA.edition}
              </span>
              <span className="font-sans-ui text-[10px] text-neutral-400">
                {NEWSPAPER_DATA.date}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-print-newspaper"
              onClick={() => {
                audioService.playClick(440);
                window.print();
              }}
              title="Imprimir artículo"
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              id="btn-newspaper-close"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Newspaper Page Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#181714] text-neutral-300 space-y-6">
          
          {/* Newspaper Masthead */}
          <div className="text-center border-b-2 border-amber-950/60 pb-4">
            <div className="flex items-center justify-between text-[10px] uppercase font-serif tracking-widest text-amber-600/70 border-b border-amber-950/40 pb-1 mb-2">
              <span>Año XXXII • Nº 84</span>
              <span>Precio: 15 Céntimos</span>
              <span>Edición Regional</span>
            </div>
            <h1 className="font-fraktur text-4xl sm:text-5xl font-bold tracking-widest text-neutral-100 uppercase">
              Periódico La Verdad
            </h1>
            <p className="font-quote italic text-xs text-amber-500/80 mt-1">
              «La luz que ilumina lo que el silencio eclesiástico sepulta»
            </p>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h2 className="font-gothic text-xl sm:text-2xl font-bold text-neutral-100 tracking-wide leading-tight uppercase">
              {NEWSPAPER_DATA.headline}
            </h2>
            <p className="font-sans-ui text-xs sm:text-sm text-neutral-400 font-medium">
              {NEWSPAPER_DATA.subheadline}
            </p>
            <div className="text-[10px] text-amber-500/70 font-mono pt-1">
              {NEWSPAPER_DATA.author} • Enviado especial
            </div>
          </div>

          {/* Newspaper Image Clip */}
          <div className="w-full h-52 sm:h-64 rounded bg-black/60 border border-amber-950/40 overflow-hidden relative shadow-md">
            <img
              src={HERO_ASSETS.newspaper}
              alt="Recorte del Periódico La Verdad"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center sepia contrast-125 brightness-90"
            />
            <div className="absolute bottom-0 inset-x-0 bg-black/80 px-3 py-1.5 text-[10px] font-sans-ui text-neutral-400 italic">
              Fotografía tomada a las 02:40 a.m. desde la colina norte. Nótese el resplandor en la torre.
            </div>
          </div>

          {/* Article Text Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-quote text-sm sm:text-base leading-relaxed text-neutral-300">
            {NEWSPAPER_DATA.paragraphs.map((p, idx) => (
              <p key={idx} className="indent-4 text-justify">
                {p}
              </p>
            ))}
          </div>

          {/* Redacted / Classified Note */}
          <div className="p-4 bg-red-950/20 border-l-4 border-red-600 rounded-r text-xs font-sans-ui space-y-1">
            <div className="flex items-center gap-1.5 text-red-400 font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              Nota Confidencial de la Redacción
            </div>
            <p className="text-neutral-300">
              {NEWSPAPER_DATA.classifiedNote}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
