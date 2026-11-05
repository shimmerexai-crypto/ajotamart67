import {
  Banknote,
  CheckCircle2,
  ChevronRight,
  Info,
  MapPin,
  Minus,
  Plus,
  QrCode,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { STORE_CONFIG } from '../../config/storeConfig';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types/store';
import { ProductImage } from '../common/ProductImage';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    cartSubtotal,
    deliveryFee,
    isFreeDelivery,
    freeDeliveryRemaining,
    cartTotal,
    decrementQuantity,
    addToCart,
    removeFromCart,
    selectedAddress,
    setIsAddressSheetOpen,
    placeOrder,
    setActiveTab
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi'>('cod');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!isCartDrawerOpen) return null;

  const progressPercent = Math.min(
    100,
    Math.round((cartSubtotal / STORE_CONFIG.freeDeliveryThreshold) * 100)
  );

  const isMinOrderMet = cartSubtotal >= STORE_CONFIG.minimumOrder;

  const handleCheckout = async () => {
    if (!isMinOrderMet || cart.length === 0) return;
    setIsSubmitting(true);
    try {
      const order = await placeOrder(paymentMethod, deliveryNote);
      setConfirmedOrder(order);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCartDrawerOpen(false);
    setConfirmedOrder(null);
  };

  const handleViewOrders = () => {
    handleClose();
    setActiveTab('orders');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* If Order Confirmed, show celebratory screen */}
        {confirmedOrder ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-[#15803D]/15 flex items-center justify-center text-[#15803D] mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#C2570C]">
              Order Confirmed!
            </span>
            <h2 className="text-xl font-black text-[#1B1209] mt-1 mb-2">
              Thank you for shopping at Ajota Mart
            </h2>
            <p className="text-xs text-stone-600 mb-4 max-w-xs leading-relaxed">
              Your order <strong>#{confirmedOrder.orderNumber}</strong> has been received at our Badla Road store and is being packed.
            </p>

            <div className="w-full p-4 rounded-xl bg-[#FFF8EC] border border-[#F5B718]/40 mb-6 text-left space-y-2 text-xs">
              <div className="flex justify-between pb-2 border-b border-[#F0E4D5]">
                <span className="text-stone-600">Estimated Delivery:</span>
                <span className="font-bold text-[#1B1209]">
                  {STORE_CONFIG.deliveryTimeText}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#F0E4D5]">
                <span className="text-stone-600">Payment:</span>
                <span className="font-bold uppercase text-[#1B1209]">
                  {confirmedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI at Doorstep'}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#F0E4D5]">
                <span className="text-stone-600">Delivering To:</span>
                <span className="font-bold text-[#1B1209] truncate max-w-[180px]">
                  {confirmedOrder.deliveryAddress.street}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-bold text-stone-800">Total Amount:</span>
                <span className="text-base font-black text-[#C2570C] tabular-nums">
                  ₹{confirmedOrder.total}
                </span>
              </div>
            </div>

            <div className="w-full space-y-2">
              <button
                type="button"
                onClick={handleViewOrders}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C2570C] to-[#E8890C] text-white font-extrabold text-sm shadow-md active:scale-95 transition-all"
              >
                Track Order
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Drawer Header */}
            <div className="p-4 border-b border-[#EADBCE] bg-[#FFFDF9] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#C2570C]/10 flex items-center justify-center text-[#C2570C]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#1B1209]">My Cart</h2>
                  <p className="text-[10px] text-stone-500">
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} in basket
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close cart drawer"
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Delivery Meter */}
            <div className="p-3 bg-gradient-to-r from-[#FFF8EC] to-[#FDF3E3] border-b border-[#F5B718]/40">
              <div className="flex items-center justify-between text-xs font-bold text-[#1B1209] mb-1.5">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#C2570C]" />
                  <span>
                    {isFreeDelivery
                      ? 'You unlocked FREE Delivery!'
                      : `Add ₹${freeDeliveryRemaining} more for FREE delivery`}
                  </span>
                </div>
                {isFreeDelivery && (
                  <Sparkles className="w-3.5 h-3.5 text-[#E8890C] fill-[#E8890C]" />
                )}
              </div>
              <div className="w-full h-2 rounded-full bg-[#EADBCE] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#C2570C] to-[#F5B718] transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Scrollable Cart Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-3">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-sm font-bold text-[#1B1209]">
                    Your cart is empty
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 mb-4">
                    Explore groceries, cosmetics, stationery & household items from Ajota Mart.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 rounded-xl bg-[#C2570C] text-white text-xs font-bold shadow-sm"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Items list */}
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={`${item.productId}-${item.variantId || 'default'}`}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-[#EADBCE] bg-white shadow-2xs gap-3"
                      >
                        {/* Thumbnail */}
                        <div className="w-14 h-14 rounded-lg bg-[#FFFDF9] border border-stone-200 shrink-0 overflow-hidden p-1">
                          <ProductImage src={item.image} alt={item.name} />
                        </div>

                        {/* Title & Pack Size */}
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] uppercase font-bold text-[#8A7160] truncate block">
                            {item.brand}
                          </span>
                          <h4 className="text-xs font-bold text-[#1B1209] truncate">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-stone-500 block">
                            {item.packSize}
                          </span>
                          <div className="flex items-baseline gap-1.5 mt-0.5">
                            <span className="text-xs font-black text-[#1B1209] tabular-nums">
                              ₹{item.price * item.quantity}
                            </span>
                            {item.mrp > item.price && (
                              <span className="text-[10px] text-stone-400 line-through tabular-nums">
                                ₹{item.mrp * item.quantity}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Stepper & Trash */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="h-7 px-1.5 rounded-lg bg-[#FFF8EC] border border-[#C2570C] flex items-center gap-1.5">
                            <button
                              type="button"
                              aria-label="Decrease"
                              onClick={() => decrementQuantity(item.productId, item.variantId)}
                              className="w-4 h-4 flex items-center justify-center text-[#C2570C] active:scale-90"
                            >
                              <Minus className="w-3 h-3 stroke-[3]" />
                            </button>
                            <span className="text-xs font-black text-[#1B1209] min-w-[12px] text-center tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase"
                              onClick={() => {
                                // Add back
                                addToCart({
                                  id: item.productId,
                                  name: item.name,
                                  brand: item.brand,
                                  category: item.category as any,
                                  categoryLabel: '',
                                  subcategory: '',
                                  images: [item.image],
                                  price: item.price,
                                  mrp: item.mrp,
                                  unit: item.packSize,
                                  variants: [],
                                  inStock: true,
                                  description: '',
                                  rating: 5,
                                  reviewCount: 1
                                });
                              }}
                              className="w-4 h-4 flex items-center justify-center text-[#C2570C] active:scale-90"
                            >
                              <Plus className="w-3 h-3 stroke-[3]" />
                            </button>
                          </div>

                          <button
                            type="button"
                            aria-label="Remove item"
                            onClick={() => removeFromCart(item.productId, item.variantId)}
                            className="text-stone-400 hover:text-red-600 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Address Review */}
                  <div className="p-3 rounded-xl bg-[#FFF8EC] border border-[#EADBCE]">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1 text-xs font-bold text-[#1B1209]">
                        <MapPin className="w-3.5 h-3.5 text-[#C2570C]" />
                        <span>Delivery Address ({selectedAddress.title})</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsAddressSheetOpen(true)}
                        className="text-[11px] font-bold text-[#C2570C] hover:underline"
                      >
                        Change
                      </button>
                    </div>
                    <p className="text-xs text-stone-700 truncate">
                      {selectedAddress.street}, {selectedAddress.area}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Jodhpur, Rajasthan · Pincode: {selectedAddress.pincode}
                    </p>
                  </div>

                  {/* Delivery Instructions note */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Delivery note for rider (optional)
                    </label>
                    <input
                      type="text"
                      value={deliveryNote}
                      onChange={(e) => setDeliveryNote(e.target.value)}
                      placeholder="e.g. Call before ringing bell / Leave with guard"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:border-[#C2570C] outline-none"
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div>
                    <span className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-2">
                      Select Payment Method
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all ${
                          paymentMethod === 'cod'
                            ? 'bg-[#FFF8EC] border-[#C2570C] text-[#C2570C] font-bold shadow-xs'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        <Banknote className="w-5 h-5" />
                        <span className="text-xs leading-none">Cash on Delivery</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all ${
                          paymentMethod === 'upi'
                            ? 'bg-[#FFF8EC] border-[#C2570C] text-[#C2570C] font-bold shadow-xs'
                            : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                        }`}
                      >
                        <QrCode className="w-5 h-5" />
                        <span className="text-xs leading-none">UPI / QR Code</span>
                      </button>
                    </div>
                  </div>

                  {/* Bill Details */}
                  <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2 text-xs text-stone-700">
                    <h4 className="font-bold text-[#1B1209] uppercase text-[11px]">
                      Bill Details
                    </h4>
                    <div className="flex justify-between">
                      <span>Item Total</span>
                      <span className="font-bold tabular-nums">₹{cartSubtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center gap-1">
                        <span>Delivery Partner Fee</span>
                        {isFreeDelivery && (
                          <span className="text-[10px] text-[#15803D] font-bold">
                            (FREE)
                          </span>
                        )}
                      </div>
                      <div className="tabular-nums">
                        {isFreeDelivery ? (
                          <div className="flex items-center gap-1">
                            <span className="line-through text-stone-400">
                              ₹{STORE_CONFIG.deliveryFee}
                            </span>
                            <span className="font-bold text-[#15803D]">FREE</span>
                          </div>
                        ) : (
                          <span className="font-bold">₹{deliveryFee}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Handling & Bag</span>
                      <span className="font-bold text-[#15803D]">FREE</span>
                    </div>

                    <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-black text-[#1B1209]">
                      <span>Grand Total</span>
                      <span className="text-[#C2570C] tabular-nums">₹{cartTotal}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Bottom Checkout CTA */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-[#EADBCE] bg-white">
                {!isMinOrderMet ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#B91C1C] font-semibold bg-red-50 p-2 rounded-lg">
                      <Info className="w-4 h-4 shrink-0" />
                      <span>
                        Minimum order amount is ₹{STORE_CONFIG.minimumOrder} (Add ₹{STORE_CONFIG.minimumOrder - cartSubtotal} more)
                      </span>
                    </div>
                    <button
                      type="button"
                      disabled
                      className="w-full py-3 rounded-xl bg-stone-200 text-stone-400 font-bold text-xs cursor-not-allowed"
                    >
                      Cannot Place Order
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleCheckout}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C2570C] to-[#E8890C] hover:from-[#A84805] hover:to-[#D97706] text-white font-extrabold text-sm shadow-md active:scale-[0.98] transition-all flex items-center justify-between px-4"
                  >
                    <div className="flex flex-col text-left leading-tight">
                      <span className="text-[10px] text-[#FFF8EC]/90 font-medium uppercase tracking-wider">
                        {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Pay via UPI'}
                      </span>
                      <span className="text-base font-black tabular-nums">
                        ₹{cartTotal}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 font-black">
                      <span>{isSubmitting ? 'Placing Order...' : 'Place Order'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
