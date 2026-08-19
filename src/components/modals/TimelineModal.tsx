import React from 'react';
import { X, Disc, Calendar, Clock } from 'lucide-react';
import { TIMELINE_EVENTS } from '../../data/loreData';
import { audioService } from '../../services/audioService';

interface TimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TimelineModal: React.FC<TimelineModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0d0d11] border border-white/15 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#08080a]">
          <div className="flex items-center gap-2">
            <Disc className="w-5 h-5 text-red-500" />
            <div>
              <span className="font-gothic text-xs font-bold text-neutral-200 tracking-wider block">
                Línea de Tiempo Canónica
              </span>
              <span className="font-sans-ui text-[10px] text-neutral-400">
                Cronología de Acontecimientos de Santa Vita
              </span>
            </div>
          </div>

          <button
            id="btn-timeline-close"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Timeline Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0f0f13]">
          <div className="relative border-l-2 border-red-950/80 ml-3 pl-6 space-y-8">
            {TIMELINE_EVENTS.map((event) => (
              <div key={event.id} className="relative group">
                {/* Node Dot */}
                <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#181822] border-2 border-red-500 group-hover:bg-red-600 transition-colors" />

                <div className="bg-[#14141c] p-4 rounded-md border border-white/10 group-hover:border-white/25 transition-all">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      {event.year}
                    </span>
                    <span
                      className={`text-[9px] font-sans-ui uppercase px-2 py-0.5 rounded ${
                        event.impactLevel === 'Clave'
                          ? 'bg-red-950 text-red-300 border border-red-800'
                          : event.impactLevel === 'Tragedia'
                          ? 'bg-purple-950 text-purple-300 border border-purple-800'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {event.impactLevel}
                    </span>
                  </div>

                  <h4 className="font-gothic text-base font-bold text-neutral-100 mb-1">
                    {event.title}
                  </h4>
                  <p className="font-quote text-sm sm:text-base text-neutral-300 italic leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
