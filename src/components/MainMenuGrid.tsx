import React from 'react';
import { 
  Crosshair, 
  Disc, 
  Map as MapIcon, 
  Radio, 
  Newspaper, 
  ShoppingCart, 
  MessageSquare, 
  FileText 
} from 'lucide-react';
import { audioService } from '../services/audioService';

interface MainMenuGridProps {
  onOpenSynopsis: () => void;
  onOpenTimeline: () => void;
  onOpenMap: () => void;
  onOpenRadio: () => void;
  onOpenNewspaper: () => void;
  onOpenStore: () => void;
  onOpenChat: () => void;
  onOpenSecretFiles: () => void;
}

export const MainMenuGrid: React.FC<MainMenuGridProps> = ({
  onOpenSynopsis,
  onOpenTimeline,
  onOpenMap,
  onOpenRadio,
  onOpenNewspaper,
  onOpenStore,
  onOpenChat,
  onOpenSecretFiles,
}) => {
  const menuItems = [
    {
      id: 'btn-menu-sinopsis',
      label: 'SINOPSIS',
      icon: Crosshair,
      onClick: onOpenSynopsis,
      soundPitch: 400,
    },
    {
      id: 'btn-menu-linea-tiempo',
      label: 'LÍNEA DE TIEMPO',
      icon: Disc,
      onClick: onOpenTimeline,
      soundPitch: 440,
    },
    {
      id: 'btn-menu-mapa',
      label: 'MAPA INTERACTIVO',
      icon: MapIcon,
      onClick: onOpenMap,
      soundPitch: 480,
    },
    {
      id: 'btn-menu-radio',
      label: 'RADIO SANTA VITA',
      icon: Radio,
      onClick: onOpenRadio,
      soundPitch: 520,
    },
    {
      id: 'btn-menu-periodico',
      label: 'PERIÓDICO',
      icon: Newspaper,
      onClick: onOpenNewspaper,
      soundPitch: 420,
    },
    {
      id: 'btn-menu-tienda',
      label: 'TIENDA OFICIAL',
      icon: ShoppingCart,
      onClick: onOpenStore,
      soundPitch: 460,
    },
    {
      id: 'btn-menu-chat',
      label: 'CHAT SEGURO',
      icon: MessageSquare,
      onClick: onOpenChat,
      soundPitch: 500,
    },
    {
      id: 'btn-menu-archivos',
      label: 'ARCHIVOS SECRETOS',
      icon: FileText,
      onClick: onOpenSecretFiles,
      soundPitch: 380,
    },
  ];

  return (
    <section className="w-full px-4 py-5 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="mb-4">
        <h3 className="font-gothic text-xs font-semibold tracking-widest text-neutral-400 uppercase">
          Menú Principal
        </h3>
        <div className="w-full h-px bg-white/10 mt-1.5" />
      </div>

      {/* 2x4 Grid of Tiles */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              id={item.id}
              onClick={() => {
                audioService.playClick(item.soundPitch);
                item.onClick();
              }}
              className="group flex flex-col items-center justify-center p-2.5 sm:p-3.5 bg-[#121216]/70 hover:bg-[#1c1c22]/90 border border-white/10 hover:border-white/25 rounded-sm transition-all duration-200 text-center min-h-[82px] sm:min-h-[96px] cursor-pointer"
            >
              <div className="text-neutral-400 group-hover:text-neutral-100 group-hover:scale-110 transition-all mb-2">
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
              </div>
              <span className="font-gothic text-[9px] sm:text-[10px] font-medium tracking-wider text-neutral-300 group-hover:text-white leading-tight uppercase line-clamp-2">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
