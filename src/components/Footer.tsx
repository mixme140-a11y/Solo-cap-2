import React from 'react';
import { Instagram, Twitter, MessageCircle, Youtube, Share2 } from 'lucide-react';
import { audioService } from '../services/audioService';

interface FooterProps {
  onShowSystemStatus: () => void;
  onShowVersionNotes: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onShowSystemStatus,
  onShowVersionNotes,
}) => {
  return (
    <footer className="w-full px-4 pt-4 pb-24 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto text-neutral-500 text-center">
      {/* System Status & Version */}
      <div className="flex items-center justify-between py-3 border-t border-b border-white/5 font-sans-ui text-[10px] tracking-wider uppercase mb-5">
        <button
          id="btn-footer-status"
          onClick={() => {
            audioService.playClick(440);
            onShowSystemStatus();
          }}
          className="flex items-center gap-2 hover:text-neutral-300 transition-colors cursor-pointer"
        >
          <span>Estado del Sistema</span>
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            En Línea
          </span>
        </button>

        <button
          id="btn-footer-version"
          onClick={() => {
            audioService.playClick(400);
            onShowVersionNotes();
          }}
          className="hover:text-neutral-300 transition-colors cursor-pointer"
        >
          Versión 1.0.2
        </button>
      </div>

      {/* Copyright */}
      <p className="font-sans-ui text-[11px] text-neutral-400 mb-4 tracking-wide">
        © 2025 Convento Santa Vita. Todos los derechos reservados.
      </p>

      {/* Social Icons row */}
      <div className="flex items-center justify-center gap-5 text-neutral-400">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => audioService.playClick(500)}
          className="p-1.5 hover:text-white transition-colors"
          aria-label="Instagram"
        >
          <Instagram className="w-4 h-4 stroke-[1.75]" />
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => audioService.playClick(520)}
          className="p-1.5 hover:text-white transition-colors"
          aria-label="X (Twitter)"
        >
          <Twitter className="w-4 h-4 stroke-[1.75]" />
        </a>
        <a
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => audioService.playClick(540)}
          className="p-1.5 hover:text-white transition-colors"
          aria-label="Discord / Comunidad"
        >
          <MessageCircle className="w-4 h-4 stroke-[1.75]" />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => audioService.playClick(560)}
          className="p-1.5 hover:text-white transition-colors"
          aria-label="YouTube"
        >
          <Youtube className="w-4 h-4 stroke-[1.75]" />
        </a>
        <button
          id="btn-share-app"
          onClick={() => {
            audioService.playBell(440);
            if (navigator.share) {
              navigator.share({
                title: 'Cap 2 SOLO - Convento Santa Vita',
                text: '“El pecado no desaparece, solo encuentra un lugar donde rezar.”',
                url: window.location.href,
              }).catch(() => {});
            }
          }}
          className="p-1.5 hover:text-white transition-colors cursor-pointer"
          aria-label="Compartir"
        >
          <Share2 className="w-4 h-4 stroke-[1.75]" />
        </button>
      </div>
    </footer>
  );
};
