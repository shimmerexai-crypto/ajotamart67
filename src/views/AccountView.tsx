import {
  Download,
  Heart,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Store,
  User
} from 'lucide-react';
import React from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { AjotaLogo } from '../components/common/AjotaLogo';
import { ProductCard } from '../components/product/ProductCard';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';

interface AccountViewProps {
  products: Product[];
}

export const AccountView: React.FC<AccountViewProps> = ({ products }) => {
  const {
    wishlist,
    selectedAddress,
    setIsAddressSheetOpen,
    setActiveTab
  } = useStore();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="w-full py-2 space-y-6">
      {/* Account Profile Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1B1209] via-[#331C0C] to-[#C2570C] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-[#F5B718] flex items-center justify-center text-[#FFE885] shrink-0">
            <User className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white">
                Suresh Choudhary
              </h1>
              <span className="text-[10px] font-bold bg-[#F5B718] text-[#1B1209] px-2 py-0.5 rounded-full uppercase">
                Badla Road Resident
              </span>
            </div>
            <p className="text-xs text-[#FFE885]/90 mt-0.5">
              +91 98290 54321 · Jodhpur, Rajasthan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAddressSheetOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-xs transition-colors flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-[#F5B718]" />
            <span>Manage Addresses</span>
          </button>
        </div>
      </div>

      {/* Wishlist Section */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EADBCE]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-[#C2570C]">
              <Heart className="w-4 h-4 fill-[#C2570C]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#1B1209]">
                My Saved Wishlist ({wishlistProducts.length})
              </h2>
              <p className="text-[11px] text-stone-500">
                Products saved for later purchase
              </p>
            </div>
          </div>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="py-8 text-center text-stone-500 text-xs">
            No items in your wishlist. Tap the heart icon on any product to save it here!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {wishlistProducts.map(product => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Store Location & Direct Contact Card */}
      <div className="p-5 rounded-2xl bg-[#FFF8EC] border border-[#F5B718]/40 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <AjotaLogo size={40} />
          <div>
            <h3 className="text-sm sm:text-base font-black text-[#1B1209]">
              Ajota Mart - Badla Road Store
            </h3>
            <p className="text-xs text-[#8A5A29]">
              {STORE_CONFIG.tagline}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5C3D26] mb-5">
          <div className="p-3 rounded-xl bg-white/90 border border-[#EADBCE] flex items-start gap-2.5">
            <Store className="w-4 h-4 text-[#C2570C] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#1B1209] block">Address</span>
              <span>{STORE_CONFIG.fullAddress}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/90 border border-[#EADBCE] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#C2570C] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#1B1209] block">Store Timings</span>
              <span>{STORE_CONFIG.storeTimings}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Direct Call, WhatsApp, Instagram */}
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(STORE_CONFIG.whatsappMessage)}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#16A34A] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${STORE_CONFIG.phone}`}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#1B1209] hover:bg-[#331C0C] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>Call Badla Road Store</span>
          </a>

          <a
            href={STORE_CONFIG.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-95"
          >
            <Instagram className="w-4 h-4" />
            <span>{STORE_CONFIG.instagram}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
