import React from 'react';
import { HERO_ASSETS } from '../data/loreData';

interface GothicReaderFrameProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
  showCover?: boolean;
  coverImage?: string;
  className?: string;
}

export const GothicReaderFrame: React.FC<GothicReaderFrameProps> = ({
  children,
  title,
  subtitle,
  badge,
  showCover = false,
  coverImage,
  className = '',
}) => {
  return (
    <div className={`relative w-full min-h-full bg-[#050507] rounded-lg overflow-hidden border border-[#523d29]/40 shadow-2xl ${className}`}>
      
      {/* Ambient background blur glow for gothic atmosphere */}
      <div className="absolute inset-0 bg-radial from-[#12100e]/70 via-[#060608] to-[#040405] pointer-events-none" />
      
      {/* Decorative vertical side border columns */}
      <div className="absolute top-0 bottom-0 left-0 w-3 sm:w-5 bg-gradient-to-r from-[#201812]/90 via-[#0a0807]/60 to-transparent pointer-events-none z-10 border-r border-[#4a3724]/20" />
      <div className="absolute top-0 bottom-0 right-0 w-3 sm:w-5 bg-gradient-to-l from-[#201812]/90 via-[#0a0807]/60 to-transparent pointer-events-none z-10 border-l border-[#4a3724]/20" />

      {/* --- TOP ORNATE GOTHIC CROSS & FILIGREE HEADER --- */}
      <div className="relative z-20 pt-6 pb-3 px-4 flex flex-col items-center justify-center text-center select-none border-b border-[#3d2c1d]/30 bg-gradient-to-b from-[#140e0a]/80 to-transparent">
        
        {/* Ornate Cross SVG with Hanging Crucifixes */}
        <div className="relative flex items-center justify-center mb-2">
          {/* Left hanging chain & mini crucifix */}
          <div className="absolute -left-16 sm:-left-24 top-0 flex flex-col items-center opacity-70">
            <div className="w-[1px] h-7 bg-gradient-to-b from-[#8f6d48] to-[#473623]" />
            <span className="text-[#a48259] text-xs font-fraktur">†</span>
          </div>

          {/* Center Main Ornate Cross & Filigree */}
          <div className="flex flex-col items-center">
            {/* Top apex flourishes */}
            <div className="flex items-center gap-1 text-[#8f6d48]/70 text-[10px]">
              <span>꧁</span>
              <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#8f6d48]/60 to-transparent" />
              <span className="text-base text-[#c9a674] font-fraktur filter drop-shadow-[0_0_6px_rgba(201,166,116,0.5)]">
                †
              </span>
              <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#8f6d48]/60 to-transparent" />
              <span>꧂</span>
            </div>
            
            {/* Fine filigree ornament */}
            <svg
              className="w-44 sm:w-60 h-8 text-[#997750] fill-current opacity-80"
              viewBox="0 0 240 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M120 2 C125 10, 140 12, 160 8 C180 4, 195 18, 215 14 C225 12, 235 22, 240 24 C230 22, 215 26, 195 22 C175 18, 160 26, 140 20 C130 17, 124 24, 120 30 C116 24, 110 17, 100 20 C80 26, 65 18, 45 22 C25 26, 10 22, 0 24 C5 22, 15 12, 25 14 C45 18, 60 4, 80 8 C100 12, 115 10, 120 2 Z" />
              <circle cx="120" cy="16" r="2.5" className="fill-[#e8cda2]" />
            </svg>
          </div>

          {/* Right hanging chain & mini crucifix */}
          <div className="absolute -right-16 sm:-right-24 top-0 flex flex-col items-center opacity-70">
            <div className="w-[1px] h-7 bg-gradient-to-b from-[#8f6d48] to-[#473623]" />
            <span className="text-[#a48259] text-xs font-fraktur">†</span>
          </div>
        </div>

        {/* Dynamic Titles */}
        {badge && (
          <span className="font-gothic text-[10px] sm:text-xs text-[#bfa075] uppercase tracking-[0.25em] block mb-1">
            {badge}
          </span>
        )}

        {title && (
          <h2 className="font-gothic text-xl sm:text-2xl md:text-3xl font-bold text-[#e6d5be] tracking-wider text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="font-quote italic text-xs sm:text-sm text-[#9e8b75] mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* Optional Top Cover Banner */}
      {showCover && coverImage && (
        <div className="relative mx-4 sm:mx-8 my-4 h-36 sm:h-48 rounded overflow-hidden border border-[#543f2a]/40 shadow-inner">
          <img
            src={coverImage}
            alt={title || 'Cover'}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-70 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent" />
        </div>
      )}

      {/* --- CENTRAL CONTINUOUS BLACK READING AREA --- */}
      <div className="relative z-20 px-6 sm:px-12 md:px-16 py-6 text-neutral-200">
        <div className="max-w-2xl mx-auto">
          {children}
        </div>
      </div>

      {/* --- BOTTOM ORNATE GOTHIC FILIGREE & 'CAP 2 SOLO' EMBLEM --- */}
      <div className="relative z-20 mt-8 pt-4 pb-8 px-4 flex flex-col items-center justify-center text-center select-none border-t border-[#3d2c1d]/30 bg-gradient-to-t from-[#140e0a] via-[#0b0806] to-transparent">
        
        {/* Top filigree flourishes above footer banner */}
        <div className="flex items-center gap-2 mb-2 opacity-80">
          <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#8f6d48]/50 to-[#8f6d48]" />
          <span className="text-[#a48259] text-xs">❖</span>
          <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent via-[#8f6d48]/50 to-[#8f6d48]" />
        </div>

        {/* Ornate Antique Bronze Ironwork Framing */}
        <div className="relative flex items-center justify-center w-full max-w-sm">
          
          {/* Filigree Ironwork SVG Backdrop */}
          <svg
            className="w-full h-14 text-[#6e5033] fill-current opacity-75"
            viewBox="0 0 320 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Left flourish */}
            <path d="M10 40 C30 15, 60 45, 90 20 C110 35, 130 10, 150 25 C135 40, 100 25, 80 45 C50 30, 25 50, 10 40 Z" />
            {/* Right flourish */}
            <path d="M310 40 C290 15, 260 45, 230 20 C210 35, 190 10, 170 25 C185 40, 220 25, 240 45 C270 30, 295 50, 310 40 Z" />
            {/* Bottom connecting bar */}
            <path d="M20 42 L300 42 L300 44 L20 44 Z" className="fill-[#8f6d48]/60" />
            <circle cx="160" cy="43" r="3" className="fill-[#c9a674]" />
            <circle cx="50" cy="43" r="2" className="fill-[#c9a674]" />
            <circle cx="270" cy="43" r="2" className="fill-[#c9a674]" />
          </svg>

          {/* Central Gothic Embossed Title: "Cap 2 Solo" with readable elegant cursive */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-1.5 bg-[#0d0a08]/95 px-5 py-1.5 rounded border border-[#634931]/70 shadow-[0_0_15px_rgba(0,0,0,0.95)]">
              <span className="font-gothic text-base sm:text-lg font-bold tracking-wider text-[#d8c3a5]">
                Cap 2
              </span>
              <span className="font-cursive text-2xl sm:text-3xl text-[#faebd7] font-normal tracking-wide drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] pb-1">
                solo
              </span>
            </div>
          </div>
        </div>

        <span className="font-sans-ui text-[9px] text-[#786450] tracking-widest uppercase mt-3">
          Santuario de Santa Vita • Archivo Canónico
        </span>
      </div>

    </div>
  );
};
