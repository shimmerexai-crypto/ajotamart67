import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
import React from 'react';
import { ProductCard } from '../components/product/ProductCard';
import { useNav } from '../context/NavigationContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../types/store';

interface WishlistScreenProps {
  products: Product[];
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({ products }) => {
  const { wishlist, clearWishlist } = useWishlist();
  const { goBack, navigateTo } = useNav();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="w-full pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between py-2 mb-4 border-b border-[#EADBCE] dark:border-stone-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goBack}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-[#1B1209] dark:text-white">
              My Saved Wishlist ({savedProducts.length})
            </h1>
            <p className="text-xs text-stone-500">Items saved for future purchases</p>
          </div>
        </div>

        {savedProducts.length > 0 && (
          <button
            type="button"
            onClick={clearWishlist}
            className="text-xs font-semibold text-stone-400 hover:text-red-600 transition-colors"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-[#EADBCE] dark:border-stone-800 p-8 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-red-50 text-[#B91C1C] flex items-center justify-center mx-auto mb-3">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-base font-bold text-[#1B1209] dark:text-white">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs text-stone-500 mt-1 mb-5">
            Tap the heart icon on any product card while browsing to save it here for quick access.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="px-5 py-2.5 rounded-xl bg-[#C2570C] text-white text-xs font-bold shadow-xs"
          >
            Explore Groceries
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {savedProducts.map(product => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
