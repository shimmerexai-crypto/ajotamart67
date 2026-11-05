import { Search, Sparkles, X } from 'lucide-react';
import React, { useMemo } from 'react';
import { ProductCard } from '../components/product/ProductCard';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';

const TRENDING_SEARCHES = [
  'Atta',
  'Mustard Oil',
  'Desi Ghee',
  'Classmate Spiral',
  'Nivea Soft',
  'Tata Tea',
  'Harpic',
  'Bikaji Bhujia',
  'Cello Pens',
  'Dettol Soap'
];

interface SearchViewProps {
  products: Product[];
}

export const SearchView: React.FC<SearchViewProps> = ({ products }) => {
  const { searchQuery, setSearchQuery } = useStore();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.trim().toLowerCase();
    return products.filter(p => {
      const matchName = p.name.toLowerCase().includes(query);
      const matchBrand = p.brand.toLowerCase().includes(query);
      const matchSub = p.subcategory.toLowerCase().includes(query);
      const matchTags = p.tags?.some(t => t.toLowerCase().includes(query));
      return matchName || matchBrand || matchSub || matchTags;
    });
  }, [products, searchQuery]);

  return (
    <div className="w-full py-2">
      {/* Search Header */}
      <div className="mb-4">
        <h1 className="text-lg sm:text-xl font-black text-[#1B1209] mb-2 px-1">
          Search Ajota Mart
        </h1>

        {/* Input Bar */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search groceries, stationary, soaps, snacks..."
            className="w-full pl-10 pr-10 py-3 bg-white text-xs sm:text-sm text-[#1B1209] rounded-2xl border-2 border-[#EADBCE] focus:border-[#C2570C] focus:ring-2 focus:ring-[#C2570C]/20 shadow-sm outline-none transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Popular Search Suggestions (when search query is short/empty) */}
      {!searchQuery.trim() && (
        <div className="mb-8 p-4 rounded-2xl bg-white border border-[#EADBCE]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#1B1209] uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-[#F5B718] fill-[#F5B718]" />
            <span>Popular Searches in Jodhpur</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {TRENDING_SEARCHES.map(term => (
              <button
                key={term}
                type="button"
                onClick={() => setSearchQuery(term)}
                className="px-3 py-1.5 rounded-xl bg-[#FFF8EC] hover:bg-[#FCE6C7] border border-[#F5B718]/40 text-xs font-semibold text-[#8C4600] active:scale-95 transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Header */}
      {searchQuery.trim() && (
        <div className="mb-3 px-1 flex items-center justify-between">
          <p className="text-xs text-stone-600">
            Found <strong>{searchResults.length}</strong> results for "{searchQuery}"
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-xs font-semibold text-[#C2570C] hover:underline"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Results Grid */}
      {searchQuery.trim() && searchResults.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {searchResults.map(product => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {/* No results */}
      {searchQuery.trim() && searchResults.length === 0 && (
        <div className="py-12 text-center bg-white rounded-2xl border border-[#EADBCE] p-6">
          <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-3">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-sm font-bold text-[#1B1209]">
            No results for "{searchQuery}"
          </h3>
          <p className="text-xs text-stone-500 mt-1 mb-4 max-w-sm mx-auto">
            Try checking for spelling errors, using more general words, or try one of the popular items below.
          </p>
          <div className="flex flex-wrap gap-2 justify-center max-w-md mx-auto">
            {TRENDING_SEARCHES.slice(0, 5).map(term => (
              <button
                key={term}
                type="button"
                onClick={() => setSearchQuery(term)}
                className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-700"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
