import {
  Check,
  Clock,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Truck,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { STORE_CONFIG } from '../../config/storeConfig';
import { useStore } from '../../context/StoreContext';
import { ProductVariant } from '../../types/store';
import { ProductImage } from '../common/ProductImage';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForDetail,
    setSelectedProductForDetail,
    addToCart,
    decrementQuantity,
    getItemQuantity,
    toggleWishlist,
    isInWishlist
  } = useStore();

  const product = selectedProductForDetail;
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);

  if (!product) return null;

  const currentVariant = selectedVariant || (product.variants?.[0] ?? null);
  const price = currentVariant ? currentVariant.price : product.price;
  const mrp = currentVariant ? currentVariant.mrp : product.mrp;
  const discount = Math.round(((mrp - price) / mrp) * 100);
  const qty = getItemQuantity(product.id, currentVariant?.id);
  const inWishlist = isInWishlist(product.id);

  const handleClose = () => {
    setSelectedProductForDetail(null);
  };

  const handleAdd = () => {
    if (currentVariant) {
      addToCart(product, currentVariant);
    } else {
      addToCart(product);
    }
  };

  const handleDecrement = () => {
    decrementQuantity(product.id, currentVariant?.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-[#EADBCE]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0E6D8] bg-[#FFFDF9]">
          <span className="text-xs font-bold text-[#8A7160] uppercase tracking-wider">
            {product.categoryLabel} · {product.subcategory}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => toggleWishlist(product.id)}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#FFF8EC] flex items-center justify-center text-stone-600 hover:text-[#C2570C] transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${inWishlist ? 'fill-[#C2570C] text-[#C2570C]' : ''}`}
              />
            </button>
            <button
              type="button"
              aria-label="Close details"
              onClick={handleClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Product Image Box */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square max-w-[320px] bg-white rounded-xl border border-[#EADBCE] p-4 relative shadow-xs flex items-center justify-center">
              {discount > 0 && (
                <span className="absolute top-3 left-3 bg-[#B91C1C] text-white text-xs font-black px-2 py-0.5 rounded shadow-xs">
                  {discount}% OFF
                </span>
              )}
              <ProductImage src={product.images[0]} alt={product.name} />
            </div>

            {/* Quick trust notes under image */}
            <div className="mt-4 w-full grid grid-cols-2 gap-2 text-[11px] text-[#7A6150]">
              <div className="p-2 rounded-lg bg-[#FFF8EC] border border-[#F5B718]/30 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#C2570C] shrink-0" />
                <span>{STORE_CONFIG.deliveryTimeText}</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FFF8EC] border border-[#F5B718]/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                <span>100% Genuine Item</span>
              </div>
            </div>
          </div>

          {/* Right: Product Purchase Module */}
          <div className="flex flex-col">
            {/* Brand and Title */}
            <div>
              <span className="text-xs font-extrabold uppercase text-[#C2570C] tracking-wide">
                {product.brand}
              </span>
              <h2 className="text-base sm:text-xl font-bold text-[#1B1209] mt-0.5 leading-snug">
                {product.name}
              </h2>
              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-[#15803D] text-white text-xs font-bold px-2 py-0.5 rounded">
                  <span>{product.rating}</span>
                  <Star className="w-3 h-3 fill-white" />
                </div>
                <span className="text-xs text-stone-500">
                  {product.reviewCount} Jodhpur ratings
                </span>
                <span className="text-stone-300">·</span>
                <span className="text-xs text-[#15803D] font-bold">
                  In Stock
                </span>
              </div>
            </div>

            {/* Pricing Area */}
            <div className="my-4 p-3 rounded-xl bg-[#FFF8EC] border border-[#F5B718]/40 flex items-baseline justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#1B1209] tabular-nums">
                    ₹{price}
                  </span>
                  {mrp > price && (
                    <span className="text-sm text-stone-500 line-through tabular-nums">
                      ₹{mrp}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#785E4D] mt-0.5">
                  Inclusive of all taxes
                </p>
              </div>

              {discount > 0 && (
                <span className="text-xs font-extrabold text-[#B91C1C] bg-red-100 px-2 py-1 rounded-md">
                  Save ₹{mrp - price}
                </span>
              )}
            </div>

            {/* Pack Size Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-bold text-[#1B1209] uppercase mb-1.5">
                  Pack Size / Option:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => {
                    const isSelected = (currentVariant?.id || product.variants[0]?.id) === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          isSelected
                            ? 'bg-[#1B1209] text-white border-[#1B1209] shadow-xs'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-[#C2570C]'
                        }`}
                      >
                        {v.name} · ₹{v.price}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Button: Stepper or Add to Cart */}
            <div className="mb-5">
              {!product.inStock ? (
                <button
                  type="button"
                  disabled
                  className="w-full py-3 rounded-xl bg-stone-200 text-stone-500 font-bold text-sm cursor-not-allowed"
                >
                  Out of Stock
                </button>
              ) : qty === 0 ? (
                <button
                  type="button"
                  onClick={handleAdd}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C2570C] to-[#E8890C] hover:from-[#A84805] hover:to-[#D97706] text-white font-extrabold text-sm shadow-md active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>ADD TO CART · ₹{price}</span>
                </button>
              ) : (
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#FFF8EC] border-2 border-[#C2570C]">
                  <span className="text-xs font-bold text-[#C2570C] pl-2">
                    Item in cart
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Decrease"
                      onClick={handleDecrement}
                      className="w-8 h-8 rounded-lg bg-white border border-[#C2570C] text-[#C2570C] font-black flex items-center justify-center active:scale-95"
                    >
                      <Minus className="w-4 h-4 stroke-[3]" />
                    </button>
                    <span className="text-base font-black text-[#1B1209] tabular-nums">
                      {qty}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase"
                      onClick={handleAdd}
                      className="w-8 h-8 rounded-lg bg-[#C2570C] text-white font-black flex items-center justify-center active:scale-95"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Description & Specifications */}
            <div className="border-t border-[#F0E6D8] pt-4 text-xs text-[#523B2D] space-y-2.5">
              <div>
                <h4 className="font-bold text-[#1B1209] uppercase text-[11px] mb-1">
                  Product Overview
                </h4>
                <p className="leading-relaxed">{product.description}</p>
              </div>

              {product.details?.benefits && (
                <div>
                  <h4 className="font-bold text-[#1B1209] uppercase text-[11px] mb-1">
                    Key Features
                  </h4>
                  <ul className="space-y-1">
                    {product.details.benefits.map((b, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-stone-700">
                        <Check className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.details?.shelfLife && (
                <div className="flex items-center gap-2 text-stone-600">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Shelf Life: {product.details.shelfLife}</span>
                </div>
              )}

              {product.details?.manufacturer && (
                <p className="text-[11px] text-stone-500">
                  Manufactured by: {product.details.manufacturer}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
