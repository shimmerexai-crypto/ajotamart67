import { Clock, Flame, Search, Trash2, X } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { ProductCard } from '../components/product/ProductCard';
import { useNav } from '../context/NavigationContext';
import { Product } from '../types/store';

const TRENDING_SEARCHES = [
  'Aashirvaad Atta',
  'Mustard Oil',
  'Amul Cow Ghee',
  'Classmate Spiral',
  'Nivea Soft Cream',
  'Tata Tea Gold',
  'Lizol Citrus',
  'Bikaji Bhujia',
  'Cello Butterflow',
  'Himalaya Neem Face Wash',
  'Surf Excel',
  'Harpic'
];

const RECENT_SEARCHES_KEY = 'ajota_recent_searches_v2';

interface SearchScreenProps {
  products: Product[];
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ products }) => {
  const { navigateTo } = useNav();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      return stored ? JSON.parse(stored) : ['Atta', 'Notebook', 'Desi Ghee'];
    } catch {
      return ['Atta', 'Notebook', 'Desi Ghee'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
    } catch (e) {
      console.error(e);
    }
  }, [recentSearches]);

  const saveRecentSearch = (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    setRecentSearches(prev => [clean, ...prev.filter(t => t.toLowerCase() !== clean.toLowerCase())].slice(0, 8));
  };

  const removeRecentSearch = (term: string) => {
    setRecentSearches(prev => prev.filter(t => t !== term));
  };

  const clearAllRecent = () => setRecentSearches([]);

  // Live suggestions matching query
  const liveSuggestions = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    const suggestions: string[] = [];

    products.forEach(p => {
      if (p.name.toLowerCase().includes(q) && !suggestions.includes(p.name)) {
        suggestions.push(p.name);
      }
      if (p.brand.toLowerCase().includes(q) && !suggestions.includes(p.brand)) {
        suggestions.push(p.brand);
      }
    });

    return suggestions.slice(0, 5);
  }, [products, query]);

  // Full search results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    return products.filter(p => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchSub = p.subcategory.toLowerCase().includes(q);
      const matchTag = p.tags?.some(t => t.toLowerCase().includes(q));
      return matchName || matchBrand || matchSub || matchTag;
    });
  }, [products, query]);

  const handleSelectTerm = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query);
    }
  };

  return (
    <div className="w-full pb-8">
      {/* Search Input Bar */}
      <div className="py-2 mb-4">
        <form onSubmit={handleFormSubmit} className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 'atta', 'notebook', 'shampoo', 'oil'..."
            className="w-full pl-11 pr-10 py-3 bg-white dark:bg-stone-900 text-sm text-[#1B1209] dark:text-white rounded-2xl border-2 border-[#EADBCE] dark:border-stone-800 focus:border-[#C2570C] outline-none shadow-xs transition-colors"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500 hover:text-stone-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>

        {/* Live suggestions dropdown */}
        {query.trim().length >= 2 && liveSuggestions.length > 0 && results.length > 0 && (
          <div className="mt-1 bg-white dark:bg-stone-900 rounded-xl border border-[#EADBCE] dark:border-stone-800 p-2 shadow-lg">
            {liveSuggestions.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => handleSelectTerm(s)}
                className="w-full px-3 py-1.5 text-left text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-[#FFF8EC] dark:hover:bg-stone-800 rounded-lg flex items-center justify-between"
              >
                <span>{s}</span>
                <Search className="w-3 h-3 text-stone-400" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* When no query is typed: Show Recent Searches & Trending */}
      {!query.trim() && (
        <div className="space-y-6">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-[#EADBCE] dark:border-stone-800 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1B1209] dark:text-white uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-[#C2570C]" />
                  <span>Recent Searches</span>
                </div>
                <button
                  type="button"
                  onClick={clearAllRecent}
                  className="text-[11px] text-stone-400 hover:text-red-600 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {recentSearches.map(term => (
                  <div
                    key={term}
                    className="inline-flex items-center gap-1.5 bg-[#FFF8EC] dark:bg-stone-800 text-[#8C4600] dark:text-[#FFE885] border border-[#F5B718]/40 px-3 py-1.5 rounded-xl text-xs font-semibold"
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectTerm(term)}
                      className="hover:underline"
                    >
                      {term}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeRecentSearch(term)}
                      className="text-stone-400 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-[#EADBCE] dark:border-stone-800 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#1B1209] dark:text-white uppercase tracking-wider mb-3">
              <Flame className="w-4 h-4 text-[#E8890C] fill-[#E8890C]" />
              <span>Trending in Badla Road</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {TRENDING_SEARCHES.map(term => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleSelectTerm(term)}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-[#FFF8EC] dark:hover:bg-stone-700 hover:text-[#C2570C] text-stone-700 dark:text-stone-300 text-xs font-semibold active:scale-95 transition-all"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {query.trim() && (
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs text-stone-600 dark:text-stone-400">
              Showing <strong>{results.length}</strong> results for "{query}"
            </span>
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs font-bold text-[#C2570C] hover:underline"
            >
              Clear
            </button>
          </div>

          {results.length === 0 ? (
            <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-[#EADBCE] dark:border-stone-800 p-8">
              <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 mx-auto mb-3">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-[#1B1209] dark:text-white">
                No items match "{query}"
              </h3>
              <p className="text-xs text-stone-500 mt-1 mb-5 max-w-sm mx-auto">
                Check for spelling mistakes, or browse popular staples available at our Badla Road store.
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {TRENDING_SEARCHES.slice(0, 6).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleSelectTerm(t)}
                    className="px-3 py-1 rounded-lg bg-[#FFF8EC] text-[#C2570C] border border-[#F5B718]/40 text-xs font-bold"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {results.map(product => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
