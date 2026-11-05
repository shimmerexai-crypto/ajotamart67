import { RotateCcw, SlidersHorizontal, X } from 'lucide-react';
import React from 'react';
import { useNav } from '../../context/NavigationContext';

export interface FilterState {
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'discount';
  priceRange: 'all' | 'under-100' | '100-300' | '300-600' | 'above-600';
  selectedBrands: string[];
  inStockOnly: boolean;
}

interface FilterSheetProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableBrands: string[];
}

export const FilterSheet: React.FC<FilterSheetProps> = ({
  filters,
  setFilters,
  availableBrands
}) => {
  const { isFilterSheetOpen, setIsFilterSheetOpen } = useNav();

  if (!isFilterSheetOpen) return null;

  const handleReset = () => {
    setFilters({
      sortBy: 'popular',
      priceRange: 'all',
      selectedBrands: [],
      inStockOnly: false
    });
  };

  const toggleBrand = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      selectedBrands: prev.selectedBrands.includes(brand)
        ? prev.selectedBrands.filter(b => b !== brand)
        : [...prev.selectedBrands, brand]
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-fade-in"
      onClick={() => setIsFilterSheetOpen(false)}
    >
      <div
        className="w-full sm:max-w-md bg-white dark:bg-[#1A120B] rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl max-h-[85vh] flex flex-col overflow-hidden border border-[#EADBCE] dark:border-[#382619]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EADBCE] dark:border-stone-800">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#C2570C]" />
            <h3 className="text-base font-black text-[#1B1209] dark:text-[#F3ECE2]">
              Sort & Filter
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsFilterSheetOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Filters */}
        <div className="overflow-y-auto py-4 space-y-5 flex-1">
          {/* Sort By */}
          <div>
            <h4 className="text-xs font-bold text-[#1B1209] dark:text-[#F3ECE2] uppercase tracking-wider mb-2">
              Sort By
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'popular', label: 'Relevance / Popular' },
                { id: 'discount', label: 'Discount % (High to Low)' },
                { id: 'price-asc', label: 'Price: Low to High' },
                { id: 'price-desc', label: 'Price: High to Low' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFilters(prev => ({ ...prev, sortBy: opt.id as any }))}
                  className={`p-2 rounded-xl text-xs font-bold border text-left transition-all ${
                    filters.sortBy === opt.id
                      ? 'bg-[#1B1209] text-white border-[#1B1209] shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-xs font-bold text-[#1B1209] dark:text-[#F3ECE2] uppercase tracking-wider mb-2">
              Price Range
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under-100', label: 'Under ₹100' },
                { id: '100-300', label: '₹100 – ₹300' },
                { id: '300-600', label: '₹300 – ₹600' },
                { id: 'above-600', label: 'Above ₹600' }
              ].map(r => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setFilters(prev => ({ ...prev, priceRange: r.id as any }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    filters.priceRange === r.id
                      ? 'bg-[#F5B718] text-[#1B1209] border-[#F5B718] font-bold'
                      : 'bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Only */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#FFF8EC] dark:bg-stone-900 border border-[#F5B718]/30">
            <div>
              <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
                In Stock Only
              </span>
              <span className="text-[11px] text-stone-500">
                Hide items temporarily out of stock
              </span>
            </div>
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
              className="w-4 h-4 accent-[#C2570C] rounded cursor-pointer"
            />
          </div>

          {/* Brands Filter */}
          {availableBrands.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-[#1B1209] dark:text-[#F3ECE2] uppercase tracking-wider mb-2">
                Brands
              </h4>
              <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
                {availableBrands.map(brand => {
                  const isChecked = filters.selectedBrands.includes(brand);
                  return (
                    <button
                      key={brand}
                      type="button"
                      onClick={() => toggleBrand(brand)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                        isChecked
                          ? 'bg-[#C2570C] text-white border-[#C2570C]'
                          : 'bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800'
                      }`}
                    >
                      {brand}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#EADBCE] dark:border-stone-800 flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold flex items-center gap-1.5 hover:bg-stone-50 dark:hover:bg-stone-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={() => setIsFilterSheetOpen(false)}
            className="flex-1 py-2.5 rounded-xl bg-[#C2570C] hover:bg-[#A84805] text-white text-xs font-extrabold shadow-sm active:scale-95 transition-all text-center"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
