import { ChevronRight, Clock, Flame } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNav } from '../../context/NavigationContext';
import { Product } from '../../types/store';
import { ProductCard } from '../product/ProductCard';

interface DealsOfTheDayProps {
  products: Product[];
}

export const DealsOfTheDay: React.FC<DealsOfTheDayProps> = ({ products }) => {
  const { navigateTo } = useNav();

  // Live Countdown Timer (resets to end-of-day or runs down live)
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 7,
    minutes: 34,
    seconds: 22
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 11, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter(p => p.isDealOfDay || ((p.mrp - p.price) / p.mrp) >= 0.15);

  const pad = (num: number) => String(num).padStart(2, '0');

  return (
    <section id="deals-of-the-day" className="my-6">
      {/* Gold-Gradient Header Container Amazon-Style */}
      <div className="rounded-2xl p-3.5 sm:p-5 bg-gradient-to-r from-[#FFF2CF] via-[#FCE39E] to-[#FBE4A8] border-2 border-[#F5B718] shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
          {/* Title with Flame */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C2570C] flex items-center justify-center text-[#F5B718] shadow-xs">
              <Flame className="w-5 h-5 fill-[#F5B718]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-[#1B1209] tracking-tight">
                  Deals of the Day
                </h2>
                <span className="hidden sm:inline-block bg-[#C2570C] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs uppercase">
                  Up to 40% Off
                </span>
              </div>
              <p className="text-[11px] text-[#7A4B1A]">
                Fresh limited-time price drops from Ajota Mart
              </p>
            </div>
          </div>

          {/* Live Countdown Timer */}
          <div className="flex items-center gap-1.5 bg-[#1B1209] text-white px-3 py-1.5 rounded-xl shadow-xs">
            <Clock className="w-4 h-4 text-[#F5B718] animate-pulse" />
            <span className="text-[10px] uppercase font-bold text-[#F5B718] tracking-wider mr-1">
              Ends in:
            </span>
            <div className="flex items-center gap-1 font-mono text-xs sm:text-sm font-black tabular-nums">
              <span className="bg-[#2D1F13] px-1.5 py-0.5 rounded text-[#FFE885]">
                {pad(timeLeft.hours)}
              </span>
              <span>:</span>
              <span className="bg-[#2D1F13] px-1.5 py-0.5 rounded text-[#FFE885]">
                {pad(timeLeft.minutes)}
              </span>
              <span>:</span>
              <span className="bg-[#2D1F13] px-1.5 py-0.5 rounded text-[#FFE885]">
                {pad(timeLeft.seconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Shelf with scroll-snap and fixed-width cards */}
        <div className="relative -mx-1 sm:-mx-2">
          <div className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-1 sm:px-2 pb-2 pt-1">
            {dealProducts.slice(0, 10).map(product => (
              <div key={product.id} className="snap-start shrink-0">
                <ProductCard product={product} isShelfCard={true} />
              </div>
            ))}
          </div>
        </div>

        {/* Footer View All link */}
        <div className="mt-2 text-right">
          <button
            type="button"
            onClick={() => {
              navigateTo('category', { category: 'all' });
            }}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#C2570C] hover:text-[#9E3F05] hover:underline"
          >
            <span>Explore all discount deals</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
