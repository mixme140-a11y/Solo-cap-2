import React, { useState, useRef } from 'react';
import { 
  X, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  Eye, 
  Compass, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Maximize2,
  Minimize2,
  Layers,
  Cross,
  Sparkles,
  Video,
  Radio
} from 'lucide-react';
import { MAP_LOCATIONS, HERO_ASSETS } from '../../data/loreData';
import { MapLocation } from '../../types';
import { audioService } from '../../services/audioService';
import { useAdminData } from '../../services/adminStore';
import { ConventCCTVModal } from './ConventCCTVModal';

interface InteractiveMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LocationPinConfig {
  bgColor: string;
  borderColor: string;
  pingColor: string;
  glowColor: string;
  textColor: string;
  tagColor: string;
  type: string;
}

const getLocationConfig = (locId: string): LocationPinConfig => {
  switch (locId) {
    case 'convento-santa-vita':
      return {
        bgColor: 'bg-red-600',
        borderColor: 'border-white',
        pingColor: 'bg-red-500',
        glowColor: 'shadow-[0_0_22px_rgba(239,68,68,0.95)] ring-2 ring-red-400',
        textColor: 'text-red-400',
        tagColor: 'bg-red-950/95 text-red-200 border-red-500/80',
        type: 'Santuario Principal (Refugio de Gabriel)'
      };
    case 'aldea-del-cipres':
      return {
        bgColor: 'bg-amber-500',
        borderColor: 'border-amber-100',
        pingColor: 'bg-amber-400',
        glowColor: 'shadow-[0_0_18px_rgba(245,158,11,0.85)] ring-1 ring-amber-300',
        textColor: 'text-amber-400',
        tagColor: 'bg-amber-950/95 text-amber-200 border-amber-500/80',
        type: 'Aldea Rural'
      };
    case 'convento-sanctus-lux':
      return {
        bgColor: 'bg-cyan-500',
        borderColor: 'border-cyan-100',
        pingColor: 'bg-cyan-400',
        glowColor: 'shadow-[0_0_18px_rgba(6,182,212,0.85)] ring-1 ring-cyan-300',
        textColor: 'text-cyan-400',
        tagColor: 'bg-cyan-950/95 text-cyan-200 border-cyan-500/80',
        type: 'Bastión del Clero'
      };
    case 'ciudad-lumina':
      return {
        bgColor: 'bg-yellow-500',
        borderColor: 'border-yellow-100',
        pingColor: 'bg-yellow-400',
        glowColor: 'shadow-[0_0_18px_rgba(234,179,8,0.85)] ring-1 ring-yellow-300',
        textColor: 'text-yellow-400',
        tagColor: 'bg-yellow-950/95 text-yellow-200 border-yellow-500/80',
        type: 'Metrópoli Catedralicia'
      };
    case 'villa-serena':
      return {
        bgColor: 'bg-emerald-500',
        borderColor: 'border-emerald-100',
        pingColor: 'bg-emerald-400',
        glowColor: 'shadow-[0_0_18px_rgba(16,185,129,0.85)] ring-1 ring-emerald-300',
        textColor: 'text-emerald-400',
        tagColor: 'bg-emerald-950/95 text-emerald-200 border-emerald-500/80',
        type: 'Poblado Fluvial'
      };
    case 'mirador-del-alba':
      return {
        bgColor: 'bg-purple-500',
        borderColor: 'border-purple-100',
        pingColor: 'bg-purple-400',
        glowColor: 'shadow-[0_0_18px_rgba(168,85,247,0.85)] ring-1 ring-purple-300',
        textColor: 'text-purple-400',
        tagColor: 'bg-purple-950/95 text-purple-200 border-purple-500/80',
        type: 'Atalaya Costera'
      };
    case 'puerto-sombrio':
      return {
        bgColor: 'bg-sky-500',
        borderColor: 'border-sky-100',
        pingColor: 'bg-sky-400',
        glowColor: 'shadow-[0_0_18px_rgba(14,165,233,0.85)] ring-1 ring-sky-300',
        textColor: 'text-sky-400',
        tagColor: 'bg-sky-950/95 text-sky-200 border-sky-500/80',
        type: 'Puerto de Contrabando'
      };
    case 'bosque-de-los-susurros':
      return {
        bgColor: 'bg-lime-500',
        borderColor: 'border-lime-100',
        pingColor: 'bg-lime-400',
        glowColor: 'shadow-[0_0_18px_rgba(132,204,22,0.85)] ring-1 ring-lime-300',
        textColor: 'text-lime-400',
        tagColor: 'bg-lime-950/95 text-lime-200 border-lime-500/80',
        type: 'Foresta Prohibida'
      };
    case 'puente-del-suspiro':
      return {
        bgColor: 'bg-orange-500',
        borderColor: 'border-orange-100',
        pingColor: 'bg-orange-400',
        glowColor: 'shadow-[0_0_18px_rgba(249,115,22,0.85)] ring-1 ring-orange-300',
        textColor: 'text-orange-400',
        tagColor: 'bg-orange-950/95 text-orange-200 border-orange-500/80',
        type: 'Paso Fortificado'
      };
    default:
      return {
        bgColor: 'bg-neutral-500',
        borderColor: 'border-white',
        pingColor: 'bg-neutral-400',
        glowColor: 'shadow-md',
        textColor: 'text-neutral-300',
        tagColor: 'bg-black/90 text-neutral-300 border-white/20',
        type: 'Ubicación'
      };
  }
};

export const InteractiveMapModal: React.FC<InteractiveMapModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { adminData } = useAdminData();
  const [selectedLoc, setSelectedLoc] = useState<MapLocation>(MAP_LOCATIONS[0]);
  const [locations, setLocations] = useState<MapLocation[]>(MAP_LOCATIONS);
  const [clueRevealed, setClueRevealed] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [hoveredLocId, setHoveredLocId] = useState<string | null>(null);
  const [isCctvOpen, setIsCctvOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const mapSourceImage = adminData.mapImage || HERO_ASSETS.map;

  const handleSelectLocation = (loc: MapLocation) => {
    if (loc.id === 'convento-santa-vita') {
      audioService.playBell(330);
    } else {
      audioService.playClick(460);
    }
    setSelectedLoc(loc);
    setClueRevealed(loc.secretFound);
  };

  const handleInspectSecret = () => {
    audioService.playUnlock();
    setClueRevealed(true);
    setLocations((prev) =>
      prev.map((l) => (l.id === selectedLoc.id ? { ...l, secretFound: true } : l))
    );
  };

  const currentConfig = getLocationConfig(selectedLoc.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-1 sm:p-4 overflow-y-auto animate-fadeIn">
      <div 
        className={`relative w-full ${
          isFullScreen ? 'max-w-[98vw] h-[96vh]' : 'max-w-5xl max-h-[95vh]'
        } bg-[#0c0a10] border border-[#52412c]/80 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col transition-all duration-300`}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 border-b border-[#3d3020] bg-[#070609] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 rounded-full bg-red-950/80 border border-red-500/60 flex items-center justify-center shadow-inner">
              <Compass className="w-4 h-4 text-red-400 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-gothic text-xs sm:text-base font-bold text-[#f2e4c4] tracking-widest uppercase">
                  Mapa Cartográfico de Terrá Vita
                </span>
                <span className="px-1.5 py-0.5 bg-red-950/90 border border-red-500/50 text-red-300 font-mono text-[8px] sm:text-[9px] rounded uppercase font-bold tracking-wider hidden sm:inline-block">
                  Convento Santa Vita (Único Foco Rojo)
                </span>
              </div>
              <span className="font-sans-ui text-[10px] sm:text-[11px] text-[#9a8a76] block">
                Plano Original de Terrá Vita • Ubicaciones del Relato de Gabriel & Helena
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-0.5 sm:gap-1 bg-black/70 border border-white/15 rounded-lg p-0.5">
              <button
                onClick={() => setZoomLevel((z) => Math.max(1, +(z - 0.2).toFixed(1)))}
                disabled={zoomLevel <= 1}
                className="p-1 sm:p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 rounded cursor-pointer"
                title="Alejar mapa"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-amber-300 px-1 font-bold min-w-9 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.2, +(z + 0.2).toFixed(1)))}
                disabled={zoomLevel >= 2.2}
                className="p-1 sm:p-1.5 text-neutral-400 hover:text-white disabled:opacity-30 rounded cursor-pointer"
                title="Acercar mapa"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              {zoomLevel !== 1 && (
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1 sm:p-1.5 text-amber-400 hover:text-amber-200 rounded cursor-pointer"
                  title="Restablecer zoom"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer hidden sm:block"
              title={isFullScreen ? 'Ventana normal' : 'Pantalla completa'}
            >
              {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              id="btn-map-close"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-[#f3e1a9] rounded-lg hover:bg-white/10 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Interactive Map Visualizer Canvas Container */}
        <div 
          ref={containerRef}
          className={`relative w-full ${
            isFullScreen ? 'flex-1 min-h-[480px]' : 'h-72 sm:h-[460px]'
          } bg-[#0b0907] border-b border-[#382c1b] overflow-hidden select-none flex items-center justify-center`}
        >
          {/* Scrollable / Zoomable Wrapper */}
          <div 
            style={{ 
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
            }}
            className="relative w-full h-full max-w-full max-h-full transition-transform duration-200 ease-out flex items-center justify-center"
          >
            {/* The 100% Exact User Map Artwork */}
            <div className="relative w-full h-full max-w-full max-h-full flex items-center justify-center">
              <img 
                src={mapSourceImage} 
                alt="Mapa de Terrá Vita" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[85vh] drop-shadow-2xl pointer-events-none"
              />

              {/* Exact Location Markers Layer (Positioned proportionally over the map) */}
              <div className="absolute inset-0">
                {locations.map((loc) => {
                  const isSelected = selectedLoc.id === loc.id;
                  const isHovered = hoveredLocId === loc.id;
                  const config = getLocationConfig(loc.id);
                  const isSantaVitaConvent = loc.id === 'convento-santa-vita';

                  return (
                    <div
                      key={loc.id}
                      style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30"
                      onMouseEnter={() => setHoveredLocId(loc.id)}
                      onMouseLeave={() => setHoveredLocId(null)}
                    >
                      {/* Pulsating Radar Ping Wave */}
                      <span 
                        className={`absolute inset-0 rounded-full animate-ping opacity-85 ${config.pingColor} ${
                          isSantaVitaConvent ? 'scale-175 duration-1000' : 'scale-140 duration-1500'
                        }`} 
                      />

                      {/* Santa Vita Convent Exclusive Crimson Glow Aura */}
                      {isSantaVitaConvent && (
                        <span className="absolute -inset-2 rounded-full bg-red-600/40 animate-pulse blur-[3px]" />
                      )}

                      {/* Location Interactive Button */}
                      <button
                        onClick={() => handleSelectLocation(loc)}
                        className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
                          isSelected 
                            ? `w-8 h-8 sm:w-10 sm:h-10 ${config.bgColor} border-2 border-white text-white ${config.glowColor} scale-125 z-40` 
                            : isHovered
                            ? `w-7 h-7 sm:w-9 sm:h-9 ${config.bgColor} border-2 border-white text-white ${config.glowColor} scale-115 z-30`
                            : `w-6 h-6 sm:w-8 sm:h-8 ${config.bgColor} border-2 ${config.borderColor} text-white shadow-xl z-20`
                        }`}
                        title={loc.name}
                      >
                        {isSantaVitaConvent ? (
                          <Cross className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white drop-shadow" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white drop-shadow" />
                        )}
                      </button>

                      {/* Location Label Ribbon Floating on Map */}
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 transition-all duration-200 pointer-events-none ${
                        isSelected || isHovered ? 'opacity-100 scale-105 z-50' : 'opacity-90 scale-95'
                      }`}>
                        <div className={`px-2 py-0.5 rounded-md border text-[9px] sm:text-[10px] font-gothic tracking-wider whitespace-nowrap shadow-2xl flex items-center gap-1 ${
                          isSelected 
                            ? 'bg-[#150d0a] border-amber-400 text-amber-200 font-bold' 
                            : config.tagColor
                        }`}>
                          {isSantaVitaConvent && <span className="text-red-400 font-bold">†</span>}
                          <span>{loc.name}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Corner Indicator Badge */}
          <div className="absolute top-2 right-2 bg-black/85 border border-red-500/40 px-2.5 py-1 rounded-md text-[9px] sm:text-[10px] font-gothic text-[#f1dec1] flex items-center gap-1.5 shadow-xl backdrop-blur-md pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
            <span>Foco Rojo Exclusivo: Convento Santa Vita</span>
          </div>
        </div>

        {/* Selected Location Information Drawer */}
        <div className="p-3 sm:p-5 flex-1 overflow-y-auto bg-[#0a080e] space-y-3 sm:space-y-4 shrink-0 max-h-56 sm:max-h-64">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-gothic uppercase tracking-wider font-bold border ${currentConfig.tagColor}`}>
                  {currentConfig.type}
                </span>
                <span className="font-gothic text-[11px] sm:text-xs text-[#9a8a76]">
                  {selectedLoc.subtitle}
                </span>
              </div>
              <h3 className="font-gothic text-lg sm:text-2xl font-bold text-neutral-100 mt-0.5 flex items-center gap-2">
                {selectedLoc.name}
                {selectedLoc.id === 'convento-santa-vita' && (
                  <span className="text-red-500 text-xs sm:text-sm font-sans-ui font-normal">(Sede Principal de la Novela)</span>
                )}
              </h3>
            </div>

            {/* Danger / Lore Level Tag */}
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-gothic font-bold uppercase tracking-wider shrink-0 ${
                selectedLoc.dangerLevel === 'Peligro Crítico'
                  ? 'bg-red-950/90 border border-red-500/70 text-red-300 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                  : selectedLoc.dangerLevel === 'Moderado'
                  ? 'bg-amber-950/90 border border-amber-500/70 text-amber-300'
                  : 'bg-emerald-950/90 border border-emerald-500/70 text-emerald-300'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{selectedLoc.dangerLevel}</span>
            </div>
          </div>

          <p className="font-quote text-sm sm:text-base text-neutral-200 leading-relaxed italic bg-black/40 p-3 rounded-lg border border-white/5">
            «{selectedLoc.description}»
          </p>

          {/* Dedicated Option: Cámaras de Seguridad del Convento Santa Vita */}
          {selectedLoc.id === 'convento-santa-vita' && (
            <div className="p-2.5 sm:p-3.5 bg-gradient-to-r from-red-950/95 via-black to-[#1c080b] border-2 border-red-500/80 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.4)] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-950 border border-red-500 flex items-center justify-center shrink-0 shadow-lg">
                  <Video className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 animate-pulse" />
                </div>
                <div>
                  <div className="font-gothic text-xs sm:text-base font-bold text-red-200 uppercase tracking-wider flex items-center gap-1.5 sm:gap-2">
                    <span>Cámaras de Seguridad</span>
                    <span className="px-1.5 py-0.2 bg-red-600 text-white font-mono text-[7px] sm:text-[8px] rounded uppercase font-bold animate-pulse">
                      REC EN VIVO
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-neutral-300 font-sans-ui mt-0.5">
                    Circuito cerrado: Patio Trasero, Capilla, Salón de Misa, Criptas y Celdas.
                  </div>
                </div>
              </div>

              <button
                id="btn-open-convent-cctv"
                onClick={() => {
                  audioService.playClick(600);
                  setIsCctvOpen(true);
                }}
                className="w-full sm:w-auto px-3.5 py-1.5 sm:py-2 bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-gothic text-[11px] sm:text-xs uppercase tracking-wider rounded-lg border border-red-400/80 shadow-lg flex items-center justify-center gap-1.5 cursor-pointer font-bold transition-all hover:scale-105 shrink-0"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Acceder a Cámaras</span>
              </button>
            </div>
          )}

          {/* Clue Discovery Box */}
          <div className="p-3 bg-[#110e16] border border-amber-500/30 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-gothic text-[11px] sm:text-xs text-[#e6d8b8] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-amber-400" />
                Pista / Archivo de Investigación
              </span>
              {clueRevealed ? (
                <span className="font-sans-ui text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Descubierto
                </span>
              ) : (
                <span className="font-sans-ui text-[10px] text-neutral-500">Cifrado / No Revelado</span>
              )}
            </div>

            {clueRevealed ? (
              <p className="font-mono text-xs text-amber-300 bg-amber-950/30 p-2.5 rounded border border-amber-500/40 leading-relaxed">
                "{selectedLoc.unlockedClue}"
              </p>
            ) : (
              <button
                id="btn-map-inspect-clue"
                onClick={handleInspectSecret}
                className="w-full py-2 bg-gradient-to-r from-red-950/70 to-amber-950/70 hover:from-red-900 hover:to-amber-900 border border-red-500/40 text-red-200 text-xs font-gothic uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer font-bold shadow"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                Examinar y Descifrar Pista Cartográfica
              </button>
            )}
          </div>
        </div>

        {/* Location Switcher Quick Bar */}
        <div className="px-3 sm:px-4 py-2.5 bg-[#060508] border-t border-[#2e2316] flex items-center gap-2 overflow-x-auto shrink-0">
          <span className="text-[10px] font-gothic text-[#807260] uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Layers className="w-3 h-3" />
            Puntos:
          </span>
          {locations.map((loc) => {
            const isSelected = selectedLoc.id === loc.id;
            const config = getLocationConfig(loc.id);
            const isConvent = loc.id === 'convento-santa-vita';

            return (
              <button
                key={loc.id}
                onClick={() => handleSelectLocation(loc)}
                className={`px-2.5 py-1.5 rounded text-[10px] sm:text-[11px] font-gothic uppercase tracking-wider whitespace-nowrap cursor-pointer flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? isConvent 
                      ? 'bg-red-600 text-white font-bold border border-white shadow-[0_0_12px_rgba(239,68,68,0.8)] scale-105'
                      : 'bg-amber-400 text-black font-bold border border-white scale-105'
                    : isConvent
                    ? 'bg-red-950/90 text-red-300 border border-red-500/60 hover:bg-red-900'
                    : 'bg-[#14111a] text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${config.bgColor}`} />
                <span>{loc.name}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Convent CCTV Surveillance System Modal */}
      <ConventCCTVModal 
        isOpen={isCctvOpen} 
        onClose={() => setIsCctvOpen(false)} 
      />
    </div>
  );
};
