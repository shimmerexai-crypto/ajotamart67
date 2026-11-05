import { CheckCircle2, MessageSquare, Receipt, ShoppingBag, Truck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useNav } from '../context/NavigationContext';
import { getOrders } from '../services/store';
import { Order } from '../types/store';
import { formatINR } from '../utils/formatters';

export const OrderSuccessScreen: React.FC = () => {
  const { selectedOrderId, navigateTo } = useNav();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function load() {
      const orders = await getOrders();
      const match = orders.find(o => o.id === selectedOrderId) || orders[0];
      setOrder(match);
    }
    load();
  }, [selectedOrderId]);

  const orderNum = order ? order.orderNumber : 'AJ-84291';
  const total = order ? order.total : 499;

  const whatsAppUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hello Ajota Mart, I just placed Order #${orderNum} for ${formatINR(total)}. Please confirm dispatch from Badla Road store.`)}`;

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-4 max-w-md mx-auto text-center">
      <div className="w-full bg-white dark:bg-[#1A120B] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#EADBCE] dark:border-[#382619]">
        {/* Animated Tick */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-[#15803D] flex items-center justify-center mx-auto mb-4 animate-bounce-short shadow-sm">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        <span className="text-xs font-bold text-[#C2570C] uppercase tracking-wider">
          Order Placed Successfully!
        </span>
        <h1 className="text-xl sm:text-2xl font-black text-[#1B1209] dark:text-white mt-1 mb-2">
          Thank you for shopping at Ajota Mart
        </h1>

        <div className="inline-block px-3 py-1 bg-[#FFF8EC] dark:bg-stone-900 border border-[#F5B718]/40 rounded-full text-xs font-mono font-bold text-[#1B1209] dark:text-[#FFE885] mb-4">
          Order ID: #{orderNum}
        </div>

        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
          Your order has been sent to our <strong>Badla Road store</strong>. Our team is hand-picking and packing your items with care.
        </p>

        {/* Expected dispatch card */}
        <div className="p-4 rounded-2xl bg-[#FFFDF9] dark:bg-stone-900 border border-[#EADBCE] dark:border-stone-800 text-left mb-6 space-y-2 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
            <span className="text-stone-500">Service Area:</span>
            <span className="font-bold text-[#1B1209] dark:text-white">Badla Road & Jodhpur</span>
          </div>
          <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
            <span className="text-stone-500">Delivery Status:</span>
            <span className="font-bold text-[#15803D] flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" />
              <span>{STORE_CONFIG.deliveryTimeText}</span>
            </span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-stone-500 font-semibold">Total Paid / To Pay:</span>
            <span className="text-sm font-black text-[#C2570C] tabular-nums">
              {formatINR(total)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => navigateTo('order-detail', { orderId: order?.id })}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C2570C] to-[#E8890C] hover:from-[#A84805] hover:to-[#D97706] text-white font-extrabold text-xs sm:text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Receipt className="w-4 h-4" />
            <span>Track Order & View Invoice</span>
          </button>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 rounded-2xl bg-[#15803D] hover:bg-[#16A34A] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Order on WhatsApp / Updates</span>
          </a>

          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="w-full py-2.5 text-xs font-semibold text-stone-500 hover:text-[#C2570C] transition-colors"
          >
            Back to Home & Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
