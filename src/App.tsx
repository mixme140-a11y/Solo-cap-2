import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { audioService } from './services/audioService';
import { useAdminData } from './services/adminStore';

// Layout Components
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MainMenuGrid } from './components/MainMenuGrid';
import { FeaturedContent } from './components/FeaturedContent';
import { QuickAccess } from './components/QuickAccess';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';

// Views
import { HistoryView } from './components/views/HistoryView';
import { CharactersView } from './components/views/CharactersView';
import { ConventoView } from './components/views/ConventoView';
import { ExtrasView } from './components/views/ExtrasView';
import { AdminPanelView } from './components/views/AdminPanelView';

// Interactive Modals
import { NovelReaderModal } from './components/modals/NovelReaderModal';
import { RadioModal } from './components/modals/RadioModal';
import { InteractiveMapModal } from './components/modals/InteractiveMapModal';
import { NewspaperModal } from './components/modals/NewspaperModal';
import { CharacterModal } from './components/modals/CharacterModal';
import { SecretFilesModal } from './components/modals/SecretFilesModal';
import { ChatSeguroModal } from './components/modals/ChatSeguroModal';
import { StoreModal } from './components/modals/StoreModal';
import { TimelineModal } from './components/modals/TimelineModal';
import { SynopsisModal } from './components/modals/SynopsisModal';
import { NavigationDrawer } from './components/modals/NavigationDrawer';
import { NotificationsDrawer } from './components/modals/NotificationsDrawer';
import { ProfileModal } from './components/modals/ProfileModal';
import { TrailerModal } from './components/modals/TrailerModal';

// Status & Version Simple Info Dialogs
import { X, Activity, Sparkles } from 'lucide-react';

export default function App() {
  const { adminData } = useAdminData();
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Reading Progress & Persistence State
  const [hasStartedReading, setHasStartedReading] = useState<boolean>(() => {
    try {
      return localStorage.getItem('santa_vita_has_started') === 'true';
    } catch {
      return false;
    }
  });

  const [savedChapterId, setSavedChapterId] = useState<string>(() => {
    try {
      return localStorage.getItem('santa_vita_last_chapter') || 'cap-0';
    } catch {
      return 'cap-0';
    }
  });

  // Current active chapter object from dynamic admin store
  const currentSavedChapter = adminData.chapters.find((c) => c.id === savedChapterId) || adminData.chapters[0] || {
    id: 'cap-0',
    number: 0,
    title: 'Prólogo & Sinopsis',
    part: 'Acto I',
  };

  // Modals state
  const [isReaderOpen, setIsReaderOpen] = useState<boolean>(false);
  const [readerChapterId, setReaderChapterId] = useState<string>(savedChapterId);

  const [isRadioOpen, setIsRadioOpen] = useState<boolean>(false);
  const [isRadioPlaying, setIsRadioPlaying] = useState<boolean>(false);

  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [isNewspaperOpen, setIsNewspaperOpen] = useState<boolean>(false);

  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState<boolean>(false);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('artemisa');

  const [isSecretFilesOpen, setIsSecretFilesOpen] = useState<boolean>(false);

  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [selectedChatContactId, setSelectedChatContactId] = useState<string>('artemisa');

  const [isStoreOpen, setIsStoreOpen] = useState<boolean>(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState<boolean>(false);
  const [isSynopsisOpen, setIsSynopsisOpen] = useState<boolean>(false);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState<boolean>(false);

  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false);
  const [isVersionModalOpen, setIsVersionModalOpen] = useState<boolean>(false);

  // Radio toggle logic
  const handleToggleRadio = () => {
    if (isRadioPlaying) {
      audioService.stopRadio();
      setIsRadioPlaying(false);
    } else {
      audioService.startRadio('organ');
      setIsRadioPlaying(true);
    }
  };

  const handleUpdateChapterProgress = (chapterId: string) => {
    setSavedChapterId(chapterId);
    setHasStartedReading(true);
    try {
      localStorage.setItem('santa_vita_last_chapter', chapterId);
      localStorage.setItem('santa_vita_has_started', 'true');
    } catch {
      // ignore
    }
  };

  const handleOpenReader = (chapterId?: string) => {
    const targetId = chapterId || (hasStartedReading ? savedChapterId : 'cap-0');
    setReaderChapterId(targetId);
    setIsReaderOpen(true);
  };

  const handleOpenCharacter = (charId: string = 'artemisa') => {
    setSelectedCharacterId(charId);
    setIsCharacterModalOpen(true);
  };

  const handleOpenChat = (charId: string = 'artemisa') => {
    setSelectedChatContactId(charId);
    setIsChatOpen(true);
  };

  const handleOpenAdminPanel = () => {
    audioService.playClick(500);
    setIsAdminOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseAdminPanel = () => {
    audioService.playClick(400);
    setIsAdminOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-neutral-200 flex flex-col font-sans-ui selection:bg-red-950 selection:text-white">
      
      {/* Top Header */}
      <Header
        onOpenMenu={() => setIsNavDrawerOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAdmin={handleOpenAdminPanel}
        onGoHome={() => {
          setIsAdminOpen(false);
          setActiveTab('inicio');
        }}
        unreadCount={2}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {isAdminOpen ? (
          <div className="py-6 animate-fade-in">
            <AdminPanelView onClose={handleCloseAdminPanel} />
          </div>
        ) : (
          <>
            {activeTab === 'inicio' && (
              <div className="w-full animate-fadeIn">
                {/* Hero Banner (Empezar / Continuar Lectura dinámico + Ver Tráiler) */}
                <HeroBanner
                  onContinueReading={() => handleOpenReader(hasStartedReading ? savedChapterId : 'cap-0')}
                  onOpenTrailer={() => setIsTrailerModalOpen(true)}
                  hasStartedReading={hasStartedReading}
                  currentChapterNumber={currentSavedChapter.number}
                  currentChapterTitle={currentSavedChapter.title}
                />

                {/* Banner Destacado de Nuevo Capítulo 9 */}
                <div className="w-full px-4 pt-3 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto">
                  <div className="bg-gradient-to-r from-red-950/90 via-[#180d14] to-black border-2 border-red-500/60 rounded-xl p-3 sm:p-4 shadow-[0_0_25px_rgba(220,38,38,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative overflow-hidden">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-900/60 border border-red-500/50 flex items-center justify-center text-red-300 shrink-0 shadow-lg">
                        <Sparkles className="w-5 h-5 text-red-400 animate-pulse" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="bg-red-600 text-white text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                            ¡NUEVO ESTRENO!
                          </span>
                          <span className="font-mono text-xs text-red-300 font-bold">Capítulo 9</span>
                        </div>
                        <h4 className="font-gothic text-sm sm:text-base font-bold text-neutral-100">
                          El Precio de la Libertad & Margaret
                        </h4>
                        <p className="font-quote text-xs text-neutral-400 line-clamp-1 italic">
                          “La anciana aseguraba que ella y su difunto hijo se reunirían en el cielo...”
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                      <button
                        onClick={() => handleOpenReader('cap-9')}
                        className="flex-1 sm:flex-none px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-gothic text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg hover:shadow-red-600/50 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Leer Cap. 9</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('historia');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-3 py-2 bg-black/60 hover:bg-white/10 border border-white/15 text-neutral-300 font-gothic text-xs tracking-wider uppercase rounded-lg transition-all cursor-pointer whitespace-nowrap"
                      >
                        Ver Todos
                      </button>
                    </div>
                  </div>
                </div>

                {/* Menú Principal (8 tiles grid) */}
                <MainMenuGrid
                  onOpenSynopsis={() => setIsSynopsisOpen(true)}
                  onOpenTimeline={() => setIsTimelineOpen(true)}
                  onOpenMap={() => setIsMapOpen(true)}
                  onOpenRadio={() => setIsRadioOpen(true)}
                  onOpenNewspaper={() => setIsNewspaperOpen(true)}
                  onOpenStore={() => setIsStoreOpen(true)}
                  onOpenChat={() => handleOpenChat('artemisa')}
                  onOpenSecretFiles={() => setIsSecretFilesOpen(true)}
                />

                {/* Contenido Destacado (4 Cards con sección Capítulos) */}
                <FeaturedContent
                  onOpenChapterSummary={() => {
                    setActiveTab('historia');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenArtemisaProfile={() => handleOpenCharacter('artemisa')}
                  onListenRadio={() => {
                    handleToggleRadio();
                    setIsRadioOpen(true);
                  }}
                  onOpenNewspaper={() => setIsNewspaperOpen(true)}
                  isRadioPlaying={isRadioPlaying}
                  currentChapterTitle={adminData.chapters.find((c) => c.id === 'cap-9')?.title || currentSavedChapter.title}
                  currentChapterNumber={9}
                  currentChapterPart={1}
                />

                {/* Acceso Rápido */}
                <QuickAccess
                  onOpenChat={() => handleOpenChat('artemisa')}
                  onOpenMap={() => setIsMapOpen(true)}
                  onOpenStore={() => setIsStoreOpen(true)}
                  onOpenSecretFiles={() => setIsSecretFilesOpen(true)}
                />

                {/* Footer */}
                <Footer
                  onShowSystemStatus={() => setIsStatusModalOpen(true)}
                  onShowVersionNotes={() => setIsVersionModalOpen(true)}
                />
              </div>
            )}

            {activeTab === 'historia' && (
              <HistoryView
                onOpenReader={handleOpenReader}
                onOpenTimeline={() => setIsTimelineOpen(true)}
                onOpenSynopsis={() => setIsSynopsisOpen(true)}
                savedChapterId={savedChapterId}
              />
            )}

            {activeTab === 'personajes' && (
              <CharactersView onOpenCharacterDossier={handleOpenCharacter} />
            )}

            {activeTab === 'convento' && (
              <ConventoView
                onOpenMap={() => setIsMapOpen(true)}
                onOpenRadio={() => setIsRadioOpen(true)}
              />
            )}

            {activeTab === 'extras' && (
              <ExtrasView
                onOpenNewspaper={() => setIsNewspaperOpen(true)}
                onOpenStore={() => setIsStoreOpen(true)}
                onOpenChat={() => handleOpenChat('artemisa')}
                onOpenSecrets={() => setIsSecretFilesOpen(true)}
                onOpenTimeline={() => setIsTimelineOpen(true)}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom Fixed 5-Tab Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setIsAdminOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveTab(tab);
        }}
      />

      {/* --- ALL INTERACTIVE MODALS & DRAWERS --- */}

      {/* 1. Novel Reader Modal */}
      <NovelReaderModal
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
        initialChapterId={readerChapterId}
        onUpdateChapterProgress={handleUpdateChapterProgress}
        isRadioPlayingGlobal={isRadioPlaying}
        onToggleRadioGlobal={handleToggleRadio}
      />

      {/* 2. Radio Santa Vita Modal */}
      <RadioModal
        isOpen={isRadioOpen}
        onClose={() => setIsRadioOpen(false)}
        isRadioPlaying={isRadioPlaying}
        onTogglePlay={handleToggleRadio}
      />

      {/* 3. Interactive Map Modal (Fijo / No editable como solicitado) */}
      <InteractiveMapModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
      />

      {/* 4. Newspaper Reader Modal */}
      <NewspaperModal
        isOpen={isNewspaperOpen}
        onClose={() => setIsNewspaperOpen(false)}
      />

      {/* 5. Character Profile Modal */}
      <CharacterModal
        isOpen={isCharacterModalOpen}
        onClose={() => setIsCharacterModalOpen(false)}
        initialCharacterId={selectedCharacterId}
        onOpenChatWithCharacter={(charId) => {
          handleOpenChat(charId);
        }}
      />

      {/* 6. Secret Files & Cipher Modal */}
      <SecretFilesModal
        isOpen={isSecretFilesOpen}
        onClose={() => setIsSecretFilesOpen(false)}
      />

      {/* 7. Encrypted Chat Modal */}
      <ChatSeguroModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        selectedContactId={selectedChatContactId}
      />

      {/* 8. Official Store Modal */}
      <StoreModal
        isOpen={isStoreOpen}
        onClose={() => setIsStoreOpen(false)}
      />

      {/* 9. Timeline Modal */}
      <TimelineModal
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
      />

      {/* 10. Synopsis Modal */}
      <SynopsisModal
        isOpen={isSynopsisOpen}
        onClose={() => setIsSynopsisOpen(false)}
        onStartReading={() => handleOpenReader('cap-0')}
      />

      {/* 11. Trailer Video Player Modal */}
      <TrailerModal
        isOpen={isTrailerModalOpen}
        onClose={() => setIsTrailerModalOpen(false)}
      />

      {/* 12. Navigation Left Drawer */}
      <NavigationDrawer
        isOpen={isNavDrawerOpen}
        onClose={() => setIsNavDrawerOpen(false)}
        onSelectTab={(tab) => {
          setIsAdminOpen(false);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenRadio={() => setIsRadioOpen(true)}
        onOpenNewspaper={() => setIsNewspaperOpen(true)}
        onOpenStore={() => setIsStoreOpen(true)}
        onOpenSecrets={() => setIsSecretFilesOpen(true)}
        onOpenReader={() => handleOpenReader(hasStartedReading ? savedChapterId : 'cap-0')}
        onOpenAdmin={handleOpenAdminPanel}
      />

      {/* 12. Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onOpenRadio={() => setIsRadioOpen(true)}
        onOpenChapter={() => handleOpenReader(savedChapterId)}
        onOpenSecrets={() => setIsSecretFilesOpen(true)}
      />

      {/* 13. Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOpenStore={() => setIsStoreOpen(true)}
      />

      {/* 14. System Status Modal */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-[#0e0e14] border border-emerald-500/30 rounded-lg p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <Activity className="w-5 h-5 animate-pulse" />
                <span className="font-gothic text-xs font-bold uppercase tracking-wider">
                  Estado del Servidor Santa Vita
                </span>
              </div>
              <button
                onClick={() => setIsStatusModalOpen(false)}
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs font-mono text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-500">ESTADO OPERATIVO:</span>
                <span className="text-emerald-400 font-bold">100% EN LÍNEA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">PANEL DE ADMINISTRACIÓN:</span>
                <span className="text-red-400 font-bold">ACTIVO</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">LATENCIA:</span>
                <span>18 ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">CIFRADO BÓVEDA:</span>
                <span>AES-256 GCM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">RADIO SANTA VITA:</span>
                <span className="text-red-400">EMITIENDO 88.6 MHz</span>
              </div>
            </div>
            <button
              onClick={() => setIsStatusModalOpen(false)}
              className="w-full py-2 bg-[#191924] hover:bg-[#222230] border border-white/10 text-neutral-200 text-xs font-gothic uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              Cerrar Diagnóstico
            </button>
          </div>
        </div>
      )}

      {/* 15. Version Notes Modal */}
      {isVersionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-sm bg-[#0e0e14] border border-white/15 rounded-lg p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-neutral-200">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-gothic text-xs font-bold uppercase tracking-wider">
                  Notas de la Versión 1.1.0
                </span>
              </div>
              <button
                onClick={() => setIsVersionModalOpen(false)}
                className="text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs font-quote italic text-neutral-300">
              <p>• <strong>Panel de Administrador Total</strong>: Edición completa del carrusel (fotos, citas, pies), sinopsis, expedientes secretos, sintonías de radio, catálogo de tienda y capítulos.</p>
              <p>• <strong>Mapa Interactivo Protegido</strong>: Estructura fija y no alterable para preservar la integridad cartográfica del convento.</p>
              <p>• Persistencia local instantánea con botón de restauración de fábrica.</p>
            </div>
            <button
              onClick={() => setIsVersionModalOpen(false)}
              className="w-full py-2 bg-red-950 hover:bg-red-900 border border-red-500/40 text-neutral-100 text-xs font-gothic uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
