import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Play, Film } from 'lucide-react';
import { audioService } from '../services/audioService';
import { useAdminData } from '../services/adminStore';

interface HeroBannerProps {
  onContinueReading: () => void;
  onOpenTrailer?: () => void;
  hasStartedReading?: boolean;
  currentChapterNumber?: number;
  currentChapterTitle?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onContinueReading,
  onOpenTrailer,
  hasStartedReading = false,
  currentChapterNumber = 0,
  currentChapterTitle = 'Sinopsis & Prólogo',
}) => {
  const { adminData } = useAdminData();
  const slides = adminData.carouselSlides;

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play loop carousel every 4.5 seconds
  useEffect(() => {
    if (isPaused || slides.length === 0) return;

    timerRef.current = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  const activeSlide = slides[currentSlideIndex] || slides[0] || {
    image: '',
    caption: 'Santa Vita',
    quote: '“El pecado no desaparece, solo encuentra un lugar donde rezar.”',
  };

  const handleNextSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    audioService.playClick(440);
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    audioService.playClick(380);
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleGoToSlide = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    audioService.playClick(400);
    setCurrentSlideIndex(idx);
  };

  return (
    <section 
      className="relative w-full overflow-hidden bg-[#070709] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background artwork Carousel Container */}
      <div className="relative w-full h-[450px] sm:h-[490px] md:h-[530px]">
        {slides.map((slide, index) => {
          const isActive = index === currentSlideIndex;
          return (
            <div
              key={slide.id || index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.caption}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-[center_top] brightness-90 contrast-115 transition-transform duration-[6000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Cinematic Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/50 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a]/95 via-[#08080a]/40 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#08080a]/20 to-[#08080a]/80 z-20 pointer-events-none" />

        {/* Carousel Slide Indicators */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => handleGoToSlide(idx, e)}
              aria-label={`Ir a diapositiva ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentSlideIndex
                  ? 'w-6 h-1.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
          <span className="text-[10px] font-mono text-neutral-400 ml-1">
            {slides.length > 0 ? `${currentSlideIndex + 1}/${slides.length}` : '0/0'}
          </span>
        </div>

        {/* Carousel Navigation Arrows */}
        {slides.length > 1 && (
          <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between z-30 pointer-events-none">
            <button
              id="btn-hero-carousel-prev"
              onClick={handlePrevSlide}
              aria-label="Imagen anterior"
              className="pointer-events-auto p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white/70 hover:text-white border border-white/10 hover:border-white/30 backdrop-blur-sm transition-all cursor-pointer transform -translate-x-1 hover:translate-x-0"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              id="btn-hero-carousel-next"
              onClick={handleNextSlide}
              aria-label="Siguiente imagen"
              className="pointer-events-auto p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white/70 hover:text-white border border-white/10 hover:border-white/30 backdrop-blur-sm transition-all cursor-pointer transform translate-x-1 hover:translate-x-0"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        )}

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto pb-8 z-30 pointer-events-none">
          
          {/* Chapter progress badge */}
          {hasStartedReading && (
            <div className="mb-2 flex items-center gap-1.5 pointer-events-auto">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-950/80 border border-red-500/40 text-red-300 rounded text-[10px] font-mono tracking-wider shadow-sm">
                <BookOpen className="w-3 h-3 text-red-400" />
                Leyendo: Cap. {currentChapterNumber} — {currentChapterTitle}
              </span>
            </div>
          )}

          {/* Gothic Chapter Title & Legible Cursive SOLO Brand */}
          <div className="mb-2 pointer-events-auto">
            <div className="flex items-baseline gap-2.5">
              <h2 className="font-gothic text-2xl sm:text-3xl md:text-4xl text-[#d4c5b3] font-bold tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Cap 2
              </h2>
              <span className="text-red-500 font-bold text-xl sm:text-2xl drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]">
                †
              </span>
              <h1 className="font-cursive text-5xl sm:text-6xl md:text-7xl text-[#f5ebd9] font-normal tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] pb-1">
                Solo
              </h1>
            </div>
          </div>

          {/* Canonical Quote (From Active Slide or Synopsis) */}
          <blockquote className="font-quote italic text-[#ded0be] text-base sm:text-lg max-w-xs sm:max-w-sm md:max-w-md mb-6 leading-snug drop-shadow-md border-l-2 border-red-500/60 pl-3 bg-black/30 backdrop-blur-[2px] py-1 rounded-r pointer-events-auto">
            {activeSlide.quote || adminData.synopsis.mainQuote}
          </blockquote>

          {/* Action Buttons: EMPEZAR / CONTINUAR LECTURA + VER TRÁILER */}
          <div className="pointer-events-auto flex items-center gap-3 flex-wrap">
            <button
              id="btn-continue-reading"
              onClick={() => {
                audioService.playBell(260);
                onContinueReading();
              }}
              className="group inline-flex items-center gap-0 border border-[#8f6d48]/40 bg-black/75 hover:bg-black/90 hover:border-red-500/60 backdrop-blur-md transition-all duration-300 text-left shadow-2xl cursor-pointer hover:shadow-[0_0_20px_rgba(180,40,40,0.35)] hover:scale-[1.02]"
            >
              <span className="font-gothic text-xs sm:text-sm font-semibold tracking-widest text-[#f5ebd9] px-4 sm:px-5 py-3 uppercase border-r border-white/10 group-hover:text-white transition-colors">
                {hasStartedReading ? (
                  <>
                    Continuar<br />Lectura
                  </>
                ) : (
                  <>
                    Empezar<br />Lectura
                  </>
                )}
              </span>
              <div className="px-3.5 py-3 flex items-center justify-center text-[#c4b199] group-hover:text-white group-hover:translate-x-1 transition-all">
                <ArrowRight className="w-4 h-4 text-red-400" />
              </div>
            </button>

            {/* Action: VER TRÁILER */}
            {onOpenTrailer && (
              <button
                id="btn-watch-trailer"
                onClick={() => {
                  audioService.playClick(480);
                  onOpenTrailer();
                }}
                className="group inline-flex items-center gap-0 border border-red-900/60 bg-gradient-to-r from-black/85 via-red-950/40 to-black/85 hover:bg-red-950/80 hover:border-red-500/80 backdrop-blur-md transition-all duration-300 text-left shadow-2xl cursor-pointer hover:shadow-[0_0_25px_rgba(220,38,38,0.45)] hover:scale-[1.02]"
              >
                <span className="font-gothic text-xs sm:text-sm font-semibold tracking-widest text-red-200 px-4 sm:px-5 py-3 uppercase border-r border-red-500/30 group-hover:text-white transition-colors">
                  Ver<br />Tráiler
                </span>
                <div className="px-3.5 py-3 flex items-center justify-center text-red-400 group-hover:text-red-300 group-hover:scale-110 transition-all">
                  <Play className="w-4 h-4 fill-red-500/30 text-red-400" />
                </div>
              </button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
