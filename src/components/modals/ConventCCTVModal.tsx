import React, { useState, useEffect } from 'react';
import { 
  X, 
  Video, 
  Eye, 
  Grid, 
  Cross, 
  Camera, 
  Layers, 
  Sparkles, 
  Radio,
  Maximize2
} from 'lucide-react';
import { SecurityCamera } from '../../types';
import { useAdminData } from '../../services/adminStore';
import { audioService } from '../../services/audioService';

interface ConventCCTVModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCameraId?: string;
}

export const ConventCCTVModal: React.FC<ConventCCTVModalProps> = ({
  isOpen,
  onClose,
  initialCameraId,
}) => {
  const { adminData } = useAdminData();
  const cameras: SecurityCamera[] = adminData.securityCameras || [];

  const [selectedCamId, setSelectedCamId] = useState<string>(
    initialCameraId || cameras[0]?.id || 'cam-01'
  );
  const [isGridView, setIsGridView] = useState<boolean>(false);
  const [nightVision, setNightVision] = useState<boolean>(false);
  const [crtStatic, setCrtStatic] = useState<boolean>(true);
  const [liveTimestamp, setLiveTimestamp] = useState<string>('');

  useEffect(() => {
    if (initialCameraId) {
      setSelectedCamId(initialCameraId);
    }
  }, [initialCameraId]);

  // Real-time CCTV timestamp simulation
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10);
      const timeStr = now.toTimeString().slice(0, 8);
      const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
      setLiveTimestamp(`${dateStr} ${timeStr}:${ms}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const currentCam = cameras.find((c) => c.id === selectedCamId) || cameras[0];

  const handleSelectCamera = (cam: SecurityCamera) => {
    audioService.playClick(580);
    setSelectedCamId(cam.id);
    setIsGridView(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#070608] border border-red-900/80 rounded-xl shadow-[0_0_50px_rgba(220,38,38,0.4)] overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh]">
        
        {/* CCTV Top Header */}
        <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 bg-[#0a070c] border-b border-red-950/80 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-950/90 border border-red-500/80 flex items-center justify-center shadow-lg shrink-0">
              <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-mono text-[11px] sm:text-sm font-bold text-red-200 tracking-wider flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
                  CÁMARAS SANTA VITA
                </span>
                <span className="px-1.5 py-0.2 bg-red-950/90 border border-red-500/40 text-red-300 font-mono text-[8px] sm:text-[9px] rounded uppercase font-bold">
                  8CH CCTV
                </span>
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] text-neutral-400 block truncate max-w-[200px] sm:max-w-none">
                Circuito Cerrado de Vigilancia Eclesiástica
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* View Mode Switcher */}
            <button
              onClick={() => {
                audioService.playClick(440);
                setIsGridView(!isGridView);
              }}
              className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded text-[10px] sm:text-xs font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer border transition-all ${
                isGridView
                  ? 'bg-red-950 border-red-500 text-red-200 font-bold'
                  : 'bg-black/60 border-white/10 text-neutral-300 hover:text-white'
              }`}
              title={isGridView ? 'Ver cámara individual' : 'Ver todas las cámaras'}
            >
              <Grid className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden xs:inline sm:inline">{isGridView ? 'Individual' : 'Mosaico'}</span>
            </button>

            {/* Night Vision Toggle */}
            <button
              onClick={() => {
                audioService.playClick(500);
                setNightVision(!nightVision);
              }}
              className={`px-2 py-1 sm:px-2.5 sm:py-1.5 rounded text-[10px] sm:text-xs font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer border transition-all ${
                nightVision
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                  : 'bg-black/60 border-white/10 text-neutral-300 hover:text-white'
              }`}
              title="Alternar visión nocturna infrarroja"
            >
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">IR Nocturno</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1 sm:p-1.5 text-neutral-400 hover:text-red-400 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Quick Channel Bar */}
        <div className="flex md:hidden items-center gap-1.5 px-2 py-1.5 bg-[#050307] border-b border-red-950/60 overflow-x-auto shrink-0 no-scrollbar">
          <span className="text-[9px] font-mono text-red-400 uppercase tracking-wider shrink-0 font-bold">
            CAM:
          </span>
          {cameras.map((cam) => {
            const isSelected = cam.id === selectedCamId;
            return (
              <button
                key={cam.id}
                onClick={() => handleSelectCamera(cam)}
                className={`px-2 py-1 rounded text-[9px] font-mono whitespace-nowrap cursor-pointer flex items-center gap-1 transition-all ${
                  isSelected
                    ? 'bg-red-600 text-white font-bold shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                    : 'bg-[#120d18] text-neutral-300 border border-white/10'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-emerald-400'}`} />
                <span>{cam.code}</span>
              </button>
            );
          })}
        </div>

        {/* Main CCTV Body Layout (Desktop: Split Side-by-Side; Mobile: Vertical Scroll) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto overflow-x-hidden bg-[#040306]">
          
          {/* Main Feed Video Container */}
          <div className="flex-1 p-2 sm:p-4 flex flex-col justify-start md:justify-center items-center overflow-y-auto">
            
            {isGridView ? (
              /* Multi-camera Grid (8 channels) */
              <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
                {cameras.map((cam) => {
                  const isSelected = cam.id === selectedCamId;
                  return (
                    <div
                      key={cam.id}
                      onClick={() => handleSelectCamera(cam)}
                      className={`relative aspect-video rounded-lg overflow-hidden border cursor-pointer group transition-all ${
                        isSelected 
                          ? 'border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.7)] ring-2 ring-red-400' 
                          : 'border-white/15 hover:border-red-400/60 bg-black'
                      }`}
                    >
                      {cam.image ? (
                        <img 
                          src={cam.image} 
                          alt={cam.name} 
                          referrerPolicy="no-referrer"
                          className={`w-full h-full object-cover ${nightVision ? 'brightness-125 contrast-125 hue-rotate-90 saturate-50' : ''}`}
                        />
                      ) : (
                        <div className="w-full h-full bg-[#0d0a12] flex flex-col items-center justify-center p-1.5 text-center relative">
                          <div className="absolute inset-0 bg-[radial-gradient(#1f1525_1px,transparent_1px)] [background-size:6px_6px] opacity-40" />
                          <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600 mb-0.5 group-hover:text-red-400 transition-colors" />
                          <span className="font-mono text-[8px] sm:text-[9px] text-neutral-300 font-bold uppercase">{cam.code}</span>
                          <span className="font-mono text-[7px] sm:text-[8px] text-neutral-400 line-clamp-1">{cam.name}</span>
                        </div>
                      )}

                      {/* Mini HUD Overlay */}
                      <div className="absolute top-1 left-1 flex items-center gap-1 font-mono text-[7px] text-red-400 bg-black/85 px-1 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
                        <span>{cam.code}</span>
                      </div>
                      <div className="absolute bottom-1 left-1 right-1 font-mono text-[7px] text-neutral-200 bg-black/85 px-1 py-0.5 rounded truncate">
                        {cam.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Single Camera Focused Feed (Responsive 16:9 on all screens) */
              <div className="w-full max-w-3xl flex flex-col items-center">
                <div className={`relative w-full aspect-video rounded-xl overflow-hidden border border-red-950/90 bg-black shadow-2xl ${
                  nightVision ? 'bg-[#021808]' : 'bg-[#060408]'
                }`}>
                  
                  {/* Camera Video Image or Clean Dedicated Surveillance Standby Frame */}
                  {currentCam?.image ? (
                    <img 
                      src={currentCam.image} 
                      alt={currentCam.name} 
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover select-none ${
                        nightVision ? 'brightness-125 contrast-125 saturate-50 hue-rotate-90' : ''
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 sm:p-6 text-center relative overflow-hidden bg-gradient-to-b from-[#09060e] via-[#050308] to-[#020104]">
                      {/* Grid Lines Pattern */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b1326_1px,transparent_1px),linear-gradient(to_bottom,#1b1326_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:40px_40px] opacity-25" />
                      
                      {/* Center Surveillance Icon & Details */}
                      <div className="relative z-10 flex flex-col items-center max-w-md">
                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-dashed border-red-500/50 flex items-center justify-center mb-1.5 sm:mb-2.5 text-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.25)]">
                          <Video className="w-5 h-5 sm:w-7 sm:h-7 animate-pulse" />
                        </div>

                        <div className="font-mono text-xs sm:text-base font-bold text-red-300 tracking-wider uppercase">
                          {currentCam?.code} • {currentCam?.name}
                        </div>
                        <div className="font-mono text-[9px] sm:text-xs text-neutral-400 mb-1.5 sm:mb-2">
                          {currentCam?.location}
                        </div>

                        <p className="font-quote text-[10px] sm:text-xs text-neutral-300 italic max-w-sm line-clamp-2 sm:line-clamp-none">
                          «{currentCam?.description}»
                        </p>
                      </div>
                    </div>
                  )}

                  {/* CCTV High-Tech HUD Layer */}
                  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-2 sm:p-3.5">
                    {/* Top HUD */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-1.5 bg-black/85 border border-red-500/40 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded font-mono text-[8px] sm:text-[10px] text-red-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping inline-block" />
                        <span className="font-bold">REC</span>
                        <span className="text-white/40">|</span>
                        <span className="text-white font-bold">{currentCam?.code}</span>
                      </div>

                      <div className="bg-black/85 border border-white/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded font-mono text-[8px] sm:text-[10px] text-amber-300">
                        {liveTimestamp}
                      </div>
                    </div>

                    {/* Center Crosshair Marker */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 border border-white/15 rounded-full flex items-center justify-center opacity-40">
                      <div className="w-1.5 h-1.5 bg-red-500/60 rounded-full" />
                    </div>

                    {/* Bottom HUD */}
                    <div className="flex items-end justify-between">
                      <div className="bg-black/85 border border-white/15 p-1 sm:p-1.5 rounded max-w-[65%] sm:max-w-[70%]">
                        <div className="font-mono text-[9px] sm:text-[11px] font-bold text-white uppercase flex items-center gap-1 truncate">
                          <span>{currentCam?.name}</span>
                        </div>
                        <div className="font-mono text-[7px] sm:text-[9px] text-neutral-400 truncate">
                          {currentCam?.location}
                        </div>
                      </div>

                      <div className="bg-black/85 border border-white/15 px-1.5 py-0.5 rounded font-mono text-[7px] sm:text-[9px] text-neutral-400 text-right">
                        <div className="text-emerald-400 font-bold">ONLINE</div>
                        <div className="text-red-400">CH8</div>
                      </div>
                    </div>
                  </div>

                  {/* Scanline CRT overlay */}
                  {crtStatic && (
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_3px] opacity-50" />
                  )}
                </div>

                {/* Mobile Info Banner under the feed */}
                <div className="w-full mt-2.5 p-2.5 bg-[#09070d] border border-red-950/80 rounded-lg flex md:hidden items-center justify-between gap-2">
                  <div className="overflow-hidden">
                    <div className="font-mono text-xs font-bold text-red-300 truncate">
                      {currentCam?.code}: {currentCam?.name}
                    </div>
                    <div className="font-mono text-[9px] text-neutral-400 truncate">
                      {currentCam?.location}
                    </div>
                  </div>
                  <div className="px-2 py-0.5 bg-red-950/80 border border-red-500/40 text-red-300 text-[9px] font-mono rounded font-bold shrink-0">
                    ACTIVO
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Right Sidebar: Camera Selection Channels */}
          <div className="hidden md:flex w-72 bg-[#08060a] border-l border-red-950/80 p-3 overflow-y-auto shrink-0 flex-col justify-between">
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-red-400 mb-2 font-bold flex items-center justify-between">
                <span>CANALES DE MONITOREO</span>
                <span className="text-[10px] text-neutral-500">{cameras.length} CH</span>
              </h3>

              <div className="space-y-1">
                {cameras.map((cam) => {
                  const isSelected = cam.id === selectedCamId;
                  return (
                    <button
                      key={cam.id}
                      onClick={() => handleSelectCamera(cam)}
                      className={`w-full text-left p-1.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-red-950/80 border-red-500 text-white font-bold shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                          : 'bg-[#100c14] border-white/5 text-neutral-300 hover:bg-[#18131e] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${
                          isSelected ? 'bg-red-500 animate-ping' : 'bg-emerald-500'
                        }`} />
                        <div className="truncate">
                          <div className="font-mono text-[11px] truncate flex items-center gap-1">
                            <span className="text-red-400 font-bold">{cam.code}:</span>
                            <span>{cam.name}</span>
                          </div>
                          <div className="font-mono text-[8px] text-neutral-500 truncate">
                            {cam.location}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop Status Card */}
            <div className="mt-3 pt-2.5 border-t border-white/10">
              <div className="p-2 bg-black/60 border border-red-500/30 rounded-lg text-neutral-300 text-xs font-mono">
                <div className="text-[9px] text-neutral-400 mb-0.5">CANAL ACTIVO:</div>
                <div className="font-bold text-red-300 text-[11px] truncate">{currentCam?.name}</div>
                <div className="text-[9px] text-neutral-400 mt-1 truncate">{currentCam?.location}</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
