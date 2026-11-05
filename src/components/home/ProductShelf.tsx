import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef } from 'react';
import { useNav } from '../../context/NavigationContext';
import { Product } from '../../types/store';
import { ProductCard } from '../product/ProductCard';

interface ProductShelfProps {
  title: string;
  subtitle?: string;
  products: Product[];
  categoryFilter?: string;
  badge?: string;
}

export const ProductShelf: React.FC<ProductShelfProps> = ({
  title,
  subtitle,
  products,
  categoryFilter = 'all',
  badge
}) => {
  const { navigateTo } = useNav();
  const shelfRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  const handleSeeAll = () => {
    navigateTo('category', { category: categoryFilter });
  };

  const scrollLeft = () => {
    if (shelfRef.current) {
      shelfRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (shelfRef.current) {
      shelfRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  return (
    <section className="my-6">
      {/* Shelf Header */}
      <div className="flex items-end justify-between mb-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#1B1209] tracking-tight">
              {title}
            </h2>
            {badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF0D4] text-[#C2570C] border border-[#F5B718]/40">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-[#7A6150] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Desktop Arrow Controls */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              type="button"
              aria-label="Scroll shelf left"
              onClick={scrollLeft}
              className="w-7 h-7 rounded-full bg-white hover:bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 shadow-xs active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Scroll shelf right"
              onClick={scrollRight}
              className="w-7 h-7 rounded-full bg-white hover:bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 shadow-xs active:scale-95 transition-transform"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSeeAll}
            className="text-xs sm:text-sm font-semibold text-[#C2570C] hover:text-[#9E3F05] hover:underline whitespace-nowrap"
          >
            See all
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track: 150px mobile, 180px desktop, scroll-snap, no wrapping */}
      <div className="relative -mx-1 sm:mx-0">
        <div
          ref={shelfRef}
          className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory px-1 sm:px-0 py-1"
        >
          {products.map(product => (
            <div key={product.id} className="snap-start shrink-0">
              <ProductCard product={product} isShelfCard={true} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
