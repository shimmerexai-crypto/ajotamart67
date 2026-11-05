import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { FilterSheet, FilterState } from '../components/category/FilterSheet';
import { ProductCard } from '../components/product/ProductCard';
import { useNav } from '../context/NavigationContext';
import { Category, Product } from '../types/store';

interface CategoryScreenProps {
  categories: Category[];
  products: Product[];
}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({ categories, products }) => {
  const {
    activeCategory,
    setActiveCategory,
    activeSubcategory,
    setActiveSubcategory,
    setIsFilterSheetOpen
  } = useNav();

  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'popular',
    priceRange: 'all',
    selectedBrands: [],
    inStockOnly: false
  });

  const currentCatObj = categories.find(c => c.id === activeCategory);
  const subcategories = currentCatObj ? currentCatObj.subcategories : [];

  // Extract all brands for this category
  const availableBrands = useMemo(() => {
    const list = products
      .filter(p => activeCategory === 'all' || p.category === activeCategory)
      .map(p => p.brand);
    return Array.from(new Set(list)).sort();
  }, [products, activeCategory]);

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    let list = products.filter(p => {
      const catMatch = activeCategory === 'all' || p.category === activeCategory;
      const subMatch =
        activeSubcategory === 'all' ||
        p.subcategory.toLowerCase() === activeSubcategory.toLowerCase();
      return catMatch && subMatch;
    });

    // In stock filter
    if (filters.inStockOnly) {
      list = list.filter(p => p.inStock);
    }

    // Brand filter
    if (filters.selectedBrands.length > 0) {
      list = list.filter(p => filters.selectedBrands.includes(p.brand));
    }

    // Price range filter
    if (filters.priceRange === 'under-100') {
      list = list.filter(p => p.price < 100);
    } else if (filters.priceRange === '100-300') {
      list = list.filter(p => p.price >= 100 && p.price <= 300);
    } else if (filters.priceRange === '300-600') {
      list = list.filter(p => p.price > 300 && p.price <= 600);
    } else if (filters.priceRange === 'above-600') {
      list = list.filter(p => p.price > 600);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        list.sort((a, b) => {
          const discA = (a.mrp - a.price) / a.mrp;
          const discB = (b.mrp - b.price) / b.mrp;
          return discB - discA;
        });
        break;
      case 'popular':
      default:
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return list;
  }, [products, activeCategory, activeSubcategory, filters]);

  const activeFiltersCount =
    (filters.sortBy !== 'popular' ? 1 : 0) +
    (filters.priceRange !== 'all' ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    filters.selectedBrands.length;

  return (
    <div className="w-full pb-8">
      {/* Category Tabs Top Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-[#EADBCE] dark:border-stone-800 mb-3 bg-[#FCF9F2] dark:bg-[#120C06] sticky top-14 z-20">
        <button
          type="button"
          onClick={() => {
            setActiveCategory('all');
            setActiveSubcategory('all');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            activeCategory === 'all'
              ? 'bg-[#1B1209] text-white shadow-xs'
              : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800'
          }`}
        >
          All ({products.length})
        </button>

        {categories.map(cat => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveSubcategory('all');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-[#C2570C] to-[#E8890C] text-white shadow-xs'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:border-[#C2570C]'
              }`}
            >
              {cat.shortLabel}
            </button>
          );
        })}
      </div>

      {/* Main Blinkit-Style Layout */}
      <div className="flex gap-3 items-start">
        {/* Left Vertical Sub-Category List (Blinkit style) */}
        {subcategories.length > 0 && (
          <aside className="w-24 sm:w-44 shrink-0 sticky top-28 bg-[#FFFDF9] dark:bg-stone-900 rounded-2xl border border-[#EADBCE] dark:border-stone-800 p-1.5 space-y-1 text-left max-h-[75vh] overflow-y-auto no-scrollbar">
            <span className="text-[10px] uppercase font-bold text-[#8A7160] px-2 py-1 block">
              Subcategories
            </span>

            <button
              type="button"
              onClick={() => setActiveSubcategory('all')}
              className={`w-full px-2.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold text-left transition-all leading-tight ${
                activeSubcategory === 'all'
                  ? 'bg-[#C2570C] text-white shadow-xs'
                  : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              All Items
            </button>

            {subcategories.map(sub => {
              const isSelected = activeSubcategory.toLowerCase() === sub.toLowerCase();
              const subCount = products.filter(
                p => p.category === activeCategory && p.subcategory.toLowerCase() === sub.toLowerCase()
              ).length;

              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setActiveSubcategory(sub)}
                  className={`w-full px-2.5 py-2 rounded-xl text-[11px] sm:text-xs font-semibold text-left transition-all leading-snug flex flex-col ${
                    isSelected
                      ? 'bg-[#C2570C] text-white font-bold shadow-xs'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{sub}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-stone-400'}`}>
                    ({subCount})
                  </span>
                </button>
              );
            })}
          </aside>
        )}

        {/* Right Content Area: Header with Filter button + Products Grid */}
        <div className="flex-1 min-w-0">
          {/* Subheader with Filter button */}
          <div className="flex items-center justify-between pb-3 mb-2">
            <div>
              <h2 className="text-sm sm:text-base font-black text-[#1B1209] dark:text-white capitalize">
                {activeSubcategory === 'all' ? (currentCatObj?.name || 'All Items') : activeSubcategory}
              </h2>
              <span className="text-[11px] text-stone-500">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} available
              </span>
            </div>

            {/* Filter & Sort Button */}
            <button
              type="button"
              onClick={() => setIsFilterSheetOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-[#EADBCE] dark:border-stone-800 hover:border-[#C2570C] text-xs font-bold flex items-center gap-1.5 shadow-2xs active:scale-95 transition-all text-[#1B1209] dark:text-white"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C2570C]" />
              <span>Filter & Sort</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#C2570C] text-white text-[9px] font-black flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Active filter pills */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mb-3 text-xs">
              <span className="text-[11px] text-stone-500 font-medium">Applied:</span>
              {filters.sortBy !== 'popular' && (
                <span className="bg-[#FFF8EC] text-[#C2570C] px-2 py-0.5 rounded-md text-[11px] font-bold border border-[#F5B718]/40">
                  Sort: {filters.sortBy}
                </span>
              )}
              {filters.priceRange !== 'all' && (
                <span className="bg-[#FFF8EC] text-[#C2570C] px-2 py-0.5 rounded-md text-[11px] font-bold border border-[#F5B718]/40">
                  Price: {filters.priceRange}
                </span>
              )}
              {filters.inStockOnly && (
                <span className="bg-emerald-50 text-[#15803D] px-2 py-0.5 rounded-md text-[11px] font-bold border border-emerald-200">
                  In Stock Only
                </span>
              )}
              {filters.selectedBrands.map(b => (
                <span key={b} className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md text-[11px] font-bold">
                  {b}
                </span>
              ))}
              <button
                type="button"
                onClick={() =>
                  setFilters({
                    sortBy: 'popular',
                    priceRange: 'all',
                    selectedBrands: [],
                    inStockOnly: false
                  })
                }
                className="text-[11px] text-stone-500 hover:text-red-600 underline font-semibold ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-2xl border border-[#EADBCE] dark:border-stone-800 p-8">
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 mx-auto mb-3">
                <Filter className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-[#1B1209] dark:text-white">
                No items match your filter criteria
              </h3>
              <p className="text-xs text-stone-500 mt-1 mb-4">
                Try clearing selected brands or resetting price limits.
              </p>
              <button
                type="button"
                onClick={() =>
                  setFilters({
                    sortBy: 'popular',
                    priceRange: 'all',
                    selectedBrands: [],
                    inStockOnly: false
                  })
                }
                className="px-4 py-2 rounded-xl bg-[#C2570C] text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredProducts.map(product => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Bottom Sheet */}
      <FilterSheet
        filters={filters}
        setFilters={setFilters}
        availableBrands={availableBrands}
      />
    </div>
  );
};
