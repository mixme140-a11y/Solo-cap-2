import React from 'react';
import { Menu, Bell, Sliders } from 'lucide-react';
import { HERO_ASSETS } from '../data/loreData';
import { audioService } from '../services/audioService';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenAdmin: () => void;
  onGoHome: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenNotifications,
  onOpenProfile,
  onOpenAdmin,
  onGoHome,
  unreadCount = 2,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#08080a]/90 backdrop-blur-md border-b border-white/5 px-4 py-3">
      <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto flex items-center justify-between">
        
        {/* Left: Hamburger menu */}
        <button
          id="btn-nav-menu"
          onClick={() => {
            audioService.playClick(360);
            onOpenMenu();
          }}
          aria-label="Abrir menú de navegación"
          className="p-2 -ml-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
        >
          <Menu className="w-6 h-6 stroke-[1.75]" />
        </button>

        {/* Center: Gothic Stylized Logo "Cap 2 † Solo" */}
        <button
          id="btn-logo-home"
          onClick={() => {
            audioService.playBell(330);
            onGoHome();
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="font-gothic text-xl sm:text-2xl font-bold tracking-wider text-neutral-300 group-hover:text-white transition-colors">
            Cap 2
          </span>
          <span className="text-red-500 font-bold text-xl sm:text-2xl transform group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]">
            †
          </span>
          <span className="font-cursive text-3xl sm:text-4xl text-[#f3e7d7] group-hover:text-red-300 tracking-wider transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] pb-1">
            Solo
          </span>
        </button>

        {/* Right: Admin Panel + Notifications + Profile Avatar */}
        <div className="flex items-center gap-1.5 -mr-1">
          {/* Admin Panel Quick Access */}
          <button
            id="btn-header-admin-panel"
            onClick={() => {
              audioService.playClick(480);
              onOpenAdmin();
            }}
            title="Panel de Administración (Editar Carrusel, Sinopsis, Secretos, Radio, Tienda)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-red-950/60 hover:bg-red-900/80 border border-red-500/40 text-red-300 hover:text-white rounded-lg transition-colors cursor-pointer text-xs font-mono"
          >
            <Sliders className="w-4 h-4 text-red-400" />
            <span className="hidden sm:inline font-bold">Admin</span>
          </button>

          <button
            id="btn-notifications"
            onClick={() => {
              audioService.playClick(520);
              onOpenNotifications();
            }}
            aria-label="Notificaciones del convento"
            className="relative p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          >
            <Bell className="w-5 h-5 stroke-[1.75]" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full ring-2 ring-[#08080a] animate-pulse" />
            )}
          </button>

          <button
            id="btn-profile-avatar"
            onClick={() => {
              audioService.playClick(440);
              onOpenProfile();
            }}
            aria-label="Dossier del investigador"
            className="w-8 h-8 rounded-full bg-gradient-to-b from-[#1e1929] to-[#0a0810] border border-red-500/50 hover:border-red-400 transition-all ring-1 ring-black shadow-md cursor-pointer flex items-center justify-center flex-shrink-0 group"
          >
            <span className="font-gothic text-sm font-bold text-red-400 group-hover:text-red-300 transition-colors">
              ?
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
