import {
  ArrowLeft,
  Banknote,
  Check,
  CreditCard,
  MapPin,
  Plus,
  QrCode,
  ShieldCheck,
  Store,
  Truck
} from 'lucide-react';
import React, { useState } from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useAddress } from '../context/AddressContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNav } from '../context/NavigationContext';
import { createOrder } from '../services/store';
import { formatINR } from '../utils/formatters';

export const CheckoutScreen: React.FC = () => {
  const { cart, cartSubtotal, deliveryFee, cartTotal, deliveryType, setDeliveryType, clearCart } = useCart();
  const { addresses, selectedAddress, setSelectedAddress, addAddress } = useAddress();
  const { user } = useAuth();
  const { navigateTo, goBack, showToast } = useNav();

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  // New address form state
  const [newAddr, setNewAddr] = useState({
    title: 'Home' as 'Home' | 'Work' | 'Other',
    name: user.name || 'Jodhpur Resident',
    phone: user.phone || '+91 98290 54321',
    street: '',
    landmark: '',
    area: 'Badla Road',
    city: 'Jodhpur',
    pincode: '342008'
  });

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.street.trim()) {
      showToast('Please enter your house or street details');
      return;
    }
    const created = addAddress({ ...newAddr, isDefault: false });
    setSelectedAddress(created);
    setShowNewAddressForm(false);
    showToast('New address added for checkout!');
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      showToast('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderItems = cart.map(item => ({
        productId: item.productId,
        name: item.name,
        brand: item.brand,
        packSize: item.packSize,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }));

      const newOrder = await createOrder({
        items: orderItems,
        subtotal: cartSubtotal,
        deliveryFee: deliveryType === 'pickup' ? 0 : deliveryFee,
        total: cartTotal,
        deliveryAddress: deliveryType === 'pickup'
          ? {
              id: 'store-pickup',
              title: 'Other',
              name: user.name || 'Self Pickup',
              phone: user.phone || STORE_CONFIG.phoneDisplay,
              street: STORE_CONFIG.fullAddress,
              landmark: 'Badla Road Mart Counter',
              area: 'Badla Road',
              city: 'Jodhpur',
              pincode: '342008',
              isDefault: false
            }
          : selectedAddress,
        paymentMethod: paymentMethod === 'card' ? 'upi' : paymentMethod,
        notes: deliveryNotes
      });

      clearCart();
      navigateTo('order-success', { orderId: newOrder.id });
    } catch (err) {
      console.error(err);
      showToast('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pb-28 md:pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 py-2 mb-4 border-b border-[#EADBCE] dark:border-stone-800">
        <button
          type="button"
          onClick={goBack}
          className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-black text-[#1B1209] dark:text-white">
            Checkout & Order Review
          </h1>
          <p className="text-xs text-stone-500">Badla Road Mart · Jodhpur</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Delivery Option, Address, Payment */}
        <div className="md:col-span-2 space-y-5">
          {/* 1. Delivery Option: Home Delivery vs Self Pickup */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1B1209] dark:text-white mb-3">
              1. Choose Fulfillment Method
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {/* Home Delivery */}
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-start text-left transition-all ${
                  deliveryType === 'delivery'
                    ? 'border-[#C2570C] bg-[#FFF8EC] dark:bg-stone-900 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <Truck className={`w-5 h-5 ${deliveryType === 'delivery' ? 'text-[#C2570C]' : 'text-stone-400'}`} />
                  {deliveryType === 'delivery' && <Check className="w-4 h-4 text-[#C2570C]" />}
                </div>
                <span className="text-xs font-extrabold text-[#1B1209] dark:text-white block">
                  Home Delivery
                </span>
                <span className="text-[11px] text-stone-500 mt-0.5">
                  Fast local delivery to your Jodhpur doorstep
                </span>
              </button>

              {/* Self Pickup */}
              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`p-3.5 rounded-2xl border-2 flex flex-col items-start text-left transition-all ${
                  deliveryType === 'pickup'
                    ? 'border-[#C2570C] bg-[#FFF8EC] dark:bg-stone-900 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <Store className={`w-5 h-5 ${deliveryType === 'pickup' ? 'text-[#C2570C]' : 'text-stone-400'}`} />
                  {deliveryType === 'pickup' && <Check className="w-4 h-4 text-[#C2570C]" />}
                </div>
                <span className="text-xs font-extrabold text-[#1B1209] dark:text-white block">
                  Self Pickup (Free)
                </span>
                <span className="text-[11px] text-stone-500 mt-0.5">
                  Collect from Badla Road store counter
                </span>
              </button>
            </div>
          </div>

          {/* 2. Address (if Home Delivery) or Store Pickup Address */}
          {deliveryType === 'delivery' ? (
            <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#1B1209] dark:text-white">
                  2. Delivery Address in Jodhpur
                </h2>
                {!showNewAddressForm && (
                  <button
                    type="button"
                    onClick={() => setShowNewAddressForm(true)}
                    className="text-xs font-bold text-[#C2570C] flex items-center gap-1 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New</span>
                  </button>
                )}
              </div>

              {!showNewAddressForm ? (
                <div className="space-y-2.5">
                  {addresses.map(addr => {
                    const isSelected = selectedAddress.id === addr.id;
                    return (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddress(addr)}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'border-[#C2570C] bg-[#FFF8EC] dark:bg-stone-900 shadow-xs'
                            : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 hover:border-stone-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-xs mt-0.5 ${
                            isSelected ? 'bg-[#C2570C] text-white' : 'border border-stone-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#1B1209] dark:text-white">
                              {addr.title}
                            </span>
                            <span className="text-[10px] font-mono bg-stone-100 dark:bg-stone-800 text-stone-600 px-1.5 py-0.2 rounded">
                              {addr.pincode}
                            </span>
                          </div>
                          <p className="text-xs text-stone-700 dark:text-stone-300 mt-0.5 leading-snug">
                            {addr.street}, {addr.landmark ? `${addr.landmark}, ` : ''}{addr.area}
                          </p>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            Recipient: {addr.name} ({addr.phone})
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <form onSubmit={handleAddNewAddress} className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#1B1209] dark:text-white">New Address Details</span>
                    <button
                      type="button"
                      onClick={() => setShowNewAddressForm(false)}
                      className="text-stone-500 underline"
                    >
                      Cancel
                    </button>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="House / Flat / Building / Street *"
                      value={newAddr.street}
                      onChange={(e) => setNewAddr(prev => ({ ...prev, street: e.target.value }))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:border-[#C2570C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Landmark"
                      value={newAddr.landmark}
                      onChange={(e) => setNewAddr(prev => ({ ...prev, landmark: e.target.value }))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:border-[#C2570C]"
                    />
                    <input
                      type="text"
                      placeholder="Area (e.g. Badla Road)"
                      value={newAddr.area}
                      onChange={(e) => setNewAddr(prev => ({ ...prev, area: e.target.value }))}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:border-[#C2570C]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Pincode (e.g. 342008)"
                      value={newAddr.pincode}
                      onChange={(e) => setNewAddr(prev => ({ ...prev, pincode: e.target.value }))}
                      className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:border-[#C2570C]"
                    />
                    <select
                      value={newAddr.title}
                      onChange={(e) => setNewAddr(prev => ({ ...prev, title: e.target.value as any }))}
                      className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:border-[#C2570C]"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#C2570C] text-white font-bold text-xs shadow-xs"
                  >
                    Save & Deliver Here
                  </button>
                </form>
              )}

              {/* Delivery instructions note */}
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800">
                <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                  Delivery instructions (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leave with security / Call upon arrival"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1B1209] dark:text-white mb-2">
                2. Store Pickup Counter Address
              </h2>
              <div className="p-3.5 rounded-2xl bg-[#FFF8EC] dark:bg-stone-900 border border-[#F5B718]/40 space-y-1.5 text-xs">
                <span className="font-extrabold text-[#1B1209] dark:text-white block">
                  Ajota Mart - Badla Road Store
                </span>
                <p className="text-stone-600 dark:text-stone-300">
                  {STORE_CONFIG.fullAddress}
                </p>
                <p className="text-stone-500 text-[11px]">
                  Store Timings: {STORE_CONFIG.storeTimings}
                </p>
                <div className="pt-1 text-[#15803D] font-bold text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Ready for pickup within 15 minutes of ordering</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Payment Method */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1B1209] dark:text-white mb-3">
              3. Payment Method
            </h2>

            <div className="space-y-2.5">
              {/* Cash on Delivery */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#C2570C] bg-[#FFF8EC] dark:bg-stone-900 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Banknote className="w-5 h-5 text-[#C2570C]" />
                  <div>
                    <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Pay in cash at your doorstep upon receiving items
                    </span>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    paymentMethod === 'cod' ? 'bg-[#C2570C] text-white' : 'border border-stone-300'
                  }`}
                >
                  {paymentMethod === 'cod' && <Check className="w-3 h-3" />}
                </div>
              </div>

              {/* Instant UPI */}
              <div
                onClick={() => setPaymentMethod('upi')}
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-[#C2570C] bg-[#FFF8EC] dark:bg-stone-900 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <QrCode className="w-5 h-5 text-[#15803D]" />
                  <div>
                    <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
                      UPI / QR Code Scan
                    </span>
                    <span className="text-[11px] text-stone-500">
                      Google Pay, PhonePe, Paytm, or scan rider QR code
                    </span>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    paymentMethod === 'upi' ? 'bg-[#C2570C] text-white' : 'border border-stone-300'
                  }`}
                >
                  {paymentMethod === 'upi' && <Check className="w-3 h-3" />}
                </div>
              </div>

              {/* Card (Placeholder for PG) */}
              <div
                onClick={() => setPaymentMethod('card')}
                className={`p-3.5 rounded-2xl border cursor-pointer flex flex-col gap-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#C2570C] bg-[#FFF8EC] dark:bg-stone-900 shadow-xs'
                    : 'border-stone-200 dark:border-stone-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <div>
                      <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
                        Credit / Debit Card
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Visa, Mastercard, RuPay, Maestro
                      </span>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      paymentMethod === 'card' ? 'bg-[#C2570C] text-white' : 'border border-stone-300'
                    }`}
                  >
                    {paymentMethod === 'card' && <Check className="w-3 h-3" />}
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-700 space-y-2 text-xs">
                    <input
                      type="text"
                      maxLength={19}
                      placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-mono"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-mono"
                      />
                      <input
                        type="password"
                        maxLength={3}
                        placeholder="CVV"
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Order Summary & Place Order */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B1209] dark:text-white pb-2 border-b border-stone-100 dark:border-stone-800">
              Order Summary ({cart.length} items)
            </h3>

            {/* Quick item preview */}
            <div className="max-h-48 overflow-y-auto space-y-2 divide-y divide-stone-100 dark:divide-stone-800 text-xs">
              {cart.map((i, idx) => (
                <div key={idx} className="pt-1.5 flex justify-between">
                  <span className="truncate max-w-[160px] text-stone-700 dark:text-stone-300">
                    {i.quantity}× {i.name}
                  </span>
                  <span className="font-bold tabular-nums">
                    {formatINR(i.price * i.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold tabular-nums">{formatINR(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold tabular-nums">
                  {deliveryType === 'pickup' ? (
                    <span className="text-[#15803D]">FREE (Self Pickup)</span>
                  ) : deliveryFee === 0 ? (
                    <span className="text-[#15803D]">FREE</span>
                  ) : (
                    formatINR(deliveryFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-base font-black text-[#1B1209] dark:text-white">
                <span>Grand Total</span>
                <span className="text-[#C2570C] tabular-nums">{formatINR(cartTotal)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handlePlaceOrder}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#C2570C] to-[#E8890C] hover:from-[#A84805] hover:to-[#D97706] disabled:opacity-50 text-white font-black text-sm shadow-md active:scale-95 transition-all text-center mt-3"
            >
              {isSubmitting ? 'Confirming Order...' : `Place Order · ${formatINR(cartTotal)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
