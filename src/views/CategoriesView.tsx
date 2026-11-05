import { ArrowUpDown, Filter, Sparkles } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { ProductCard } from '../components/product/ProductCard';
import { useStore } from '../context/StoreContext';
import { Category, Product } from '../types/store';

interface CategoriesViewProps {
  categories: Category[];
  products: Product[];
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  categories,
  products
}) => {
  const { selectedCategoryFilter, setSelectedCategoryFilter } = useStore();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'discount'>('popular');

  const currentCategory = categories.find(c => c.id === selectedCategoryFilter);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategoryFilter !== 'all') {
      result = result.filter(p => p.category === selectedCategoryFilter);
    }

    // Subcategory filter
    if (selectedSubcategory !== 'all') {
      result = result.filter(p => p.subcategory.toLowerCase() === selectedSubcategory.toLowerCase());
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'discount':
        result.sort((a, b) => {
          const discA = (a.mrp - a.price) / a.mrp;
          const discB = (b.mrp - b.price) / b.mrp;
          return discB - discA;
        });
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [products, selectedCategoryFilter, selectedSubcategory, sortBy]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategoryFilter(catId);
    setSelectedSubcategory('all');
  };

  return (
    <div className="w-full py-2">
      {/* Page Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 px-1">
        <div>
          <h1 className="text-lg sm:text-2xl font-black text-[#1B1209] tracking-tight">
            {currentCategory ? currentCategory.name : 'All Mart Products'}
          </h1>
          <p className="text-xs text-[#7A6150]">
            Showing {filteredProducts.length} items from Badla Road Mart
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
          <span className="text-xs text-stone-500 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-bold text-[#1B1209] bg-white border border-[#EADBCE] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#C2570C]"
          >
            <option value="popular">Popularity</option>
            <option value="discount">Biggest Discount</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Main Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-3">
        <button
          type="button"
          onClick={() => handleCategoryChange('all')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedCategoryFilter === 'all'
              ? 'bg-[#1B1209] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-[#EADBCE] hover:border-[#C2570C]'
          }`}
        >
          All Items ({products.length})
        </button>

        {categories.map(cat => {
          const isSelected = selectedCategoryFilter === cat.id;
          const count = products.filter(p => p.category === cat.id).length;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-[#C2570C] to-[#E8890C] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-[#EADBCE] hover:border-[#C2570C]'
              }`}
            >
              {cat.shortLabel} ({count})
            </button>
          );
        })}
      </div>

      {/* Subcategory Pills (when a category is selected) */}
      {currentCategory && currentCategory.subcategories.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-4">
          <button
            type="button"
            onClick={() => setSelectedSubcategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedSubcategory === 'all'
                ? 'bg-[#F5B718] text-[#1B1209] font-bold shadow-2xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All Subcategories
          </button>
          {currentCategory.subcategories.map(sub => (
            <button
              key={sub}
              type="button"
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedSubcategory.toLowerCase() === sub.toLowerCase()
                  ? 'bg-[#F5B718] text-[#1B1209] font-bold shadow-2xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Product Grid: Strict 2 columns mobile, 3 tablet, 4-5 desktop, 12px gap */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-[#EADBCE] p-8">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-3">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-[#1B1209]">
            No items found in this section
          </h3>
          <p className="text-xs text-stone-500 mt-1 mb-4">
            Try switching subcategories or clearing filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategoryFilter('all');
              setSelectedSubcategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-[#C2570C] text-white text-xs font-bold"
          >
            View All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {filteredProducts.map(product => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
