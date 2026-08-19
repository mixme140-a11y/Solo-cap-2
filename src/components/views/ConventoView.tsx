import React from 'react';
import { Church, MapPin, Radio, AlertTriangle, Search, Eye } from 'lucide-react';
import { MAP_LOCATIONS } from '../../data/loreData';
import { audioService } from '../../services/audioService';

interface ConventoViewProps {
  onOpenMap: () => void;
  onOpenRadio: () => void;
}

export const ConventoView: React.FC<ConventoViewProps> = ({ onOpenMap, onOpenRadio }) => {
  return (
    <div className="w-full px-4 py-6 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto space-y-6 pb-24">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-3">
        <span className="font-gothic text-xs text-red-400 uppercase tracking-widest block">
          Geografía del Misterio
        </span>
        <h2 className="font-gothic text-2xl font-bold text-neutral-100">
          El Convento Santa Vita
        </h2>
      </div>

      {/* Main Banner Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="p-5 bg-gradient-to-br from-[#181822] to-[#0f0f15] border border-white/10 rounded-md flex flex-col justify-between">
          <div>
            <MapPin className="w-8 h-8 text-red-500 mb-2" />
            <h3 className="font-gothic text-lg font-bold text-neutral-100 mb-1">
              Plano de la Cripta & Claustro
            </h3>
            <p className="font-quote text-xs text-neutral-400 italic mb-4">
              Explora los 5 sectores clave del convento y descubre los manuscritos ocultos entre las piedras.
            </p>
          </div>

          <button
            onClick={() => {
              audioService.playClick(440);
              onOpenMap();
            }}
            className="w-full py-2.5 bg-red-950 hover:bg-red-900 border border-red-500/50 text-white font-gothic text-xs uppercase tracking-wider rounded transition-colors text-center cursor-pointer"
          >
            Abrir Mapa Interactivo
          </button>
        </div>

        <div className="p-5 bg-gradient-to-br from-[#181822] to-[#0f0f15] border border-white/10 rounded-md flex flex-col justify-between">
          <div>
            <Radio className="w-8 h-8 text-amber-500 mb-2" />
            <h3 className="font-gothic text-lg font-bold text-neutral-100 mb-1">
              Torre de Radio Santa Vita
            </h3>
            <p className="font-quote text-xs text-neutral-400 italic mb-4">
              Transmisiones en frecuencia 88.6 MHz. Escucha las misas de medianoche y los salmos clandestinos.
            </p>
          </div>

          <button
            onClick={() => {
              audioService.playClick(480);
              onOpenRadio();
            }}
            className="w-full py-2.5 bg-amber-950 hover:bg-amber-900 border border-amber-500/50 text-amber-100 font-gothic text-xs uppercase tracking-wider rounded transition-colors text-center cursor-pointer"
          >
            Sintonizar Frecuencia Sagrada
          </button>
        </div>
      </div>

      {/* Locations Summary list */}
      <div className="space-y-3">
        <h3 className="font-gothic text-xs uppercase tracking-widest text-neutral-400">
          Sectores Identificados
        </h3>

        {MAP_LOCATIONS.map((loc) => (
          <div
            key={loc.id}
            className="p-3.5 bg-[#121217] border border-white/10 rounded-md flex items-center justify-between"
          >
            <div>
              <span className="font-gothic text-sm font-bold text-neutral-200 block">
                {loc.name}
              </span>
              <span className="font-sans-ui text-[10px] text-neutral-400">
                {loc.subtitle}
              </span>
            </div>

            <span
              className={`text-[9px] font-sans-ui uppercase px-2 py-0.5 rounded font-bold ${
                loc.dangerLevel === 'Peligro Crítico'
                  ? 'bg-red-950 text-red-300 border border-red-800'
                  : 'bg-neutral-800 text-neutral-400'
              }`}
            >
              {loc.dangerLevel}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};
