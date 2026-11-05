import { Minus, Plus, X } from 'lucide-react';
import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductVariant } from '../../types/store';
import { ProductImage } from '../common/ProductImage';

export const VariantSelectorSheet: React.FC = () => {
  const {
    productForVariantSheet,
    setProductForVariantSheet,
    addToCart,
    decrementQuantity,
    getItemQuantity
  } = useStore();

  if (!productForVariantSheet) return null;

  const product = productForVariantSheet;

  const handleClose = () => {
    setProductForVariantSheet(null);
  };

  const handleAdd = (variant: ProductVariant) => {
    addToCart(product, variant);
  };

  const handleDecrement = (variant: ProductVariant) => {
    decrementQuantity(product.id, variant.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-fade-in">
      <div
        className="w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl max-h-[85vh] flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#EADBCE]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-stone-50 border border-stone-200 shrink-0 overflow-hidden">
              <ProductImage src={product.images[0]} alt={product.name} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-[#8A7160]">
                {product.brand}
              </p>
              <h3 className="text-xs sm:text-sm font-bold text-[#1B1209] line-clamp-1">
                {product.name}
              </h3>
              <p className="text-[11px] text-[#C2570C] font-semibold">
                Select Pack Size / Option
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Variant list */}
        <div className="py-3 overflow-y-auto space-y-2.5 flex-1">
          {product.variants.map((variant) => {
            const qty = getItemQuantity(product.id, variant.id);
            const discount = Math.round(((variant.mrp - variant.price) / variant.mrp) * 100);

            return (
              <div
                key={variant.id}
                className="flex items-center justify-between p-3 rounded-xl border border-[#EADBCE] bg-[#FFFDF9] hover:border-[#C2570C]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1B1209]">
                      {variant.name}
                    </span>
                    {discount > 0 && (
                      <span className="text-[10px] font-bold bg-[#B91C1C] text-white px-1.5 py-0.2 rounded">
                        {discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1.5 mt-0.5">
                    <span className="text-sm font-black text-[#1B1209] tabular-nums">
                      ₹{variant.price}
                    </span>
                    {variant.mrp > variant.price && (
                      <span className="text-xs text-stone-400 line-through tabular-nums">
                        ₹{variant.mrp}
                      </span>
                    )}
                  </div>
                </div>

                {/* Add / Stepper */}
                <div className="h-8 flex items-center">
                  {qty === 0 ? (
                    <button
                      type="button"
                      onClick={() => handleAdd(variant)}
                      className="h-8 px-4 rounded-lg bg-gradient-to-r from-[#C2570C] to-[#E8890C] hover:from-[#A84805] hover:to-[#D97706] text-white text-xs font-bold shadow-xs active:scale-95 transition-transform flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3 stroke-[3]" />
                      <span>ADD</span>
                    </button>
                  ) : (
                    <div className="h-8 px-2 rounded-lg bg-[#FFF8EC] border-2 border-[#C2570C] flex items-center gap-2 shadow-xs">
                      <button
                        type="button"
                        aria-label="Decrease"
                        onClick={() => handleDecrement(variant)}
                        className="w-5 h-5 rounded flex items-center justify-center text-[#C2570C] hover:bg-[#FBE8CE]"
                      >
                        <Minus className="w-3 h-3 stroke-[3]" />
                      </button>
                      <span className="text-xs font-black text-[#1B1209] min-w-[14px] text-center tabular-nums">
                        {qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase"
                        onClick={() => handleAdd(variant)}
                        className="w-5 h-5 rounded flex items-center justify-center text-[#C2570C] hover:bg-[#FBE8CE]"
                      >
                        <Plus className="w-3 h-3 stroke-[3]" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Done */}
        <div className="pt-2 border-t border-[#EADBCE]">
          <button
            type="button"
            onClick={handleClose}
            className="w-full py-2.5 rounded-xl bg-[#1B1209] hover:bg-[#331C0C] text-white font-bold text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
