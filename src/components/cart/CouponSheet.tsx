import { Check, Sparkles, Tag, X } from 'lucide-react';
import React, { useState } from 'react';
import { STORE_CONFIG } from '../../config/storeConfig';
import { useCart } from '../../context/CartContext';
import { useNav } from '../../context/NavigationContext';

export const CouponSheet: React.FC = () => {
  const { isCouponSheetOpen, setIsCouponSheetOpen, showToast } = useNav();
  const { appliedCoupon, applyCoupon, removeCoupon, cartSubtotal } = useCart();
  const [customCode, setCustomCode] = useState('');
  const [error, setError] = useState('');

  if (!isCouponSheetOpen) return null;

  const handleApply = (code: string) => {
    setError('');
    const res = applyCoupon(code);
    if (res.success) {
      showToast(res.message);
      setIsCouponSheetOpen(false);
    } else {
      setError(res.message);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCode.trim()) return;
    handleApply(customCode);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-fade-in"
      onClick={() => setIsCouponSheetOpen(false)}
    >
      <div
        className="w-full sm:max-w-md bg-white dark:bg-[#1A120B] rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl max-h-[85vh] flex flex-col overflow-hidden border border-[#EADBCE] dark:border-[#382619]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EADBCE] dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-[#C2570C]" />
            <h3 className="text-base font-black text-[#1B1209] dark:text-[#F3ECE2]">
              Coupons & Offers
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsCouponSheetOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input for custom coupon */}
        <div className="py-4 border-b border-[#EADBCE] dark:border-stone-800">
          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="ENTER COUPON CODE"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
              className="flex-1 px-3 py-2 text-xs font-mono font-bold rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 uppercase focus:border-[#C2570C] outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#C2570C] text-white text-xs font-bold hover:bg-[#A84805] active:scale-95 transition-all"
            >
              Apply
            </button>
          </form>
          {error && <p className="text-[11px] text-red-600 mt-1 font-medium">{error}</p>}
        </div>

        {/* Coupons List */}
        <div className="overflow-y-auto py-3 space-y-3 flex-1">
          {STORE_CONFIG.coupons.map((coupon) => {
            const isApplied = appliedCoupon?.code === coupon.code;
            const isEligible = cartSubtotal >= coupon.minOrder;

            return (
              <div
                key={coupon.code}
                className={`p-3.5 rounded-2xl border-2 transition-all ${
                  isApplied
                    ? 'border-[#15803D] bg-emerald-50/70 dark:bg-emerald-950/20'
                    : 'border-[#EADBCE] dark:border-stone-800 bg-white dark:bg-stone-900'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-black text-[#1B1209] dark:text-white bg-[#FFF8EC] dark:bg-stone-800 border border-[#F5B718] px-2 py-0.5 rounded">
                        {coupon.code}
                      </span>
                      {isApplied && (
                        <span className="text-[10px] font-bold text-[#15803D] flex items-center gap-0.5">
                          <Check className="w-3 h-3" />
                          Applied
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-[#1B1209] dark:text-stone-200 mt-1.5">
                      {coupon.description}
                    </p>
                    <span className="text-[10px] text-stone-500 mt-0.5 block">
                      {coupon.expiryText}
                    </span>
                  </div>

                  <div>
                    {isApplied ? (
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-xs font-bold text-red-600 hover:underline px-2 py-1"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleApply(coupon.code)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                          isEligible
                            ? 'bg-[#C2570C] text-white hover:bg-[#A84805] active:scale-95'
                            : 'bg-stone-100 text-stone-400 dark:bg-stone-800 cursor-not-allowed'
                        }`}
                      >
                        {isEligible ? 'APPLY' : `Add ₹${coupon.minOrder - cartSubtotal}`}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
