import React from 'react';
import { X, Shield, Award, BookOpen, Flame, Lock, Key, Heart } from 'lucide-react';
import { HERO_ASSETS } from '../../data/loreData';
import { audioService } from '../../services/audioService';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStore: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenStore,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#0d0d11] border border-white/15 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#08080a]">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-500" />
            <span className="font-gothic text-xs font-bold text-neutral-200 tracking-wider">
              Dossier del Investigador
            </span>
          </div>

          <button
            id="btn-profile-close"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#0f0f13]">
          
          {/* Avatar & Name */}
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-[#1c1826] to-[#0d0a14] border-2 border-red-500/60 ring-2 ring-black shadow-[0_0_20px_rgba(220,38,38,0.3)] flex-shrink-0 flex items-center justify-center text-red-400">
              <span className="font-gothic text-4xl font-bold tracking-wider select-none text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                ?
              </span>
            </div>

            <div>
              <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest block">
                Investigador Autorizado • Rango II
              </span>
              <h3 className="font-gothic text-xl font-bold text-neutral-100 flex items-center gap-2">
                <span>Identidad Clasificada</span>
                <span className="text-xs font-mono text-neutral-500">[N/A]</span>
              </h3>
              <p className="font-quote italic text-xs text-neutral-400">
                «Expediente Reservado • Sujeto Anónimo»
              </p>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 bg-[#14141c] border border-white/10 rounded text-center">
              <BookOpen className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <span className="font-mono text-sm font-bold text-neutral-100 block">Cap. 2</span>
              <span className="font-sans-ui text-[9px] text-neutral-500 uppercase">Progreso</span>
            </div>

            <div className="p-3 bg-[#14141c] border border-white/10 rounded text-center">
              <Lock className="w-4 h-4 text-red-400 mx-auto mb-1" />
              <span className="font-mono text-sm font-bold text-neutral-100 block">3 / 5</span>
              <span className="font-sans-ui text-[9px] text-neutral-500 uppercase">Secretos</span>
            </div>

            <div className="p-3 bg-[#14141c] border border-white/10 rounded text-center">
              <Flame className="w-4 h-4 text-amber-500 mx-auto mb-1" />
              <span className="font-mono text-sm font-bold text-neutral-100 block">120</span>
              <span className="font-sans-ui text-[9px] text-neutral-500 uppercase">Puntos Fe</span>
            </div>
          </div>

          {/* Relics & Badges */}
          <div className="space-y-2">
            <h4 className="font-gothic text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              Reliquias & Pases Desbloqueados
            </h4>

            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2.5 bg-black/50 border border-white/10 rounded">
                <span className="text-xl text-amber-400 font-bold">†</span>
                <div>
                  <span className="font-gothic text-xs font-bold text-neutral-200 block">
                    Rosario de Obsidiana
                  </span>
                  <span className="font-sans-ui text-[10px] text-neutral-400">
                    Otorga inmunidad auditiva ante los salmos invertidos.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 bg-black/50 border border-white/10 rounded">
                <Key className="w-5 h-5 text-red-400" />
                <div>
                  <span className="font-gothic text-xs font-bold text-neutral-200 block">
                    Llave Forjada de la Cripta
                  </span>
                  <span className="font-sans-ui text-[10px] text-neutral-400">
                    Permite abrir sarcófagos del siglo XIX.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={() => {
              audioService.playClick(440);
              onClose();
              onOpenStore();
            }}
            className="w-full py-2.5 bg-[#171722] hover:bg-[#20202e] border border-white/15 text-neutral-200 font-gothic text-xs uppercase tracking-wider rounded transition-colors text-center cursor-pointer"
          >
            Adquirir Más Reliquias en la Tienda
          </button>

        </div>

      </div>
    </div>
  );
};
