import {
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  Receipt,
  RotateCcw,
  ShoppingBag,
  Truck
} from 'lucide-react';
import React from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useStore } from '../context/StoreContext';
import { Order } from '../types/store';

export const OrdersView: React.FC = () => {
  const { orders, addToCart, setIsCartDrawerOpen, showToast, setActiveTab } = useStore();

  const handleReorder = (order: Order) => {
    // Add all items from this order into the cart
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

    showToast('Items added to cart!');
    setIsCartDrawerOpen(true);
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C2570C] bg-[#FFF8EC] border border-[#F5B718]/40 px-2.5 py-0.5 rounded-full">
            <Clock className="w-3 h-3" />
            Order Confirmed
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
            <Truck className="w-3 h-3" />
            Out for Delivery
          </span>
        );
      case 'delivered':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#15803D] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Delivered
          </span>
        );
    }
  };

  return (
    <div className="w-full py-2">
      {/* Page Title */}
      <div className="mb-4 px-1">
        <h1 className="text-lg sm:text-2xl font-black text-[#1B1209] tracking-tight">
          My Orders & Order History
        </h1>
        <p className="text-xs text-[#7A6150]">
          Track live deliveries and reorder your past groceries
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-[#EADBCE] p-8">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-3">
            <Receipt className="w-8 h-8" />
          </div>
          <h3 className="text-sm font-bold text-[#1B1209]">No past orders yet</h3>
          <p className="text-xs text-stone-500 mt-1 mb-4">
            Place your first grocery or stationery order from our Badla Road store!
          </p>
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="px-4 py-2 rounded-xl bg-[#C2570C] text-white text-xs font-bold shadow-xs"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const dateStr = new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={order.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EADBCE] shadow-2xs hover:shadow-sm transition-shadow"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F0E6D8]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#1B1209]">
                        Order #{order.orderNumber}
                      </span>
                      {getStatusBadge(order.status)}
                    </div>
                    <span className="text-[11px] text-stone-500">{dateStr}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleReorder(order)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF8EC] border border-[#C2570C] hover:bg-[#FBE8CE] text-[#C2570C] text-xs font-bold active:scale-95 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder / Buy Again</span>
                    </button>
                  </div>
                </div>

                {/* Items List */}
                <div className="py-3 divide-y divide-[#F5EFE6]">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-2 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-md bg-stone-50 border border-stone-200 shrink-0 overflow-hidden flex items-center justify-center text-[10px] font-bold text-stone-500">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            item.name[0]
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#1B1209] truncate">
                            {item.name}
                          </p>
                          <span className="text-[10px] text-stone-500">
                            {item.packSize} × {item.quantity}
                          </span>
                        </div>
                      </div>

                      <span className="font-bold text-[#1B1209] tabular-nums shrink-0 ml-2">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery Address & Summary */}
                <div className="pt-3 border-t border-[#F0E6D8] flex flex-wrap items-center justify-between gap-3 text-xs bg-[#FFFDF9] -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-4 rounded-b-2xl">
                  <div className="flex items-start gap-1.5 text-stone-600 max-w-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#C2570C] shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-tight">
                      Delivered to: {order.deliveryAddress.street}, {order.deliveryAddress.area} ({order.deliveryAddress.pincode})
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-stone-500 text-[11px]">
                      Payment: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'UPI'}
                    </span>
                    <span className="text-stone-400">·</span>
                    <span className="text-sm font-black text-[#1B1209] tabular-nums">
                      Total: ₹{order.total}
                    </span>
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
