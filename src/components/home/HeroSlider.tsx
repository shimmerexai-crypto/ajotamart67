import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { STORE_CONFIG } from '../../config/storeConfig';
import { useNav } from '../../context/NavigationContext';

export const HeroSlider: React.FC = () => {
  const { navigateTo } = useNav();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const banners = STORE_CONFIG.bannerOffers;
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, banners.length]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex(prev => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex(prev => (prev + 1) % banners.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleBannerAction = (banner: (typeof banners)[0]) => {
    if (banner.actionType === 'category') {
      navigateTo('category', { category: banner.actionTarget });
    } else {
      // deals or home action
      const dealsSection = document.getElementById('deals-of-the-day');
      if (dealsSection) {
        dealsSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigateTo('category', { category: 'all' });
      }
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl shadow-md my-3 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Banner Slides Track */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, idx) => (
          <div
            key={banner.id}
            onClick={() => handleBannerAction(banner)}
            className={`w-full shrink-0 relative bg-gradient-to-r ${banner.bgGradient} p-5 sm:p-7 md:p-9 text-white cursor-pointer min-h-[175px] sm:min-h-[210px] md:min-h-[230px] flex flex-col justify-between overflow-hidden`}
          >
            {/* Festive Decorative Background Elements */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-[#F5B718]/15 blur-2xl pointer-events-none" />
            <div className="absolute top-2 right-12 w-32 h-32 rounded-full border border-[#F5B718]/20 pointer-events-none" />
            <div className="absolute top-6 right-20 w-16 h-16 rounded-full border border-[#FFF8EC]/20 pointer-events-none" />
            
            {/* Decorative Octagon Motif in Background */}
            <svg
              className="absolute right-3 sm:right-10 top-1/2 -translate-y-1/2 w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 text-[#F5B718]/15 pointer-events-none"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" />
            </svg>

            {/* Banner Top Badge */}
            <div className="relative z-10 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-black tracking-wider uppercase bg-[#F5B718] text-[#1B1209] px-2.5 py-0.5 rounded-full shadow-sm">
                <Sparkles className="w-3 h-3 fill-[#1B1209]" />
                {banner.badge}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-[#FFF8EC]/80">
                Badla Road Exclusive
              </span>
            </div>

            {/* Banner Headline and Description */}
            <div className="relative z-10 my-2 max-w-xl">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-sm">
                {banner.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-[#FFF8EC]/90 mt-1 line-clamp-2 max-w-md">
                {banner.subtitle}
              </p>
            </div>

            {/* Banner CTA Button */}
            <div className="relative z-10 flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBannerAction(banner);
                }}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-white hover:bg-[#FFF8EC] text-[#1B1209] text-xs sm:text-sm font-extrabold shadow-md active:scale-95 transition-all"
              >
                <span>{banner.ctaText}</span>
                <ChevronRight className="w-4 h-4 text-[#C2570C]" />
              </button>
              <span className="text-[11px] text-[#FDE68A] font-medium hidden sm:inline-block">
                Limited festive stock
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Prev/Next Navigation Controls */}
      <button
        type="button"
        aria-label="Previous Slide"
        onClick={handlePrev}
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white items-center justify-center backdrop-blur-xs transition-colors shadow-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        type="button"
        aria-label="Next Slide"
        onClick={handleNext}
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white items-center justify-center backdrop-blur-xs transition-colors shadow-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/25 backdrop-blur-xs px-2.5 py-1 rounded-full">
        {banners.map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            aria-label={`Go to slide ${dotIdx + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(dotIdx);
            }}
            className={`transition-all duration-300 rounded-full ${
              dotIdx === currentIndex
                ? 'w-5 h-1.5 bg-[#F5B718]'
                : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
