import { ChevronDown, Heart, Minus, Plus } from 'lucide-react';
import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNav } from '../../context/NavigationContext';
import { useWishlist } from '../../context/WishlistContext';
import { Product } from '../../types/store';
import { calculateDiscount, formatINR } from '../../utils/formatters';
import { ProductImage } from '../common/ProductImage';

interface ProductCardProps {
  product: Product;
  isShelfCard?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isShelfCard = false
}) => {
  const { addToCart, decrementQuantity, getItemQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { navigateTo, showToast } = useNav();

  const quantity = getItemQuantity(product.id);
  const inWishlist = isInWishlist(product.id);
  const discountPercent = calculateDiscount(product.mrp, product.price);
  const hasMultipleVariants = product.variants && product.variants.length > 1;

  const handleCardClick = () => {
    navigateTo('product-detail', { productId: product.id });
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) {
      showToast(`We will notify you when ${product.name} is back in stock`);
      return;
    }

    if (hasMultipleVariants && quantity === 0) {
      addToCart(product, product.variants[0]);
    } else {
      addToCart(product);
    }
    showToast(`Added ${product.name.slice(0, 20)} to cart`);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    decrementQuantity(product.id);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    showToast(added ? 'Saved to Wishlist' : 'Removed from Wishlist');
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative flex flex-col h-full bg-white dark:bg-[#1A120B] rounded-2xl border border-[#EADBCE]/80 dark:border-stone-800 shadow-[0_2px_8px_rgba(27,18,9,0.04)] hover:shadow-[0_6px_16px_rgba(194,87,12,0.12)] hover:border-[#E8890C]/40 transition-all duration-200 cursor-pointer overflow-hidden ${
        isShelfCard ? 'w-[150px] sm:w-[170px] md:w-[180px] shrink-0' : 'w-full'
      }`}
    >
      {/* 1. Image Box */}
      <div className="relative w-full aspect-square bg-[#FFFDF9] dark:bg-stone-900 p-2 overflow-hidden border-b border-[#F4ECE1] dark:border-stone-800">
        {discountPercent > 0 && product.inStock && (
          <span className="absolute top-2 left-2 z-10 bg-[#B91C1C] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs tracking-tight">
            {discountPercent}% OFF
          </span>
        )}

        <button
          type="button"
          aria-label={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          onClick={handleWishlistClick}
          className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-[#C2570C] active:scale-90 transition-transform shadow-xs"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              inWishlist ? 'fill-[#C2570C] text-[#C2570C]' : 'text-stone-500'
            }`}
          />
        </button>

        <div className={`w-full h-full ${!product.inStock ? 'opacity-40 grayscale' : ''}`}>
          <ProductImage src={product.images[0]} alt={product.name} />
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] pointer-events-none">
            <span className="bg-[#1B1209] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow">
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Card Content Container */}
      <div className="flex flex-col flex-1 p-2.5 sm:p-3">
        {/* 2. Pack Size Chip */}
        <div className="flex items-center justify-between gap-1 mb-1.5">
          <span className="inline-block bg-[#FFF4DB] dark:bg-stone-800 text-[#8C4600] dark:text-[#FFE885] border border-[#F5B718]/40 text-[10px] font-semibold px-1.5 py-0.5 rounded leading-none truncate">
            {product.unit}
          </span>
          {hasMultipleVariants && (
            <span className="text-[10px] font-medium text-[#C2570C] truncate">
              {product.variants.length} sizes
            </span>
          )}
        </div>

        {/* 3. Brand & Product Name */}
        <div className="mb-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A7160] dark:text-stone-400 truncate">
            {product.brand}
          </p>
          <h3
            className="text-xs sm:text-[13px] font-semibold text-[#1B1209] dark:text-[#F3ECE2] leading-snug line-clamp-2 min-h-[2.4rem] mt-0.5"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        {/* 4. Bottom Row: Price & Stepper */}
        <div className="mt-auto pt-2 border-t border-[#F8F2EA] dark:border-stone-800 flex items-center justify-between gap-1">
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-xs sm:text-sm font-extrabold text-[#1B1209] dark:text-white tabular-nums">
              {formatINR(product.price)}
            </span>
            {product.mrp > product.price && (
              <span className="text-[10px] text-stone-400 line-through tabular-nums">
                {formatINR(product.mrp)}
              </span>
            )}
          </div>

          <div className="shrink-0 h-9 flex items-center">
            {!product.inStock ? (
              <button
                type="button"
                onClick={handleAdd}
                className="h-8 px-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-[10px] font-bold"
              >
                Notify
              </button>
            ) : quantity === 0 ? (
              <button
                type="button"
                onClick={handleAdd}
                className="h-8 px-3.5 rounded-lg bg-gradient-to-r from-[#C2570C] to-[#E8890C] hover:from-[#A84805] hover:to-[#D97706] text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1 min-w-[62px]"
              >
                <Plus className="w-3 h-3 stroke-[3]" />
                <span>ADD</span>
              </button>
            ) : (
              <div className="h-8 px-1.5 rounded-lg bg-[#FFF8EC] dark:bg-stone-800 border-2 border-[#C2570C] flex items-center gap-2 shadow-xs">
                <button
                  type="button"
                  aria-label="Decrease"
                  onClick={handleDecrement}
                  className="w-5 h-5 rounded flex items-center justify-center text-[#C2570C] active:scale-90"
                >
                  <Minus className="w-3 h-3 stroke-[3]" />
                </button>
                <span className="text-xs font-black text-[#1B1209] dark:text-white min-w-[14px] text-center tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase"
                  onClick={handleAdd}
                  className="w-5 h-5 rounded flex items-center justify-center text-[#C2570C] active:scale-90"
                >
                  <Plus className="w-3 h-3 stroke-[3]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
