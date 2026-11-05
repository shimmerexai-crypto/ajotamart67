import { CheckCircle2, ChevronRight, Clock, Package, Receipt, RotateCcw, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNav } from '../context/NavigationContext';
import { getOrders } from '../services/store';
import { Order } from '../types/store';
import { formatINR } from '../utils/formatters';

export const OrdersListScreen: React.FC = () => {
  const { navigateTo, showToast } = useNav();
  const { addToCart } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'delivered' | 'cancelled'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchList() {
      try {
        const list = await getOrders();
        setOrders(list);
      } finally {
        setLoading(false);
      }
    }
    fetchList();
  }, []);

  const filteredOrders = orders.filter(o => {
    if (activeTab === 'delivered') return o.status === 'delivered';
    if (activeTab === 'cancelled') return (o.status as any) === 'cancelled';
    return true;
  });

  const handleReorder = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation();
    order.items.forEach(item => {
      addToCart({
        id: item.productId,
        name: item.name,
        brand: item.brand,
        category: 'groceries',
        categoryLabel: '',
        subcategory: '',
        images: [item.image],
        price: item.price,
        mrp: item.price,
        unit: item.packSize,
        variants: [],
        inStock: true,
        description: '',
        rating: 5,
        reviewCount: 1
      });
    });
    showToast(`Items from Order #${order.orderNumber} added to cart!`);
    navigateTo('cart');
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C2570C] bg-[#FFF8EC] border border-[#F5B718]/40 px-2.5 py-0.5 rounded-full">
            <Clock className="w-3 h-3" />
            Order Placed
          </span>
        );
      case 'packing':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
            <Package className="w-3 h-3" />
            Packing at Mart
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
            <Clock className="w-3 h-3" />
            Out for Delivery
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#15803D] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Delivered
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
            <XCircle className="w-3 h-3" />
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="w-full pb-16 max-w-4xl mx-auto">
      {/* Title */}
      <div className="mb-4">
        <h1 className="text-xl sm:text-2xl font-black text-[#1B1209] dark:text-white">
          My Orders & History
        </h1>
        <p className="text-xs text-stone-500">View live tracking and past receipts</p>
      </div>

      {/* Tabs All / Delivered / Cancelled */}
      <div className="flex gap-2 p-1 bg-stone-100 dark:bg-stone-900 rounded-2xl mb-5 w-fit">
        {[
          { id: 'all', label: `All (${orders.length})` },
          { id: 'delivered', label: 'Delivered' },
          { id: 'cancelled', label: 'Cancelled' }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-stone-800 text-[#1B1209] dark:text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="py-16 text-center">
          <div className="w-8 h-8 border-4 border-[#C2570C] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <span className="text-xs text-stone-500">Loading orders...</span>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="py-16 text-center bg-white dark:bg-stone-900 rounded-3xl border border-[#EADBCE] dark:border-stone-800 p-8">
          <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 mx-auto mb-3">
            <Receipt className="w-8 h-8" />
          </div>
          <h3 className="text-sm font-bold text-[#1B1209] dark:text-white">
            No orders in this section
          </h3>
          <p className="text-xs text-stone-500 mt-1 mb-4">
            Browse our grocery and stationery catalog for fresh home delivery in Jodhpur.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="px-5 py-2.5 rounded-xl bg-[#C2570C] text-white text-xs font-bold shadow-xs"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => {
            const dateStr = new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            });

            return (
              <div
                key={order.id}
                onClick={() => navigateTo('order-detail', { orderId: order.id })}
                className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs hover:shadow-md cursor-pointer transition-all"
              >
                {/* Top status bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#1B1209] dark:text-white">
                      Order #{order.orderNumber}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>
                  <span className="text-[11px] text-stone-500">{dateStr}</span>
                </div>

                {/* Thumbnails + Item count */}
                <div className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {order.items.slice(0, 4).map((item, idx) => (
                      <div
                        key={idx}
                        className="w-12 h-12 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-1 shrink-0 overflow-hidden"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-xs font-bold text-stone-400 flex items-center justify-center h-full">
                            {item.name[0]}
                          </span>
                        )}
                      </div>
                    ))}
                    {order.items.length > 4 && (
                      <div className="w-12 h-12 rounded-xl bg-[#FFF8EC] dark:bg-stone-800 text-[#C2570C] font-bold text-xs flex items-center justify-center border border-[#F5B718]/40 shrink-0">
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-stone-500 block">Total</span>
                    <span className="text-sm font-black text-[#1B1209] dark:text-white tabular-nums">
                      {formatINR(order.total)}
                    </span>
                  </div>
                </div>

                {/* Bottom row: Reorder + View details */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleReorder(order, e)}
                      className="px-3 py-1.5 rounded-xl bg-[#FFF8EC] dark:bg-stone-800 border border-[#C2570C] text-[#C2570C] text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder</span>
                    </button>

                    <div className="flex items-center gap-0.5 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-[#C2570C]">
                      <span>Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
