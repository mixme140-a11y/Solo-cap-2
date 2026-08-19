import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Film, 
  Sparkles, 
  Flame, 
  AlertCircle,
  Eye
} from 'lucide-react';
import { useAdminData } from '../../services/adminStore';
import { audioService } from '../../services/audioService';

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose }) => {
  const { adminData } = useAdminData();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const videoUrl = adminData.trailerVideoUrl;
  const trailerTitle = adminData.trailerTitle || 'Tráiler Oficial • Santa Vita';
  const trailerDesc = adminData.trailerDescription || 'Adéntrate en los pasillos de clausura y descubre los secretos que nadie se atreve a pronunciar.';

  useEffect(() => {
    if (isOpen) {
      audioService.playBell(330);
      setIsPlaying(true);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isEmbedVideo = videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') || videoUrl.includes('vimeo.com'));

  // Convert regular YouTube URL to embed URL if needed
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url;
  };

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#09070d] border border-red-950/90 rounded-xl shadow-[0_0_60px_rgba(220,38,38,0.35)] overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-red-950/80 bg-[#060408]">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-red-500 animate-pulse" />
            <div>
              <span className="font-gothic text-xs font-bold text-red-200 tracking-wider block">
                {trailerTitle}
              </span>
              <span className="font-sans-ui text-[10px] text-neutral-400">
                Experiencia Cinematográfica Santa Vita
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            title="Cerrar Tráiler"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
          {videoUrl ? (
            isEmbedVideo ? (
              <iframe
                src={getEmbedUrl(videoUrl)}
                title={trailerTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={videoUrl}
                  autoPlay
                  playsInline
                  onTimeUpdate={() => {
                    if (videoRef.current) {
                      setCurrentTime(videoRef.current.currentTime);
                      setDuration(videoRef.current.duration || 0);
                    }
                  }}
                  onEnded={() => setIsPlaying(false)}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={handleTogglePlay}
                />

                {/* Custom Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 pointer-events-none">
                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-neutral-800 rounded-full mb-3 overflow-hidden cursor-pointer pointer-events-auto">
                    <div
                      className="h-full bg-red-600 rounded-full transition-all"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pointer-events-auto">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleTogglePlay}
                        className="p-2 bg-red-950/80 hover:bg-red-900 border border-red-500/50 rounded-lg text-white transition-all cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={handleToggleMute}
                        className="p-2 bg-black/60 hover:bg-black/90 border border-white/10 rounded-lg text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <span className="font-mono text-xs text-neutral-300">
                        {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} / {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
                      </span>
                    </div>

                    <button
                      onClick={handleFullscreen}
                      className="p-2 bg-black/60 hover:bg-black/90 border border-white/10 rounded-lg text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      title="Pantalla Completa"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )
          ) : (
            /* Teaser Presentation when no custom video has been uploaded yet */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-950/30 via-[#0a0710] to-black relative">
              
              {/* Subtle background animated particle / pulse effect */}
              <div className="absolute w-32 h-32 rounded-full bg-red-600/10 filter blur-3xl animate-pulse" />
              
              <div className="z-10 space-y-4 max-w-md">
                <div className="w-16 h-16 rounded-full bg-red-950/80 border-2 border-red-500/50 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                  <Play className="w-7 h-7 text-red-400 fill-red-500/30 ml-1 animate-pulse" />
                </div>

                <div>
                  <h3 className="font-gothic text-xl sm:text-2xl font-bold text-neutral-100 tracking-wider">
                    {trailerTitle}
                  </h3>
                  <p className="font-quote text-xs sm:text-sm text-neutral-300 italic mt-2 leading-relaxed">
                    «{trailerDesc}»
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/60 border border-red-500/30 rounded-full text-[11px] font-mono text-red-300">
                  <Flame className="w-3.5 h-3.5 text-red-400" />
                  <span>Sube tu archivo de video desde el Panel de Administrador</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#09070e] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5 max-w-xl">
            <h4 className="font-gothic text-xs font-bold uppercase tracking-wider text-red-300 flex items-center gap-1.5">
              <span>Santa Vita • Novela Gótica & Misterio</span>
            </h4>
            <p className="font-sans-ui text-xs text-neutral-400 leading-snug">
              {trailerDesc}
            </p>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-red-950 to-neutral-900 hover:from-red-900 hover:to-neutral-800 border border-red-500/40 text-neutral-200 hover:text-white font-gothic text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer shrink-0 font-bold"
          >
            Cerrar Tráiler
          </button>
        </div>

      </div>
    </div>
  );
};
