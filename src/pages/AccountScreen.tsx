import {
  Bell,
  ChevronRight,
  Gift,
  Heart,
  HelpCircle,
  LogIn,
  LogOut,
  MapPin,
  Package,
  Receipt,
  Settings,
  Share2,
  Store,
  Tag,
  User
} from 'lucide-react';
import React from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useAuth } from '../context/AuthContext';
import { useNav } from '../context/NavigationContext';
import { useWishlist } from '../context/WishlistContext';

export const AccountScreen: React.FC = () => {
  const { user, logout, setIsLoginModalOpen } = useAuth();
  const { navigateTo, setIsCouponSheetOpen, showToast } = useNav();
  const { wishlist } = useWishlist();

  const handleShareReferral = () => {
    const text = `Shop from Ajota Mart, Jodhpur's one-stop Mart at Badla Road! Use code AJOTA50 for ₹50 off on your first order.`;
    if (navigator.share) {
      navigator.share({ title: 'Ajota Mart Jodhpur', text, url: window.location.origin }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.origin}`);
      showToast('Referral invite link copied to clipboard!');
    }
  };

  return (
    <div className="w-full pb-20 max-w-2xl mx-auto space-y-5">
      {/* Profile Header */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#1B1209] via-[#331C0C] to-[#C2570C] text-white shadow-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 border-2 border-[#F5B718] flex items-center justify-center text-[#FFE885] shrink-0 font-black text-xl">
            {user.name ? user.name[0].toUpperCase() : 'A'}
          </div>
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-black text-white truncate">
              {user.isLoggedIn ? user.name : 'Welcome, Guest!'}
            </h1>
            <p className="text-xs text-[#FFE885] font-semibold mt-0.5 truncate">
              {user.isLoggedIn ? user.phone : 'Log in to track orders & save addresses'}
            </p>
            <span className="inline-block text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-white/90 mt-1 font-medium">
              Badla Road Mart Shopper
            </span>
          </div>
        </div>

        {user.isLoggedIn ? (
          <button
            type="button"
            onClick={() => navigateTo('settings')}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white shrink-0 transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsLoginModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#F5B718] hover:bg-[#E8890C] text-[#1B1209] font-black text-xs shrink-0 shadow-sm transition-all"
          >
            Log In
          </button>
        )}
      </div>

      {/* 4 Quick Tiles: Orders, Wishlist, Addresses, Help */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => navigateTo('orders')}
          className="p-3.5 rounded-2xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs hover:border-[#C2570C] text-left transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-stone-800 text-[#C2570C] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Receipt className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
            My Orders
          </span>
          <span className="text-[10px] text-stone-500">Track & reorder</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('wishlist')}
          className="p-3.5 rounded-2xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs hover:border-[#C2570C] text-left transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-stone-800 text-[#B91C1C] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
              Wishlist
            </span>
            {wishlist.length > 0 && (
              <span className="text-[10px] font-bold text-[#C2570C]">
                ({wishlist.length})
              </span>
            )}
          </div>
          <span className="text-[10px] text-stone-500">Saved items</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('addresses')}
          className="p-3.5 rounded-2xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs hover:border-[#C2570C] text-left transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-stone-800 text-[#D97706] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
            Addresses
          </span>
          <span className="text-[10px] text-stone-500">Jodhpur locations</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('help')}
          className="p-3.5 rounded-2xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs hover:border-[#C2570C] text-left transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-stone-800 text-[#15803D] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
            <HelpCircle className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
            Help & FAQ
          </span>
          <span className="text-[10px] text-stone-500">Call / WhatsApp</span>
        </button>
      </div>

      {/* Main Section List */}
      <div className="rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] divide-y divide-[#EADBCE] dark:divide-stone-800 shadow-2xs overflow-hidden">
        {/* Coupons & Offers */}
        <button
          type="button"
          onClick={() => setIsCouponSheetOpen(true)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-[#FFF8EC] dark:hover:bg-stone-900 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-stone-800 flex items-center justify-center text-[#C2570C]">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
                Coupons & Offers
              </span>
              <span className="text-[11px] text-stone-500">
                View active promo codes for Badla Road Mart
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        {/* Refer & Invite */}
        <button
          type="button"
          onClick={handleShareReferral}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-[#FFF8EC] dark:hover:bg-stone-900 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-stone-800 flex items-center justify-center text-purple-600">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
                Refer & Invite Neighbours
              </span>
              <span className="text-[11px] text-stone-500">
                Share Ajota Mart with family and friends in Jodhpur
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        {/* Notifications */}
        <button
          type="button"
          onClick={() => navigateTo('notifications')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-[#FFF8EC] dark:hover:bg-stone-900 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-stone-800 flex items-center justify-center text-blue-600">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
                Notifications & Updates
              </span>
              <span className="text-[11px] text-stone-500">
                Order status SMS, festive discounts
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        {/* Store Info & Badla Road directions */}
        <button
          type="button"
          onClick={() => navigateTo('store-info')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-[#FFF8EC] dark:hover:bg-stone-900 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-stone-800 flex items-center justify-center text-[#E8890C]">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
                Store Info & Directions
              </span>
              <span className="text-[11px] text-stone-500">
                Badla Road location, Google Maps directions, timings
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        {/* Settings */}
        <button
          type="button"
          onClick={() => navigateTo('settings')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-[#FFF8EC] dark:hover:bg-stone-900 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
                App Settings & Preferences
              </span>
              <span className="text-[11px] text-stone-500">
                Language (हिंदी/EN), Dark mode, Policies
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>
      </div>

      {/* Logout / Login button at bottom */}
      <div className="pt-2 text-center">
        {user.isLoggedIn ? (
          <button
            type="button"
            onClick={logout}
            className="px-6 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold inline-flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out of Account</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsLoginModalOpen(true)}
            className="px-6 py-2.5 rounded-xl bg-[#C2570C] text-white text-xs font-bold inline-flex items-center gap-2 shadow-xs"
          >
            <LogIn className="w-4 h-4" />
            <span>Log In with Phone Number</span>
          </button>
        )}
      </div>
    </div>
  );
};
