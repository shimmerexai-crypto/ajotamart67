import {
  AlertCircle,
  ArrowRight,
  ChevronRight,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Truck
} from 'lucide-react';
import React from 'react';
import { ProductImage } from '../components/common/ProductImage';
import { ProductShelf } from '../components/home/ProductShelf';
import { STORE_CONFIG } from '../config/storeConfig';
import { useAddress } from '../context/AddressContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNav } from '../context/NavigationContext';
import { Product } from '../types/store';
import { formatINR } from '../utils/formatters';

interface CartScreenProps {
  products: Product[];
}

export const CartScreen: React.FC<CartScreenProps> = ({ products }) => {
  const {
    cart,
    addToCart,
    decrementQuantity,
    removeFromCart,
    clearCart,
    cartItemCount,
    cartSubtotal,
    cartMRP,
    totalSavings,
    deliveryFee,
    isFreeDelivery,
    freeDeliveryRemaining,
    appliedCoupon,
    couponDiscount,
    removeCoupon,
    cartTotal,
    isMinOrderMet
  } = useCart();

  const { selectedAddress } = useAddress();
  const { user, setIsLoginModalOpen, setLoginRedirectAction } = useAuth();
  const { navigateTo, setIsCouponSheetOpen, setIsAddressSheetOpen, showToast } = useNav();

  const progressPercent = Math.min(
    100,
    Math.round((cartSubtotal / STORE_CONFIG.freeDeliveryThreshold) * 100)
  );

  // Frequently bought together (items not yet in cart)
  const cartIds = cart.map(i => i.productId);
  const frequentlyBought = products
    .filter(p => !cartIds.includes(p.id) && (p.isBestSeller || p.isDailyEssential))
    .slice(0, 8);

  const handleProceedToCheckout = () => {
    if (!isMinOrderMet) {
      showToast(`Minimum order amount is ₹${STORE_CONFIG.minimumOrder}`);
      return;
    }

    if (!user.isLoggedIn) {
      // Prompt quick OTP login before final checkout step
      setLoginRedirectAction(() => () => navigateTo('checkout'));
      setIsLoginModalOpen(true);
      return;
    }

    navigateTo('checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-[#FFF8EC] dark:bg-stone-900 border border-[#F5B718]/40 flex items-center justify-center text-[#C2570C] mx-auto mb-4 shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-black text-[#1B1209] dark:text-white">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-xs text-stone-500 mt-1 mb-6">
          Explore staples, cosmetics, stationery, and cleaning supplies from our Badla Road store!
        </p>
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="px-6 py-3 rounded-2xl bg-[#C2570C] hover:bg-[#A84805] text-white font-extrabold text-xs shadow-md active:scale-95 transition-all"
        >
          Explore Groceries & Mart Items
        </button>
      </div>
    );
  }

  return (
    <div className="w-full pb-32 md:pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EADBCE] dark:border-stone-800">
        <div>
          <h1 className="text-lg sm:text-2xl font-black text-[#1B1209] dark:text-white">
            My Cart ({cartItemCount} {cartItemCount === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs text-stone-500">Dispatched from Badla Road Mart, Jodhpur</p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-semibold text-stone-400 hover:text-red-600 transition-colors"
        >
          Clear Basket
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Items, Free Delivery, Coupons */}
        <div className="lg:col-span-2 space-y-4">
          {/* Free Delivery Meter */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FFF8EC] to-[#FDF3E3] dark:from-stone-900 dark:to-stone-800 border border-[#F5B718]/40">
            <div className="flex items-center justify-between text-xs font-bold text-[#1B1209] dark:text-white mb-2">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#C2570C]" />
                <span>
                  {isFreeDelivery
                    ? 'Congratulations! You unlocked FREE Delivery'
                    : `Add ₹${freeDeliveryRemaining} more to get FREE Delivery`}
                </span>
              </div>
              {isFreeDelivery && <Sparkles className="w-4 h-4 text-[#F5B718] fill-[#F5B718]" />}
            </div>
            <div className="w-full h-2 rounded-full bg-[#EADBCE] dark:bg-stone-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C2570C] to-[#F5B718] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item Cards */}
          <div className="space-y-3 bg-white dark:bg-[#1A120B] p-4 rounded-3xl border border-[#EADBCE] dark:border-[#382619] shadow-2xs">
            {cart.map((item) => (
              <div
                key={`${item.productId}-${item.variantId || 'default'}`}
                className="flex items-center justify-between p-3 rounded-2xl bg-[#FFFDF9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 gap-3"
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-xl bg-white border border-stone-200 shrink-0 p-1 overflow-hidden">
                  <ProductImage src={item.image} alt={item.name} />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-[#8A7160] block truncate">
                    {item.brand}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#1B1209] dark:text-white truncate">
                    {item.name}
                  </h3>
                  <span className="text-[11px] text-stone-500 block">{item.packSize}</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-black text-[#1B1209] dark:text-white tabular-nums">
                      {formatINR(item.price * item.quantity)}
                    </span>
                    {item.mrp > item.price && (
                      <span className="text-xs text-stone-400 line-through tabular-nums">
                        {formatINR(item.mrp * item.quantity)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stepper + Delete */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="h-8 px-2 rounded-xl bg-[#FFF8EC] dark:bg-stone-800 border-2 border-[#C2570C] flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Decrease"
                      onClick={() => decrementQuantity(item.productId, item.variantId)}
                      className="w-5 h-5 flex items-center justify-center text-[#C2570C] active:scale-90"
                    >
                      <Minus className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                    <span className="text-xs font-black text-[#1B1209] dark:text-white min-w-[14px] text-center tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase"
                      onClick={() => {
                        const targetProduct = products.find(p => p.id === item.productId);
                        if (targetProduct) addToCart(targetProduct);
                      }}
                      className="w-5 h-5 flex items-center justify-center text-[#C2570C] active:scale-90"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  </div>

                  <button
                    type="button"
                    aria-label="Delete item"
                    onClick={() => removeFromCart(item.productId, item.variantId)}
                    className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Row */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs">
            {appliedCoupon ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#15803D] flex items-center justify-center">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-[#15803D]">
                        {appliedCoupon.code} APPLIED
                      </span>
                      <span className="text-xs font-bold text-[#15803D]">
                        - {formatINR(couponDiscount)}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500">{appliedCoupon.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsCouponSheetOpen(true)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FFF8EC] border border-[#F5B718] flex items-center justify-center text-[#C2570C]">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
                      Apply Coupons & Offers
                    </span>
                    <span className="text-[11px] text-[#C2570C] font-semibold">
                      Save up to ₹100 on your groceries
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </div>
            )}
          </div>

          {/* Frequently Bought Together Shelf */}
          {frequentlyBought.length > 0 && (
            <div className="pt-2">
              <ProductShelf
                title="Frequently Bought Together"
                subtitle="Customers in Jodhpur also order these essentials"
                products={frequentlyBought}
              />
            </div>
          )}
        </div>

        {/* Right Column: Address Row, Bill Details, Sticky Checkout */}
        <div className="space-y-4">
          {/* Address Row */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B1209] dark:text-white">
                <MapPin className="w-4 h-4 text-[#C2570C]" />
                <span>Delivery Address ({selectedAddress.title})</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAddressSheetOpen(true)}
                className="text-xs font-bold text-[#C2570C] hover:underline"
              >
                Change
              </button>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-snug">
              {selectedAddress.street}, {selectedAddress.area}
            </p>
            <p className="text-[11px] text-stone-500">
              Jodhpur, Rajasthan · {selectedAddress.pincode}
            </p>
          </div>

          {/* Bill Details */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs space-y-2.5 text-xs text-stone-700 dark:text-stone-300">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B1209] dark:text-white">
              Bill Details
            </h3>

            <div className="flex justify-between">
              <span>Item Total (MRP)</span>
              <span className="tabular-nums">{formatINR(cartMRP)}</span>
            </div>

            <div className="flex justify-between text-[#15803D]">
              <span>Product Discount</span>
              <span className="tabular-nums font-semibold">
                - {formatINR(Math.max(0, cartMRP - cartSubtotal))}
              </span>
            </div>

            {couponDiscount > 0 && (
              <div className="flex justify-between text-[#15803D]">
                <span>Coupon ({appliedCoupon?.code})</span>
                <span className="tabular-nums font-semibold">- {formatINR(couponDiscount)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <span>Delivery Partner Fee</span>
                {isFreeDelivery && (
                  <span className="text-[10px] font-bold text-[#15803D]">(FREE)</span>
                )}
              </div>
              <div>
                {isFreeDelivery ? (
                  <div className="flex items-center gap-1">
                    <span className="line-through text-stone-400">
                      {formatINR(STORE_CONFIG.deliveryFee)}
                    </span>
                    <span className="font-bold text-[#15803D]">FREE</span>
                  </div>
                ) : (
                  <span className="font-bold tabular-nums">{formatINR(deliveryFee)}</span>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <span>Packaging & Bag</span>
              <span className="font-bold text-[#15803D]">FREE</span>
            </div>

            {totalSavings > 0 && (
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-[#15803D] font-bold text-center text-[11px]">
                🎉 You are saving {formatINR(totalSavings)} on this order!
              </div>
            )}

            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-between text-base font-black text-[#1B1209] dark:text-white">
              <span>To Pay</span>
              <span className="text-[#C2570C] tabular-nums">{formatINR(cartTotal)}</span>
            </div>

            {/* Cancellation Policy Note */}
            <div className="pt-2 text-[11px] text-stone-500 leading-relaxed border-t border-stone-100 dark:border-stone-800 flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span>
                Orders can be freely cancelled before mart dispatch. Badla Road store ensures 100% fresh replacement guarantee.
              </span>
            </div>
          </div>

          {/* Desktop Checkout Button */}
          <button
            type="button"
            onClick={handleProceedToCheckout}
            disabled={!isMinOrderMet}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C2570C] to-[#E8890C] hover:from-[#A84805] hover:to-[#D97706] disabled:opacity-50 text-white font-extrabold text-sm shadow-md active:scale-95 transition-all flex items-center justify-between px-5"
          >
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[10px] text-[#FFE885] uppercase tracking-wider">
                Total Amount
              </span>
              <span className="text-base font-black tabular-nums">{formatINR(cartTotal)}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span>{isMinOrderMet ? 'Proceed to Checkout' : `Min. Order ₹${STORE_CONFIG.minimumOrder}`}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Sticky Mobile Proceed Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-[#1A120B] border-t border-[#EADBCE] dark:border-stone-800 p-3 md:hidden shadow-2xl flex items-center justify-between gap-3">
        <div className="flex flex-col leading-tight">
          <span className="text-[10px] text-stone-500 uppercase">To Pay</span>
          <span className="text-lg font-black text-[#C2570C] tabular-nums">{formatINR(cartTotal)}</span>
        </div>

        <button
          type="button"
          onClick={handleProceedToCheckout}
          disabled={!isMinOrderMet}
          className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-[#C2570C] to-[#E8890C] disabled:opacity-50 text-white font-extrabold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <span>{isMinOrderMet ? 'Proceed to Checkout' : `Min Order ₹${STORE_CONFIG.minimumOrder}`}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
