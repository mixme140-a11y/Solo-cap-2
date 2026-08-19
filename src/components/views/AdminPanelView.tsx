import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Image as ImageIcon, 
  BookOpen, 
  Lock, 
  Radio, 
  ShoppingCart, 
  FileText, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Check, 
  Upload, 
  AlertCircle,
  MapPin,
  ShieldCheck,
  Eye,
  Info,
  Music,
  Play,
  Pause,
  Volume2,
  Headphones,
  Send,
  CheckCircle2,
  Sparkles,
  RadioTower,
  Bookmark,
  Download,
  HardDrive,
  Users,
  Film,
  Video
} from 'lucide-react';
import { useAdminData, CarouselSlideData, AudioFrequencyData } from '../../services/adminStore';
import { Chapter, SecretFile, StoreItem } from '../../types';
import { audioService } from '../../services/audioService';
import { AdminCharactersTab } from '../admin/AdminCharactersTab';

interface AdminPanelViewProps {
  onClose?: () => void;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({ onClose }) => {
  const { adminData, updateAdminData, resetToDefaults } = useAdminData();
  const [activeTab, setActiveTab] = useState<'carousel' | 'synopsis' | 'secrets' | 'radio' | 'shop' | 'chapters' | 'characters' | 'map'>('carousel');
  const [radioSubCategory, setRadioSubCategory] = useState<'general' | 'chapters'>('general');
  const [targetChapterId, setTargetChapterId] = useState<string>(() => adminData.chapters[0]?.id || 'cap-0');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Local draft state
  const [localData, setLocalData] = useState(adminData);

  // Sync if adminData changes externally
  React.useEffect(() => {
    setLocalData(adminData);
  }, [adminData]);

  const handleSave = () => {
    updateAdminData(() => localData);
    audioService.playUnlock();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('¿Deseas restaurar todos los datos a sus valores canónicos de fábrica? Esta acción reemplazará los cambios actuales.')) {
      const reset = resetToDefaults();
      setLocalData(reset);
      audioService.playBell(330);
    }
  };

  // Export full book/app configuration to a JSON backup file
  const handleExportBackup = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `santa_vita_backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      audioService.playBell(520);
    } catch (err) {
      console.error('Error exporting backup', err);
    }
  };

  // Import full book/app configuration from a JSON backup file
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          if (typeof reader.result === 'string') {
            const parsed = JSON.parse(reader.result);
            if (parsed && typeof parsed === 'object') {
              setLocalData((prev) => ({ ...prev, ...parsed }));
              updateAdminData(() => ({ ...localData, ...parsed }));
              audioService.playUnlock();
              setSavedSuccess(true);
              setTimeout(() => setSavedSuccess(false), 3000);
            }
          }
        } catch (err) {
          alert('El archivo seleccionado no es un JSON válido de Santa Vita.');
        }
      };
      reader.readAsText(file);
    }
  };

  const [playingAudioPreviewId, setPlayingAudioPreviewId] = useState<string | null>(null);

  // Image Upload helper (converts to base64 for persistent browser storage)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, onComplete: (dataUrl: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onComplete(reader.result);
          audioService.playClick(500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Audio Upload helper (converts audio file to base64 Data URL for persistent browser audio playback)
  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>, onComplete: (audioDataUrl: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onComplete(reader.result);
          audioService.playBell(440);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTestAudio = (id: string, audioUrl?: string, theme: 'organ' | 'chant' | 'bell' | 'static' = 'organ') => {
    if (playingAudioPreviewId === id) {
      audioService.stopRadio();
      setPlayingAudioPreviewId(null);
    } else {
      setPlayingAudioPreviewId(id);
      audioService.playTrack({
        id,
        title: 'Prueba de Audio Admin',
        author: 'Admin Preview',
        audioUrl,
        theme,
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 py-6 pb-24 text-neutral-200">
      
      {/* Top Header */}
      <div className="bg-[#100e14] border border-red-500/30 rounded-xl p-5 sm:p-6 mb-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <Sliders className="w-6 h-6 text-red-500" />
            <h1 className="font-gothic text-xl sm:text-2xl font-bold tracking-wider text-neutral-100">
              Panel de Administrador • Santa Vita
            </h1>
            <span className="px-2.5 py-0.5 bg-red-950/80 border border-red-500/40 text-red-400 font-mono text-[11px] rounded uppercase font-bold">
              Modo Editor Activo
            </span>
            <span className="px-2 py-0.5 bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] rounded flex items-center gap-1">
              <HardDrive className="w-3 h-3" />
              Persistencia Permanente Activa
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 font-sans-ui mt-1 max-w-2xl">
            Todos los cambios que guardes (capítulos, textos, imágenes, audios y radio) se mantendrán de forma permanente en la base de datos local de tu navegador hasta que decidas cambiarlos.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Export JSON Backup */}
          <button
            onClick={handleExportBackup}
            className="px-3 py-2 bg-[#191522] hover:bg-[#251f33] border border-amber-500/30 hover:border-amber-500/60 text-amber-300 rounded text-xs font-gothic uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow"
            title="Descargar copia de seguridad en JSON de toda la app"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Copia</span>
          </button>

          {/* Import JSON Backup */}
          <label
            className="px-3 py-2 bg-[#191522] hover:bg-[#251f33] border border-amber-500/30 hover:border-amber-500/60 text-amber-300 rounded text-xs font-gothic uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow"
            title="Restaurar copia de seguridad desde un archivo JSON"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Importar</span>
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImportBackup}
            />
          </label>

          {/* Factory Reset */}
          <button
            onClick={handleReset}
            className="px-3 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-neutral-200 rounded text-xs font-gothic uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Restaurar a valores por defecto canónicos"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar</span>
          </button>

          {/* Save Changes */}
          <button
            onClick={handleSave}
            className={`px-4 sm:px-5 py-2 text-white font-gothic text-xs uppercase tracking-widest rounded transition-all shadow-lg flex items-center gap-2 font-bold cursor-pointer hover:scale-105 ${
              savedSuccess 
                ? 'bg-emerald-800 border border-emerald-400' 
                : 'bg-gradient-to-r from-red-900 to-amber-700 hover:from-red-800 hover:to-amber-600'
            }`}
          >
            {savedSuccess ? <Check className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? '¡Guardado Permanente!' : 'Guardar Cambios'}</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="px-3.5 py-2 bg-black/60 hover:bg-black/90 border border-white/15 text-neutral-300 rounded text-xs font-gothic uppercase tracking-wider cursor-pointer"
            >
              Cerrar
            </button>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3 mb-6">
        <button
          onClick={() => {
            audioService.playClick(440);
            setActiveTab('carousel');
          }}
          className={`px-4 py-2 rounded-lg text-xs font-gothic uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'carousel'
              ? 'bg-red-950/80 border border-red-500/60 text-white font-bold shadow'
              : 'bg-[#121016] border border-white/5 text-neutral-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-4 h-4 text-amber-400" />
          <span>Carrusel & Portada</span>
          <span className="text-[10px] font-mono bg-black/40 px-1.5 py-0.5 rounded text-neutral-400">
            {localData.carouselSlides.length}
          </span>
        </button>

        <button
          onClick={() => {
            audioService.playClick(460);
            setActiveTab('synopsis');
          }}
          className={`px-4 py-2 rounded-lg text-xs font-gothic uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'synopsis'
              ? 'bg-red-950/80 border border-red-500/60 text-white font-bold shadow'
              : 'bg-[#121016] border border-white/5 text-neutral-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4 text-red-400" />
          <span>Sinopsis Oficial</span>
        </button>

        <button
          onClick={() => {
            audioService.playClick(480);
            setActiveTab('secrets');
          }}
          className={`px-4 py-2 rounded-lg text-xs font-gothic uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'secrets'
              ? 'bg-red-950/80 border border-red-500/60 text-white font-bold shadow'
              : 'bg-[#121016] border border-white/5 text-neutral-400 hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4 text-emerald-400" />
          <span>Archivos Secretos</span>
          <span className="text-[10px] font-mono bg-black/40 px-1.5 py-0.5 rounded text-neutral-400">
            {localData.secrets.length}
          </span>
        </button>

        <button
          onClick={() => {
            audioService.playClick(500);
            setActiveTab('radio');
          }}
          className={`px-4 py-2 rounded-lg text-xs font-gothic uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'radio'
              ? 'bg-red-950/80 border border-red-500/60 text-white font-bold shadow'
              : 'bg-[#121016] border border-white/5 text-neutral-400 hover:text-white'
          }`}
        >
          <Radio className="w-4 h-4 text-indigo-400" />
          <span>Radio Santa Vita</span>
          <span className="text-[10px] font-mono bg-black/40 px-1.5 py-0.5 rounded text-neutral-400">
            {localData.radioTracks.length}
          </span>
        </button>

        <button
          onClick={() => {
            audioService.playClick(520);
            setActiveTab('shop');
          }}
          className={`px-4 py-2 rounded-lg text-xs font-gothic uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'shop'
              ? 'bg-red-950/80 border border-red-500/60 text-white font-bold shadow'
              : 'bg-[#121016] border border-white/5 text-neutral-400 hover:text-white'
          }`}
        >
          <ShoppingCart className="w-4 h-4 text-amber-500" />
          <span>Tienda Oficial</span>
          <span className="text-[10px] font-mono bg-black/40 px-1.5 py-0.5 rounded text-neutral-400">
            {localData.shopItems.length}
          </span>
        </button>

        <button
          onClick={() => {
            audioService.playClick(540);
            setActiveTab('chapters');
          }}
          className={`px-4 py-2 rounded-lg text-xs font-gothic uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'chapters'
              ? 'bg-red-950/80 border border-red-500/60 text-white font-bold shadow'
              : 'bg-[#121016] border border-white/5 text-neutral-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4 text-purple-400" />
          <span>Capítulos & Textos</span>
          <span className="text-[10px] font-mono bg-black/40 px-1.5 py-0.5 rounded text-neutral-400">
            {localData.chapters.length}
          </span>
        </button>

        <button
          onClick={() => {
            audioService.playClick(560);
            setActiveTab('characters');
          }}
          className={`px-4 py-2 rounded-lg text-xs font-gothic uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'characters'
              ? 'bg-red-950/80 border border-red-500/60 text-white font-bold shadow'
              : 'bg-[#121016] border border-white/5 text-neutral-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 text-red-400" />
          <span>Personajes</span>
          <span className="text-[10px] font-mono bg-black/40 px-1.5 py-0.5 rounded text-neutral-400">
            {localData.characters?.length || 0}
          </span>
        </button>

        <button
          onClick={() => {
            audioService.playClick(350);
            setActiveTab('map');
          }}
          className={`px-4 py-2 rounded-lg text-xs font-gothic uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'map'
              ? 'bg-neutral-800 border border-neutral-600 text-neutral-200 font-bold'
              : 'bg-[#121016] border border-white/5 text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <MapPin className="w-4 h-4 text-neutral-400" />
          <span>Mapa Interactivo (Fijo)</span>
        </button>
      </div>

      {/* TAB 1: CAROUSEL SLIDES */}
      {activeTab === 'carousel' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-gothic text-lg font-bold text-neutral-100">
                Imágenes y Diapositivas del Carrusel Hero
              </h2>
              <p className="text-xs text-neutral-400">
                Cambia el orden, sube tus propias imágenes desde tu dispositivo o ingresa URLs directas, y modifica títulos y citas.
              </p>
            </div>

            <button
              onClick={() => {
                const newSlide: CarouselSlideData = {
                  id: `slide-${Date.now()}`,
                  image: localData.carouselSlides[0]?.image || '',
                  caption: 'Nueva Escena del Convento',
                  quote: '“El silencio de Santa Vita guarda la última verdad.”',
                };
                setLocalData({
                  ...localData,
                  carouselSlides: [...localData.carouselSlides, newSlide],
                });
                audioService.playClick(480);
              }}
              className="px-3 py-1.5 bg-red-950 hover:bg-red-900 border border-red-500/50 rounded text-xs font-gothic uppercase tracking-wider flex items-center gap-1.5 cursor-pointer text-white"
            >
              <Plus className="w-4 h-4" />
              Añadir Imagen
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {localData.carouselSlides.map((slide, index) => (
              <div
                key={slide.id || index}
                className="bg-[#121016] border border-white/10 rounded-xl p-4 space-y-4 hover:border-white/20 transition-all shadow-lg"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-gothic text-xs font-bold text-amber-400">
                    Posición #{index + 1} {index === 0 && '(Imagen Principal / Portada)'}
                  </span>
                  {localData.carouselSlides.length > 1 && (
                    <button
                      onClick={() => {
                        setLocalData({
                          ...localData,
                          carouselSlides: localData.carouselSlides.filter((_, i) => i !== index),
                        });
                        audioService.playClick(300);
                      }}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      title="Eliminar diapositiva"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Preview Frame */}
                <div className="relative w-full h-44 rounded-lg bg-black/60 border border-white/10 overflow-hidden flex items-center justify-center">
                  {slide.image ? (
                    <img
                      src={slide.image}
                      alt={slide.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-neutral-500 text-xs font-mono flex flex-col items-center">
                      <ImageIcon className="w-8 h-8 mb-1 opacity-40" />
                      Sin imagen asignada
                    </div>
                  )}

                  {/* Overlay File Upload on top */}
                  <label className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/80 hover:bg-black text-white text-[11px] font-gothic rounded border border-white/20 flex items-center gap-1.5 cursor-pointer shadow">
                    <Upload className="w-3 h-3 text-amber-400" />
                    <span>Subir de mi equipo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageFileUpload(e, (dataUrl) => {
                          const updated = [...localData.carouselSlides];
                          updated[index].image = dataUrl;
                          setLocalData({ ...localData, carouselSlides: updated });
                        })
                      }
                    />
                  </label>
                </div>

                {/* Fields */}
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono text-[11px]">
                      URL de la imagen (o generada / subida):
                    </label>
                    <input
                      type="text"
                      value={slide.image}
                      onChange={(e) => {
                        const updated = [...localData.carouselSlides];
                        updated[index].image = e.target.value;
                        setLocalData({ ...localData, carouselSlides: updated });
                      }}
                      className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-mono text-xs focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono text-[11px]">
                      Título / Pie de foto:
                    </label>
                    <input
                      type="text"
                      value={slide.caption}
                      onChange={(e) => {
                        const updated = [...localData.carouselSlides];
                        updated[index].caption = e.target.value;
                        setLocalData({ ...localData, carouselSlides: updated });
                      }}
                      className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-sans-ui text-xs focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono text-[11px]">
                      Cita gótica destacada:
                    </label>
                    <input
                      type="text"
                      value={slide.quote || ''}
                      onChange={(e) => {
                        const updated = [...localData.carouselSlides];
                        updated[index].quote = e.target.value;
                        setLocalData({ ...localData, carouselSlides: updated });
                      }}
                      className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-quote italic text-xs focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section: TRÁILER OFICIAL DE LA HISTORIA (VIDEO / CINEMÁTICA) */}
          <div className="bg-[#120e17] border border-red-500/40 rounded-xl p-5 sm:p-6 space-y-4 shadow-xl mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div>
                <h3 className="font-gothic text-base sm:text-lg font-bold text-red-300 flex items-center gap-2">
                  <Film className="w-5 h-5 text-red-500" />
                  <span>Tráiler Oficial de la Historia (Cinemática / Video)</span>
                </h3>
                <p className="text-xs text-neutral-400 font-sans-ui mt-0.5">
                  El botón <strong>«Ver Tráiler»</strong> en la portada abrirá este video para todos los lectores. Sube tu archivo de video o ingresa un enlace directo / YouTube.
                </p>
              </div>

              {localData.trailerVideoUrl && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('¿Deseas remover el video del tráiler actual?')) {
                      setLocalData({ ...localData, trailerVideoUrl: '' });
                      audioService.playClick(300);
                    }
                  }}
                  className="px-3 py-1.5 bg-red-950/70 hover:bg-red-900 border border-red-500/40 text-red-300 text-xs font-mono uppercase tracking-wider rounded-lg flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Quitar Video</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
              {/* Left: Video Upload and URL Controls */}
              <div className="space-y-4">
                {/* Upload File */}
                <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-3">
                  <label className="block text-xs font-gothic uppercase tracking-wider text-neutral-200 font-bold flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-red-400" />
                      <span>Subir Video desde tu dispositivo (MP4 / WebM)</span>
                    </span>
                    {localData.trailerVideoUrl && (
                      <span className="text-[10px] text-emerald-400 font-mono">Video Configurado</span>
                    )}
                  </label>

                  <label className="w-full px-4 py-3 bg-red-950/80 hover:bg-red-900 border border-red-500/60 text-red-100 rounded-lg text-xs font-gothic uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all shadow font-bold">
                    <Upload className="w-4 h-4 text-red-400" />
                    <span>Seleccionar Archivo de Video</span>
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/ogg,video/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            if (typeof reader.result === 'string') {
                              setLocalData({ ...localData, trailerVideoUrl: reader.result });
                              audioService.playBell(440);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>

                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono text-[10px] uppercase">
                      O ingresar URL directa de video / YouTube / Vimeo:
                    </label>
                    <input
                      type="text"
                      value={localData.trailerVideoUrl || ''}
                      onChange={(e) => setLocalData({ ...localData, trailerVideoUrl: e.target.value })}
                      placeholder="https://ejemplo.com/trailer.mp4 o https://youtube.com/watch?v=..."
                      className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-mono text-xs focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Title & Description Fields */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono text-[11px]">
                      Título del Tráiler:
                    </label>
                    <input
                      type="text"
                      value={localData.trailerTitle || ''}
                      onChange={(e) => setLocalData({ ...localData, trailerTitle: e.target.value })}
                      placeholder="Ej: Tráiler Oficial • Santa Vita"
                      className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-gothic text-xs focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono text-[11px]">
                      Descripción / Subtítulo del Tráiler:
                    </label>
                    <textarea
                      rows={2}
                      value={localData.trailerDescription || ''}
                      onChange={(e) => setLocalData({ ...localData, trailerDescription: e.target.value })}
                      placeholder="Ej: Adéntrate en los pasillos de clausura y descubre los secretos que nadie se atreve a pronunciar..."
                      className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-quote italic text-xs focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Live Video Preview Player */}
              <div className="bg-black/60 border border-white/15 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider font-bold">
                    Vista Previa del Tráiler
                  </span>
                  {localData.trailerVideoUrl ? (
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Listo
                    </span>
                  ) : (
                    <span className="text-[10px] text-neutral-500 font-mono">Sin video cargado</span>
                  )}
                </div>

                <div className="aspect-video w-full bg-black rounded-lg overflow-hidden border border-white/10 flex items-center justify-center relative">
                  {localData.trailerVideoUrl ? (
                    localData.trailerVideoUrl.includes('youtube.com') || localData.trailerVideoUrl.includes('youtu.be') ? (
                      <iframe
                        src={localData.trailerVideoUrl.replace('watch?v=', 'embed/')}
                        title="Trailer Preview"
                        className="w-full h-full border-0"
                      />
                    ) : (
                      <video
                        src={localData.trailerVideoUrl}
                        controls
                        className="w-full h-full object-contain"
                      />
                    )
                  ) : (
                    <div className="text-center p-4 space-y-2">
                      <Film className="w-8 h-8 text-neutral-600 mx-auto" />
                      <p className="text-xs text-neutral-500 font-sans-ui">
                        Sube un archivo de video para previsualizarlo aquí.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SYNOPSIS */}
      {activeTab === 'synopsis' && (
        <div className="bg-[#121016] border border-white/10 rounded-xl p-5 sm:p-6 space-y-5 shadow-xl max-w-3xl">
          <div className="border-b border-white/10 pb-3">
            <h2 className="font-gothic text-lg font-bold text-neutral-100">
              Edición de la Sinopsis Canónica Oficial
            </h2>
            <p className="text-xs text-neutral-400">
              Personaliza el texto de la sinopsis que se despliega en el modal de sinopsis y en la carátula inicial.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Título de la Obra:</label>
              <input
                type="text"
                value={localData.synopsis.title}
                onChange={(e) =>
                  setLocalData({
                    ...localData,
                    synopsis: { ...localData.synopsis, title: e.target.value },
                  })
                }
                className="w-full bg-[#181620] border border-white/10 rounded px-3 py-2 text-neutral-200 font-bold focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Subtítulo:</label>
              <input
                type="text"
                value={localData.synopsis.subtitle}
                onChange={(e) =>
                  setLocalData({
                    ...localData,
                    synopsis: { ...localData.synopsis, subtitle: e.target.value },
                  })
                }
                className="w-full bg-[#181620] border border-white/10 rounded px-3 py-2 text-neutral-200 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Autor:</label>
              <input
                type="text"
                value={localData.synopsis.author}
                onChange={(e) =>
                  setLocalData({
                    ...localData,
                    synopsis: { ...localData.synopsis, author: e.target.value },
                  })
                }
                className="w-full bg-[#181620] border border-white/10 rounded px-3 py-2 text-neutral-200 focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Género / Etiqueta:</label>
              <input
                type="text"
                value={localData.synopsis.genre}
                onChange={(e) =>
                  setLocalData({
                    ...localData,
                    synopsis: { ...localData.synopsis, genre: e.target.value },
                  })
                }
                className="w-full bg-[#181620] border border-white/10 rounded px-3 py-2 text-neutral-200 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Texto Completo de la Sinopsis:</label>
            <textarea
              rows={8}
              value={localData.synopsis.synopsis}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  synopsis: { ...localData.synopsis, synopsis: e.target.value },
                })
              }
              className="w-full bg-[#181620] border border-white/10 rounded px-3 py-2 text-neutral-200 font-serif leading-relaxed text-sm focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Cita Canónica en Cuadro:</label>
            <input
              type="text"
              value={localData.synopsis.mainQuote}
              onChange={(e) =>
                setLocalData({
                  ...localData,
                  synopsis: { ...localData.synopsis, mainQuote: e.target.value },
                })
              }
              className="w-full bg-[#181620] border border-white/10 rounded px-3 py-2 text-neutral-200 font-quote italic text-sm focus:outline-none focus:border-red-500"
            />
          </div>
        </div>
      )}

      {/* TAB 3: SECRET FILES */}
      {activeTab === 'secrets' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h2 className="font-gothic text-lg font-bold text-neutral-100 flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-500" />
                <span>Bóveda de Archivos Secretos & Confidenciales</span>
              </h2>
              <p className="text-xs text-neutral-400">
                Administra los expedientes clasificados, fechas, autoridades, pistas canónicas y marca archivos como bloqueados permanentemente.
              </p>
            </div>

            <button
              onClick={() => {
                const newDoc: SecretFile = {
                  id: `sec-${Date.now()}`,
                  code: `EXP-${Date.now().toString().slice(-4)}`,
                  title: 'Nuevo Documento Confidencial',
                  date: '14 de Octubre de 1924',
                  classificationOfficer: 'Tribunal Canónico / Custodio',
                  clearanceLevel: 'Clasificado',
                  isEncrypted: true,
                  isPermanentlyLocked: false,
                  decryptKey: 'CONFESION',
                  hint: 'Pista deducible de la lectura...',
                  evidenceType: 'Informe Forense',
                  content: 'Contenido oficial del expediente...',
                };
                setLocalData({
                  ...localData,
                  secrets: [...localData.secrets, newDoc],
                });
                audioService.playClick(480);
              }}
              className="px-4 py-2 bg-gradient-to-r from-red-950 to-red-900 hover:from-red-900 hover:to-red-800 border border-red-500/50 rounded-lg text-xs font-gothic uppercase tracking-wider flex items-center gap-1.5 cursor-pointer text-white shadow-md"
            >
              <Plus className="w-4 h-4" />
              Nuevo Expediente
            </button>
          </div>

          <div className="space-y-4">
            {localData.secrets.map((sec, idx) => (
              <div key={sec.id || idx} className="bg-[#121016] border border-white/10 rounded-xl p-4 sm:p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    {sec.isPermanentlyLocked ? (
                      <span className="px-2 py-0.5 rounded bg-red-950 border border-red-500 text-red-300 font-mono text-[10px] font-bold uppercase flex items-center gap-1">
                        🔒 Bóveda Inaccesible
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-500/50 text-amber-300 font-mono text-[10px] uppercase">
                        🔑 Desencriptable
                      </span>
                    )}
                    <span className="font-gothic text-sm font-bold text-neutral-200">
                      Expediente #{idx + 1} — {sec.code}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setLocalData({
                        ...localData,
                        secrets: localData.secrets.filter((_, i) => i !== idx),
                      });
                      audioService.playClick(300);
                    }}
                    className="text-red-400 hover:text-red-300 p-1.5 rounded hover:bg-red-950/40 transition-colors cursor-pointer"
                    title="Eliminar expediente"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Main Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Código de Archivo:</label>
                    <input
                      type="text"
                      value={sec.code}
                      onChange={(e) => {
                        const next = [...localData.secrets];
                        next[idx].code = e.target.value;
                        setLocalData({ ...localData, secrets: next });
                      }}
                      className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-mono font-bold"
                    />
                  </div>

                  <div className="sm:col-span-2 md:col-span-2">
                    <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Título del Archivo:</label>
                    <input
                      type="text"
                      value={sec.title}
                      onChange={(e) => {
                        const next = [...localData.secrets];
                        next[idx].title = e.target.value;
                        setLocalData({ ...localData, secrets: next });
                      }}
                      className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Fecha del Registro:</label>
                    <input
                      type="text"
                      value={sec.date || ''}
                      placeholder="Ej: 14 de Octubre de 1924"
                      onChange={(e) => {
                        const next = [...localData.secrets];
                        next[idx].date = e.target.value;
                        setLocalData({ ...localData, secrets: next });
                      }}
                      className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Nivel de Clasificación:</label>
                    <select
                      value={sec.clearanceLevel}
                      onChange={(e) => {
                        const next = [...localData.secrets];
                        next[idx].clearanceLevel = e.target.value;
                        setLocalData({ ...localData, secrets: next });
                      }}
                      className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-mono"
                    >
                      <option value="Nivel 1">Nivel 1</option>
                      <option value="Nivel 2">Nivel 2</option>
                      <option value="Clasificado">Clasificado</option>
                      <option value="Ultra Secreto">Ultra Secreto</option>
                      <option value="Bóveda Negra (Inaccesible)">Bóveda Negra (Inaccesible)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Tipo de Evidencia:</label>
                    <select
                      value={sec.evidenceType}
                      onChange={(e) => {
                        const next = [...localData.secrets];
                        next[idx].evidenceType = e.target.value;
                        setLocalData({ ...localData, secrets: next });
                      }}
                      className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-mono"
                    >
                      <option value="Informe Forense">Informe Forense</option>
                      <option value="Manuscrito Antiguo">Manuscrito Antiguo</option>
                      <option value="Transcripción Oculta">Transcripción Oculta</option>
                      <option value="Carta Interceptada">Carta Interceptada</option>
                      <option value="Acta Parroquial Censurada">Acta Parroquial Censurada</option>
                      <option value="Fotografía Confiscada">Fotografía Confiscada</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Autoridad / Custodio:</label>
                    <input
                      type="text"
                      value={sec.classificationOfficer || ''}
                      placeholder="Ej: Tribunal Eclesiástico / Padre Fermín"
                      onChange={(e) => {
                        const next = [...localData.secrets];
                        next[idx].classificationOfficer = e.target.value;
                        setLocalData({ ...localData, secrets: next });
                      }}
                      className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200"
                    />
                  </div>
                </div>

                {/* Security Lock Toggle */}
                <div className="p-3.5 bg-black/40 border border-white/10 rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={!!sec.isPermanentlyLocked}
                        onChange={(e) => {
                          const next = [...localData.secrets];
                          next[idx].isPermanentlyLocked = e.target.checked;
                          if (e.target.checked) {
                            next[idx].clearanceLevel = 'Bóveda Negra (Inaccesible)';
                            if (!next[idx].permanentLockReason) {
                              next[idx].permanentLockReason = 'ACCESO DENEGADO PERMANENTE • Documento sellado bajo secreto pontificio. No se puede desbloquear.';
                            }
                          }
                          setLocalData({ ...localData, secrets: next });
                        }}
                        className="w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-neutral-900 border-white/20"
                      />
                      <span className="font-gothic text-xs font-bold text-red-400 uppercase tracking-wider">
                        Bloquear de Forma Permanente (No se puede desbloquear)
                      </span>
                    </label>
                  </div>

                  {sec.isPermanentlyLocked ? (
                    <div>
                      <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Motivo del Bloqueo Permanente (Censura):</label>
                      <input
                        type="text"
                        value={sec.permanentLockReason || ''}
                        placeholder="Ej: ACCESO DENEGADO PERMANENTE • CENSURA EPISCOPAL ABSOLUTA"
                        onChange={(e) => {
                          const next = [...localData.secrets];
                          next[idx].permanentLockReason = e.target.value;
                          setLocalData({ ...localData, secrets: next });
                        }}
                        className="w-full bg-[#181620] border border-red-500/40 rounded px-2.5 py-1.5 text-red-200 font-mono text-xs"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Clave Canónica de Desencriptado:</label>
                        <input
                          type="text"
                          value={sec.decryptKey}
                          onChange={(e) => {
                            const next = [...localData.secrets];
                            next[idx].decryptKey = e.target.value;
                            setLocalData({ ...localData, secrets: next });
                          }}
                          className="w-full bg-[#181620] border border-amber-500/30 rounded px-2.5 py-1.5 text-amber-300 font-mono uppercase font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Pista para el Lector (Deducible de la historia):</label>
                        <input
                          type="text"
                          value={sec.hint}
                          onChange={(e) => {
                            const next = [...localData.secrets];
                            next[idx].hint = e.target.value;
                            setLocalData({ ...localData, secrets: next });
                          }}
                          className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-300"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Contenido del Documento Secreto:</label>
                  <textarea
                    rows={4}
                    value={sec.content}
                    onChange={(e) => {
                      const next = [...localData.secrets];
                      next[idx].content = e.target.value;
                      setLocalData({ ...localData, secrets: next });
                    }}
                    className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-2 text-neutral-200 font-mono text-xs leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: RADIO SANTA VITA & AUDIOS */}
      {activeTab === 'radio' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h2 className="font-gothic text-lg sm:text-xl font-bold text-neutral-100 flex items-center gap-2">
                <Radio className="w-5 h-5 text-amber-500" />
                <span>Gestión de Audio & Radio Santa Vita</span>
              </h2>
              <p className="text-xs text-neutral-400 font-sans-ui mt-0.5">
                Configura la radio general para la navegación de la app o sube y asigna audios específicos para cada capítulo del lector.
              </p>
            </div>

            {/* Two-Category Switcher */}
            <div className="flex items-center p-1 bg-black/60 border border-white/10 rounded-xl shrink-0">
              <button
                onClick={() => {
                  audioService.playClick(440);
                  setRadioSubCategory('general');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-gothic tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                  radioSubCategory === 'general'
                    ? 'bg-amber-950/90 border border-amber-500/60 text-amber-200 font-bold shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <RadioTower className="w-3.5 h-3.5" />
                <span>1. Radio General (Navegación)</span>
                <span className="text-[10px] font-mono bg-black/50 px-1.5 py-0.5 rounded text-amber-400">
                  {localData.radioTracks.length}
                </span>
              </button>

              <button
                onClick={() => {
                  audioService.playClick(500);
                  setRadioSubCategory('chapters');
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-gothic tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                  radioSubCategory === 'chapters'
                    ? 'bg-red-950/90 border border-red-500/60 text-red-200 font-bold shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>2. Audios por Capítulo (Lector)</span>
                <span className="text-[10px] font-mono bg-black/50 px-1.5 py-0.5 rounded text-red-400">
                  {localData.chapters.length}
                </span>
              </button>
            </div>
          </div>

          {/* ========================================================
              CATEGORY 1: RADIO GENERAL (MÚSICA AL NAVEGAR POR LA APP)
             ======================================================== */}
          {radioSubCategory === 'general' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3 bg-[#110f17] p-3 rounded-xl border border-amber-500/20">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 font-gothic text-lg">☩</span>
                  <div>
                    <h3 className="font-gothic text-sm font-bold text-neutral-200">
                      Frecuencias & Estaciones Generales de Radio
                    </h3>
                    <p className="text-[11px] text-neutral-400">
                      Estas pistas se reproducen cuando el usuario sintoniza la radio mientras explora la aplicación.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const newStation: AudioFrequencyData = {
                      id: `radio-${Date.now()}`,
                      name: 'Nueva Emisión Clandestina',
                      frequency: '99.9 MHz FM',
                      type: 'organ',
                      description: 'Transmisión nocturna desde las torres.',
                    };
                    setLocalData({
                      ...localData,
                      radioTracks: [...localData.radioTracks, newStation],
                    });
                    audioService.playClick(480);
                  }}
                  className="px-3 py-1.5 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 rounded text-xs font-gothic uppercase tracking-wider flex items-center gap-1.5 cursor-pointer text-amber-200"
                >
                  <Plus className="w-4 h-4" />
                  Nueva Estación General
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {localData.radioTracks.map((tr, idx) => (
                  <div key={tr.id || idx} className="bg-[#121016] border border-white/10 rounded-xl p-4 space-y-3 shadow-lg">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <div className="flex items-center gap-2">
                        <Radio className="w-4 h-4 text-amber-500" />
                        <span className="font-mono text-xs font-bold text-neutral-200">{tr.frequency}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleTestAudio(tr.id, tr.audioUrl, tr.type)}
                          className={`px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 cursor-pointer transition-colors ${
                            playingAudioPreviewId === tr.id
                              ? 'bg-red-900 text-white font-bold'
                              : 'bg-black/60 text-amber-400 hover:text-amber-300 border border-amber-500/30'
                          }`}
                          title="Probar sonido en vivo"
                        >
                          {playingAudioPreviewId === tr.id ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          <span>{playingAudioPreviewId === tr.id ? 'Pausar' : 'Probar'}</span>
                        </button>
                        <button
                          onClick={() => {
                            setLocalData({
                              ...localData,
                              radioTracks: localData.radioTracks.filter((_, i) => i !== idx),
                            });
                            audioService.playClick(300);
                          }}
                          className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Nombre del Programa / Canal:</label>
                        <input
                          type="text"
                          value={tr.name}
                          onChange={(e) => {
                            const next = [...localData.radioTracks];
                            next[idx].name = e.target.value;
                            setLocalData({ ...localData, radioTracks: next });
                          }}
                          className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Frecuencia radial:</label>
                        <input
                          type="text"
                          value={tr.frequency}
                          onChange={(e) => {
                            const next = [...localData.radioTracks];
                            next[idx].frequency = e.target.value;
                            setLocalData({ ...localData, radioTracks: next });
                          }}
                          className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-mono"
                        />
                      </div>

                      {/* Audio File Upload or URL */}
                      <div className="bg-[#181622] p-2.5 rounded-lg border border-white/10 space-y-2">
                        <label className="block text-amber-400 font-mono text-[11px] font-bold flex items-center gap-1.5">
                          <Music className="w-3.5 h-3.5" />
                          Archivo de Audio (.mp3, .wav, etc.) o URL:
                        </label>
                        
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder="URL de audio o sube un archivo local..."
                            value={tr.audioUrl || ''}
                            onChange={(e) => {
                              const next = [...localData.radioTracks];
                              next[idx].audioUrl = e.target.value;
                              setLocalData({ ...localData, radioTracks: next });
                            }}
                            className="flex-1 bg-[#100e16] border border-white/10 rounded px-2 py-1 text-neutral-300 font-mono text-xs"
                          />

                          <label className="px-2.5 py-1 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 rounded text-[11px] font-mono text-amber-300 flex items-center gap-1 cursor-pointer shrink-0 transition-colors">
                            <Upload className="w-3 h-3" />
                            <span>Subir Audio</span>
                            <input
                              type="file"
                              accept="audio/*"
                              className="hidden"
                              onChange={(e) =>
                                handleAudioFileUpload(e, (dataUrl) => {
                                  const next = [...localData.radioTracks];
                                  next[idx].audioUrl = dataUrl;
                                  setLocalData({ ...localData, radioTracks: next });
                                })
                              }
                            />
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Atmósfera Sonora:</label>
                        <select
                          value={tr.type}
                          onChange={(e) => {
                            const next = [...localData.radioTracks];
                            next[idx].type = e.target.value as 'organ' | 'chant' | 'bell' | 'static';
                            setLocalData({ ...localData, radioTracks: next });
                          }}
                          className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-mono"
                        >
                          <option value="organ">Órgano Gótico de Catedral</option>
                          <option value="chant">Cánticos Litúrgicos Celestiales</option>
                          <option value="bell">Campanadas de Medianoche</option>
                          <option value="static">Frecuencia de Estática Oscura</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Descripción / Frase al Aire:</label>
                        <input
                          type="text"
                          value={tr.description}
                          onChange={(e) => {
                            const next = [...localData.radioTracks];
                            next[idx].description = e.target.value;
                            setLocalData({ ...localData, radioTracks: next });
                          }}
                          className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-300 font-sans-ui"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================
              CATEGORY 2: AUDIOS ESPECÍFICOS POR CAPÍTULO (LECTOR)
             ======================================================== */}
          {radioSubCategory === 'chapters' && (
            <div className="space-y-6">
              
              {/* Banner Info */}
              <div className="bg-[#150f14] border-2 border-red-500/30 rounded-xl p-4 sm:p-5 shadow-2xl space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <Headphones className="w-5 h-5 text-red-400" />
                    <div>
                      <h3 className="font-gothic text-base font-bold text-neutral-100">
                        Subir y Asignar Audio a un Capítulo Específico
                      </h3>
                      <p className="text-xs text-neutral-400 font-sans-ui">
                        Selecciona el capítulo de destino, sube el archivo de audio (.mp3, .wav) y configúralo para el sintonizador del lector.
                      </p>
                    </div>
                  </div>
                </div>

                {/* DESTINATION CHAPTER SELECTOR & UPLOAD ENGINE */}
                {(() => {
                  const targetIndex = localData.chapters.findIndex((c) => c.id === targetChapterId);
                  const activeTargetChap = localData.chapters[targetIndex] || localData.chapters[0];

                  if (!activeTargetChap) return null;

                  return (
                    <div className="space-y-4 pt-1">
                      
                      {/* Chapter Target Dropdown */}
                      <div>
                        <label className="block text-red-300 font-gothic text-xs uppercase tracking-wider mb-1.5 font-bold flex items-center gap-1.5">
                          <Bookmark className="w-4 h-4 text-amber-500" />
                          ¿A qué capítulo enviar el audio? (Capítulo de Destino):
                        </label>
                        <select
                          value={activeTargetChap.id}
                          onChange={(e) => {
                            audioService.playClick(440);
                            setTargetChapterId(e.target.value);
                          }}
                          className="w-full bg-[#201722] border-2 border-red-500/50 rounded-lg px-3 py-2 text-sm text-neutral-100 font-serif font-bold shadow-md focus:border-red-400 focus:outline-none"
                        >
                          {localData.chapters.map((chap) => (
                            <option key={chap.id} value={chap.id} className="bg-[#121016] text-neutral-200">
                              {chap.number === 0 ? 'Prólogo' : `Capítulo ${chap.number}`}: {chap.title} {chap.audioUrl ? '🎵 (Con audio subido)' : '⚠️ (Sin audio subido)'}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Box for the selected target chapter */}
                      <div className="bg-[#0e0c13] border border-[#4a3625] rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/10 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-red-950 border border-red-500/50 text-red-300 font-gothic text-xs rounded uppercase font-bold">
                              {activeTargetChap.number === 0 ? 'Prólogo Canónico' : `Capítulo ${activeTargetChap.number}`}
                            </span>
                            <span className="font-serif text-sm font-bold text-neutral-200 truncate">
                              {activeTargetChap.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {activeTargetChap.audioUrl ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Audio Asignado
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-400 text-[11px] font-mono">
                                Atmósfera Litúrgica
                              </span>
                            )}

                            <button
                              onClick={() =>
                                toggleTestAudio(
                                  activeTargetChap.id,
                                  activeTargetChap.audioUrl,
                                  activeTargetChap.audioTheme || 'organ'
                                )
                              }
                              className={`px-3 py-1 rounded text-xs font-gothic uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors ${
                                playingAudioPreviewId === activeTargetChap.id
                                  ? 'bg-red-900 text-white font-bold'
                                  : 'bg-black/60 text-amber-300 hover:text-white border border-amber-500/40'
                              }`}
                            >
                              {playingAudioPreviewId === activeTargetChap.id ? (
                                <Pause className="w-3.5 h-3.5" />
                              ) : (
                                <Play className="w-3.5 h-3.5" />
                              )}
                              <span>{playingAudioPreviewId === activeTargetChap.id ? 'Pausar Prueba' : 'Probar Audio'}</span>
                            </button>
                          </div>
                        </div>

                        {/* File Upload / URL Controls */}
                        <div className="bg-[#181420] p-3 rounded-lg border border-amber-500/30 space-y-2">
                          <label className="block text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5 text-amber-400" />
                            Subir Archivo de Audio para "{activeTargetChap.title}":
                          </label>

                          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                            <input
                              type="text"
                              placeholder="URL del archivo o sube un archivo local..."
                              value={activeTargetChap.audioUrl || ''}
                              onChange={(e) => {
                                const next = [...localData.chapters];
                                next[targetIndex].audioUrl = e.target.value;
                                setLocalData({ ...localData, chapters: next });
                              }}
                              className="flex-1 bg-[#0d0b12] border border-white/15 rounded px-3 py-1.5 text-neutral-200 font-mono text-xs"
                            />

                            <label className="px-4 py-2 bg-gradient-to-r from-amber-900 to-amber-950 hover:from-amber-800 hover:to-amber-900 border border-amber-500/60 rounded text-xs font-gothic uppercase tracking-wider text-amber-200 flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-all shadow-md">
                              <Upload className="w-4 h-4" />
                              <span>Subir Archivo MP3 / WAV</span>
                              <input
                                type="file"
                                accept="audio/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleAudioFileUpload(e, (dataUrl) => {
                                    const next = [...localData.chapters];
                                    next[targetIndex].audioUrl = dataUrl;
                                    setLocalData({ ...localData, chapters: next });
                                  })
                                }
                              />
                            </label>

                            {activeTargetChap.audioUrl && (
                              <button
                                onClick={() => {
                                  const next = [...localData.chapters];
                                  next[targetIndex].audioUrl = '';
                                  setLocalData({ ...localData, chapters: next });
                                  audioService.playClick(300);
                                }}
                                className="px-2.5 py-1.5 bg-red-950/70 hover:bg-red-900 border border-red-500/40 text-red-300 rounded text-xs font-mono cursor-pointer"
                                title="Quitar audio subido"
                              >
                                Quitar Audio
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Additional Radio metadata for this chapter */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                          <div>
                            <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Título de Emisión en Radio:</label>
                            <input
                              type="text"
                              placeholder="Ej: Misa de Medianoche"
                              value={activeTargetChap.audioTitle || ''}
                              onChange={(e) => {
                                const next = [...localData.chapters];
                                next[targetIndex].audioTitle = e.target.value;
                                setLocalData({ ...localData, chapters: next });
                              }}
                              className="w-full bg-[#14121a] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-sans-ui"
                            />
                          </div>

                          <div>
                            <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Conductor / Narrador:</label>
                            <input
                              type="text"
                              placeholder="Ej: Padre Lucien / Gabriel (Sebastián)"
                              value={activeTargetChap.audioAuthor || ''}
                              onChange={(e) => {
                                const next = [...localData.chapters];
                                next[targetIndex].audioAuthor = e.target.value;
                                setLocalData({ ...localData, chapters: next });
                              }}
                              className="w-full bg-[#14121a] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-sans-ui"
                            />
                          </div>

                          <div>
                            <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Atmósfera Litúrgica de Respaldo:</label>
                            <select
                              value={activeTargetChap.audioTheme || 'organ'}
                              onChange={(e) => {
                                const next = [...localData.chapters];
                                next[targetIndex].audioTheme = e.target.value as 'organ' | 'chant' | 'bell' | 'static';
                                setLocalData({ ...localData, chapters: next });
                              }}
                              className="w-full bg-[#14121a] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-mono"
                            >
                              <option value="organ">Órgano Gótico</option>
                              <option value="chant">Cánticos Litúrgicos</option>
                              <option value="bell">Campanadas Solemnes</option>
                              <option value="static">Estática / Frecuencia Oscura</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Frase en Cuadro "Sintonizando la Verdad":</label>
                            <input
                              type="text"
                              placeholder="Bienvenido a Radio Santa Vita..."
                              value={activeTargetChap.broadcastNote || ''}
                              onChange={(e) => {
                                const next = [...localData.chapters];
                                next[targetIndex].broadcastNote = e.target.value;
                                setLocalData({ ...localData, chapters: next });
                              }}
                              className="w-full bg-[#14121a] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-sans-ui"
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* LIST OF ALL CHAPTERS & THEIR CURRENT AUDIO STATUS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-gothic text-sm font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-2">
                    <Music className="w-4 h-4 text-amber-500" />
                    <span>Audios Asignados por Capítulo ({localData.chapters.length})</span>
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {localData.chapters.map((chap, cIdx) => (
                    <div
                      key={chap.id || cIdx}
                      className={`p-3.5 rounded-xl border transition-all ${
                        targetChapterId === chap.id
                          ? 'bg-[#22161f] border-red-500/70 shadow-lg'
                          : 'bg-[#100e14] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 border-b border-white/5 pb-2">
                        <div>
                          <span className="text-[10px] font-mono text-amber-500 font-bold uppercase block">
                            {chap.number === 0 ? 'Prólogo' : `Capítulo ${chap.number}`}
                          </span>
                          <h5 className="font-serif text-xs font-bold text-neutral-200 line-clamp-1">
                            {chap.title}
                          </h5>
                        </div>

                        {chap.audioUrl ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(52,211,153,0.8)]" title="Audio personalizado cargado" />
                        ) : (
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60 shrink-0 mt-1" title="Atmósfera por defecto" />
                        )}
                      </div>

                      <div className="py-2 space-y-1 text-[11px] font-sans-ui text-neutral-400">
                        <p className="truncate">
                          <span className="text-neutral-500 font-mono">Emisión: </span>
                          <span className="text-neutral-300 font-semibold">{chap.audioTitle || chap.title}</span>
                        </p>
                        <p className="truncate">
                          <span className="text-neutral-500 font-mono">Narrador: </span>
                          <span className="text-neutral-300">{chap.audioAuthor || 'Narración Canónica'}</span>
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/5">
                        <button
                          onClick={() => {
                            audioService.playClick(400);
                            setTargetChapterId(chap.id);
                          }}
                          className={`px-2 py-1 rounded text-[10px] font-gothic uppercase tracking-wider cursor-pointer ${
                            targetChapterId === chap.id
                              ? 'bg-red-950 text-red-300 font-bold'
                              : 'bg-black/40 text-neutral-300 hover:text-white'
                          }`}
                        >
                          {targetChapterId === chap.id ? 'Seleccionado' : 'Asignar Audio'}
                        </button>

                        <button
                          onClick={() => toggleTestAudio(chap.id, chap.audioUrl, chap.audioTheme || 'organ')}
                          className={`p-1.5 rounded text-neutral-300 hover:text-white cursor-pointer ${
                            playingAudioPreviewId === chap.id ? 'bg-red-900 text-white' : 'bg-black/50'
                          }`}
                          title="Probar audio"
                        >
                          {playingAudioPreviewId === chap.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* TAB 5: SHOP ITEMS & RELICS */}
      {activeTab === 'shop' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#120e17] border border-red-500/30 p-4 rounded-xl">
            <div>
              <h2 className="font-gothic text-lg font-bold text-red-200 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-red-400" />
                <span>Catálogo de la Tienda & Relicario Oficial</span>
              </h2>
              <p className="text-xs text-neutral-400 font-sans-ui mt-0.5">
                Añade o edita productos, sube fotos desde tu dispositivo, modifica precios, categorías y disponibilidad en inventario.
              </p>
            </div>

            <button
              onClick={() => {
                const newItem: StoreItem = {
                  id: `prod-${Date.now()}`,
                  name: 'Nueva Reliquia del Convento',
                  category: 'Reliquia',
                  price: 19.99,
                  description: 'Descripción de la reliquia sagrada o manuscrito...',
                  rarity: 'Raro',
                  inStock: true,
                  image: '',
                  imageIcon: 'BookOpen',
                };
                setLocalData({
                  ...localData,
                  shopItems: [newItem, ...localData.shopItems],
                });
                audioService.playClick(480);
              }}
              className="px-4 py-2 bg-gradient-to-r from-red-950 to-red-900 hover:from-red-900 hover:to-red-800 border border-red-500/50 rounded-lg text-xs font-gothic uppercase tracking-wider flex items-center gap-1.5 cursor-pointer text-white shadow font-bold shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Producto / Reliquia</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {localData.shopItems.map((item, idx) => (
              <div 
                key={item.id || idx} 
                className="bg-[#121016] border border-white/10 rounded-xl p-4 sm:p-5 space-y-4 hover:border-red-500/30 transition-all shadow-lg"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-gothic text-xs font-bold text-amber-400">
                      Artículo #{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-neutral-300">
                      {item.category}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (window.confirm(`¿Deseas eliminar "${item.name}" del catálogo?`)) {
                        setLocalData({
                          ...localData,
                          shopItems: localData.shopItems.filter((_, i) => i !== idx),
                        });
                        audioService.playClick(300);
                      }
                    }}
                    className="text-red-400 hover:text-red-300 p-1.5 rounded hover:bg-red-950/40 transition-colors cursor-pointer"
                    title="Eliminar producto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Photo / Image Upload & Preview */}
                <div className="space-y-2">
                  <label className="block text-neutral-300 font-gothic text-xs uppercase tracking-wider font-bold">
                    Fotografía del Producto:
                  </label>

                  <div className="flex gap-3 items-center">
                    {/* Thumbnail Preview */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-black/60 border border-white/15 shrink-0 flex items-center justify-center relative">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ShoppingCart className="w-6 h-6 text-neutral-600" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <label className="w-full px-3 py-1.5 bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-100 rounded text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Subir Foto del Dispositivo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => {
                                if (typeof reader.result === 'string') {
                                  const next = [...localData.shopItems];
                                  next[idx].image = reader.result;
                                  setLocalData({ ...localData, shopItems: next });
                                  audioService.playClick(500);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>

                      <input
                        type="text"
                        value={item.image || ''}
                        placeholder="O ingresa URL directa de imagen..."
                        onChange={(e) => {
                          const next = [...localData.shopItems];
                          next[idx].image = e.target.value;
                          setLocalData({ ...localData, shopItems: next });
                        }}
                        className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1 text-neutral-300 font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Nombre del Producto:</label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => {
                        const next = [...localData.shopItems];
                        next[idx].name = e.target.value;
                        setLocalData({ ...localData, shopItems: next });
                      }}
                      className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-100 font-gothic text-xs font-bold focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Precio ($ USD):</label>
                      <input
                        type="number"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => {
                          const next = [...localData.shopItems];
                          next[idx].price = parseFloat(e.target.value) || 0;
                          setLocalData({ ...localData, shopItems: next });
                        }}
                        className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-amber-400 font-mono font-bold focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Categoría:</label>
                      <select
                        value={item.category}
                        onChange={(e) => {
                          const next = [...localData.shopItems];
                          next[idx].category = e.target.value;
                          setLocalData({ ...localData, shopItems: next });
                        }}
                        className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-mono focus:outline-none focus:border-red-500"
                      >
                        <option value="Reliquia">Reliquia</option>
                        <option value="Lectura">Lectura</option>
                        <option value="Coleccionable">Coleccionable</option>
                        <option value="Pase">Pase</option>
                        <option value="Merch">Merch</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Rareza:</label>
                      <select
                        value={item.rarity || 'Raro'}
                        onChange={(e) => {
                          const next = [...localData.shopItems];
                          next[idx].rarity = e.target.value;
                          setLocalData({ ...localData, shopItems: next });
                        }}
                        className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-mono focus:outline-none focus:border-red-500"
                      >
                        <option value="Común">Común</option>
                        <option value="Raro">Raro</option>
                        <option value="Místico">Místico</option>
                        <option value="Prohibido">Prohibido</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Descripción:</label>
                    <textarea
                      rows={2}
                      value={item.description}
                      onChange={(e) => {
                        const next = [...localData.shopItems];
                        next[idx].description = e.target.value;
                        setLocalData({ ...localData, shopItems: next });
                      }}
                      className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-300 font-sans-ui text-xs focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id={`stock-${item.id}-${idx}`}
                      checked={item.inStock}
                      onChange={(e) => {
                        const next = [...localData.shopItems];
                        next[idx].inStock = e.target.checked;
                        setLocalData({ ...localData, shopItems: next });
                      }}
                      className="rounded accent-red-600 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor={`stock-${item.id}-${idx}`} className="text-neutral-300 font-mono text-xs cursor-pointer">
                      En Inventario Disponible (Visible para la compra)
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: CHAPTERS */}
      {activeTab === 'chapters' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-gothic text-lg font-bold text-neutral-100">
                Capítulos y Textos del Manuscrito
              </h2>
              <p className="text-xs text-neutral-400">
                Edita los textos de lectura, títulos y partes del relato.
              </p>
            </div>

            <button
              onClick={() => {
                const nextNum = localData.chapters.length;
                const newChapter: Chapter = {
                  id: `cap-${nextNum}`,
                  number: nextNum,
                  part: 1,
                  title: `Capítulo ${nextNum}: Nueva Entrega`,
                  subtitle: `Capítulo ${nextNum}`,
                  estimatedReadTime: '10 min',
                  synopsis: 'Breve resumen del nuevo capítulo...',
                  date: 'Fecha de Publicación',
                  isUnlocked: true,
                  content: ['El texto del nuevo capítulo comienza aquí...'],
                };
                setLocalData({
                  ...localData,
                  chapters: [...localData.chapters, newChapter],
                });
                audioService.playClick(480);
              }}
              className="px-3 py-1.5 bg-red-950 hover:bg-red-900 border border-red-500/50 rounded text-xs font-gothic uppercase tracking-wider flex items-center gap-1.5 cursor-pointer text-white"
            >
              <Plus className="w-4 h-4" />
              Añadir Capítulo
            </button>
          </div>

          <div className="space-y-4">
            {localData.chapters.map((chap, idx) => (
              <div key={chap.id || idx} className="bg-[#121016] border border-white/10 rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-gothic text-xs font-bold text-purple-400">
                    {chap.number === 0 ? 'Prólogo / Cap 0' : `Capítulo ${chap.number}`} — {chap.title}
                  </span>
                  {localData.chapters.length > 1 && (
                    <button
                      onClick={() => {
                        setLocalData({
                          ...localData,
                          chapters: localData.chapters.filter((_, i) => i !== idx),
                        });
                        audioService.playClick(300);
                      }}
                      className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Título del Capítulo:</label>
                    <input
                      type="text"
                      value={chap.title}
                      onChange={(e) => {
                        const next = [...localData.chapters];
                        next[idx].title = e.target.value;
                        setLocalData({ ...localData, chapters: next });
                      }}
                      className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Subtítulo:</label>
                    <input
                      type="text"
                      value={chap.subtitle}
                      onChange={(e) => {
                        const next = [...localData.chapters];
                        next[idx].subtitle = e.target.value;
                        setLocalData({ ...localData, chapters: next });
                      }}
                      className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200"
                    />
                  </div>
                </div>

                {/* Chapter Audio Linking & Radio Settings */}
                <div className="bg-[#181622] p-3 rounded-lg border border-amber-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-amber-400 font-mono text-[11px] font-bold flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-amber-400" />
                      Audio para la Radio del Capítulo (MP3, WAV, etc.):
                    </label>

                    <button
                      onClick={() => toggleTestAudio(chap.id, chap.audioUrl, chap.audioTheme || 'organ')}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-1 cursor-pointer transition-colors ${
                        playingAudioPreviewId === chap.id
                          ? 'bg-red-900 text-white font-bold'
                          : 'bg-black/60 text-amber-400 hover:text-amber-300 border border-amber-500/30'
                      }`}
                      title="Probar reproducción"
                    >
                      {playingAudioPreviewId === chap.id ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      <span>{playingAudioPreviewId === chap.id ? 'Pausar' : 'Probar'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-neutral-400 mb-0.5 font-mono text-[10px]">Título de Emisión en Radio:</label>
                      <input
                        type="text"
                        placeholder="Ej: Misa de Medianoche"
                        value={chap.audioTitle || ''}
                        onChange={(e) => {
                          const next = [...localData.chapters];
                          next[idx].audioTitle = e.target.value;
                          setLocalData({ ...localData, chapters: next });
                        }}
                        className="w-full bg-[#100e16] border border-white/10 rounded px-2 py-1 text-neutral-200 font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 mb-0.5 font-mono text-[10px]">Narrador / Conductor:</label>
                      <input
                        type="text"
                        placeholder="Ej: Padre Lucien / Gabriel (Sebastián)"
                        value={chap.audioAuthor || ''}
                        onChange={(e) => {
                          const next = [...localData.chapters];
                          next[idx].audioAuthor = e.target.value;
                          setLocalData({ ...localData, chapters: next });
                        }}
                        className="w-full bg-[#100e16] border border-white/10 rounded px-2 py-1 text-neutral-200 font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* Audio File or URL input */}
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="URL de audio o sube un archivo local..."
                      value={chap.audioUrl || ''}
                      onChange={(e) => {
                        const next = [...localData.chapters];
                        next[idx].audioUrl = e.target.value;
                        setLocalData({ ...localData, chapters: next });
                      }}
                      className="flex-1 bg-[#100e16] border border-white/10 rounded px-2 py-1 text-neutral-300 font-mono text-xs"
                    />

                    <label className="px-2.5 py-1 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 rounded text-[11px] font-mono text-amber-300 flex items-center gap-1 cursor-pointer shrink-0 transition-colors">
                      <Upload className="w-3 h-3" />
                      <span>Subir Audio</span>
                      <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        onChange={(e) =>
                          handleAudioFileUpload(e, (dataUrl) => {
                            const next = [...localData.chapters];
                            next[idx].audioUrl = dataUrl;
                            setLocalData({ ...localData, chapters: next });
                          })
                        }
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-neutral-400 mb-0.5 font-mono text-[10px]">Atmósfera Sonora (Sintetizador Canónico):</label>
                      <select
                        value={chap.audioTheme || 'organ'}
                        onChange={(e) => {
                          const next = [...localData.chapters];
                          next[idx].audioTheme = e.target.value as 'organ' | 'chant' | 'bell' | 'static';
                          setLocalData({ ...localData, chapters: next });
                        }}
                        className="w-full bg-[#100e16] border border-white/10 rounded px-2 py-1 text-neutral-200 font-mono text-xs"
                      >
                        <option value="organ">Órgano Gótico</option>
                        <option value="chant">Cánticos Litúrgicos</option>
                        <option value="bell">Campanadas Solemnes</option>
                        <option value="static">Estática / Frecuencia Oscura</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-400 mb-0.5 font-mono text-[10px]">Nota en Cuadro de la Radio:</label>
                      <input
                        type="text"
                        placeholder="Bienvenido a Radio Santa Vita..."
                        value={chap.broadcastNote || ''}
                        onChange={(e) => {
                          const next = [...localData.chapters];
                          next[idx].broadcastNote = e.target.value;
                          setLocalData({ ...localData, chapters: next });
                        }}
                        className="w-full bg-[#100e16] border border-white/10 rounded px-2 py-1 text-neutral-200 font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-mono text-[11px]">Contenido del Capítulo (Párrafos):</label>
                  <textarea
                    rows={6}
                    value={Array.isArray(chap.content) ? chap.content.join('\n\n') : chap.content}
                    onChange={(e) => {
                      const next = [...localData.chapters];
                      next[idx].content = e.target.value.split('\n\n');
                      setLocalData({ ...localData, chapters: next });
                    }}
                    className="w-full bg-[#181620] border border-white/10 rounded px-2.5 py-1.5 text-neutral-200 font-serif leading-relaxed text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: CHARACTERS MANAGEMENT */}
      {activeTab === 'characters' && (
        <AdminCharactersTab
          characters={localData.characters || []}
          onChange={(updatedCharacters) => {
            setLocalData({ ...localData, characters: updatedCharacters });
          }}
        />
      )}

      {/* TAB 8: MAP OVERVIEW & IMAGE */}
      {activeTab === 'map' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="bg-[#121016] border border-[#52412c]/60 rounded-xl p-5 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h2 className="font-gothic text-lg sm:text-xl font-bold text-amber-200 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  Mapa Cartográfico de Terrá Vita (Grabado Oficial)
                </h2>
                <p className="text-xs text-neutral-400 font-sans-ui mt-1">
                  Grabado cartográfico medieval con los 9 puntos clave del relato y el <strong>Convento Santa Vita</strong> como único foco palpitante rojo.
                </p>
              </div>

              {/* Upload custom map image */}
              <label className="px-4 py-2 bg-gradient-to-r from-red-950 to-amber-950 hover:from-red-900 hover:to-amber-900 border border-amber-500/50 text-amber-200 rounded-lg text-xs font-gothic uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all shadow shrink-0">
                <Upload className="w-4 h-4 text-amber-400" />
                <span>Cambiar Imagen del Mapa</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (reader.result) {
                          setLocalData({ ...localData, mapImage: reader.result as string });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            {/* Map Preview */}
            <div className="mt-5 rounded-lg overflow-hidden border border-[#3d3020] bg-black relative max-h-96 flex items-center justify-center shadow-inner">
              <img
                src={localData.mapImage || adminData.mapImage}
                alt="Vista previa del mapa de Terrá Vita"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-96"
              />
              <div className="absolute top-2 right-2 bg-black/80 border border-red-500/50 px-2.5 py-1 rounded text-[10px] font-gothic text-red-300 flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                <span>Convento Santa Vita: Foco Rojo Activo</span>
              </div>
            </div>

            {/* Locations Legend Grid */}
            <div className="mt-6">
              <h4 className="font-gothic text-xs uppercase tracking-wider text-amber-400 mb-3 font-bold">
                Ubicaciones del Mapa Cartográfico:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {[
                  { name: 'Convento Santa Vita', color: 'bg-red-600', text: 'text-red-400', tag: 'Único Rojo (Sede de la Novela)' },
                  { name: 'Aldea del Ciprés', color: 'bg-amber-500', text: 'text-amber-400', tag: 'Ámbar (Valle Norte)' },
                  { name: 'Convento Sanctus Lux', color: 'bg-cyan-500', text: 'text-cyan-400', tag: 'Cian (Macizo Oriental)' },
                  { name: 'Ciudad Lumina', color: 'bg-yellow-500', text: 'text-yellow-400', tag: 'Amarillo (Metrópoli Central)' },
                  { name: 'Villa Serena', color: 'bg-emerald-500', text: 'text-emerald-400', tag: 'Verde (Poblado Fluvial)' },
                  { name: 'Mirador del Alba', color: 'bg-purple-500', text: 'text-purple-400', tag: 'Púrpura (Acantilado Oriental)' },
                  { name: 'Puerto Sombrío', color: 'bg-sky-500', text: 'text-sky-400', tag: 'Azul Celeste (Costa Sudoeste)' },
                  { name: 'Bosque de los Susurros', color: 'bg-lime-500', text: 'text-lime-400', tag: 'Verde Lima (Foresta)' },
                  { name: 'Puente del Suspiro', color: 'bg-orange-500', text: 'text-orange-400', tag: 'Naranja (Paso Sur)' },
                ].map((item, i) => (
                  <div key={i} className="p-2.5 bg-black/40 border border-white/5 rounded-lg flex items-center gap-2.5">
                    <span className={`w-3 h-3 rounded-full shrink-0 ${item.color} shadow`} />
                    <div className="overflow-hidden">
                      <div className={`font-gothic text-xs font-bold ${item.text} truncate`}>{item.name}</div>
                      <div className="text-[10px] font-sans-ui text-neutral-400 truncate">{item.tag}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
