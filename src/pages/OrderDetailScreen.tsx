import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Download,
  HelpCircle,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Printer,
  ShieldCheck,
  Star,
  Truck,
  XCircle
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { RatingModal } from '../components/order/RatingModal';
import { STORE_CONFIG } from '../config/storeConfig';
import { useNav } from '../context/NavigationContext';
import { getOrders, updateOrderStatus } from '../services/store';
import { Order } from '../types/store';
import { formatINR } from '../utils/formatters';

export const OrderDetailScreen: React.FC = () => {
  const { selectedOrderId, goBack, showToast } = useNav();
  const [order, setOrder] = useState<Order | null>(null);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    async function load() {
      const orders = await getOrders();
      const match = orders.find(o => o.id === selectedOrderId) || orders[0];
      setOrder(match);
    }
    load();
  }, [selectedOrderId]);

  if (!order) return null;

  const isPickup = order.deliveryAddress.street.includes('Badla Road Mart Counter');

  // Stages for timeline
  const stages = isPickup
    ? ['Order Placed', 'Packed at Mart', 'Ready for Pickup', 'Picked Up']
    : ['Order Placed', 'Packed at Mart', 'Out for Delivery', 'Delivered'];

  let activeStageIndex = 0;
  if (order.status === 'packing') activeStageIndex = 1;
  else if (order.status === 'out_for_delivery') activeStageIndex = 2;
  else if (order.status === 'delivered') activeStageIndex = 3;

  const canCancel = order.status === 'confirmed';

  const [showCancelPrompt, setShowCancelPrompt] = useState(false);

  const handleCancelOrder = async () => {
    const updated = await updateOrderStatus(order.id, 'cancelled' as any);
    if (updated) {
      setOrder(updated);
      setShowCancelPrompt(false);
      showToast(`Order #${order.orderNumber} has been cancelled`);
    }
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 250);
  };

  const whatsAppHelpUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(`Hello Ajota Mart, I need assistance regarding my Order #${order.orderNumber}.`)}`;

  return (
    <div className="w-full pb-24 md:pb-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between py-2 mb-4 border-b border-[#EADBCE] dark:border-stone-800">
        <button
          type="button"
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-bold text-stone-700 dark:text-stone-300 hover:text-[#C2570C]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Orders</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-bold flex items-center gap-1.5 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-[#C2570C]"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>

      {/* Printable Invoice Header (Hidden during normal screen, visible on print) */}
      <div className="hidden print:block mb-6 p-4 border-b-2 border-stone-800">
        <h1 className="text-xl font-black">{STORE_CONFIG.storeName}</h1>
        <p className="text-xs">{STORE_CONFIG.fullAddress}</p>
        <p className="text-xs">Invoice for Order #{order.orderNumber}</p>
      </div>

      {/* Main Status Card */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs mb-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C2570C]">
              Order #{order.orderNumber}
            </span>
            <p className="text-xs text-stone-500 mt-0.5">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsRatingOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#FFF8EC] dark:bg-stone-800 border border-[#F5B718] text-[#C2570C] text-xs font-bold flex items-center gap-1"
            >
              <Star className="w-3.5 h-3.5 fill-[#F5B718] text-[#F5B718]" />
              <span>Rate Order</span>
            </button>

            {canCancel && !showCancelPrompt && (
              <button
                type="button"
                onClick={() => setShowCancelPrompt(true)}
                className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold border border-red-200"
              >
                Cancel Order
              </button>
            )}

            {showCancelPrompt && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCancelOrder}
                  className="px-2.5 py-1.5 rounded-xl bg-red-600 text-white hover:bg-red-700 text-xs font-bold"
                >
                  Confirm Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setShowCancelPrompt(false)}
                  className="px-2.5 py-1.5 rounded-xl bg-stone-100 text-stone-600 text-xs font-semibold"
                >
                  Keep
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Status Timeline */}
        <div className="py-6">
          <div className="relative flex justify-between items-center">
            {/* Connecting Bar */}
            <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-stone-200 dark:bg-stone-800 -z-0">
              <div
                className="h-full bg-[#15803D] transition-all duration-500"
                style={{
                  width: `${(activeStageIndex / (stages.length - 1)) * 100}%`
                }}
              />
            </div>

            {stages.map((stage, idx) => {
              const isPast = idx <= activeStageIndex;
              const isCurrent = idx === activeStageIndex;

              return (
                <div key={stage} className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                      isPast
                        ? 'bg-[#15803D] text-white'
                        : 'bg-white dark:bg-stone-800 border-2 border-stone-300 dark:border-stone-700 text-stone-400'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-4 h-4 stroke-[2.5]" /> : idx + 1}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-bold mt-2 max-w-[70px] sm:max-w-[100px] leading-tight ${
                      isCurrent
                        ? 'text-[#C2570C]'
                        : isPast
                        ? 'text-stone-800 dark:text-stone-200'
                        : 'text-stone-400'
                    }`}
                  >
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Items & Bill */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {/* Item List */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#1B1209] dark:text-white mb-3">
            Items in this Order ({order.items.length})
          </h2>

          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-1 shrink-0 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-xs font-bold text-stone-400">{item.name[0]}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#8A7160] block truncate">
                      {item.brand}
                    </span>
                    <h3 className="font-bold text-[#1B1209] dark:text-white truncate">
                      {item.name}
                    </h3>
                    <span className="text-[11px] text-stone-500">
                      {item.packSize} × {item.quantity}
                    </span>
                  </div>
                </div>

                <span className="font-black text-[#1B1209] dark:text-white tabular-nums shrink-0 ml-2">
                  {formatINR(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bill & Address details */}
        <div className="space-y-4">
          {/* Bill summary */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs space-y-2 text-xs text-stone-700 dark:text-stone-300">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B1209] dark:text-white mb-1">
              Payment & Bill
            </h3>
            <div className="flex justify-between">
              <span>Item Subtotal</span>
              <span className="font-bold tabular-nums">{formatINR(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-bold tabular-nums">
                {order.deliveryFee === 0 ? 'FREE' : formatINR(order.deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Packaging</span>
              <span className="font-bold text-[#15803D]">FREE</span>
            </div>
            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex justify-between text-base font-black text-[#1B1209] dark:text-white">
              <span>Total Paid</span>
              <span className="text-[#C2570C] tabular-nums">{formatINR(order.total)}</span>
            </div>
            <p className="text-[11px] text-stone-500 pt-1">
              Method: <strong>{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Instant UPI'}</strong>
            </p>
          </div>

          {/* Delivery location */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#1B1209] dark:text-white mb-1">
              <MapPin className="w-4 h-4 text-[#C2570C]" />
              <span>{isPickup ? 'Pickup Location' : 'Delivery Address'}</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300">{order.deliveryAddress.street}</p>
            <p className="text-stone-500 text-[11px] mt-0.5">
              {order.deliveryAddress.area}, Jodhpur ({order.deliveryAddress.pincode})
            </p>
            <p className="text-stone-500 text-[11px]">Contact: {order.deliveryAddress.phone}</p>
          </div>
        </div>
      </div>

      {/* Need Help Bar */}
      <div className="p-4 rounded-2xl bg-[#FFF8EC] dark:bg-stone-900 border border-[#F5B718]/40 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#C2570C]" />
          <div>
            <span className="font-bold text-[#1B1209] dark:text-white block">
              Need assistance with this order?
            </span>
            <span className="text-[11px] text-stone-500">
              Our Badla Road store support team is here to help
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsAppHelpUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 rounded-xl bg-[#15803D] hover:bg-[#16A34A] text-white font-bold flex items-center gap-1.5 shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={`tel:${STORE_CONFIG.phone}`}
            className="px-3.5 py-2 rounded-xl bg-[#1B1209] hover:bg-[#331C0C] text-white font-bold flex items-center gap-1.5 shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Store</span>
          </a>
        </div>
      </div>

      {/* Rating Modal */}
      <RatingModal
        orderId={order.orderNumber}
        isOpen={isRatingOpen}
        onClose={() => setIsRatingOpen(false)}
      />
    </div>
  );
};
