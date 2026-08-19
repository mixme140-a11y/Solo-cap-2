import React from 'react';
import { MessageSquare, Map as MapIcon, ShoppingCart, FileText, ChevronRight } from 'lucide-react';
import { audioService } from '../services/audioService';

interface QuickAccessProps {
  onOpenChat: () => void;
  onOpenMap: () => void;
  onOpenStore: () => void;
  onOpenSecretFiles: () => void;
}

export const QuickAccess: React.FC<QuickAccessProps> = ({
  onOpenChat,
  onOpenMap,
  onOpenStore,
  onOpenSecretFiles,
}) => {
  const items = [
    {
      id: 'btn-quick-chat',
      label: 'Chat Seguro',
      icon: MessageSquare,
      onClick: onOpenChat,
      pitch: 440,
    },
    {
      id: 'btn-quick-map',
      label: 'Mapa Interactivo',
      icon: MapIcon,
      onClick: onOpenMap,
      pitch: 480,
    },
    {
      id: 'btn-quick-store',
      label: 'Tienda Oficial',
      icon: ShoppingCart,
      onClick: onOpenStore,
      pitch: 520,
    },
    {
      id: 'btn-quick-secrets',
      label: 'Archivos Secretos',
      icon: FileText,
      onClick: onOpenSecretFiles,
      pitch: 380,
    },
  ];

  return (
    <section className="w-full px-4 py-4 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="mb-3">
        <h3 className="font-gothic text-xs font-semibold tracking-widest text-neutral-400 uppercase">
          Acceso Rápido
        </h3>
        <div className="w-full h-px bg-white/10 mt-1.5" />
      </div>

      {/* List items */}
      <div className="flex flex-col divide-y divide-white/5 border-t border-b border-white/5">
        {items.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              id={item.id}
              onClick={() => {
                audioService.playClick(item.pitch);
                item.onClick();
              }}
              className="flex items-center justify-between py-3.5 px-1 group hover:bg-white/[0.03] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <IconComponent className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                <span className="font-gothic text-xs font-medium text-neutral-300 group-hover:text-white tracking-wide">
                  {item.label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </button>
          );
        })}
      </div>
    </section>
  );
};
