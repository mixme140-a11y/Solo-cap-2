import React from 'react';
import { 
  X, 
  Home, 
  BookOpen, 
  Users, 
  Church, 
  Star, 
  Radio, 
  Newspaper, 
  ShoppingCart, 
  Lock, 
  Sliders,
  Moon 
} from 'lucide-react';
import { ActiveTab } from '../../types';
import { audioService } from '../../services/audioService';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenRadio: () => void;
  onOpenNewspaper: () => void;
  onOpenStore: () => void;
  onOpenSecrets: () => void;
  onOpenReader: () => void;
  onOpenAdmin: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onOpenRadio,
  onOpenNewspaper,
  onOpenStore,
  onOpenSecrets,
  onOpenReader,
  onOpenAdmin,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-72 sm:w-80 max-w-[85vw] bg-[#0c0c10] border-r border-white/10 h-full flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
        
        {/* Top Branding */}
        <div>
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#08080a]">
            <div className="flex items-center gap-1.5">
              <span className="font-gothic text-lg font-bold text-neutral-300">Cap 2</span>
              <span className="text-red-500 font-bold">†</span>
              <span className="font-fraktur text-2xl text-neutral-100">SOLO</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Links Menu */}
          <div className="p-4 space-y-1">
            <span className="text-[9px] font-gothic uppercase tracking-widest text-neutral-500 block mb-2 px-2">
              Secciones del Portal
            </span>

            <button
              onClick={() => {
                onSelectTab('inicio');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-gothic uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
            >
              <Home className="w-4 h-4 text-red-500" />
              Inicio
            </button>

            <button
              onClick={() => {
                onSelectTab('historia');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-gothic uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-500" />
              Historia & Capítulos
            </button>

            <button
              onClick={() => {
                onSelectTab('personajes');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-gothic uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
            >
              <Users className="w-4 h-4 text-indigo-400" />
              Personajes
            </button>

            <button
              onClick={() => {
                onSelectTab('convento');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-gothic uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
            >
              <Church className="w-4 h-4 text-emerald-400" />
              Convento Santa Vita
            </button>

            <button
              onClick={() => {
                onSelectTab('extras');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-gothic uppercase tracking-wider text-neutral-300 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
            >
              <Star className="w-4 h-4 text-amber-400" />
              Extras & Periódico
            </button>
          </div>

          <div className="h-px bg-white/5 mx-4 my-2" />

          {/* Quick Interactive Actions */}
          <div className="p-4 space-y-1">
            <span className="text-[9px] font-gothic uppercase tracking-widest text-neutral-500 block mb-2 px-2">
              Acciones Inmediatas
            </span>

            <button
              onClick={() => {
                onClose();
                onOpenAdmin();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 bg-red-950/40 border border-red-500/30 rounded text-xs font-gothic text-red-300 hover:text-white hover:bg-red-900/60 transition-colors text-left cursor-pointer mb-2"
            >
              <Sliders className="w-4 h-4 text-red-400" />
              <span className="font-bold">Panel de Administrador</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenReader();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded text-xs font-gothic text-neutral-300 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-red-400" />
              Continuar Lectura Cap. 2
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenRadio();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded text-xs font-gothic text-neutral-300 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
            >
              <Radio className="w-4 h-4 text-amber-400" />
              Sintonizar Radio Santa Vita
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenNewspaper();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded text-xs font-gothic text-neutral-300 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
            >
              <Newspaper className="w-4 h-4 text-neutral-400" />
              Periódico: La Verdad
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenStore();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded text-xs font-gothic text-neutral-300 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-amber-500" />
              Tienda Oficial
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenSecrets();
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded text-xs font-gothic text-neutral-300 hover:text-white hover:bg-white/5 transition-colors text-left cursor-pointer"
            >
              <Lock className="w-4 h-4 text-red-500" />
              Archivos Secretos
            </button>
          </div>
        </div>

        {/* Footer info in Drawer */}
        <div className="p-4 border-t border-white/10 bg-[#08080a] space-y-3">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-indigo-400" /> Modo Nocturno
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">ACTIVO</span>
          </div>

          <div className="text-center text-[10px] text-neutral-600 font-sans-ui">
            Cap 2 SOLO • Convento Santa Vita<br />
            Versión 1.0.3 • Modo Editor Disponible
          </div>
        </div>

      </div>
    </div>
  );
};
