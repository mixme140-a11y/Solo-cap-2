import React from 'react';
import { Newspaper, ShoppingCart, MessageSquare, Lock, Disc, Music, Sparkles } from 'lucide-react';
import { audioService } from '../../services/audioService';

interface ExtrasViewProps {
  onOpenNewspaper: () => void;
  onOpenStore: () => void;
  onOpenChat: () => void;
  onOpenSecrets: () => void;
  onOpenTimeline: () => void;
}

export const ExtrasView: React.FC<ExtrasViewProps> = ({
  onOpenNewspaper,
  onOpenStore,
  onOpenChat,
  onOpenSecrets,
  onOpenTimeline,
}) => {
  const extras = [
    {
      id: 'extra-periodico',
      title: 'Periódico: La Verdad',
      desc: 'Edición Nº 84 con las denuncias censuradas sobre las actividades del convento.',
      icon: Newspaper,
      action: onOpenNewspaper,
      color: 'text-amber-400',
    },
    {
      id: 'extra-chat',
      title: 'Chat Cifrado P2P',
      desc: 'Comunícate en directo con Hermana Artemisa y los testigos bajo secreto de confesión.',
      icon: MessageSquare,
      action: onOpenChat,
      color: 'text-emerald-400',
    },
    {
      id: 'extra-tienda',
      title: 'Tienda & Relicario',
      desc: 'Libro físico de Cap 2 SOLO, rosarios bendecidos y pases de acceso total.',
      icon: ShoppingCart,
      action: onOpenStore,
      color: 'text-red-400',
    },
    {
      id: 'extra-secretos',
      title: 'Archivos Secretos & Cifrados',
      desc: 'Expedientes forenses de 1924 protegidos por contraseñas canónicas.',
      icon: Lock,
      action: onOpenSecrets,
      color: 'text-purple-400',
    },
    {
      id: 'extra-timeline',
      title: 'Cronología de Santa Vita',
      desc: 'Línea de tiempo histórica desde la fundación de la abadía en 1892.',
      icon: Disc,
      action: onOpenTimeline,
      color: 'text-indigo-400',
    },
  ];

  return (
    <div className="w-full px-4 py-6 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto space-y-6 pb-24">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-3">
        <span className="font-gothic text-xs text-red-400 uppercase tracking-widest block">
          Material Adicional & Mini-Aplicaciones
        </span>
        <h2 className="font-gothic text-2xl font-bold text-neutral-100">
          Extras de Cap 2 SOLO
        </h2>
      </div>

      {/* List of Extra Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {extras.map((ex) => {
          const IconComp = ex.icon;
          return (
            <button
              key={ex.id}
              onClick={() => {
                audioService.playClick(440);
                ex.action();
              }}
              className="p-4 bg-[#121218] hover:bg-[#1a1a24] border border-white/10 hover:border-white/25 rounded-md transition-all text-left flex items-start gap-3.5 cursor-pointer"
            >
              <div className="p-2.5 bg-black/60 rounded border border-white/10 flex-shrink-0">
                <IconComp className={`w-5 h-5 ${ex.color}`} />
              </div>

              <div>
                <h4 className="font-gothic text-sm font-bold text-neutral-100">
                  {ex.title}
                </h4>
                <p className="font-quote text-xs text-neutral-400 italic mt-1 leading-relaxed">
                  {ex.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};
